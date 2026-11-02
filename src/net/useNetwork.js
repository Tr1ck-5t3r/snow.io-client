import { useEffect, useState, useCallback } from "react";
import { useGame } from "../game/GameContext";

export function useNetwork() {
  const { room } = useGame();
  const [players, setPlayers] = useState({});
  const [projectiles, setProjectiles] = useState({});
  const [decals, setDecals] = useState({});

  const initializePlayers = useCallback(() => {
    if (room) {
      const playersMap = room.state.players;
      setPlayers(Object.fromEntries(playersMap.entries()));
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

    const onChangeDisposer = playersMap.onChange?.((player, id) => {
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
      onChangeDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room, initializePlayers]);

  useEffect(() => {
    if (!room || !room.state.projectiles) return;

    const projectilesMap = room.state.projectiles;
    // Effects already in the room when this client joins are history, not new
    // shots for this session. Track their IDs so initialization callbacks and
    // later patches cannot resurrect them in the joining client's view.
    const existingProjectileIds = new Set(projectilesMap.keys());
    setProjectiles({});

    const onAddDisposer = projectilesMap.onAdd?.((projectile, id) => {
      if (existingProjectileIds.has(id)) return;
      setProjectiles((p) => ({ ...p, [id]: projectile }));
    }, false);

    const onChangeDisposer = projectilesMap.onChange?.((projectile, id) => {
      if (existingProjectileIds.has(id)) return;
      setProjectiles((p) => ({ ...p, [id]: projectile }));
    });

    const onRemoveDisposer = projectilesMap.onRemove?.((projectile, id) => {
      setProjectiles((p) => {
        const copy = { ...p };
        delete copy[id];
        return copy;
      });
    });

    return () => {
      onAddDisposer?.();
      onChangeDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room]);

  useEffect(() => {
    if (!room || !room.state.decals) return;
    const decalsMap = room.state.decals;
    const existingDecalIds = new Set(decalsMap.keys());
    setDecals({});
    const onAddDisposer = decalsMap.onAdd?.((decal, id) => {
      if (existingDecalIds.has(id)) return;
      setDecals((current) => ({ ...current, [id]: decal }));
    }, false);
    const onRemoveDisposer = decalsMap.onRemove?.((decal, id) => {
      setDecals((current) => {
        const copy = { ...current };
        delete copy[id];
        return copy;
      });
    });
    return () => {
      onAddDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room]);

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

  const sendJump = useCallback(() => {
    room?.send("jump");
  }, [room]);

  return { players, projectiles, decals, sendInput, sendJump };
}
