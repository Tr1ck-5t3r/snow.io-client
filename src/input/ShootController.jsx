// src/input/ShootController.jsx
import { useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useInput } from '../hooks/useInput';
import { GameContext } from '../game/GameContext';
import { useCameraRef } from '../camera/CameraContext';
import { Vector2, Raycaster } from 'three';

const SNOWBALL_SPEED = 50;
const SNOWBALL_SPAWN_OFFSET = 0.5;

export default function ShootController() {
  const { mouseClick } = useInput();
  const { room } = useContext(GameContext);
  const cameraContext = useCameraRef();
  const lastShotRef = useRef(false);

  console.log('ShootController render - mouseClick:', mouseClick, 'room:', !!room, 'cameraContext:', !!cameraContext, 'camera:', !!cameraContext?.camera);

  useFrame(() => {
    // Only shoot on transition from false to true
    if (mouseClick && !lastShotRef.current) {
      lastShotRef.current = true;
      
      if (!room || !cameraContext) {
        console.log('Missing room or context');
        return;
      }

      const camera = cameraContext.camera;
      if (!camera) {
        console.log('No camera available in context');
        return;
      }

      // Use raycaster to shoot from reticle (screen center)
      const raycaster = new Raycaster();
      const screenCenter = new Vector2(0, 0);
      raycaster.setFromCamera(screenCenter, camera);

      const direction = raycaster.ray.direction.clone();
      const spawnPosition = camera.position.clone();
      spawnPosition.addScaledVector(direction, SNOWBALL_SPAWN_OFFSET);

      const velocity = direction.clone().multiplyScalar(SNOWBALL_SPEED);

      console.log('Shooting snowball from reticle', {
        position: [spawnPosition.x, spawnPosition.y, spawnPosition.z],
        velocity: [velocity.x, velocity.y, velocity.z],
        timestamp: Date.now(),
      });

      room.send('shoot', {
        position: [spawnPosition.x, spawnPosition.y, spawnPosition.z],
        velocity: [velocity.x, velocity.y, velocity.z],
        timestamp: Date.now(),
      });
    } else if (!mouseClick && lastShotRef.current) {
      lastShotRef.current = false;
    }
  });

  return null;
}
