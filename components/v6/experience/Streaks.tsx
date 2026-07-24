"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "./progress";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Cường độ 0→1→0 trong cửa sổ [a,b] */
function windowPulse(p: number, a: number, b: number): number {
  if (p <= a || p >= b) return 0;
  return Math.sin(((p - a) / (b - a)) * Math.PI);
}

/* Vệt dọc hành lang hạ độ cao (0.06–0.16): hộp mảnh kéo dài theo trục bay */
export function Streaks({ count = 90 }: { count?: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const matrices = useMemo(() => {
    const rnd = mulberry32(88);
    const m: THREE.Matrix4[] = [];
    const tmp = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      /* rải trong ống dọc đường hạ cánh: từ (120,300,260) về (0,10,-20) */
      const u = rnd();
      const cx = 120 * (1 - u) + (rnd() - 0.5) * 90;
      const cy = 300 * (1 - u) + 12 + (rnd() - 0.5) * 60;
      const cz = 260 * (1 - u) - 20 * u + (rnd() - 0.5) * 90;
      tmp.makeTranslation(cx, cy, cz);
      m.push(tmp.clone());
    }
    return m;
  }, [count]);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = windowPulse(scrollState.progress, 0.06, 0.16) * 0.5;
  });

  return (
    <instancedMesh
      args={[undefined, undefined, matrices.length]}
      ref={(mesh) => {
        if (!mesh) return;
        matrices.forEach((mat, i) => mesh.setMatrixAt(i, mat));
        mesh.instanceMatrix.needsUpdate = true;
      }}
    >
      {/* hộp rất mảnh, kéo dài chéo theo hướng bay xuống */}
      <boxGeometry args={[0.12, 14, 0.12]} />
      <meshBasicMaterial
        ref={matRef}
        color="#7dd3fc"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/* Bụi sao thưa — CHỈ hiện trong cú dolly-out 0.70–0.86 (spec mục 5) */
export function MapDust({ count = 500 }: { count?: number }) {
  const matRef = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const rnd = mulberry32(404);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 3600 + 120;
      arr[i * 3 + 1] = 300 + rnd() * 1800;
      arr[i * 3 + 2] = (rnd() - 0.5) * 3600 - 1100;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = windowPulse(scrollState.progress, 0.70, 0.86) * 0.7;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} color="#9fc8ff" size={4} sizeAttenuation transparent opacity={0} depthWrite={false} />
    </points>
  );
}
