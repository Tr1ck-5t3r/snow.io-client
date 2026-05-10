// Moved from input/useInput.js
import { useState, useEffect } from 'react';

export function useInput() {
  const [input, setInput] = useState({ forward: 0, right: 0, rotY: 0, mouseClick: false });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setInput((prev) => {
        const copy = { ...prev };
        if (e.key === 'w') copy.forward = 1;
        if (e.key === 's') copy.forward = -1;
        if (e.key === 'a') copy.right = -1;
        if (e.key === 'd') copy.right = 1;
        return {
          forward: isNaN(copy.forward) ? 0 : copy.forward,
          right: isNaN(copy.right) ? 0 : copy.right,
          rotY: isNaN(copy.rotY) ? 0 : copy.rotY,
          mouseClick: prev.mouseClick,
        };
      });
    };

    const handleKeyUp = (e) => {
      setInput((prev) => {
        const copy = { ...prev };
        if (e.key === 'w' || e.key === 's') copy.forward = 0;
        if (e.key === 'a' || e.key === 'd') copy.right = 0;
        return {
          forward: isNaN(copy.forward) ? 0 : copy.forward,
          right: isNaN(copy.right) ? 0 : copy.right,
          rotY: isNaN(copy.rotY) ? 0 : copy.rotY,
          mouseClick: prev.mouseClick,
        };
      });
    };

    const handleMouseDown = (e) => {
      console.log('Mouse down detected, button:', e.button);
      if (e.button === 0) { // Left mouse button
        console.log('Setting mouseClick to true');
        setInput((prev) => ({
          ...prev,
          mouseClick: true,
        }));
      }
    };

    const handleMouseUp = (e) => {
      console.log('Mouse up detected, button:', e.button);
      if (e.button === 0) {
        console.log('Setting mouseClick to false');
        setInput((prev) => ({
          ...prev,
          mouseClick: false,
        }));
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return input;
}