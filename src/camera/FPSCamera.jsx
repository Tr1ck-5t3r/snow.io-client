// src/camera/FPSCamera.jsx
import { useRef, useEffect, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { CameraContext } from './CameraContext';
import { SNOWMAN_HEAD_HEIGHT } from '../config/constants';

export default function FPSCamera({ playerPosition = [0, 0, 0], offset = [0, SNOWMAN_HEAD_HEIGHT, 0] }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const cameraContextValue = useContext(CameraContext);
  const targetPosition = useRef(new Vector3());

  useFrame((_, delta) => {
    if (playerPosition) {
      targetPosition.current.set(
        playerPosition[0] + offset[0],
        playerPosition[1] + offset[1],
        playerPosition[2] + offset[2]
      );
      const smoothing = 1 - Math.exp(-18 * delta);
      camera.position.lerp(targetPosition.current, smoothing);

      const dir = new Vector3();
      camera.getWorldDirection(dir);
    }
  });

  // Update camera in context
  useEffect(() => {
    if (cameraContextValue) {
      cameraContextValue.camera = camera;
      console.log('Updated camera in context');
    }
  }, [camera, cameraContextValue]);

  return <PointerLockControls ref={controlsRef} />;
}
