"use client";

import { LayerLabel } from "@/components/demo/layer-label";
import { Parallax } from "@/components/parallax";
import { cn } from "@/lib/utils";

/* Mỗi cột trôi một tốc độ — cả lưới gợn sóng khi cuộn qua. */
const columnSpeeds = [0.15, 0.5, 0.25, 0.65, 0.2, 0.55];

const tiles = [
  "Đa lớp tốc độ", "Depth zoom", "Chữ đối lưu", "Thẻ xếp chồng",
  "Cuộn ngang", "Xoay theo cuộn", "Phân rã lớp", "Vận tốc & skew",
  "Vòng tròn mở màn", "Phối cảnh 3D", "Lưới lệch nhịp", "Canvas scrub",
  "Vẽ nét SVG", "Chữ hiện dần", "Đổi màu nền", "Parallax chuột",
  "Tiến độ toàn trang", "Footer reveal",
];

const tileAccents = [
  "from-neon-cyan/15 border-neon-cyan/30",
  "from-neon-amber/15 border-neon-amber/30",
  "from-white/10 border-white/20",
];

/**
 * LỚP 11 — Lưới lệch nhịp: 12 ô nhắc lại 12 kỹ thuật,
 * mỗi cột trôi với tốc độ riêng tạo chuyển động gợn sóng.
 */
export function Layer11Grid() {
  return (
    <section
      id="layer-11"
      className="overflow-hidden bg-ink-950 py-28 sm:py-40"
      aria-label="Lớp 11: lưới parallax lệch nhịp"
    >
      <div className="container">
        <LayerLabel index={11} technique="Column-offset grid" />
        <h2 className="max-w-xl font-heading text-4xl font-bold uppercase sm:text-5xl">
          Cả lưới cùng <span className="text-neon-cyan text-glow-cyan">gợn sóng</span>
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          18 ô — 18 kỹ thuật của Parallax Lab. Sáu cột dùng sáu tốc độ trôi
          khác nhau nên lưới không bao giờ phẳng khi cuộn.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {tiles.map((tile, i) => (
            <li key={tile}>
              <Parallax speed={columnSpeeds[i % columnSpeeds.length]}>
                <div
                  className={cn(
                    "flex aspect-[4/5] flex-col justify-between rounded-xl border bg-gradient-to-br to-ink-900 p-5",
                    tileAccents[i % tileAccents.length]
                  )}
                >
                  <span className="font-heading text-4xl font-bold text-foreground/90 sm:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {tile}
                  </span>
                </div>
              </Parallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
