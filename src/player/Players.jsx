// src/player/Players.jsx
import Snowman from "./Snowman";
import { useNetwork } from "../net/useNetwork";

export default function Players() {
  const { players } = useNetwork(); // destructure the hook result

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
