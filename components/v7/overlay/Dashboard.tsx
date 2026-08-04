"use client";

import { useEffect, useRef } from "react";

import { AI_STATS } from "@/components/v7/data";

/* Dashboard chỉ số của giai đoạn 3 — DOM thuần, KHÔNG dựng trong 3D.
   Số chạy liên tục để cảm giác "phân tích thời gian thực". */

function format(v: number, kind: (typeof AI_STATS)[number]["format"]): string {
  if (kind === "percent") return `${v.toFixed(1).replace(".", ",")}%`;
  if (kind === "plus") return `${Math.round(v)}+`;
  return Math.round(v).toLocaleString("vi-VN");
}

export function Dashboard() {
  const refs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      AI_STATS.forEach((s, i) => {
        const el = refs.current[i];
        if (!el) return;
        let v = s.value;
        if (s.key === "views") v = s.value + Math.floor(t * 7.3) * 11;
        else if (s.key === "cvr") v = s.value + Math.sin(t * 0.7) * 0.2;
        else if (s.key === "screens") v = s.value + (Math.sin(t * 0.31) > 0.7 ? 1 : 0);
        el.textContent = format(v, s.format);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="v7-card grid grid-cols-2 gap-px overflow-hidden bg-[#57a3ff1a] sm:grid-cols-4">
      {AI_STATS.map((s, i) => (
        <div key={s.key} className="bg-[#070d1c]/80 px-4 py-3">
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="v7-num block text-[clamp(1.1rem,2.4vw,1.7rem)] font-extrabold leading-tight text-white"
          >
            —
          </span>
          <span className="v7-label mt-1 block">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
