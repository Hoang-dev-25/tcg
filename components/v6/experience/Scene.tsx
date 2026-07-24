"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 55, near: 0.5, far: 6000, position: [120, 300, 260] }}>
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 120, 900]} />
      <ambientLight intensity={0.25} />
      <mesh>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
      </mesh>
    </Canvas>
  );
}
