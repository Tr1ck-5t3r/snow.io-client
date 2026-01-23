import "./Menu.css";

export default function MenuOverlay({ onPlay, loading, error }) {
  return (
    <div className="menu-root">
      <img src="/snow.io.png" className="menu-logo" />

      <div className="menu-buttons">
        <button onClick={onPlay} disabled={loading}>
          PLAY
        </button>
      </div>

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
