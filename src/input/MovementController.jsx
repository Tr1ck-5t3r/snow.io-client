// src/input/MovementController.jsx
import { useEffect, useContext, useRef } from "react";
import { Vector3 } from "three";
import { useNetwork } from "../net/useNetwork";
import { CameraContext } from "../camera/CameraContext";

export default function MovementController() {
  const { sendInput } = useNetwork();
  const cameraRef = useContext(CameraContext);
  const inputRef = useRef({ forward: 0, right: 0 });
  const dirVec = useRef(new Vector3());

  const emitMovement = () => {
    let rotY = 0;
    if (cameraRef?.camera) {
      cameraRef.camera.getWorldDirection(dirVec.current);
      const len = Math.hypot(dirVec.current.x, dirVec.current.z);
      if (len > 0.0001) {
        rotY = Math.atan2(dirVec.current.x, dirVec.current.z);
      }
    }
    const current = inputRef.current;

    if (current.forward !== 0 || current.right !== 0 || cameraRef?.camera) {
      sendInput(current.forward, current.right, rotY);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key === "w") inputRef.current.forward = 1;
      else if (key === "s") inputRef.current.forward = -1;
      else if (key === "a") inputRef.current.right = -1;
      else if (key === "d") inputRef.current.right = 1;
      else return;

      emitMovement();
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      if (key === "w" && inputRef.current.forward === 1) {
        inputRef.current.forward = 0;
      } else if (key === "s" && inputRef.current.forward === -1) {
        inputRef.current.forward = 0;
      } else if (key === "a" && inputRef.current.right === -1) {
        inputRef.current.right = 0;
      } else if (key === "d" && inputRef.current.right === 1) {
        inputRef.current.right = 0;
      } else {
        return;
      }

      emitMovement();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [cameraRef, sendInput]);

  useEffect(() => {
    let rafId;

    const tick = () => {
      emitMovement();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [cameraRef, sendInput]);

  return null;
}