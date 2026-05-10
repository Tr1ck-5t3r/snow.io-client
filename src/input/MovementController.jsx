import { useEffect } from "react";
import { useInput } from "../hooks/useInput";
import { useNetwork } from "../net/useNetwork";

export default function MovementController({ speed = 0.1 }) {
  const { forward, right, rotY } = useInput();
  const { sendInput } = useNetwork();

  useEffect(() => {
    const handleMovement = () => {
      // Send semantic input values (forward/right) directly
      // Speed is applied server-side for consistency
      if (forward !== 0 || right !== 0 || rotY !== 0) {
        sendInput(forward, right, rotY);
      }
    };

    const interval = setInterval(handleMovement, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, [forward, right, rotY, sendInput, speed]);

  return null; // This component doesn't render anything
}