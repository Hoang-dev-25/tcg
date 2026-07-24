"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* PRNG seeded — cùng seed = cùng thành phố (spec 6.3) */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Texture cửa sổ vàng ấm vẽ bằng canvas — emissive map dùng chung mọi tòa */
function makeWindowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#05070f";
  g.fillRect(0, 0, 64, 128);
  const rnd = mulberry32(7);
  for (let y = 4; y < 124; y += 8) {
    for (let x = 4; x < 60; x += 8) {
      if (rnd() < 0.42) {
        g.fillStyle = rnd() < 0.85 ? "rgba(255,183,94,0.85)" : "rgba(210,225,255,0.7)";
        g.fillRect(x, y, 4, 5);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function City({ count = 400 }: { count?: number }) {
  const { matrices, windowTex } = useMemo(() => {
    const rnd = mulberry32(20051);
    const mats: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    while (mats.length < count) {
      const x = (rnd() - 0.5) * 560;
      const z = (rnd() - 0.5) * 560 - 100;
      if (Math.abs(x) < 14) continue; // chừa đại lộ
      const h = 10 + rnd() * rnd() * 80;
      const w = 8 + rnd() * 14;
      const d = 8 + rnd() * 14;
      q.setFromAxisAngle(up, rnd() < 0.1 ? Math.PI / 4 : 0);
      m.compose(new THREE.Vector3(x, h / 2, z), q, new THREE.Vector3(w, h, d));
      mats.push(m.clone());
    }
    return { matrices: mats, windowTex: makeWindowTexture() };
  }, [count]);

  return (
    <group>
      {/* Tòa nhà — MỘT InstancedMesh (spec 6.3) */}
      <instancedMesh
        args={[undefined, undefined, matrices.length]}
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((mat, i) => mesh.setMatrixAt(i, mat));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0a1226"
          emissive="#ffffff"
          emissiveMap={windowTex}
          emissiveIntensity={0.55}
          roughness={0.9}
        />
      </instancedMesh>

      {/* Mặt đất */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#050a18" roughness={1} />
      </mesh>

      {/* Đại lộ — dải sáng hơn nền một chút, chạy tới hết con đường 20 năm */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -80]}>
        <planeGeometry args={[24, 900]} />
        <meshStandardMaterial color="#0b1430" roughness={0.85} />
      </mesh>
      {/* Vạch tim đường phát sáng mờ — vệt dẫn mắt cho cú bay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -80]}>
        <planeGeometry args={[0.6, 900]} />
        <meshBasicMaterial color="#1d3a6e" />
      </mesh>
    </group>
  );
}
