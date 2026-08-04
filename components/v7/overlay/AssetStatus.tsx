"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { SLOT_LIST } from "@/components/v7/assets/manifest";
import { getReports, subscribeReports } from "@/components/v7/assets/loader";
import { scrollState } from "@/components/v7/experience/progress";
import { stageAt } from "@/components/v7/experience/world";

/* Bảng SẴN SÀNG — bật bằng `?debug=1` hoặc Shift+D.
   Cho biết slot Blender nào đã có file, slot nào đang chạy bản procedural,
   kèm tiến trình và giai đoạn hiện tại. Không hiện với người dùng cuối. */

const EMPTY: ReturnType<typeof getReports> = [];

const STATE_LABEL: Record<string, string> = {
  ready: "● có file .glb",
  loading: "◐ đang nạp…",
  empty: "○ procedural",
  error: "▲ lỗi / vượt ngân sách",
};
const STATE_CLASS: Record<string, string> = {
  ready: "text-emerald-400",
  loading: "text-sky-300",
  empty: "text-slate-400",
  error: "text-amber-400",
};

export function AssetStatus() {
  const [open, setOpen] = useState(false);
  const [meter, setMeter] = useState({ p: 0, stage: "hero" });
  const reports = useSyncExternalStore(
    subscribeReports,
    getReports,
    () => EMPTY
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === "D" || e.key === "d")) setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const tick = () => {
      setMeter({ p: scrollState.current, stage: stageAt(scrollState.current).label });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  if (!open) return null;

  const byId = new Map(reports.map((r) => [r.id, r]));
  const ready = reports.filter((r) => r.state === "ready").length;

  return (
    <aside className="v7-card pointer-events-auto absolute right-4 top-16 z-30 w-[19rem] p-3 font-mono text-[11px] leading-relaxed">
      <div className="mb-2 flex items-center justify-between">
        <strong className="tracking-[0.14em] text-white">SLOT BLENDER · {ready}/6</strong>
        <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
          ✕
        </button>
      </div>
      <ul className="space-y-1">
        {SLOT_LIST.map((s) => {
          const r = byId.get(s.id);
          const state = r?.state ?? "empty";
          return (
            <li key={s.id} className="flex items-start justify-between gap-2">
              <span className="text-slate-300">
                {s.id}
                {!s.required && <span className="text-slate-500"> (tùy chọn)</span>}
              </span>
              <span className={`shrink-0 ${STATE_CLASS[state]}`}>{STATE_LABEL[state]}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-2 border-t border-white/10 pt-2 text-slate-400">
        <div>
          progress {meter.p.toFixed(3)} · {meter.stage}
        </div>
        <div className="mt-1 text-slate-500">Shift+D để ẩn · npm run v7:assets để quét lại</div>
      </div>
    </aside>
  );
}
