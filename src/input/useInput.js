// src/input/useInput.js
import { useState, useEffect } from "react";

export function useInput() {
  const [input, setInput] = useState({ forward: 0, right: 0, rotY: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setInput((prev) => {
        const copy = { ...prev };
        if (e.key === "w") copy.forward = 1;
        if (e.key === "s") copy.forward = -1;
        if (e.key === "a") copy.right = -1;
        if (e.key === "d") copy.right = 1;
        return copy;
      });
    };

    const handleKeyUp = (e) => {
      setInput((prev) => {
        const copy = { ...prev };
        if (e.key === "w" || e.key === "s") copy.forward = 0;
        if (e.key === "a" || e.key === "d") copy.right = 0;
        return copy;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return input;
}
