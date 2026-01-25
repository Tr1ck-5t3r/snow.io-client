// src/input/useInput.js
import { useState, useEffect, useCallback } from "react";

export function useInput() {
  const [input, setInput] = useState({ forward: 0, right: 0, rotY: 0 });

  const updateInput = useCallback(
    (key, value) => {
      setInput((prev) => {
        const copy = { ...prev };
        switch (key) {
          case "w":
            copy.forward = value;
            break;
          case "s":
            copy.forward = -value;
            break;
          case "a":
            copy.right = -value;
            break;
          case "d":
            copy.right = value;
            break;
          default:
            break;
        }
        return {
          forward: isNaN(copy.forward) ? 0 : copy.forward,
          right: isNaN(copy.right) ? 0 : copy.right,
          rotY: isNaN(copy.rotY) ? 0 : copy.rotY,
        };
      });
    },
    [] // Dependency array
  );

  useEffect(() => {
    const handleKeyDown = (e) => updateInput(e.key, 1);
    const handleKeyUp = (e) => updateInput(e.key, 0);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [updateInput]);

  return input;
}
