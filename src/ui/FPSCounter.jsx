import { useEffect, useRef, useState } from 'react';

export default function FPSCounter() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let rafId;

    const update = (time) => {
      frameCount.current += 1;
      const elapsed = time - lastTime.current;

      if (elapsed >= 500) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastTime.current = time;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 20,
        padding: '6px 10px',
        background: 'rgba(0, 0, 0, 0.6)',
        color: '#b8f08d',
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        borderRadius: 6,
        pointerEvents: 'none',
      }}
    >
      {`FPS: ${fps}`}
    </div>
  );
}
