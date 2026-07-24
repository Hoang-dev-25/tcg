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

/* Vùng cấm xây quanh các vật thể hero (x, z, bán kính) — nhà không chèn biển */
const KEEPOUT: Array<[number, number, number]> = [
  [14, -40, 30],   // billboard hero
  [-22, -85, 26],  // pano + tòa chủ
  [13, -125, 26],  // màn LED cong
  [0, -20, 42],    // màn LED liên hệ F6
];
function blocked(x: number, z: number): boolean {
  for (const [kx, kz, r] of KEEPOUT) {
    if (Math.hypot(x - kx, z - kz) < r) return true;
  }
  /* hành lang biển năm dọc con đường 20 năm */
  if (Math.abs(x) < 26 && z < -190 && z > -440) return true;
  return false;
}

/* Texture cửa sổ — họ màu lạnh theo design system (không màu nóng).
   256×512 đủ nét khi camera bay sát. */
function makeWindowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#060a13";
  g.fillRect(0, 0, 256, 512);
  const rnd = mulberry32(7);
  for (let y = 10; y < 500; y += 16) {
    for (let x = 8; x < 246; x += 13) {
      if (rnd() < 0.36) {
        const r = rnd();
        /* trắng xanh D6E9FF là chủ đạo, điểm xuyết v2blue-300 */
        g.fillStyle =
          r < 0.68 ? "rgba(214,233,255,0.85)" : r < 0.9 ? "rgba(123,184,255,0.8)" : "rgba(255,255,255,0.95)";
        g.fillRect(x, y, 7, 9);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function City({ count = 400 }: { count?: number }) {
  const { matrices, windowTex } = useMemo(() => {
    const rnd = mulberry32(20051);
    const mats: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    let guard = 0;
    while (mats.length < count && guard++ < count * 40) {
      const x = (rnd() - 0.5) * 560;
      const z = (rnd() - 0.5) * 560 - 100;
      if (Math.abs(x) < 14) continue; // chừa đại lộ
      if (blocked(x, z)) continue;    // chừa chỗ cho biển hero
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
          color="#0a1120"
          emissive="#ffffff"
          emissiveMap={windowTex}
          emissiveIntensity={0.5}
          roughness={0.9}
        />
      </instancedMesh>

      {/* Mặt đất */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#070d1a" roughness={1} />
      </mesh>

      {/* Đại lộ — dải sáng hơn nền một chút, chạy tới hết con đường 20 năm */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -80]}>
        <planeGeometry args={[24, 900]} />
        <meshStandardMaterial color="#0d1527" roughness={0.85} />
      </mesh>
      {/* Vạch tim đường — v2blue-800, dẫn mắt không chói */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -80]}>
        <planeGeometry args={[0.6, 900]} />
        <meshBasicMaterial color="#134384" />
      </mesh>
    </group>
  );
}
