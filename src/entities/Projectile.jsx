// src/entities/Projectile.jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const GRAVITY = 0.1;
const MAX_RANGE = 200;
const PROJECTILE_RADIUS = 0.35;

export default function Projectile({ 
  initialPosition = [0, 0, 0], 
  velocity = [0, 0, 0],
  id,
  onOutOfRange = () => {}
}) {
  const meshRef = useRef();
  const posRef = useRef(new Vector3(initialPosition[0], initialPosition[1], initialPosition[2]));
  const velRef = useRef(new Vector3(velocity[0], velocity[1], velocity[2]));
  const originRef = useRef(new Vector3(initialPosition[0], initialPosition[1], initialPosition[2]));

  useEffect(() => {
    console.log('Projectile mounted:', id, initialPosition, velocity);
    if (meshRef.current) {
      meshRef.current.position.copy(posRef.current);
    }
  }, [id, initialPosition, velocity]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const pos = posRef.current;
    const vel = velRef.current;

    // Apply gravity
    vel.y -= GRAVITY * delta;

    // Update position
    pos.x += vel.x * delta;
    pos.y += vel.y * delta;
    pos.z += vel.z * delta;

    // Update mesh to new position
    meshRef.current.position.copy(pos);

    // Check if out of range
    const distanceFromOrigin = pos.distanceTo(originRef.current);
    if (distanceFromOrigin > MAX_RANGE) {
      onOutOfRange(id);
    }
  });

  return (
    <mesh ref={meshRef} position={initialPosition} castShadow receiveShadow>
      <sphereGeometry args={[PROJECTILE_RADIUS, 16, 16]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#ffffff"
        emissiveIntensity={0.5}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  );
}
