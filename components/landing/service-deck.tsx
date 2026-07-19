"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const ASSETS = "https://hoanglearncode.github.io/v1-tcg/assets";

type DeckCard = {
  label: string;
  advantage: string;
  img: string;
  imgAlt: string;
};

const cards: DeckCard[] = [
  {
    label: "Màn hình LED",
    advantage: "Đổi nội dung theo khung giờ, báo cáo tần suất phát thực tế.",
    img: `${ASSETS}/ooh/hanoi-cg01-nct.png`,
    imgAlt: "Màn hình LED của Toàn Cầu ADV tại trục Nguyễn Chí Thanh",
  },
  {
    label: "Billboard",
    advantage: "Tấm lớn tại nút giao, cửa ngõ và cao tốc trên 30+ tỉnh thành.",
    img: `${ASSETS}/ooh/phapvan-19a.png`,
    imgAlt: "Billboard tấm lớn tại nút giao Pháp Vân",
  },
  {
    label: "Sân bay",
    advantage: "Tiếp cận nhóm khách chi trả cao trong thời gian chờ chuyến dài.",
    img: `${ASSETS}/ooh/noibai-41b.jpg`,
    imgAlt: "Hộp đèn quảng cáo tại nhà ga T2 Nội Bài",
  },
];

function CardBody({ card }: { card: DeckCard }) {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:w-80">
      <div className="relative aspect-[4/3]">
        <Image src={card.img} alt={card.imgAlt} fill sizes="20rem" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-brand-600/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-white shadow-sm">
          {card.label}
        </span>
      </div>
      <div className="grid gap-3 p-5">
        <h3 className="text-lg font-bold text-brand-900">{card.label}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{card.advantage}</p>
        <a
          href="#lien-he"
          className="inline-flex h-10 w-fit items-center gap-1.5 rounded-lg bg-brick-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brick-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Nhận tư vấn <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Một thẻ trong bộ bài: từ chồng giữa tách ngang ra vị trí riêng (kỹ thuật lớp 07). */
function ExplodedCard({
  card,
  index,
  progress,
}: {
  card: DeckCard;
  index: number;
  progress: MotionValue<number>;
}) {
  const offset = index - 1; // -1, 0, 1
  const x = useTransform(progress, [0.12, 0.7], [offset * 16, offset * 350]);
  const rotate = useTransform(progress, [0.12, 0.7], [offset * 6, 0]);
  const y = useTransform(progress, [0.12, 0.7], [Math.abs(offset) * 10, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{ x, y, rotate, zIndex: 10 - Math.abs(offset) }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <CardBody card={card} />
      </div>
    </motion.div>
  );
}

/**
 * Kỹ thuật LỚP 07 (exploded layers) áp lên bộ thẻ dịch vụ:
 * 3 thẻ ảnh + label + CTA chồng như bộ bài ở giữa, tách ngang khi cuộn.
 * Mobile / reduced-motion: danh sách tĩnh.
 */
export function ServiceDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section id="dich-vu" className="bg-slate-50" aria-label="Các loại hình dịch vụ">
      {/* Desktop: bộ bài tách ngang trong khung sticky */}
      <div className={cn("hidden lg:block", reducedMotion && "lg:hidden")}>
        <div ref={ref} className="relative h-[280vh]">
          <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
            <motion.div className="pt-24 text-center" style={{ opacity: headingOpacity }}>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brick-500">
                Loại hình OOH
              </span>
              <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">
                Tách bộ thẻ, chọn <span className="text-brand-600">điểm chạm</span>
              </h2>
            </motion.div>
            <div className="relative flex-1">
              {cards.map((card, i) => (
                <ExplodedCard key={card.label} card={card} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion: danh sách tĩnh */}
      <div className={cn("py-20 lg:hidden", reducedMotion && "lg:block")}>
        <div className="mx-auto max-w-6xl px-6 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-brick-500">
            Loại hình OOH
          </span>
          <h2 className="text-3xl font-bold text-brand-900">
            Chọn <span className="text-brand-600">điểm chạm</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {cards.map((card) => (
              <CardBody key={card.label} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
