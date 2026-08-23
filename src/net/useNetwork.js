import { useEffect, useState, useCallback } from "react";
import { useGame } from "../game/GameContext";

export function useNetwork() {
  const { room } = useGame();
  const [players, setPlayers] = useState({});
  const [projectiles, setProjectiles] = useState({});

  const initializePlayers = useCallback(() => {
    if (room) {
      const playersMap = room.state.players;
      setPlayers(Object.fromEntries(playersMap.entries()));
    }
  }, [room]);

  const initializeProjectiles = useCallback(() => {
    if (room && room.state.projectiles) {
      const projectilesMap = room.state.projectiles;
      const projectilesObj = Object.fromEntries(projectilesMap.entries());
      console.log('Initialized projectiles:', projectilesObj);
      setProjectiles(projectilesObj);
    }
  }, [room]);

  useEffect(() => {
    if (!room) return;

    // room.onStateChange in Colyseus returns a disposer function directly or can be cleared with .once/.off
    const listener = (state) => {
      if (state.players) {
        setPlayers(Object.fromEntries(state.players.entries()));
      }
    };

    const unsubscribe = room.onStateChange(listener);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      } else if (room.onStateChange && typeof room.onStateChange.remove === "function") {
        room.onStateChange.remove(listener);
      }
    };
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const playersMap = room.state.players;
    if (!playersMap) return;

    const onAddDisposer = playersMap.onAdd?.((player, id) => {
      setPlayers((p) => ({ ...p, [id]: player }));
    });

    const onRemoveDisposer = playersMap.onRemove?.((player, id) => {
      setPlayers((p) => {
        const copy = { ...p };
        delete copy[id];
        return copy;
      });
    });

    initializePlayers();

    return () => {
      onAddDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room, initializePlayers]);

  useEffect(() => {
    if (!room || !room.state.projectiles) return;

    const projectilesMap = room.state.projectiles;

    // handle projectile additions
    const onAddDisposer = projectilesMap.onAdd?.((projectile, id) => {
      console.log('Projectile added:', id, projectile);
      setProjectiles((p) => ({ ...p, [id]: projectile }));
    });

    // handle projectile removals
    const onRemoveDisposer = projectilesMap.onRemove?.((projectile, id) => {
      console.log('Projectile removed:', id);
      setProjectiles((p) => {
        const copy = { ...p };
        delete copy[id];
        return copy;
      });
    });

    // initialize projectiles
    initializeProjectiles();

    return () => {
      onAddDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room, initializeProjectiles]);

  const sendInput = useCallback(
    (forward, right, rotY) => {
      if (room) {
        const validForward = isNaN(forward) ? 0 : forward;
        const validRight = isNaN(right) ? 0 : right;
        const validRotY = isNaN(rotY) ? 0 : rotY;

        room.send("input", { forward: validForward, right: validRight, rotY: validRotY });
      }
    },
    [room]
  );

  return { players, projectiles, sendInput };
}
