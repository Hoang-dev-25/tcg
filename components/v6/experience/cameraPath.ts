import * as THREE from "three";

export type CameraSample = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  roll: number;
};

type Key = {
  t: number;                       // progress 0..1
  pos: [number, number, number];
  look: [number, number, number];
  fov?: number;                    // mặc định 55
  ease?: (u: number) => number;    // ease của CHẶNG kết thúc tại key này
};

const easeInOut = (u: number) => u * u * (3 - 2 * u);
const easeIn = (u: number) => u * u * u;
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

/* ==== BẢNG CHỈNH SỐ DUY NHẤT của đường bay ====
   Mốc frame (hold = pos/look đứng yên giữa 2 key giống nhau):
   F1 0–.06 · bay 1→2 · F2 3 điểm dừng .16–.33 · bay 2→3 · F3 5 mốc .38–.58
   · bay 3→4 · F4 .62–.70 · dolly-out · F5 .78–.86 · lao vào LED · F6 .92–1 */
export const KEYFRAMES: Key[] = [
  { t: 0.0,  pos: [120, 300, 260],  look: [0, 26, -60] },
  { t: 0.06, pos: [120, 300, 260],  look: [0, 26, -60] },                       // hold F1
  { t: 0.11, pos: [60, 120, 120],   look: [0, 22, -60], fov: 64, ease: easeIn }, // hạ + FOV kick
  { t: 0.16, pos: [-6, 10, -12],    look: [14, 12, -40], ease: easeOut },
  { t: 0.20, pos: [-6, 10, -12],    look: [14, 12, -40] },                      // hold billboard
  { t: 0.24, pos: [3, 10, -62],     look: [-16, 20, -85], ease: easeInOut },
  { t: 0.27, pos: [3, 10, -62],     look: [-16, 20, -85] },                     // hold pano
  { t: 0.30, pos: [-3, 7, -103],    look: [13, 9, -125], ease: easeInOut },
  { t: 0.33, pos: [-3, 7, -103],    look: [13, 9, -125] },                      // hold LED
  { t: 0.38, pos: [0, 12, -158],    look: [0, 9, -260], fov: 58, ease: easeInOut },
  { t: 0.41, pos: [0, 10, -168],    look: [-10, 8, -210] },                     // mốc 2005
  { t: 0.445, pos: [0, 10, -218],   look: [10, 8, -260], ease: easeInOut },     // mốc 2009
  { t: 0.48, pos: [0, 10, -268],    look: [-10, 8, -310], ease: easeInOut },    // mốc 2014
  { t: 0.515, pos: [0, 10, -318],   look: [10, 8, -360], ease: easeInOut },     // mốc 2019
  { t: 0.55, pos: [0, 10, -368],    look: [-10, 8, -410], ease: easeInOut },    // mốc 2024
  { t: 0.58, pos: [0, 10, -368],    look: [-10, 8, -410] },                     // hold cuối F3
  { t: 0.62, pos: [0, 150, -240],   look: [0, 0, -110], ease: easeInOut },      // ngẩng lên tầng AI
  { t: 0.70, pos: [0, 150, -240],   look: [0, 0, -110] },                       // hold F4
  { t: 0.78, pos: [150, 2600, -400], look: [120, 0, -1150], fov: 60, ease: easeIn }, // dolly-out bản đồ
  { t: 0.86, pos: [150, 2600, -400], look: [120, 0, -1150], fov: 55 },          // hold F5
  { t: 0.92, pos: [0, 40, 17],      look: [0, 40, -20], fov: 50, ease: easeInOut }, // lao vào LED
  { t: 1.0,  pos: [0, 40, 17],      look: [0, 40, -20], fov: 50 },              // hold F6
];

const vA = new THREE.Vector3();
const vB = new THREE.Vector3();

export function sampleCamera(p: number, out: CameraSample): void {
  const t = THREE.MathUtils.clamp(p, 0, 1);
  let i = KEYFRAMES.length - 2;
  for (let k = 0; k < KEYFRAMES.length - 1; k++) {
    if (t >= KEYFRAMES[k].t && t <= KEYFRAMES[k + 1].t) { i = k; break; }
  }
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const span = Math.max(b.t - a.t, 1e-6);
  const u = (b.ease ?? easeInOut)((t - a.t) / span);

  out.pos.copy(vA.fromArray(a.pos).lerp(vB.fromArray(b.pos), u));
  out.look.copy(vA.fromArray(a.look).lerp(vB.fromArray(b.look), u));
  out.fov = THREE.MathUtils.lerp(a.fov ?? 55, b.fov ?? 55, u);

  /* Roll ±2° chỉ trong 2 chặng bay nhanh (spec: FOV kick + camera roll) */
  const rollWindows: Array<[number, number, number]> = [
    [0.06, 0.16, -2], // hạ xuống đại lộ — nghiêng trái
    [0.70, 0.78, 2],  // dolly-out bản đồ — nghiêng phải
  ];
  out.roll = 0;
  for (const [a2, b2, deg] of rollWindows) {
    if (t > a2 && t < b2) {
      const uu = (t - a2) / (b2 - a2);
      out.roll = THREE.MathUtils.degToRad(deg) * Math.sin(uu * Math.PI); // vào-ra mềm
    }
  }
}
