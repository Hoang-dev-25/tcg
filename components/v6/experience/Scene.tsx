"use client";

import { Canvas } from "@react-three/fiber";

import { City } from "./City";
import { Billboards } from "./Billboards";
import { CameraRig } from "./CameraRig";

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 55, near: 0.5, far: 6000, position: [120, 300, 260] }}>
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 120, 900]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[200, 400, 100]} intensity={0.35} color="#8fb4ff" />
      <City count={400} />
      <Billboards />
      <CameraRig />
    </Canvas>
  );
}
