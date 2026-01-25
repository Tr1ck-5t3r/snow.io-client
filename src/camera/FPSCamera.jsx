// src/camera/FPSCamera.jsx
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useNetwork } from "../net/useNetwork";
import { useInput } from "../input/useInput";

export default function FPSCamera({ snowmanRef, offset = [0, 1.6, 0], speed = 0.1 }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const { forward, right, rotY } = useInput();
  const { sendInput } = useNetwork();

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

      // Calculate movement based on input
      const dx = right * speed;
      const dz = forward * speed;

      // Send input to server
      sendInput(dx, dz, rotY);
    }
  });

  return <PointerLockControls ref={controlsRef} />;
}
