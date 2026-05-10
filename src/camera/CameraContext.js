// src/camera/CameraContext.js
import { createContext, useContext } from 'react';

export const CameraContext = createContext({ camera: null });

export function useCameraRef() {
  const context = useContext(CameraContext);
  return context;
}
