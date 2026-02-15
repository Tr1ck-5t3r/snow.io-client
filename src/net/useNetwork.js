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

    // whenever the root state changes, rebuild our simple players object
    const onStateChange = room.onStateChange((state) => {
      const playersMap = state.players;
      if (playersMap) {
        setPlayers(Object.fromEntries(playersMap.entries()));
      }
    });

    // also capture initial state
    initializePlayers();

    return () => {
      onStateChange();
    };
  }, [room, initializePlayers]);

  const sendInput = useCallback(
    ({ forward = 0, right = 0, rotY = 0 }) => {
      if (room) {
        const validForward = isNaN(forward) ? 0 : forward;
        const validRight = isNaN(right) ? 0 : right;
        const validRotY = isNaN(rotY) ? 0 : rotY;

        console.log("Sending input to server:", { forward: validForward, right: validRight, rotY: validRotY });
        room.send("input", { forward: validForward, right: validRight, rotY: validRotY });
      }
    },
    [room]
  );

  const predictMovement = useCallback(
    ({ forward = 0, right = 0, rotY = 0 }) => {
      if (!room) return;
      setPlayers((p) => {
        const copy = { ...p };
        const me = copy[room.sessionId];
        if (me) {
          // simple client-side movement matching server logic
          const speed = 6 * (1 / 60);
          const sin = Math.sin(rotY);
          const cos = Math.cos(rotY);
          const dx = right;
          const dz = -forward;
          me.x += (dx * cos - dz * sin) * speed;
          me.z += (dx * sin + dz * cos) * speed;
        }
        return copy;
      });
    },
    [room]
  );

  return { players, sendInput, predictMovement };
}
