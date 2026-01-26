import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Ground() {
  let groundTexture = useTexture("/textures/ground.jpg");

  useEffect(() => {
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10); // ground should usually be square
    groundTexture.anisotropy = 16; // sharper at angles
  }, [groundTexture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial map={groundTexture} />
    </mesh>
  );
}
