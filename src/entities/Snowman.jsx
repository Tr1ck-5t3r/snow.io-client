// src/player/Snowman.jsx
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { SNOWMAN_HEAD_HEIGHT, SNOWMAN_SCALE } from "../config/constants";
import DeathSplash from "./DeathSplash";

const Snowman = forwardRef(({
  position = [0, 0, 0],
  rotationY = 0,
  accentColor = '#54c7ec',
  health = 50,
  maxHealth = 50,
  name = "Snowman",
}, forwardedRef) => {
  const groupRef = useRef();
  const targetPosition = useRef(position);
  const initialized = useRef(false);
  const previousHealth = useRef(health);
  const [deathSplashKey, setDeathSplashKey] = useState(0);

  useEffect(() => {
    targetPosition.current = position;
  }, [position]);

  useEffect(() => {
    if (previousHealth.current > 0 && health <= 0) {
      setDeathSplashKey((key) => key + 1);
    }
    if (previousHealth.current <= 0 && health > 0 && groupRef.current) {
      groupRef.current.position.set(...position);
    }
    previousHealth.current = health;
  }, [health, position]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!initialized.current) {
      groupRef.current.position.set(...targetPosition.current);
      initialized.current = true;
    }

    const smoothing = 1 - Math.exp(-30 * delta);
    groupRef.current.position.x +=
      (targetPosition.current[0] - groupRef.current.position.x) * smoothing;
    groupRef.current.position.y +=
      (targetPosition.current[1] - groupRef.current.position.y) * smoothing;
    groupRef.current.position.z +=
      (targetPosition.current[2] - groupRef.current.position.z) * smoothing;
    groupRef.current.rotation.y = rotationY;

    if (forwardedRef) {
      forwardedRef.current = groupRef.current;
    }
  });

  return (
    <group ref={groupRef} scale={SNOWMAN_SCALE}>
      {health <= 0 ? (deathSplashKey > 0 && <DeathSplash key={deathSplashKey} />) : <>
      <Html position={[0, 2.45, 0]} center distanceFactor={12} zIndexRange={[20, 0]}>
        <div style={{
          marginBottom: 4,
          color: '#fff',
          font: '600 12px/1.2 system-ui, sans-serif',
          textShadow: '0 1px 3px #000, 0 0 5px #000',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>{name}</div>
        <div style={{
          width: 68,
          height: 8,
          padding: 2,
          borderRadius: 6,
          background: 'rgba(10, 20, 30, 0.78)',
          border: '1px solid rgba(225, 240, 255, 0.75)',
          boxSizing: 'content-box',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: `${Math.max(0, Math.min(100, (health / Math.max(1, maxHealth)) * 100))}%`,
            height: '100%',
            borderRadius: 4,
            background: health > maxHealth / 2 ? '#70e29a' : health > 0 ? '#ffd166' : '#ef5350',
            transition: 'width 160ms ease-out',
          }} />
        </div>
      </Html>
      {/* Bottom snowball */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 20, 14]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Middle snowball */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.35, 16, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Head */}
      <mesh position={[0, SNOWMAN_HEAD_HEIGHT, 0]}>
        <sphereGeometry args={[0.25, 16, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.91, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.07, 6, 20]} />
        <meshStandardMaterial color={accentColor} roughness={0.7} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.07, SNOWMAN_HEAD_HEIGHT + 0.05, 0.22]}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.07, SNOWMAN_HEAD_HEIGHT + 0.05, 0.22]}>
        <sphereGeometry args={[0.03, 8, 6]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Carrot nose */}
      <mesh position={[0, SNOWMAN_HEAD_HEIGHT, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.055, 0.22, 8]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      </>}
    </group>
  );
});

export default Snowman;
