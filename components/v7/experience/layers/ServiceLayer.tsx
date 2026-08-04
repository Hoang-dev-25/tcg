"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { AssetSlot } from "@/components/v7/assets/AssetSlot";
import { swapMaterial } from "@/components/v7/assets/loader";
import {
  BillboardFallback,
  LedCabinetFallback,
  PanoFallback,
} from "@/components/v7/assets/placeholders/ProductFallbacks";
import { SERVICES } from "@/components/v7/data";
import { makeBoardTexture, makeGlowTexture, PALETTE } from "../textures";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";

/* ===== Giai đoạn 4 · Tia sáng bắn ra, nở thành 3 module dịch vụ =====
   Ba slot Blender sản phẩm thật: billboard / pano / led-cabinet.
   Tia sáng KHÔNG dựng Blender: CatmullRom curve + TubeGeometry, hiện dần bằng
   shader theo progress. */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

const rayVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const rayFrag = /* glsl */ `
  uniform float uReveal;   // 0 → 1: đầu tia chạy từ lõi tới đích
  uniform float uTime;
  uniform vec3  uColor;
  varying vec2 vUv;
  void main() {
    float head = uReveal;
    float body = smoothstep(head, head - 0.55, vUv.x);      // đuôi mờ dần
    float tip  = smoothstep(head - 0.06, head, vUv.x) * (1.0 - step(head, vUv.x));
    float pulse = 0.55 + 0.45 * sin(vUv.x * 60.0 - uTime * 7.0);
    float a = (body * 0.42 * pulse + tip * 1.6) * step(vUv.x, head);
    gl_FragColor = vec4(uColor * (0.7 + tip * 2.2), a);
  }
`;

function Ray({ to, color }: { to: [number, number, number]; color: string }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const geo = useMemo(() => {
    const from = new THREE.Vector3(...(WORLD.dataSpace.core as unknown as [number, number, number]));
    const end = new THREE.Vector3(...to);
    const mid1 = from.clone().lerp(end, 0.34).add(new THREE.Vector3(0, 46, 0));
    const mid2 = from.clone().lerp(end, 0.72).add(new THREE.Vector3(end.x * 0.16, 12, 0));
    const curve = new THREE.CatmullRomCurve3([from, mid1, mid2, end]);
    return new THREE.TubeGeometry(curve, 120, 0.5, 8, false);
  }, [to]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        vertexShader={rayVert}
        fragmentShader={rayFrag}
        uniforms={{
          uReveal: { value: 0 },
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(color) },
        }}
      />
    </mesh>
  );
}

/** Vòng sáng dưới chân mỗi module — "nở ra" khi tia chạm tới */
function Pad({ position, color }: { position: [number, number, number]; color: string }) {
  const glow = useMemo(() => makeGlowTexture(color, 0.5), [color]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[position[0], 0.06, position[2]]}>
      <planeGeometry args={[46, 46]} />
      <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}

export function ServiceLayer() {
  const rayRefs = useRef<THREE.Group>(null);

  /* Mặt biển của từng module — chỗ để runtime hoán ẢNH DỰ ÁN thật sau này */
  const faces = useMemo(
    () => ({
      billboard: makeBoardTexture([SERVICES[0].name.toUpperCase()], {
        kicker: SERVICES[0].kicker,
        accent: PALETTE.blue,
      }),
      pano: makeBoardTexture([SERVICES[1].name.toUpperCase()], {
        kicker: SERVICES[1].kicker,
        accent: PALETTE.violetSoft,
      }),
      "led-cabinet": makeBoardTexture(["LED OUTDOOR"], {
        kicker: SERVICES[2].kicker,
        accent: PALETTE.blueSoft,
      }),
    }),
    []
  );

  const ref = useLayerWindow(LAYER_WINDOWS.services, (p) => {
    /* Ba tia bắn lệch nhau một nhịp cho có tiết tấu */
    const group = rayRefs.current;
    if (!group) return;
    group.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.ShaderMaterial;
      if (!mat?.uniforms?.uReveal) return;
      mat.uniforms.uReveal.value = seg(p, 0.47 + i * 0.03, 0.56 + i * 0.03);
    });
  });

  return (
    <group ref={ref}>
      {/* Mặt đất khu dịch vụ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -880]}>
        <planeGeometry args={[1600, 900]} />
        <meshStandardMaterial color="#05080f" roughness={1} />
      </mesh>

      {/* Tia sáng từ lõi dữ liệu */}
      <group ref={rayRefs}>
        <Ray to={WORLD.services[0].faceCenter as unknown as [number, number, number]} color="#57a3ff" />
        <Ray to={WORLD.services[1].faceCenter as unknown as [number, number, number]} color="#a78bfa" />
        <Ray to={WORLD.services[2].faceCenter as unknown as [number, number, number]} color="#7bb8ff" />
      </group>

      {/* 3 slot Blender — chưa có file thì dùng bản procedural đúng tỉ lệ */}
      <AssetSlot
        slot="billboard"
        position={WORLD.services[0].anchor as unknown as [number, number, number]}
        rotation={[0, WORLD.services[0].rotY, 0]}
        fallback={<BillboardFallback face={faces.billboard} />}
        onReady={(root) => swapMaterial(root, "MAT_BOARD_FACE", ledFaceMaterial(faces.billboard))}
      />
      <AssetSlot
        slot="pano"
        position={WORLD.services[1].anchor as unknown as [number, number, number]}
        rotation={[0, WORLD.services[1].rotY, 0]}
        fallback={<PanoFallback face={faces.pano} />}
        onReady={(root) => swapMaterial(root, "MAT_BOARD_FACE", ledFaceMaterial(faces.pano))}
      />
      <AssetSlot
        slot="led-cabinet"
        position={WORLD.services[2].anchor as unknown as [number, number, number]}
        rotation={[0, WORLD.services[2].rotY, 0]}
        fallback={<LedCabinetFallback face={faces["led-cabinet"]} />}
        onReady={(root) => swapMaterial(root, "MAT_LED_SCREEN", ledFaceMaterial(faces["led-cabinet"]))}
      />

      <Pad position={WORLD.services[0].anchor as unknown as [number, number, number]} color="#57a3ff" />
      <Pad position={WORLD.services[1].anchor as unknown as [number, number, number]} color="#a78bfa" />
      <Pad position={WORLD.services[2].anchor as unknown as [number, number, number]} color="#7bb8ff" />
    </group>
  );
}

/** Vật liệu mặt biển khi model đến từ Blender (giữ nguyên texture nội dung) */
function ledFaceMaterial(map: THREE.Texture): THREE.Material {
  return new THREE.MeshStandardMaterial({
    color: "#0a1120",
    emissive: new THREE.Color("#ffffff"),
    emissiveMap: map,
    emissiveIntensity: 0.95,
    toneMapped: false,
  });
}
