// src/player/Players.jsx
import Snowman from "./Snowman";
import { useNetwork } from "../net/useNetwork";

export default function Players() {
  const players = useNetwork(); // { sessionId: playerState }

  return (
    <>
      {Object.values(players).map((p) => (
        <Snowman
          key={p.sessionId}
          position={[p.x, 0, p.z]}
          rotationY={p.rotationY || 0}
        />
      ))}
    </>
  );
}
