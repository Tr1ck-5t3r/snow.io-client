export default function Walls() {
  const wallHeight = 2;
  const wallThickness = 1;
  const size = 50;

  return (
    <>
      {/* Front & Back */}
      <mesh position={[0, wallHeight / 2, -size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, wallHeight / 2, size / 2]}>
        <boxGeometry args={[size, wallHeight, wallThickness]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left & Right */}
      <mesh position={[-size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[size / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, size]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
}
