"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { AssetSlot, useSlot } from "@/components/v7/assets/AssetSlot";
import { collectByPrefix, swapMaterial } from "@/components/v7/assets/loader";
import { HeroTowerFallback } from "@/components/v7/assets/placeholders/HeroTowerFallback";
import { makeWindowTexture } from "../textures";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";
import type { LedMaterial } from "./ledMaterial";

/* ===== Giai đoạn 1–2 · Toàn cảnh thành phố đêm =====
   Hai slot Blender: `hero-tower` (tòa mang màn LED) và `building-kit` (5–8
   module nhà rải bằng InstancedMesh). Chưa có file → dựng khối procedural. */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Slot = { x: number; z: number; w: number; d: number; h: number; rot: number; variant: number };

/* Vùng cấm xây: quanh tòa hero và hành lang camera bay dọc trục Z */
function blocked(x: number, z: number): boolean {
  const [tx, , tz] = WORLD.heroTower.base;
  if (Math.hypot(x - tx, z - tz) < 78) return true;
  if (Math.abs(x) < 30) return true; // đại lộ
  return false;
}

function cityLayout(count: number, variants: number): Slot[] {
  const rnd = mulberry32(20051);
  const out: Slot[] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 40) {
    const x = (rnd() - 0.5) * 900;
    const z = 240 - rnd() * 820;
    if (blocked(x, z)) continue;
    /* càng xa đại lộ càng thấp — tạo phễu dẫn mắt về tòa hero */
    const near = 1 - Math.min(Math.abs(x) / 450, 1);
    const h = 12 + rnd() * rnd() * 70 * (0.45 + near);
    out.push({
      x,
      z,
      w: 9 + rnd() * 16,
      d: 9 + rnd() * 16,
      h,
      rot: rnd() < 0.14 ? Math.PI / 4 : 0,
      variant: Math.floor(rnd() * variants) % Math.max(variants, 1),
    });
  }
  return out;
}

/** Rải một hình học duy nhất bằng InstancedMesh */
function InstancedGroup({
  geometry,
  material,
  slots,
  moduleHeight,
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  slots: Slot[];
  /** >0 nghĩa là dùng model thật (pivot ở đáy) → scale đều theo chiều cao mong muốn */
  moduleHeight: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const pos = new THREE.Vector3();
    const scale = new THREE.Vector3();
    slots.forEach((s, i) => {
      q.setFromAxisAngle(up, s.rot);
      if (moduleHeight > 0) {
        const k = s.h / moduleHeight;
        pos.set(s.x, 0, s.z);
        scale.set(k, k, k);
      } else {
        pos.set(s.x, s.h / 2, s.z);
        scale.set(s.w, s.h, s.d);
      }
      m.compose(pos, q, scale);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [slots, moduleHeight]);

  return <instancedMesh ref={ref} args={[geometry, material, slots.length]} frustumCulled={false} />;
}

function BuildingKit({ count }: { count: number }) {
  const gltf = useSlot("building-kit");
  const windowTex = useMemo(() => makeWindowTexture(), []);

  const fallbackMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a1120",
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: windowTex,
        emissiveIntensity: 0.5,
        roughness: 0.9,
      }),
    [windowTex]
  );
  const fallbackGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  /* Module thật từ Blender: mọi node tên BLD_* */
  const modules = useMemo(() => {
    if (!gltf) return [];
    return collectByPrefix(gltf.scene, "BLD_").map((mesh) => {
      const box = new THREE.Box3().setFromObject(mesh);
      return {
        geometry: mesh.geometry,
        material: mesh.material as THREE.Material,
        height: Math.max(box.max.y - box.min.y, 0.001),
      };
    });
  }, [gltf]);

  const variants = Math.max(modules.length, 1);
  const slots = useMemo(() => cityLayout(count, variants), [count, variants]);

  if (modules.length === 0) {
    return <InstancedGroup geometry={fallbackGeo} material={fallbackMat} slots={slots} moduleHeight={0} />;
  }
  return (
    <>
      {modules.map((mod, i) => (
        <InstancedGroup
          key={i}
          geometry={mod.geometry}
          material={mod.material}
          slots={slots.filter((s) => s.variant === i)}
          moduleHeight={mod.height}
        />
      ))}
    </>
  );
}

export function CityLayer({
  count = 380,
  ledMaterial,
  onBlenderLed,
}: {
  count?: number;
  ledMaterial: LedMaterial;
  /** báo về Scene khi mặt LED đến từ file Blender → tắt plane dự phòng */
  onBlenderLed: (owned: boolean) => void;
}) {
  const ref = useLayerWindow(LAYER_WINDOWS.city);

  return (
    <group ref={ref}>
      {/* Mặt đất + đại lộ ướt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -200]}>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#05080f" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -180]}>
        <planeGeometry args={[34, 900]} />
        <meshStandardMaterial color="#0b1223" roughness={0.55} metalness={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -180]}>
        <planeGeometry args={[0.5, 900]} />
        <meshBasicMaterial color="#134384" toneMapped={false} />
      </mesh>

      <BuildingKit count={count} />

      {/* Slot Blender: tòa nhà chủ đạo mang màn LED */}
      <AssetSlot
        slot="hero-tower"
        position={WORLD.heroTower.base}
        fallback={<HeroTowerFallback />}
        duplicate={false}
        onReady={(root) => {
          /* Hợp đồng đặt tên: mesh mang MAT_LED_SCREEN được thay bằng shader LED */
          const swapped = swapMaterial(root, "MAT_LED_SCREEN", ledMaterial);
          onBlenderLed(swapped.length > 0);
        }}
      />
    </group>
  );
}
