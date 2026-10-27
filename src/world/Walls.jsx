import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { WORLD_DEPTH, WORLD_WIDTH, WALL_HEIGHT } from "../config/constants";

export default function Walls() {
  const wallHeight = WALL_HEIGHT;
  const wallThickness = 1;
  const wallTileSize = 2;
  const halfWidth = WORLD_WIDTH / 2;
  const halfDepth = WORLD_DEPTH / 2;

  const wallTexture = useTexture("/textures/wall.jpg");

  // Optional but recommended for walls
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set((WORLD_WIDTH + 2 * wallThickness) / wallTileSize, wallHeight / wallTileSize);
  wallTexture.needsUpdate = true;

  return (
    <>
      {/* Front */}
      <mesh position={[0, wallHeight / 2, -halfDepth - wallThickness / 2]}>
        <boxGeometry args={[WORLD_WIDTH + 2 * wallThickness, wallHeight, wallThickness]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Back */}
      <mesh position={[0, wallHeight / 2, halfDepth + wallThickness / 2]}>
        <boxGeometry args={[WORLD_WIDTH + 2 * wallThickness, wallHeight, wallThickness]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Left */}
      <mesh position={[-halfWidth - wallThickness / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, WORLD_DEPTH]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>

      {/* Right */}
      <mesh position={[halfWidth + wallThickness / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, WORLD_DEPTH]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
    </>
  );
}
