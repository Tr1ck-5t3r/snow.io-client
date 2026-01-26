// src/camera/FPSCamera.jsx
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3 } from "three";

export default function FPSCamera({ snowmanRef, offset = [0, 1.6, 0] }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (snowmanRef?.current) {
      const snowmanPosition = snowmanRef.current.position;
      const headPosition = new Vector3(
        snowmanPosition.x + offset[0],
        snowmanPosition.y + offset[1],
        snowmanPosition.z + offset[2]
      );
      camera.position.lerp(headPosition, 0.1);

      const dir = new Vector3();
      camera.getWorldDirection(dir);
    }
  });

  return <PointerLockControls ref={controlsRef} />;
}
