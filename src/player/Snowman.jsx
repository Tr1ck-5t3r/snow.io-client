// src/player/Snowman.jsx
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const Snowman = forwardRef(({ position = [0, 0, 0], rotationY = 0 }, ref) => {
  const tempVec = new Vector3();

  useFrame(() => {
    if (ref?.current) {
      // smooth rotation
      ref.current.rotation.y = rotationY;
      // smooth position towards the target props
      tempVec.set(position[0], position[1], position[2]);
      ref.current.position.lerp(tempVec, 0.2);
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
});

export default Snowman;
