// src/scene/Scene.jsx
import Snowman from '../player/Snowman';
import FPSCamera from '../camera/FPSCamera';
import Walls from '../world/Walls';
import { useNetwork } from '../net/useNetwork';
import Ground from '../world/Ground';
import ShootController from '../input/ShootController';
import Projectile from '../entities/Projectile';
import { useGame } from '../game/GameContext';
import { SNOWMAN_BASE_Y } from '../config/constants';
import { CameraContext } from '../camera/CameraContext';
import { useRef } from 'react';

export default function Scene() {
  const { players, projectiles } = useNetwork();
  const { sessionId } = useGame();

  // Create camera context value
  const cameraContextValue = useRef({ camera: null });

  // Get player's snowman position for camera following
  const playerData = players[sessionId];
  const playerPos = playerData ? [playerData.x, SNOWMAN_BASE_Y, playerData.z] : [0, 0, 0];

  // Debug logging
  if (Object.keys(projectiles).length > 0) {
    console.log('Projectiles in scene:', Object.keys(projectiles).length, projectiles);
  }

  return (
    <CameraContext.Provider value={cameraContextValue.current}>
      {/* FPS Camera - follows player's position */}
      <FPSCamera playerPosition={playerPos} />

      {/* Shooting controller */}
      <ShootController />

      {/* Lights - increased intensity */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      <Walls />
      <Ground />

      {/* Players - exclude current player's snowman from render */}
      {Object.entries(players).map(([id, player]) => {
        if (id === sessionId) return null; // Don't render own snowman
        return (
          <Snowman
            key={id}
            position={[player.x, SNOWMAN_BASE_Y, player.z]}
            rotationY={player.rotationY}
          />
        );
      })}

      {/* Projectiles */}
      {Object.entries(projectiles).length === 0 ? (
        <></>
      ) : (
        Object.entries(projectiles).map(([id, projectile]) => (
          <Projectile
            key={id}
            id={id}
            initialPosition={[projectile.x, projectile.y, projectile.z]}
            velocity={[projectile.vx, projectile.vy, projectile.vz]}
          />
        ))
      )}
    </CameraContext.Provider>
  );
}
