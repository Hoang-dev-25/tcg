"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";

const ROTATE_IMAGE = "https://hoanglearncode.github.io/v1-tcg/assets/ooh/haiphong-caurao2.jpg";

/**
 * Kỹ thuật LỚP 06 (xoay theo cuộn) áp lên hình ảnh:
 * ảnh vị trí OOH cắt tròn xoay theo tiến độ cuộn, vành dashed quay ngược,
 * chip số liệu ở tâm đứng yên.
 */
export function RotateShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rotateImage = useTransform(scrollYProgress, [0, 1], [0, 150 * factor]);
  const rotateRing = useTransform(scrollYProgress, [0, 1], [0, -220 * factor]);
  const groupScale = useTransform(scrollYProgress, [0, 0.35], [1 - 0.12 * factor, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.45, 0.65], [factor === 0 ? 1 : 0, 1]);

  return (
    <section id="mang-luoi" aria-label="Mạng lưới vị trí toàn quốc">
      <div ref={ref} className="relative h-[220vh] bg-white">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brick-500">
              Mạng lưới
            </span>
            <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">
              Một mạng lưới, <span className="text-brand-600">mọi góc nhìn</span>
            </h2>
          </div>

          <motion.div className="relative h-72 w-72 sm:h-96 sm:w-96" style={{ scale: groupScale }}>
            {/* Vành dashed quay ngược chiều ảnh */}
            <motion.div
              className="absolute -inset-5 rounded-full border border-dashed border-brand-300 will-change-transform"
              style={{ rotate: rotateRing }}
              aria-hidden="true"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-600 shadow-md" />
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-brick-500 shadow-md" />
              <span className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand-300" />
              <span className="absolute -right-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand-300" />
            </motion.div>

            {/* Ảnh cắt tròn xoay theo cuộn */}
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-full shadow-xl ring-2 ring-slate-200 will-change-transform"
              style={{ rotate: rotateImage }}
            >
              <Image
                src={ROTATE_IMAGE}
                alt="Biển quảng cáo Toàn Cầu ADV trên cầu vượt Hải Phòng"
                fill
                sizes="(max-width: 640px) 18rem, 24rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-900/15" aria-hidden="true" />
            </motion.div>

            {/* Chip trung tâm đứng yên */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/95 px-6 py-4 text-center shadow-lg backdrop-blur">
                <p className="font-mono text-4xl font-bold text-brand-900 sm:text-5xl">~730</p>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  vị trí · 30+ tỉnh thành
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mt-10 max-w-md text-center text-sm text-slate-600"
            style={{ opacity: captionOpacity }}
          >
            Từ cửa ngõ cao tốc đến sân bay và trung tâm thương mại — mạng lưới xoay quanh
            hành trình di chuyển thật của khách hàng bạn.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
