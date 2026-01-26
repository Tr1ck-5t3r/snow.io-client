import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../config/constants";

export default function Walls() {
  const wallHeight = WORLD_HEIGHT / 5; // Example usage of WORLD_HEIGHT
  const wallThickness = 1;
  const size = WORLD_WIDTH / 2; // Example usage of WORLD_WIDTH

  const wallTexture = useTexture("/textures/wall.jpg");

  // Optional but recommended for walls
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(10, 2); // tile horizontally & vertically

  return (
    <>
      {/* Front */}
      <mesh position={[0, wallHeight / 2, -size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Back */}
      <mesh position={[0, wallHeight / 2, size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Left */}
      <mesh position={[-size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Right */}
      <mesh position={[size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
    </>
  );
}
