
"use client";

import { useEffect, useRef } from "react";

type SignalMessage =
    | { type: "offer"; sdp: string }
    | { type: "answer"; sdp: string }
    | {
        type: "candidate";
        candidate: string;
        sdp_mid: string | null;
        sdp_mline_index: number | null;
    };

type Props = {
    sessionId: string;
    controlWsUrl: string;
    onStatusChange: (status: GameConnectionStatus) => void;
};

export type GameConnectionStatus =
    | "connecting"
    | "negotiating"
    | "receiving"
    | "ready"
    | "buffering"
    | "error";

export default function HandleSde({
    sessionId,
    controlWsUrl,
    onStatusChange,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const statusChangeRef = useRef(onStatusChange);

    useEffect(() => {
        statusChangeRef.current = onStatusChange;
    }, [onStatusChange]);

    useEffect(() => {
        let disposed = false;
        const videoElement = videoRef.current;
        const pendingCandidates: RTCIceCandidateInit[] = [];
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        const signallingUrl = `${controlWsUrl.replace(/\/+$/, "")}/ws/sessions/${encodeURIComponent(sessionId)}`;
        const ws = new WebSocket(signallingUrl);

        const setStatus = (status: GameConnectionStatus) => {
            if (!disposed) statusChangeRef.current(status);
        };

        pc.addTransceiver("video", { direction: "recvonly" });
        pc.addTransceiver("audio", { direction: "recvonly" });

        pc.ontrack = (event) => {
            if (!videoElement) return;

            videoElement.srcObject = event.streams[0] ?? new MediaStream([event.track]);
            setStatus("receiving");
            void videoElement.play().catch((error: unknown) => {
                console.error("Could not start game video playback:", error);
            });
        };

        pc.onconnectionstatechange = () => {
            if (pc.connectionState === "failed") setStatus("error");
        };

        pc.onicecandidate = (event) => {
            if (!event.candidate || ws.readyState !== WebSocket.OPEN) return;

            const candidate: SignalMessage = {
                type: "candidate",
                candidate: event.candidate.candidate,
                sdp_mid: event.candidate.sdpMid,
                sdp_mline_index: event.candidate.sdpMLineIndex,
            };
            ws.send(JSON.stringify(candidate));
        };

        ws.onopen = () => {
            void (async () => {
                try {
                    setStatus("negotiating");
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);

                    if (!pc.localDescription?.sdp) {
                        throw new Error("The browser did not create an SDP offer");
                    }

                    const offerMessage: SignalMessage = {
                        type: "offer",
                        sdp: pc.localDescription.sdp,
                    };
                    ws.send(JSON.stringify(offerMessage));
                } catch (error) {
                    console.error("CloudRig SDP negotiation error:", error);
                    setStatus("error");
                }
            })();
        };

        ws.onmessage = (event: MessageEvent<string>) => {
            void (async () => {
                try {
                    const message = JSON.parse(event.data) as SignalMessage;

                    if (message.type === "answer") {
                        await pc.setRemoteDescription({ type: "answer", sdp: message.sdp });
                        for (const candidate of pendingCandidates) {
                            await pc.addIceCandidate(candidate);
                        }
                        pendingCandidates.length = 0;
                        setStatus("receiving");
                    } else if (message.type === "candidate") {
                        const candidate: RTCIceCandidateInit = {
                            candidate: message.candidate,
                            sdpMid: message.sdp_mid,
                            sdpMLineIndex: message.sdp_mline_index,
                        };

                        if (pc.remoteDescription) {
                            await pc.addIceCandidate(candidate);
                        } else {
                            pendingCandidates.push(candidate);
                        }
                    }
                } catch (error) {
                    console.error("CloudRig signalling message error:", error);
                    setStatus("error");
                }
            })();
        };

        ws.onerror = () => setStatus("error");
        ws.onclose = () => {
            if (!disposed && pc.connectionState !== "connected") setStatus("error");
        };
        statusChangeRef.current("connecting");

        return () => {
            disposed = true;
            ws.close();
            pc.close();
            if (videoElement) videoElement.srcObject = null;
        };
    }, [controlWsUrl, sessionId]);

    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="stream-video"
            onPlaying={() => statusChangeRef.current("ready")}
            onWaiting={() => statusChangeRef.current("buffering")}
            onError={() => statusChangeRef.current("error")}
        >
            Your browser does not support WebRTC video.
        </video>
    );
}
