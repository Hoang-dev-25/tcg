"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { seedReports } from "@/components/v7/assets/loader";
import { CameraRig } from "./CameraRig";
import { V7Effects } from "./Effects";
import { CityLayer } from "./layers/CityLayer";
import { DataSpaceLayer } from "./layers/DataSpaceLayer";
import { createLedMaterial } from "./layers/ledMaterial";
import { LedWallLayer } from "./layers/LedWallLayer";
import { MapLayer } from "./layers/MapLayer";
import { OfficeLayer } from "./layers/OfficeLayer";
import { ServiceLayer } from "./layers/ServiceLayer";
import { SkyLayer } from "./layers/SkyLayer";
import { TrafficLayer } from "./layers/TrafficLayer";
import { scrollState } from "./progress";
import { makeLedContentTexture } from "./textures";
import { useQuality } from "./useQuality";

/* Đo FPS thật, báo về useQuality mỗi giây */
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

/* Màu nền + sương mù chuyển tông theo giai đoạn — mắt thấy "đổi không gian"
   mà không hề có cú cắt cảnh nào. */
const TONES: Array<[number, string]> = [
  [0.0, "#060b18"], // thành phố đêm
  [0.34, "#080a20"], // vừa xuyên vào dữ liệu
  [0.46, "#0a0722"], // lõi dữ liệu, ngả tím
  [0.58, "#05080f"], // ra ngoài khu dịch vụ
  [0.78, "#04070f"], // sa bàn
  [0.93, "#050912"], // văn phòng
];

function Atmosphere() {
  const scene = useThree((s) => s.scene);
  const a = useMemo(() => new THREE.Color(), []);
  const b = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    const p = scrollState.current;
    let i = 0;
    for (let k = 0; k < TONES.length - 1; k++) if (p >= TONES[k][0]) i = k;
    const [t0, c0] = TONES[i];
    const [t1, c1] = TONES[Math.min(i + 1, TONES.length - 1)];
    const u = t1 === t0 ? 0 : THREE.MathUtils.clamp((p - t0) / (t1 - t0), 0, 1);
    a.set(c0).lerp(b.set(c1), u);
    (scene.background as THREE.Color)?.copy(a);
    scene.fog?.color.copy(a);
  });
  return null;
}

export default function Scene() {
  const { tier, mobile, reduced, reportFps } = useQuality();
  const [ledFromBlender, setLedFromBlender] = useState(false);

  /* Nội dung chạy trên mặt LED + shader dùng CHUNG cho plane dự phòng và
     cho mesh LED_SCREEN trong file Blender (nếu có) */
  const ledTexture = useMemo(() => makeLedContentTexture(), []);
  const ledMaterial = useMemo(() => createLedMaterial(ledTexture), [ledTexture]);

  useEffect(() => {
    seedReports();
    return () => {
      ledMaterial.dispose();
      ledTexture.dispose();
    };
  }, [ledMaterial, ledTexture]);

  return (
    <Canvas
      dpr={tier === 0 ? 1 : [1, mobile ? 1.5 : 1.9]}
      gl={{ antialias: tier === 2, powerPreference: "high-performance" }}
      camera={{ fov: 46, near: 0.5, far: 6000, position: [34, 118, 214] }}
    >
      <color attach="background" args={["#060b18"]} />
      <fog attach="fog" args={["#060b18", 120, 1200]} />
      <ambientLight intensity={0.34} />
      <directionalLight position={[220, 420, 140]} intensity={0.45} color="#57a3ff" />
      <directionalLight position={[-260, 180, -600]} intensity={0.3} color="#a78bfa" />

      <Atmosphere />

      <SkyLayer dust={mobile ? 160 : 420} />
      <CityLayer
        count={mobile ? 160 : 380}
        ledMaterial={ledMaterial}
        onBlenderLed={setLedFromBlender}
      />
      {!reduced && <TrafficLayer count={mobile ? 36 : 90} />}
      <LedWallLayer material={ledMaterial} hidden={ledFromBlender} />
      <DataSpaceLayer light={mobile || tier === 0} />
      <ServiceLayer />
      <MapLayer />
      <OfficeLayer />

      <CameraRig reduced={reduced} />
      <FpsProbe report={reportFps} />
      <V7Effects enabled={tier === 2 && !mobile && !reduced} />
    </Canvas>
  );
}
