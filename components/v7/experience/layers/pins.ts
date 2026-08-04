import { PINS } from "@/components/v7/data";
import { WORLD } from "../world";

/* Quy đổi toạ độ % trên khung bản đồ (hệ 220×420 của v6) sang mét trong cảnh.
   Dùng chung cho sa bàn, pin và popup DOM. */
export const MAP_SCALE = Math.min(WORLD.map.width / 220, WORLD.map.depth / 420);

/** (px, py) trong hệ 220×420 → toạ độ shape 2D của sa bàn */
export function outlineToShape(px: number, py: number): [number, number] {
  return [(px - 110) * MAP_SCALE, (210 - py) * MAP_SCALE];
}

/** % (x,y) của pin → toạ độ thế giới trên mặt sa bàn */
export function pinToWorld(xPct: number, yPct: number): [number, number, number] {
  const px = (xPct / 100) * 220;
  const py = (yPct / 100) * 420;
  const [sx, sy] = outlineToShape(px, py);
  return [WORLD.map.center[0] + sx, 0, WORLD.map.center[2] - sy];
}

export const PIN_WORLD = PINS.map((p) => pinToWorld(p.x, p.y));

/* Vị trí pin sau khi chiếu lên màn hình — MapLayer ghi, Overlay đọc trong rAF.
   Đây là cách neo popup DOM theo projection mà không dựng CSS3DRenderer. */
export type PinScreen = { x: number; y: number; visible: boolean; scale: number };

export const pinScreen: { items: PinScreen[] } = {
  items: PINS.map(() => ({ x: 0, y: 0, visible: false, scale: 1 })),
};
