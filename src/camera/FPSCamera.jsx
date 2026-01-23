// src/camera/FPSCamera.jsx
import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Vector3 } from "three";

export default function FPSCamera({ position = [0, 1.6, 0], speed = 0.1 }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Move camera along WASD
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    camera.position.set(...position);

    const handleKeyDown = (e) => {
      if (e.key === "w") keys.current.w = true;
      if (e.key === "a") keys.current.a = true;
      if (e.key === "s") keys.current.s = true;
      if (e.key === "d") keys.current.d = true;
    };
    const handleKeyUp = (e) => {
      if (e.key === "w") keys.current.w = false;
      if (e.key === "a") keys.current.a = false;
      if (e.key === "s") keys.current.s = false;
      if (e.key === "d") keys.current.d = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera, position]);

  useFrame(() => {
    const dir = new Vector3();
    camera.getWorldDirection(dir);

    // Forward/backward
    if (keys.current.w) camera.position.add(dir.clone().multiplyScalar(speed));
    if (keys.current.s) camera.position.add(dir.clone().multiplyScalar(-speed));

    // Left/right strafing
    const right = new Vector3().crossVectors(camera.up, dir).normalize();
    if (keys.current.a) camera.position.add(right.multiplyScalar(-speed));
    if (keys.current.d) camera.position.add(right.multiplyScalar(speed));
  });

  return <PointerLockControls ref={controlsRef} />;
}
