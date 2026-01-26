import { useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { useNetwork } from "../net/useNetwork";

export default function MovementController({ speed = 0.1 }) {
  const { forward, right, rotY } = useInput();
  const { sendInput } = useNetwork();

  useEffect(() => {
    const handleMovement = () => {
      const dx = right * speed;
      const dz = forward * speed;

      // Only send input to server if there is movement
      if (dx !== 0 || dz !== 0 || rotY !== 0) {
        sendInput(dx, dz, rotY);
      }
    };

    const interval = setInterval(handleMovement, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [forward, right, rotY, sendInput, speed]);

  return null; // This component doesn't render anything
}