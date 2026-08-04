"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useSlot } from "@/components/v7/assets/AssetSlot";
import { PINS, VN_OUTLINE } from "@/components/v7/data";
import { makeGlowTexture, PALETTE } from "../textures";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";
import { MAP_SCALE, outlineToShape, PIN_WORLD, pinScreen } from "./pins";

/* ===== Giai đoạn 5 · Sa bàn Việt Nam + pin dự án =====
   Sa bàn: ExtrudeGeometry sinh lúc runtime từ đường bao (không cần Blender).
   Pin: tái dùng bản LOD1 của billboard nếu có; chưa có thì dựng cột + quầng sáng.
   Popup: DOM neo theo projection (xem pins.ts + overlay/ProjectPopups.tsx). */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function useMapGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    VN_OUTLINE.forEach(([px, py], i) => {
      const [x, y] = outlineToShape(px, py);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 9,
      bevelEnabled: true,
      bevelSize: 1.4,
      bevelThickness: 1.2,
      bevelSegments: 2,
      curveSegments: 2,
    });
    geo.rotateX(-Math.PI / 2);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function useOutlinePoints() {
  return useMemo(() => {
    const pts: number[] = [];
    VN_OUTLINE.forEach(([px, py]) => {
      const [x, y] = outlineToShape(px, py);
      pts.push(x, 0.6, -y);
    });
    const [px0, py0] = VN_OUTLINE[0];
    const [x0, y0] = outlineToShape(px0, py0);
    pts.push(x0, 0.6, -y0);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
}

/** Một pin dự án */
function Pin({
  index,
  position,
  lod,
}: {
  index: number;
  position: [number, number, number];
  lod: THREE.Object3D | null;
}) {
  const glow = useMemo(() => makeGlowTexture(index % 2 ? PALETTE.violetSoft : PALETTE.blueSoft, 0.6), [index]);
  const ringRef = useRef<THREE.Mesh>(null);
  const model = useMemo(() => (lod ? lod.clone(true) : null), [lod]);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = (clock.elapsedTime * 0.55 + index * 0.3) % 1;
    ringRef.current.scale.setScalar(6 + t * 26);
    (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.5;
  });

  return (
    <group position={position}>
      {/* cột sáng */}
      <mesh position={[0, 14, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 28, 6]} />
        <meshBasicMaterial
          color={index % 2 ? "#a78bfa" : "#57a3ff"}
          transparent
          opacity={0.75}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* bản LOD1 của billboard nếu Blender đã nộp — phóng to cho hợp tỉ lệ sa bàn */}
      {model ? <primitive object={model} scale={1.6} position={[0, 0, 0]} /> : null}
      <sprite position={[0, 30, 0]} scale={[16, 16, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      {/* vòng sóng lan */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.9, 0]}>
        <ringGeometry args={[0.9, 1, 40]} />
        <meshBasicMaterial
          color={index % 2 ? "#a78bfa" : "#57a3ff"}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function MapLayer() {
  const geo = useMapGeometry();
  const outline = useOutlinePoints();
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  /* Tái dùng LOD2 của billboard làm pin (đúng ý phân loại asset) */
  const lodGltf = useSlot("billboard", "lod1");
  const lod = lodGltf?.scene ?? null;

  const v = useMemo(() => new THREE.Vector3(), []);
  const mapCenter = WORLD.map.center as unknown as [number, number, number];

  const ref = useLayerWindow(LAYER_WINDOWS.map, (p, g) => {
    /* Sa bàn hiện dần khi camera lùi ra, mờ đi khi rời sang cảnh liên hệ */
    const a = clamp01((p - 0.7) / 0.05) * (1 - clamp01((p - 0.89) / 0.04));
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (!m || !m.transparent || typeof m.opacity !== "number") return;
      if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity;
      m.opacity = m.userData.baseOpacity * a;
    });

    /* Chiếu pin lên màn hình cho popup DOM bám theo */
    PIN_WORLD.forEach((pos, i) => {
      v.set(pos[0], 26, pos[2]).project(camera);
      const item = pinScreen.items[i];
      item.x = (v.x * 0.5 + 0.5) * size.width;
      item.y = (-v.y * 0.5 + 0.5) * size.height;
      /* hiện lần lượt từng pin theo tiến trình, chỉ khi nằm trước camera */
      const appear = clamp01((p - (0.755 + i * 0.012)) / 0.02);
      item.visible = v.z < 1 && a > 0.5 && appear > 0.5;
      item.scale = 0.85 + appear * 0.15;
    });
  });

  return (
    <group ref={ref} position={mapCenter}>
      {/* Mặt nước / nền quanh sa bàn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[WORLD.map.width * 3.4, WORLD.map.depth * 1.9]} />
        <meshStandardMaterial color="#04070f" roughness={0.85} metalness={0.3} />
      </mesh>

      {/* Khối đất liền extrude */}
      <mesh geometry={geo} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0c1730" emissive="#0d2f5e" emissiveIntensity={0.55} roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Viền phát sáng */}
      <lineLoop geometry={outline}>
        <lineBasicMaterial color="#57a3ff" transparent opacity={0.9} toneMapped={false} blending={THREE.AdditiveBlending} />
      </lineLoop>

      {/* Lưới toạ độ mờ dưới sa bàn */}
      <gridHelper args={[WORLD.map.depth * 1.3, 26, "#1a5bb0", "#0e1a33"]} position={[0, -7.6, 0]} />

      {/* Pin đặt theo toạ độ TƯƠNG ĐỐI vì cả group đã dời tới tâm sa bàn */}
      {PIN_WORLD.map((pos, i) => (
        <Pin
          key={PINS[i].name}
          index={i}
          position={[pos[0] - mapCenter[0], 0.6, pos[2] - mapCenter[2]]}
          lod={lod}
        />
      ))}
    </group>
  );
}
