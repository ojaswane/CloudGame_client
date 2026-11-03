import games from "./games";
import LocalClock from "./local-clock";

function Icon({ name }: { name: "cloud" | "search" | "bell" | "sun" | "play" | "heart" | "more" | "plus" }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };

  if (name === "cloud") return <svg {...common} fill="currentColor" stroke="none"><path d="M19 18H6a4 4 0 0 1-.5-7.97A6.5 6.5 0 0 1 18 8.5a4.75 4.75 0 0 1 1 9.5Z" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4 4" /></svg>;
  if (name === "bell") return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></svg>;
  if (name === "sun") return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>;
  if (name === "play") return <svg {...common} fill="currentColor" stroke="none"><path d="m8 5 11 7-11 7V5Z" /></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" /></svg>;
  if (name === "more") return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></svg>;
  return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
}

export default function Home() {
  return (
    <main className="game-hub">
      <header className="topbar">
        <a className="brand-mark" href="#home" aria-label="Cloud Gaming home"><Icon name="cloud" /></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link is-active" href="#games">Games</a>
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" aria-label="Search"><Icon name="search" /></button>
          <button className="icon-button" aria-label="Notifications"><Icon name="bell" /></button>
          <button className="icon-button" aria-label="Display settings"><Icon name="sun" /></button>
          <button className="profile-avatar" aria-label="Profile" />
          <LocalClock />
        </div>
      </header>

      <section className="featured-game" id="games" aria-labelledby="featured-title">
        <div className="feature-copy">
          <h1 id="featured-title">{games[0].name}</h1>
          <div className="game-meta">
            {/* replace this with actual game metadata */}
            <span>{games[0].type}</span><span className="connection-speed">12 ms · 4K</span>
          </div>
          <div className="feature-actions">
            <button className="play-button"><Icon name="play" /><span>Play</span></button>
            <button className="round-button" aria-label={`Add ${games[0].name} to favorites`}><Icon name="heart" /></button>
            <button className="round-button" aria-label="More options"><Icon name="more" /></button>
          </div>
        </div>
        {/* <div className="feature-orb" aria-hidden="true" /> */}
      </section>

      <section className="game-shelf" aria-label="Available games">
        <div className="game-list">
          {games.map((game, index) => (
            <button className={`game-card ${index === 0 ? "is-selected" : ""}`} key={game.name} aria-label={game.name} aria-pressed={index === 0}>
              <span className={`game-art ${game.className}`}><span className={`art-shape art-shape--${game.shape}`} /></span>
            </button>
          ))}
          <button className="game-card add-game" aria-label="Add a game"><Icon name="plus" /></button>
        </div>
      </section>

      <footer className="statusbar">
        <div className="controller-hints"><span><b>×</b> Select</span><span><b>○</b> Back</span><span><b>△</b> Options</span></div>
        <div className="server-status"><span className="status-dot" />Connected to Mumbai server</div>
      </footer>
    </main>
  );
}
