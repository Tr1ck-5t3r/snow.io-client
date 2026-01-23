import { useEffect, useState } from "react";
import { useGame } from "../game/GameContext";

export function useNetwork() {
  const { room } = useGame();
  const [players, setPlayers] = useState({});

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
    setPlayers(Object.fromEntries(playersMap.entries()));

    return () => {
      onAddDisposer?.();
      onRemoveDisposer?.();
    };
  }, [room]);

  return players;
}
