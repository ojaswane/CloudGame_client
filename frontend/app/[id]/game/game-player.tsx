"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HandleSde, { type GameConnectionStatus } from "../../../Handle_sde";
import type { Game } from "../../games";

type PlayerStatus = "not-configured" | GameConnectionStatus;

export default function GamePlayer({
  game,
  controlWsUrl,
}: {
  game: Game;
  controlWsUrl?: string;
}) {
  const [status, setStatus] = useState<PlayerStatus>(
    controlWsUrl ? "connecting" : game.streamUrl ? "connecting" : "not-configured",
  );

  const statusLabel = {
    "not-configured": "Stream not connected",
    connecting: controlWsUrl ? "Connecting to control panel" : "Connecting to stream",
    negotiating: "Negotiating SDP",
    receiving: "Connecting to game video",
    ready: "Ready to play",
    buffering: "Buffering stream",
    error: controlWsUrl ? "Control-panel connection failed" : "Stream unavailable",
  }[status];

  return (
    <main className="player-page">
      <header className="player-topbar">
        <Link className="player-back" href="/" aria-label="Back to game library">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Game library</span>
        </Link>
        <span className="player-brand">CLOUDPLAY</span>
      </header>

      <div className="player-content">
        <div className="player-heading">
          <div>
            <p className="player-eyebrow">{game.type} · CLOUD GAMING</p>
            <h1>{game.name}</h1>
          </div>
          <span className={`player-status player-status--${status}`} role="status">
            <span className="player-status-dot" />
            {statusLabel}
          </span>
        </div>

        <section className="stream-frame" aria-label={`${game.name} game stream`}>
          <Image
            className="stream-poster"
            src={game.background}
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1440px"
          />
          {controlWsUrl ? (
            <HandleSde
              sessionId={game.sessionId}
              controlWsUrl={controlWsUrl}
              onStatusChange={setStatus}
            />
          ) : game.streamUrl ? (
            <video
              className="stream-video"
              src={game.streamUrl}
              poster={game.background.src}
              controls
              playsInline
              preload="metadata"
              onCanPlay={() => setStatus("ready")}
              onPlaying={() => setStatus("ready")}
              onWaiting={() => setStatus("buffering")}
              onError={() => setStatus("error")}
            >
              Your browser does not support this video stream.
            </video>
          ) : (
            <div className="stream-placeholder">
              <Image className="stream-game-icon" src={game.icon} alt="" width={76} height={76} />
              <h2>Ready when you are</h2>
              <p>
                Configure a control-panel WebSocket URL or add this game&apos;s stream URL to connect your server.
              </p>
              <code>NEXT_PUBLIC_CONTROL_WS_URL</code>
            </div>
          )}
          {(controlWsUrl || game.streamUrl) && status !== "ready" && status !== "error" && (
            <div className={`stream-message stream-message--${status}`} role="status">
              <strong>{statusLabel}...</strong>
              <div
                className="stream-progress"
                role="progressbar"
                aria-label={statusLabel}
                aria-valuetext="Connection in progress"
              >
                <span />
              </div>
            </div>
          )}
          {status === "error" && (controlWsUrl || game.streamUrl) && (
            <div className="stream-message stream-message--error" role="alert">
              <strong>{controlWsUrl ? "Couldn’t connect to the control panel" : "Couldn’t load this stream"}</strong>
              <span>{controlWsUrl ? "Check the WebSocket URL, session ID, and that the game agent is online." : "Check the stream URL, server access, and supported video format."}</span>
            </div>
          )}
        </section>

        <footer className="player-footer">
          <p>{game.description}</p>
          <p className="player-hint">
            {controlWsUrl
              ? `SDP session: ${game.sessionId}`
              : game.streamUrl
                ? "Use the video controls to play, pause, adjust volume, or go fullscreen."
                : "This player is ready for a browser-compatible video stream URL."}
          </p>
        </footer>
      </div>
    </main>
  );
}
