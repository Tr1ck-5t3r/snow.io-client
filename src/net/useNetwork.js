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

    const playersMap = room.state.players;
    if (!playersMap) return; // Ensure playersMap is defined before accessing onAdd and onRemove

    // handle additions
    const onAddDisposer = playersMap.onAdd?.((player, id) => {
      setPlayers((p) => ({ ...p, [id]: player }));
    });

    // handle removals
    const onRemoveDisposer = playersMap.onRemove?.((player, id) => {
      setPlayers((p) => {
        const copy = { ...p };
        delete copy[id];
        return copy;
      });
    });

    // initialize state
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
      if (room && (forward !== 0 || right !== 0 || rotY !== 0)) {
        // Validate inputs to ensure they are numbers
        const validForward = isNaN(forward) ? 0 : forward;
        const validRight = isNaN(right) ? 0 : right;
        const validRotY = isNaN(rotY) ? 0 : rotY;

        console.log("Sending input to server:", { forward: validForward, right: validRight, rotY: validRotY });
        room.send("input", { forward: validForward, right: validRight, rotY: validRotY });
      }
    },
    [room]
  );

  return { players, projectiles, sendInput };
}
