// src/player/Snowman.jsx
import { forwardRef, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SNOWMAN_HEAD_HEIGHT } from "../config/constants";

const Snowman = forwardRef(({ position = [0, 0, 0], rotationY = 0 }, forwardedRef) => {
  const groupRef = useRef();
  const targetPosition = useRef(position);
  const initialized = useRef(false);

  useEffect(() => {
    targetPosition.current = position;
  }, [position]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!initialized.current) {
      groupRef.current.position.set(...targetPosition.current);
      initialized.current = true;
    }

    const smoothing = 1 - Math.exp(-12 * delta);
    groupRef.current.position.x +=
      (targetPosition.current[0] - groupRef.current.position.x) * smoothing;
    groupRef.current.position.y +=
      (targetPosition.current[1] - groupRef.current.position.y) * smoothing;
    groupRef.current.position.z +=
      (targetPosition.current[2] - groupRef.current.position.z) * smoothing;
    groupRef.current.rotation.y = rotationY;

    if (forwardedRef) {
      forwardedRef.current = groupRef.current;
    }
  });

  return (
    <group ref={groupRef}>
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
      <mesh position={[0, SNOWMAN_HEAD_HEIGHT, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.07, SNOWMAN_HEAD_HEIGHT + 0.05, 0.22]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.07, SNOWMAN_HEAD_HEIGHT + 0.05, 0.22]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, SNOWMAN_HEAD_HEIGHT, 0.27]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.2, 16]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
});

export default Snowman;
