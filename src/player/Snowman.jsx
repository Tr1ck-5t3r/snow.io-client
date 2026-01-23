// src/player/Snowman.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Snowman({ position = [0, 0, 0], rotationY = 0 }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = rotationY; // rotate snowman to match input
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Bottom snowball */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Middle snowball */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.07, 1.65, 0.22]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.07, 1.65, 0.22]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, 1.6, 0.27]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.2, 16]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}
