// src/camera/UniversalCamera.jsx
import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls, OrbitControls } from "@react-three/drei";

export default function UniversalCamera({ type = "orbit", position = [0, 2, 5] }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
  }, [camera, position]);

  // Orbit (mouse drag) or PointerLock (FPS style)
  return type === "orbit" ? (
    <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />
  ) : (
    <PointerLockControls ref={controlsRef} />
  );
}
