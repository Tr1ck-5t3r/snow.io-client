// src/input/MovementController.jsx
import { useEffect, useContext } from "react";
import { useInput } from "../hooks/useInput";
import { useNetwork } from "../net/useNetwork";
import { CameraContext } from "../camera/CameraContext";

export default function MovementController() {
  const { forward, right } = useInput();
  const { sendInput } = useNetwork();
  const cameraRef = useContext(CameraContext);

  useEffect(() => {
    const handleMovement = () => {
      let rotY = 0;

      // Extract the current orientation from the ThreeJS camera if available
      if (cameraRef && cameraRef.camera) {
        rotY = cameraRef.camera.rotation.y; 
      }

      // Send the movement packet if there is intentional input or looking around
      // Even if the player isn't moving, the server needs their current rotation 
      // to render their facing direction to other players.
      if (forward !== 0 || right !== 0 || cameraRef?.camera) {
        // forward: 1 / 0 / -1
        // right: 1 / 0 / -1
        // rotY: Radians describing where the camera faces
        sendInput(forward, right, rotY);
      }
    };

    // 60Hz tick matching server expectations
    const interval = setInterval(handleMovement, 1000 / 60);
    return () => clearInterval(interval);
  }, [forward, right, sendInput, cameraRef]);

  return null;
}