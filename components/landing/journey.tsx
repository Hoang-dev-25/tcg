"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Map, Plane, Sparkles, TrendingUp } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { journey } from "@/lib/landing-data";

const icons = [Building2, TrendingUp, Plane, Map, Sparkles];

/* Mỗi cột mốc trôi một tốc độ nhẹ khác nhau — timeline gợn sóng khi cuộn */
const columnSpeeds = [0.08, 0.22, 0.12, 0.26, 0.1];

/**
 * Hành trình 20 năm: timeline ngang 5 mốc, đường nối vẽ dần khi lọt viewport,
 * từng mốc hiện so le và trôi parallax lệch nhịp.
 */
export function Journey() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-20 sm:py-24" aria-label="Hành trình phát triển">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">Hành trình 20 năm</h2>
        </Reveal>

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {/* Đường nối — vẽ dần từ trái sang phải (chỉ desktop) */}
          <motion.div
            className="absolute left-[10%] right-[10%] top-[74px] hidden h-[3px] origin-left rounded-sm bg-gradient-to-r from-brand-300 to-brand-600 lg:block"
            initial={{ scaleX: reducedMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          {journey.map((item, i) => {
            const Icon = icons[i];
            return (
              <Parallax key={item.year} speed={columnSpeeds[i]}>
                <Reveal delay={i * 0.12} className="relative z-10 grid justify-items-center gap-3.5 text-center">
                  <span className="font-mono text-[15px] font-bold text-slate-800">{item.year}</span>
                  <span className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-white bg-brand-100 text-brand-900 shadow-[0_0_0_2px_theme(colors.slate.200)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-brand-900" aria-hidden="true" />
                  <div className="mt-1 grid gap-1.5">
                    <strong className="text-[15px] font-bold leading-snug text-slate-900">
                      {i + 1}. {item.title}
                    </strong>
                    <p className="text-[13px] leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </Reveal>
              </Parallax>
            );
          })}
        </div>
      </div>
    </section>
  );
}
