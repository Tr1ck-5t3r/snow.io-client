import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';

const DECAL_OFFSET = 0.015;

export default function SnowballDecal({ decal }) {
  const materialRef = useRef();
  const normal = useMemo(
    () => new Vector3(decal.nx, decal.ny, decal.nz).normalize(),
    [decal.nx, decal.ny, decal.nz],
  );
  const rotation = useMemo(
    () => new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal),
    [normal],
  );
  const position = [
    decal.x + normal.x * DECAL_OFFSET,
    decal.y + normal.y * DECAL_OFFSET,
    decal.z + normal.z * DECAL_OFFSET,
  ];

  useFrame(() => {
    const material = materialRef.current;
    if (!material || !decal.fadeAt || !decal.expiresAt) return;
    const remainingFadeTime = Math.max(1, decal.expiresAt - decal.fadeAt);
    const progress = Math.max(0, Math.min(1, (Date.now() - decal.fadeAt) / remainingFadeTime));
    material.opacity = 1 - progress;
  });

  return (
    <mesh position={position} quaternion={rotation} renderOrder={2}>
      <circleGeometry args={[0.38, 24]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#f4fbff"
        roughness={1}
        transparent
        opacity={1}
        depthWrite={false}
      />
    </mesh>
  );
}
