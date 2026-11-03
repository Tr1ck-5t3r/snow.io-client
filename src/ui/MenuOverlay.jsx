import "./Menu.css";

export default function MenuOverlay({ onPlay, loading, error, name, onNameChange }) {
  return (
    <div className="menu-root">
      <img src="/snow.io.png" className="menu-logo" />

      <section className="menu-panel">
        <label className="name-label" htmlFor="player-name">SNOWMAN NAME</label>
        <input
          id="player-name"
          className="name-input"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value.slice(0, 20))}
          onKeyDown={(event) => { if (event.key === "Enter" && !loading) onPlay(); }}
          placeholder="Enter your name"
          maxLength={20}
          autoComplete="nickname"
        />
        <div className="controls-card">
          <h2>CONTROLS</h2>
          <p><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd><span>Move</span></p>
          <p><kbd>SPACE</kbd><span>Jump</span></p>
          <p><kbd>CLICK</kbd><span>Shoot snowballs</span></p>
        </div>
        <button onClick={onPlay} disabled={loading}>
          PLAY
        </button>
      </section>

      {loading && (
        <div className="menu-overlay">
          <p className="menu-loading">LOADING...</p>
        </div>
      )}

      {error && (
        <div className="menu-overlay">
          <p className="menu-error">{error}</p>
          <button onClick={() => window.location.reload()}>
            ← TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
