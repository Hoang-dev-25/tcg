"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LayerLabel } from "@/components/demo/layer-label";

const techniques = [
  "Đa lớp tốc độ", "Depth zoom", "Chữ đối lưu", "Thẻ xếp chồng", "Cuộn ngang",
  "Xoay theo cuộn", "Phân rã lớp", "Vận tốc & skew", "Vòng tròn mở màn",
  "Phối cảnh 3D", "Lưới lệch nhịp", "Canvas scrub", "Vẽ nét SVG",
  "Chữ hiện dần", "Đổi màu nền", "Parallax chuột", "Tiến độ toàn trang", "Footer reveal",
];

/**
 * LỚP 18 — Footer reveal: khối này position:fixed nằm SAU toàn bộ trang
 * (z-index âm); phần tử spacer trong suốt ở cuối tài liệu để trang
 * "nhấc lên" và lộ nó ra khi cuộn hết. Không dùng một transform nào.
 */
export function Layer18FooterReveal() {
  return (
    <>
      {/* Spacer trong suốt: chừa chỗ cuộn để lộ khối fixed phía sau */}
      <div id="layer-18" className="h-[82vh]" aria-hidden="true" />

      <div className="fixed inset-x-0 bottom-0 -z-10 flex h-[82vh] flex-col items-center justify-center gap-6 overflow-hidden bg-ink-900 px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-grid-faint opacity-50"
          aria-hidden="true"
        />
        <div className="relative">
          <LayerLabel index={18} technique="Footer reveal" className="justify-center" />
          <p className="font-heading text-6xl font-bold uppercase leading-none tracking-tight sm:text-8xl">
            Parallax<span className="text-neon-amber text-glow-amber">Lab</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Khối này cố định sau trang từ đầu — chỉ được &quot;lộ ra&quot; khi bạn cuộn
            hết. Cảm giác trang được nhấc lên, không tốn một phép transform nào.
          </p>

          <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
            {techniques.map((technique, i) => (
              <span
                key={technique}
                className="rounded-full border border-white/10 bg-ink-950/70 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
              >
                {String(i + 1).padStart(2, "0")} · {technique}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild size="lg">
              <a href="#layer-01">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                Cuộn lại từ đầu
              </a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Parallax Lab — 18 kỹ thuật cuộn đa lớp · Next.js + Framer Motion + Lenis
          </p>
        </div>
      </div>
    </>
  );
}
