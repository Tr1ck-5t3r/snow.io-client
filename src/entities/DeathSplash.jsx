import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT = 14;
const ANIMATION_SECONDS = 0.9;
const directions = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const angle = index * 2.399963;
  const y = ((index % 5) - 2) * 0.22;
  const horizontal = Math.sqrt(1 - y * y);
  return [Math.cos(angle) * horizontal, y, Math.sin(angle) * horizontal];
});

export default function DeathSplash() {
  const groupRef = useRef();
  const particlesRef = useRef([]);
  const startTime = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    if (startTime.current === null) startTime.current = clock.elapsedTime;

    const progress = (clock.elapsedTime - startTime.current) / ANIMATION_SECONDS;
    if (progress >= 1) {
      groupRef.current.visible = false;
      return;
    }

    const eased = 1 - (1 - progress) ** 3;
    const fade = 1 - progress;
    groupRef.current.visible = true;

    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;
      const direction = directions[index];
      particle.position.set(
        direction[0] * eased * 1.1,
        1.1 + direction[1] * eased * 1.1,
        direction[2] * eased * 1.1,
      );
      particle.scale.setScalar((0.55 + Math.sin(progress * Math.PI) * 0.7) * fade);
      particle.material.opacity = fade;
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      {directions.map((_, index) => (
        <mesh
          key={index}
          ref={(mesh) => { particlesRef.current[index] = mesh; }}
        >
          <sphereGeometry args={[0.18, 10, 8]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? '#bdeaff' : '#f4fbff'}
            transparent
            opacity={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
