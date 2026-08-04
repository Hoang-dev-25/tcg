"use client";

import { useEffect, useRef } from "react";

import { PINS } from "@/components/v7/data";
import { pinScreen } from "@/components/v7/experience/layers/pins";

/* Popup dự án neo theo PROJECTION của pin 3D (không dùng CSS3DRenderer).
   MapLayer ghi toạ độ màn hình mỗi frame; ở đây chỉ đọc và ghi transform —
   không setState, không re-render. */
export function ProjectPopups() {
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      pinScreen.items.forEach((it, i) => {
        const el = refs.current[i];
        if (!el) return;
        const show = it.visible;
        el.style.opacity = show ? "1" : "0";
        if (show) {
          el.style.transform = `translate3d(${it.x}px, ${it.y}px, 0) translate(-50%, -100%) scale(${it.scale.toFixed(3)})`;
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {PINS.map((p, i) => (
        <div
          key={p.name}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="v7-popup absolute left-0 top-0 opacity-0"
        >
          <div className="v7-card w-[13.5rem] px-3 py-2.5">
            {/* "ảnh dự án": khối gradient giữ chỗ, thay bằng ảnh thật khi có */}
            <div className="mb-2 h-14 w-full rounded-[6px] bg-gradient-to-br from-[#153a72] to-[#241a5c]" />
            <p className="text-sm font-bold leading-tight text-white">{p.name}</p>
            <p className="v7-label mt-0.5">{p.sector}</p>
            <p className="mt-1 text-[0.78rem] leading-snug text-slate-300">{p.metric}</p>
          </div>
          <span className="mx-auto block h-5 w-px bg-gradient-to-b from-[#57a3ff] to-transparent" />
        </div>
      ))}
    </div>
  );
}
