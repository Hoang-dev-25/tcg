"use client";

import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

import { SLOTS, type SlotId, type SlotSpec } from "./manifest";

/* ===== Nạp asset Blender — có thì dùng, chưa có thì thôi =====
   Quy tắc vàng: KHÔNG BAO GIỜ ném lỗi ra ngoài. Slot trống → trả null →
   component gọi sẽ render bản procedural thay thế. */

const MODELS_DIR = "/v7-assets/models";
const DECODERS = {
  draco: "/v7-assets/decoders/draco/",
  ktx2: "/v7-assets/decoders/basis/",
};

/* ---------- Bảng trạng thái (cho panel readiness ?debug=1) ---------- */

export type SlotState = "empty" | "loading" | "ready" | "error";

export type SlotReport = {
  id: SlotId;
  state: SlotState;
  detail: string;
  tris?: number;
};

const reports = new Map<SlotId, SlotReport>();
const listeners = new Set<() => void>();
let snapshot: SlotReport[] = [];

function publish() {
  snapshot = Array.from(reports.values());
  listeners.forEach((l) => l());
}

export function setReport(id: SlotId, state: SlotState, detail: string, tris?: number) {
  reports.set(id, { id, state, detail, tris });
  publish();
}

export function subscribeReports(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getReports(): SlotReport[] {
  return snapshot;
}

/* ---------- Manifest: file nào thực sự có mặt ---------- */

let presentPromise: Promise<Set<string>> | null = null;

function fetchPresent(): Promise<Set<string>> {
  if (presentPromise) return presentPromise;
  presentPromise = fetch(`${MODELS_DIR}/manifest.json`, { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : { files: {} }))
    .then((j: { files?: Record<string, unknown> }) => new Set(Object.keys(j.files ?? {})))
    .catch(() => new Set<string>());
  return presentPromise;
}

/* Ở môi trường dev, thăm dò thêm bằng HEAD: người dựng thả file vào mà quên
   chạy `npm run v7:assets` thì vẫn thấy model hiện lên ngay. */
async function existsOnServer(url: string): Promise<boolean> {
  const name = url.split("/").pop()!;
  const present = await fetchPresent();
  if (present.has(name)) return true;
  if (process.env.NODE_ENV === "production") return false;
  try {
    const r = await fetch(url, { method: "HEAD", cache: "no-cache" });
    if (r.ok && !(r.headers.get("content-type") ?? "").includes("text/html")) {
      // eslint-disable-next-line no-console
      console.info(`[v7] Thấy ${name} nhưng chưa có trong manifest — chạy \`npm run v7:assets\`.`);
      return true;
    }
  } catch {
    /* im lặng — slot trống là trạng thái hợp lệ */
  }
  return false;
}

/* ---------- GLTFLoader dùng chung ---------- */

let loaderPromise: Promise<GLTFLoader> | null = null;

function getLoader(renderer: THREE.WebGLRenderer): Promise<GLTFLoader> {
  if (loaderPromise) return loaderPromise;
  loaderPromise = (async () => {
    const loader = new GLTFLoader();
    /* Draco + KTX2 chỉ có tác dụng khi đã copy decoder:
       `npm run v7:setup`. Thiếu decoder mà file lại nén → load fail →
       fallback procedural, có log rõ ràng. */
    const draco = new DRACOLoader().setDecoderPath(DECODERS.draco);
    loader.setDRACOLoader(draco);
    const ktx2 = new KTX2Loader().setTranscoderPath(DECODERS.ktx2).detectSupport(renderer);
    loader.setKTX2Loader(ktx2);
    loader.setMeshoptDecoder(MeshoptDecoder);
    return loader;
  })();
  return loaderPromise;
}

/* ---------- Đếm tam giác để đối chiếu ngân sách ---------- */

export function countTris(root: THREE.Object3D): number {
  let n = 0;
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || !m.geometry) return;
    const g = m.geometry;
    const count = g.index ? g.index.count : g.attributes.position?.count ?? 0;
    n += count / 3;
  });
  return Math.round(n);
}

/* ---------- API chính ---------- */

const cache = new Map<string, Promise<GLTF | null>>();

export function loadModel(url: string, renderer: THREE.WebGLRenderer): Promise<GLTF | null> {
  const hit = cache.get(url);
  if (hit) return hit;
  const p = (async () => {
    if (!(await existsOnServer(url))) return null;
    try {
      const loader = await getLoader(renderer);
      return await loader.loadAsync(url);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`[v7] Nạp ${url} thất bại — dùng bản procedural thay thế.`, err);
      return null;
    }
  })();
  cache.set(url, p);
  return p;
}

export async function loadSlot(
  spec: SlotSpec,
  renderer: THREE.WebGLRenderer,
  which: "lod0" | "lod1" = "lod0"
): Promise<GLTF | null> {
  const url = which === "lod1" ? spec.lodFile : spec.file;
  if (!url) return null;
  if (which === "lod0") setReport(spec.id, "loading", "đang kiểm tra…");
  const gltf = await loadModel(url, renderer);
  if (which === "lod0") {
    if (!gltf) {
      setReport(spec.id, "empty", "chưa có file — đang dùng bản procedural");
    } else {
      const tris = countTris(gltf.scene);
      const [budget] = spec.triBudget;
      const over = budget > 0 && tris > budget;
      setReport(
        spec.id,
        over ? "error" : "ready",
        over ? `vượt ngân sách: ${tris.toLocaleString("vi-VN")} / ${budget.toLocaleString("vi-VN")} tris` : "sẵn sàng",
        tris
      );
    }
  }
  return gltf;
}

/* ---------- Tiện ích xử lý sau khi nạp ---------- */

/** Tìm mesh mang material tên `name` (theo hợp đồng đặt tên trong manifest). */
export function findByMaterial(root: THREE.Object3D, name: string): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    if (mats.some((mm) => mm?.name === name)) out.push(m);
  });
  return out;
}

/** Hoán toàn bộ material tên `name` sang material runtime (shader LED, ảnh dự án…). */
export function swapMaterial(root: THREE.Object3D, name: string, next: THREE.Material): THREE.Mesh[] {
  const hit = findByMaterial(root, name);
  hit.forEach((m) => {
    m.material = next;
  });
  return hit;
}

/** Lấy các node con theo tiền tố tên (vd BLD_* của building kit). */
export function collectByPrefix(root: THREE.Object3D, prefix: string): THREE.Mesh[] {
  const out: THREE.Mesh[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && m.name.startsWith(prefix)) out.push(m);
  });
  return out;
}

/** Báo cáo mọi slot chưa từng được chạm tới là "trống" (để panel đủ 6 dòng). */
export function seedReports() {
  Object.values(SLOTS).forEach((s) => {
    if (!reports.has(s.id)) reports.set(s.id, { id: s.id, state: "empty", detail: "chưa nạp" });
  });
  publish();
}
