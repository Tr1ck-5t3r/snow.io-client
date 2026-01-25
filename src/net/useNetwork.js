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

  const sendInput = (dx, dz, rotY) => {
    if (room) {
      // Validate inputs to ensure they are numbers
      const validDx = isNaN(dx) ? 0 : dx;
      const validDz = isNaN(dz) ? 0 : dz;
      const validRotY = isNaN(rotY) ? 0 : rotY;

      console.log("Sending input to server:", { dx: validDx, dz: validDz, rotY: validRotY });
      room.send("input", { dx: validDx, dz: validDz, rotY: validRotY });
    }
  };

  return { players, sendInput };
}
