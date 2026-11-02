import { useEffect, useRef, useState } from 'react';
import { useGame } from '../game/GameContext';
import { useNetwork } from '../net/useNetwork';

export default function HealthHUD() {
  const { sessionId } = useGame();
  const { players } = useNetwork();
  const player = players[sessionId];
  const [now, setNow] = useState(Date.now());
  const [deathFlashKey, setDeathFlashKey] = useState(0);
  const previousHealth = useRef(null);

  useEffect(() => {
    if (!player) return;
    const healthValue = Number(player.health ?? 50);
    if (previousHealth.current !== null && previousHealth.current > 0 && healthValue <= 0) {
      setDeathFlashKey((key) => key + 1);
    }
    previousHealth.current = healthValue;
  }, [player?.health]);

  useEffect(() => {
    if (!player?.respawnAt) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, [player?.respawnAt]);

  if (!player) return null;

  const health = Number(player.health ?? 50);
  const maxHealth = Number(player.maxHealth ?? 50);
  const isRespawning = health <= 0;
  const secondsToRespawn = Math.max(0, Math.ceil((Number(player.respawnAt) - now) / 1000));
  const fill = Math.max(0, Math.min(100, (health / Math.max(1, maxHealth)) * 100));
  const fillColor = health > maxHealth / 2 ? '#70e29a' : '#ffd166';

  return (
    <>
    {deathFlashKey > 0 && <div key={deathFlashKey} className="death-snow-flash" aria-hidden="true" />}
    <div style={{
      position: 'absolute',
      left: 22,
      bottom: 22,
      zIndex: 30,
      width: 220,
      padding: '12px 14px',
      borderRadius: 10,
      color: '#f5fbff',
      background: 'rgba(9, 20, 31, 0.82)',
      border: '1px solid rgba(210, 232, 248, 0.28)',
      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.28)',
      fontFamily: 'system-ui, sans-serif',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>
          {isRespawning ? 'RESPAWNING' : 'HEALTH'}
        </span>
        <span style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
          {isRespawning ? `${secondsToRespawn}s` : `${health} / ${maxHealth}`}
        </span>
      </div>
      <div style={{ height: 11, overflow: 'hidden', borderRadius: 8, background: 'rgba(255,255,255,0.16)' }}>
        <div style={{
          width: `${fill}%`,
          height: '100%',
          borderRadius: 8,
          background: isRespawning ? '#ef5350' : fillColor,
          transition: 'width 160ms ease-out',
        }} />
      </div>
    </div>
    </>
  );
}
