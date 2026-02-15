// src/scene/Scene.jsx
import { Suspense, useRef } from "react";
import Snowman from "../player/Snowman";
import Silhoutte from "../player/Silhoutte";
import FPSCamera from "../camera/FPSCamera";
import Walls from "../world/Walls";
import { useNetwork } from "../net/useNetwork";
import { useGame } from "../game/GameContext";
import MovementController from "../input/MovementController";
import Ground from "../world/Ground";

export default function Scene() {
  const { players } = useNetwork();
  const { room } = useGame();
  const selfRef = useRef();

  const localId = room?.sessionId;

  return (
    <>
      {/* movement handling must live inside the canvas */}
      <MovementController />

      {/* FPS Camera follows our snowman */}
      <FPSCamera snowmanRef={selfRef} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Walls />
      <Ground />

      {/* Players */}
      {Object.values(players).map((player) => {
        const isLocal = player.sessionId === localId;
        return isLocal ? (
          <Silhoutte
            key={player.sessionId}
            ref={selfRef}
            position={[player.x, 0, player.z]}
            rotationY={player.rotationY}
          />
        ) : (
          <Snowman
            key={player.sessionId}
            position={[player.x, 0, player.z]}
            rotationY={player.rotationY}
          />
        );
      })}
    </>
  );
}
