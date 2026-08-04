import * as THREE from "three";

/* ===== Đường bay dự phòng (khi chưa có camera-path.glb từ Blender) =====
   Mọi toạ độ bám đúng WORLD trong world.ts. Nếu người dựng nộp
   `/v7-assets/models/camera-path.glb`, CameraRig bỏ qua toàn bộ bảng này và
   scrub bằng AnimationMixer.setTime() — xem docs/v7-blender-spec.md §6. */

export type CameraSample = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  roll: number;
};

type Key = {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov?: number;
  ease?: (u: number) => number;
};

const easeInOut = (u: number) => u * u * (3 - 2 * u);
const easeIn = (u: number) => u * u * u;
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

const FOV = 46;

/* ==== BẢNG CHỈNH SỐ DUY NHẤT ====
   G1 0–.13 toàn cảnh · G2 .13–.32 zoom vào & xuyên mặt LED ·
   G3 .32–.50 không gian dữ liệu · G4 .50–.71 ba trạm dịch vụ ·
   G5 .71–.88 sa bàn bản đồ · G6 .88–1 văn phòng ảo */
export const KEYFRAMES: Key[] = [
  { t: 0.0, pos: [34, 118, 214], look: [0, 96, -220], fov: FOV },
  { t: 0.06, pos: [26, 114, 178], look: [0, 96, -220], fov: FOV }, // trôi chậm, không đứng chết
  { t: 0.13, pos: [8, 99, 26], look: [0, 96, -220], fov: FOV, ease: easeIn },

  { t: 0.19, pos: [0, 96, -183], look: [0, 96, -220], fov: FOV, ease: easeOut }, // mặt LED phủ kín khung
  { t: 0.27, pos: [0, 96, -196], look: [0, 96, -220], fov: FOV, ease: easeInOut }, // giữ, timeline trượt
  { t: 0.32, pos: [0, 95, -234], look: [0, 94, -320], fov: 52, ease: easeIn }, // XUYÊN qua mặt LED

  { t: 0.38, pos: [6, 94, -308], look: [0, 92, -430], fov: 55, ease: easeOut },
  { t: 0.45, pos: [0, 92, -452], look: [0, 92, -520], fov: 52, ease: easeInOut }, // áp sát lõi dữ liệu
  { t: 0.5, pos: [0, 92, -452], look: [0, 92, -520], fov: 52 },

  { t: 0.55, pos: [-70, 30, -690], look: [-118, 21, -742], fov: 50, ease: easeInOut }, // billboard
  { t: 0.575, pos: [-70, 30, -690], look: [-118, 21, -742], fov: 50 },
  { t: 0.62, pos: [160, 34, -846], look: [112, 24, -892], fov: 50, ease: easeInOut }, // pano
  { t: 0.645, pos: [160, 34, -846], look: [112, 24, -892], fov: 50 },
  { t: 0.69, pos: [-8, 28, -996], look: [-56, 18, -1044], fov: 50, ease: easeInOut }, // màn LED
  { t: 0.71, pos: [-8, 28, -996], look: [-56, 18, -1044], fov: 50 },

  { t: 0.78, pos: [0, 760, -780], look: [0, 0, -1330], fov: 50, ease: easeInOut }, // lùi ra lộ sa bàn
  { t: 0.82, pos: [0, 740, -800], look: [0, 0, -1330], fov: 50 },
  { t: 0.86, pos: [70, 430, -1080], look: [20, 0, -1300], fov: 46, ease: easeInOut }, // sà xuống cụm pin
  { t: 0.88, pos: [70, 430, -1080], look: [20, 0, -1300], fov: 46 },

  { t: 0.94, pos: [0, 17, -1790], look: [0, 16, -1874], fov: 42, ease: easeInOut }, // văn phòng ảo
  { t: 1.0, pos: [0, 16.6, -1802], look: [0, 16, -1874], fov: 42 },
];

/* Roll ±độ trong các chặng bay nhanh — cho cú chuyển cảnh có "sức nặng" */
const ROLL_WINDOWS: Array<[number, number, number]> = [
  [0.13, 0.19, -1.6], // hạ xuống trước mặt LED
  [0.32, 0.4, 2.2], // vừa xuyên qua màn hình
  [0.71, 0.78, 2.6], // dolly-out lộ bản đồ
];

const vA = new THREE.Vector3();
const vB = new THREE.Vector3();

export function sampleCamera(p: number, out: CameraSample): void {
  const t = THREE.MathUtils.clamp(p, 0, 1);
  let i = KEYFRAMES.length - 2;
  for (let k = 0; k < KEYFRAMES.length - 1; k++) {
    if (t >= KEYFRAMES[k].t && t <= KEYFRAMES[k + 1].t) {
      i = k;
      break;
    }
  }
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const span = Math.max(b.t - a.t, 1e-6);
  const u = (b.ease ?? easeInOut)((t - a.t) / span);

  out.pos.copy(vA.fromArray(a.pos).lerp(vB.fromArray(b.pos), u));
  out.look.copy(vA.fromArray(a.look).lerp(vB.fromArray(b.look), u));
  out.fov = THREE.MathUtils.lerp(a.fov ?? FOV, b.fov ?? FOV, u);

  out.roll = 0;
  for (const [r0, r1, deg] of ROLL_WINDOWS) {
    if (t > r0 && t < r1) {
      const uu = (t - r0) / (r1 - r0);
      out.roll = THREE.MathUtils.degToRad(deg) * Math.sin(uu * Math.PI);
    }
  }
}
