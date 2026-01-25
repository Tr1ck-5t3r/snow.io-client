import { useEffect, useState, useCallback } from "react";
import { useGame } from "../game/GameContext";

export function useNetwork() {
  const { room } = useGame();
  const [players, setPlayers] = useState({});

  const initializePlayers = useCallback(() => {
    if (room) {
      const playersMap = room.state.players;
      setPlayers(Object.fromEntries(playersMap.entries()));
    }
  }, [room]);

  useEffect(() => {
    if (!room) return;

    const playersMap = room.state.players;

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

  const sendInput = (dx, dz, rotY) => {
    if (room) {
      room.send("input", { dx, dz, rotY });
    }
  };

  return { players, sendInput };
}
