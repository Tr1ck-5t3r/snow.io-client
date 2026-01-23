// src/scene/Scene.jsx
import { Suspense } from "react";
import Snowman from "../player/Snowman";
import FPSCamera from "../camera/FPSCamera";
import { useNetwork } from "../net/useNetwork";

export default function Scene() {
  const players = useNetwork();

  return (
    <>
      {/* FPS Camera */}
      <FPSCamera position={[0, 1.6, 0]} speed={0.1} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1, -10]}>
        <boxGeometry args={[20, 2, 0.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 1, 10]}>
        <boxGeometry args={[20, 2, 0.5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[-10, 1, 0]}>
        <boxGeometry args={[0.5, 2, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[10, 1, 0]}>
        <boxGeometry args={[0.5, 2, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

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
