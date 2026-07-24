"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Billboards } from "./Billboards";
import { CameraRig } from "./CameraRig";
import { City } from "./City";
import { V6Effects } from "./Effects";
import { MapDust, Streaks } from "./Streaks";
import { useQuality } from "./useQuality";
import { VietnamLights } from "./VietnamLights";

/* Đo FPS thật, báo về useQuality mỗi giây (spec 6.6 — không đoán theo UA) */
function FpsProbe({ report }: { report: (fps: number) => void }) {
  const frames = useRef(0);
  const last = useRef(0);
  useFrame(({ clock }) => {
    frames.current += 1;
    const t = clock.elapsedTime;
    if (t - last.current >= 1) {
      report(frames.current / (t - last.current));
      frames.current = 0;
      last.current = t;
    }
  });
  return null;
}

export default function Scene() {
  const { tier, mobile, reduced, reportFps } = useQuality();

  return (
    <Canvas
      dpr={tier === 0 ? 1 : [1, 1.75]}
      camera={{ fov: 55, near: 0.5, far: 6000, position: [120, 300, 260] }}
    >
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 120, 900]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[200, 400, 100]} intensity={0.35} color="#8fb4ff" />

      <City count={mobile ? 150 : 400} />
      <Billboards />
      <VietnamLights />
      {!reduced && <Streaks count={mobile ? 40 : 90} />}
      {!reduced && <MapDust count={mobile ? 200 : 500} />}

      <CameraRig reduced={reduced} />
      <FpsProbe report={reportFps} />
      <V6Effects enabled={tier === 2 && !mobile && !reduced} />
    </Canvas>
  );
}
