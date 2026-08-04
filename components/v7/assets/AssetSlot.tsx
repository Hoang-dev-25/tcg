"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import type { GroupProps } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

import { SLOTS, type SlotId } from "./manifest";
import { loadSlot } from "./loader";

/* Hook nạp một slot. Trả null khi chưa có file — nơi gọi tự lo bản thay thế. */
export function useSlot(id: SlotId, which: "lod0" | "lod1" = "lod0"): GLTF | null {
  const gl = useThree((s) => s.gl);
  const [gltf, setGltf] = useState<GLTF | null>(null);

  useEffect(() => {
    let alive = true;
    loadSlot(SLOTS[id], gl, which).then((g) => {
      if (alive) setGltf(g);
    });
    return () => {
      alive = false;
    };
  }, [id, gl, which]);

  return gltf;
}

type AssetSlotProps = Omit<GroupProps, "id" | "clone"> & {
  /* đặt tên `slot` chứ không phải `id`: Object3D đã có sẵn prop `id` */
  slot: SlotId;
  /** Bản procedural dùng khi slot còn trống */
  fallback: ReactNode;
  /** Gọi một lần sau khi model Blender sẵn sàng — chỗ để hoán material LED/ảnh */
  onReady?: (root: THREE.Object3D, gltf: GLTF) => void;
  /** Bật khi cùng một slot xuất hiện nhiều nơi trong cảnh (tên `clone` bị
      Object3D chiếm nên dùng `duplicate`) */
  duplicate?: boolean;
};

/**
 * Chỗ trống chờ asset Blender.
 *
 *   <AssetSlot slot="billboard" fallback={<BillboardFallback />} />
 *
 * Có file .glb → dựng model thật. Chưa có → dựng procedural. Trang không bao
 * giờ vỡ, tiến độ 3D và tiến độ web chạy song song độc lập.
 */
export function AssetSlot({ slot, fallback, onReady, duplicate = true, ...group }: AssetSlotProps) {
  const gltf = useSlot(slot);
  const spec = SLOTS[slot];

  const object = useMemo(() => {
    if (!gltf) return null;
    const root = duplicate ? gltf.scene.clone(true) : gltf.scene;
    if (spec.scale !== 1) root.scale.multiplyScalar(spec.scale);
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = false;
        m.receiveShadow = false;
        m.frustumCulled = true;
      }
    });
    onReady?.(root, gltf);
    return root;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf, duplicate, spec.scale]);

  return <group {...group}>{object ? <primitive object={object} /> : fallback}</group>;
}
