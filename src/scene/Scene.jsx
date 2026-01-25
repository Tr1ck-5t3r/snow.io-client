// src/scene/Scene.jsx
import { Suspense } from "react";
import Snowman from "../player/Snowman";
import FPSCamera from "../camera/FPSCamera";
import Walls from "../world/Walls";
import { useNetwork } from "../net/useNetwork";
import Ground from "../world/Ground";

export default function Scene() {
  const players = useNetwork();

  return (
    <>
      {/* FPS Camera */}
      <FPSCamera position={[0, 1.6, 0]} speed={0.1} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Walls />
      <Ground />

      {/* Players */}
      {Object.entries(players).map(([id, player]) => (
        <Snowman
          key={id}
          position={[player.x, 0, player.z]}
          rotationY={player.rotationY}
        />
      ))}
    </>
  );
}
