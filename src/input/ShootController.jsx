// src/input/ShootController.jsx
import { useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useInput } from '../hooks/useInput';
import { GameContext } from '../game/GameContext';
import { useCameraRef } from '../camera/CameraContext';
import { Vector2, Raycaster, Vector3 } from 'three';
import { SNOWMAN_HEAD_HEIGHT } from '../config/constants';

const SNOWBALL_SPEED = 50;
const SNOWBALL_SPAWN_OFFSET = 0.5;
const SHOT_COOLDOWN_MS = 250;

export default function ShootController() {
  const { mouseClick } = useInput();
  const { room, sessionId } = useContext(GameContext);
  const cameraContext = useCameraRef();
  const lastShotRef = useRef(false);
  const lastShotTimeRef = useRef(0);

  useFrame(() => {
    if (mouseClick && !lastShotRef.current) {
      lastShotRef.current = true;

      if (!room || !cameraContext) {
        return;
      }

      const camera = cameraContext.camera;
      if (!camera) {
        return;
      }

      const now = Date.now();
      if (now - lastShotTimeRef.current < SHOT_COOLDOWN_MS) {
        return;
      }

      const raycaster = new Raycaster();
      const screenCenter = new Vector2(0, 0);
      raycaster.setFromCamera(screenCenter, camera);

      const direction = raycaster.ray.direction.clone();
      const playerState = room.state?.players?.get?.(sessionId);
      const playerOrigin = playerState
        ? new Vector3(playerState.x, playerState.y + SNOWMAN_HEAD_HEIGHT, playerState.z)
        : camera.position.clone();

      const spawnPosition = playerOrigin.clone();
      spawnPosition.addScaledVector(direction, SNOWBALL_SPAWN_OFFSET);
      const velocity = direction.clone().multiplyScalar(SNOWBALL_SPEED);

      room.send('shoot', {
        position: [spawnPosition.x, spawnPosition.y, spawnPosition.z],
        velocity: [velocity.x, velocity.y, velocity.z],
        timestamp: now,
      });

      lastShotTimeRef.current = now;
    } else if (!mouseClick && lastShotRef.current) {
      lastShotRef.current = false;
    }
  });

  return null;
}
