"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Game } from "../../games";

type PlayerStatus = "not-configured" | "connecting" | "ready" | "buffering" | "error";

export default function GamePlayer({ game }: { game: Game }) {
  const [status, setStatus] = useState<PlayerStatus>(
    game.streamUrl ? "connecting" : "not-configured",
  );

  const statusLabel = {
    "not-configured": "Stream not connected",
    connecting: "Connecting to stream",
    ready: "Ready to play",
    buffering: "Buffering stream",
    error: "Stream unavailable",
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
          {game.streamUrl ? (
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
                Add this game&apos;s stream URL to your local environment to connect your server.
              </p>
              <code>NEXT_PUBLIC_{game.id.toUpperCase()}_STREAM_URL</code>
            </div>
          )}
          {game.streamUrl && status !== "ready" && (
            <div className={`stream-message stream-message--${status}`} role={status === "error" ? "alert" : "status"}>
              {status === "error" ? (
                <>
                  <strong>Couldn&apos;t load this stream</strong>
                  <span>Check the stream URL, server access, and supported video format.</span>
                </>
              ) : (
                <strong>{status === "buffering" ? "Buffering stream..." : "Connecting to your game..."}</strong>
              )}
            </div>
          )}
        </section>

        <footer className="player-footer">
          <p>{game.description}</p>
          <p className="player-hint">
            {game.streamUrl
              ? "Use the video controls to play, pause, adjust volume, or go fullscreen."
              : "This player is ready for a browser-compatible video stream URL."}
          </p>
        </footer>
      </div>
    </main>
  );
}
