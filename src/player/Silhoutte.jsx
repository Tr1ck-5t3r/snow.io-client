import { forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

// lightweight translucent silhouette for the local player
const Silhouette = forwardRef(({ position = [0, 0, 0], rotationY = 0 }, ref) => {
  const temp = new Vector3();

  useFrame(() => {
    if (ref?.current) {
      ref.current.rotation.y = rotationY;
      temp.set(position[0], position[1], position[2]);
      ref.current.position.lerp(temp, 0.25);
    }
  });

  return (
    <group ref={ref} position={position}>
    </group>
  );
});

export default Silhouette;
