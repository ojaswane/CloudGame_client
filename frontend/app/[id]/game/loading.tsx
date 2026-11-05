import Link from "next/link";

export default function GameLoading() {
  return (
    <main className="player-page" aria-busy="true">
      <header className="player-topbar">
        <Link className="player-back" href="/" aria-label="Back to game library">
          <span aria-hidden="true">‹</span>
          <span>Game library</span>
        </Link>
        <span className="player-brand">CLOUDPLAY</span>
      </header>
      <div className="player-content player-loading">
        <p>Preparing your game...</p>
        <div className="player-loading-frame" />
      </div>
    </main>
  );
}
