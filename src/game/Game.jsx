import { Canvas } from '@react-three/fiber';
import { GameContext } from './GameContext';
import Scene from '../scene/Scene';
import Reticle from '../ui/Reticle';
import MovementController from '../input/MovementController';

export default function Game({ room }) {
  console.log('Game component mounted with room:', room?.sessionId);
  return (
    <GameContext.Provider value={{ room, sessionId: room?.sessionId }}>
      <Reticle />
      <MovementController />
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Scene />
      </Canvas>
    </GameContext.Provider>
  );
}
