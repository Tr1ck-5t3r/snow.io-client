import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useInput } from "../hooks/useInput";
import { useNetwork } from "../net/useNetwork";

// this component must live inside the <Canvas> so it has access to the camera
export default function MovementController() {
  const { forward, right } = useInput();
  const { sendInput, predictMovement } = useNetwork();
  const { camera } = useThree();

  // every frame we send the current axis values along with the camera yaw
  // sending zero values ensures the server can clear movement immediately when we stop
  useFrame(() => {
    // compute yaw from camera forward vector (pointer lock controls update quaternion, not rotation)
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const yaw = Math.atan2(dir.x, -dir.z); // 0 when looking toward -Z

    const input = { forward, right, rotY: yaw };
    sendInput(input);
    predictMovement(input);
  });

  return null; // This component doesn't render anything
}