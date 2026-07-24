"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "./progress";
import { sampleCamera, type CameraSample } from "./cameraPath";

/* Tâm các đoạn hold — reduced-motion nhảy giữa các pose tĩnh này (spec 6.6) */
const HOLD_CENTERS = [0.03, 0.185, 0.255, 0.315, 0.48, 0.66, 0.82, 0.96];

export function CameraRig({ reduced = false }: { reduced?: boolean }) {
  const scene = useThree((s) => s.scene);
  const smoothed = useRef(0);
  const sample = useRef<CameraSample>({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    fov: 55,
    roll: 0,
  });

  useFrame(({ camera }, dt) => {
    let p = scrollState.progress;
    if (reduced) {
      /* nhảy giữa các pose tĩnh — không tween camera */
      p = HOLD_CENTERS.reduce((best, c) => (Math.abs(c - p) < Math.abs(best - p) ? c : best));
      smoothed.current = p;
    } else {
      /* Damping lũy thừa: lọc mọi cú giật của con lăn + góc gãy giữa các
         keyframe — camera luôn tới đích êm, độc lập tốc độ khung hình */
      const k = 1 - Math.exp(-Math.min(dt, 0.05) * 4.2);
      smoothed.current += (p - smoothed.current) * k;
      p = smoothed.current;
    }
    const s = sample.current;
    sampleCamera(p, s);
    camera.position.copy(s.pos);
    camera.lookAt(s.look);
    if (s.roll !== 0) camera.rotateZ(s.roll);
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - s.fov) > 0.01) {
      cam.fov = s.fov;
      cam.updateProjectionMatrix();
    }
    /* Fog nới xa dần theo độ cao camera — để cảnh bản đồ không bị sương nuốt */
    const fog = scene.fog as THREE.Fog | null;
    if (fog) fog.far = THREE.MathUtils.clamp(900 + s.pos.y * 2.2, 900, 7000);
  });

  return null;
}
