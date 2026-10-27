import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { WORLD_DEPTH, WORLD_WIDTH } from '../config/constants';

export default function Ground() {
  const groundTexture = useTexture('/textures/ground.jpg');
  const groundTileSize = 3;

  useEffect(() => {
    if (groundTexture) {
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(WORLD_WIDTH / groundTileSize, WORLD_DEPTH / groundTileSize);
      groundTexture.anisotropy = Math.min(8, groundTexture.anisotropy || 1);
      groundTexture.needsUpdate = true;
    }
  }, [groundTexture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[WORLD_WIDTH, WORLD_DEPTH]} />
      <meshStandardMaterial 
        map={groundTexture} 
        color="#ffffff"
        roughness={0.8}
      />
    </mesh>
  );
}
