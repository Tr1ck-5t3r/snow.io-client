import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Ground() {
  let groundTexture = useTexture('/textures/ground.jpg');

  useEffect(() => {
    if (groundTexture) {
      groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
      groundTexture.repeat.set(10, 10);
      groundTexture.anisotropy = 16;
    }
  }, [groundTexture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        map={groundTexture} 
        color="#ffffff"
        roughness={0.8}
      />
    </mesh>
  );
}
