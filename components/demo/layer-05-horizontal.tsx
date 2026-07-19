"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { cn } from "@/lib/utils";

const panels = [
  { title: "Cuộn dọc", body: "Bạn vẫn đang cuộn dọc bình thường — không hijack.", accent: "text-neon-cyan border-neon-cyan/30" },
  { title: "Chạy ngang", body: "Track bên trong translateX theo tiến độ cuộn dọc.", accent: "text-neon-amber border-neon-amber/30" },
  { title: "Sticky giữ khung", body: "Container cao 300vh, khung hiển thị sticky 100vh.", accent: "text-foreground border-white/20" },
  { title: "Kết thúc mượt", body: "Hết track thì section nhả ra, trang tiếp tục cuộn dọc.", accent: "text-neon-cyan border-neon-cyan/30" },
];

/**
 * LỚP 05 — Cuộn ngang: chuyển cuộn dọc thành chuyển động ngang
 * trong một khung sticky. Reduced motion: hiển thị lưới tĩnh.
 */
export function Layer05Horizontal() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-75%"]);

  if (reducedMotion) {
    return (
      <section id="layer-05" className="bg-ink-900 py-24" aria-label="Lớp 5: cuộn ngang">
        <div className="container">
          <LayerLabel index={5} technique="Horizontal scroll" />
          <div className="grid gap-4 sm:grid-cols-2">
            {panels.map((panel, i) => (
              <PanelCard key={panel.title} panel={panel} index={i} className="w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="layer-05" aria-label="Lớp 5: cuộn ngang">
      <div ref={ref} className="relative h-[300vh] bg-ink-900">
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
          <div className="container mb-8">
            <LayerLabel index={5} technique="Horizontal scroll" />
          </div>
          <motion.div className="flex w-[400vw] will-change-transform" style={{ x }}>
            {panels.map((panel, i) => (
              <div key={panel.title} className="flex w-screen shrink-0 items-center justify-center px-6">
                <PanelCard panel={panel} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PanelCard({
  panel,
  index,
  className,
}: {
  panel: (typeof panels)[number];
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[min(88vw,34rem)] rounded-2xl border bg-ink-950/80 p-10 shadow-billboard",
        panel.accent,
        className
      )}
    >
      <p className={cn("font-heading text-7xl font-bold sm:text-8xl", panel.accent.split(" ")[0])}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-4 font-heading text-3xl font-bold uppercase text-foreground sm:text-4xl">
        {panel.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">{panel.body}</p>
    </div>
  );
}
