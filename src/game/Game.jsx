import { Canvas } from "@react-three/fiber";
import { GameContext } from "./GameContext";
import Scene from "../scene/Scene";

export default function Game({ room }) {
  return (
    <GameContext.Provider value={{ room }}>
      <Canvas
        shadows
        camera={{ position: [0, 10, 10], fov: 75 }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Scene />
      </Canvas>
    </GameContext.Provider>
  );
}
