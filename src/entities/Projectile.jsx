// src/entities/Projectile.jsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const PROJECTILE_RADIUS = 0.8;

export default function Projectile({
 position = [0, 0, 0],
 initialPosition = position,
 velocity = [0, 0, 0],
 id,
 onOutOfRange = () => {},
}) {
 const meshRef = useRef();
 const currentPosition = position.length === 3 ? position : initialPosition;

 useEffect(() => {
   if (meshRef.current) {
     meshRef.current.position.set(currentPosition[0], currentPosition[1], currentPosition[2]);
   }
 }, [currentPosition, id]);

 useFrame(() => {
   if (!meshRef.current) return;
   meshRef.current.position.set(currentPosition[0], currentPosition[1], currentPosition[2]);
 });

 return (
   <mesh ref={meshRef} position={currentPosition} castShadow receiveShadow>
     <sphereGeometry args={[PROJECTILE_RADIUS, 16, 16]} />
     <meshStandardMaterial
       color="#ff0000"
       emissive="#ff0000"
       emissiveIntensity={1.5}
       metalness={0.1}
       roughness={0.4}
     />
   </mesh>
 );
}
