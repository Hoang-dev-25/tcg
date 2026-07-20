"use client";

import { ArrowRight, Check, Lamp, Monitor, Plane, RectangleHorizontal, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { HexTexture, StarField } from "@/components/v3/decor";
import type { LucideName } from "@/lib/v3-data";
import { pricingTiers, type PricingTier } from "@/lib/v4-content";

const ICONS: Partial<Record<LucideName, LucideIcon>> = {
  plane: Plane,
  "rectangle-horizontal": RectangleHorizontal,
  monitor: Monitor,
  lamp: Lamp,
};

/** Thanh điểm AI — luôn kèm số + nhãn mức độ + lý do (không dùng màu đơn thuần). */
function AiScore({ tier }: { tier: PricingTier }) {
  return (
    <div className="grid gap-2 rounded-xl border border-white/15 bg-white/[.06] p-3.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[.75rem] font-semibold uppercase tracking-[.06em] text-v2blue-200">
          <Sparkles className="h-3.5 w-3.5" /> Điểm AI tham chiếu
        </span>
        <span className="font-mono text-[.9375rem] font-bold tabular-nums text-white">
          {tier.aiScore}
          <span className="text-[.75rem] font-medium text-slate-400">/100</span>
        </span>
      </div>
      <div aria-hidden className="h-1.5 w-full overflow-hidden rounded-full bg-white/12">
        <div
          className="h-full rounded-full bg-v2blue-400"
          style={{ width: `${tier.aiScore}%` }}
        />
      </div>
      <span className="text-[.75rem] font-semibold text-v2blue-200">Mức độ: {tier.aiTier}</span>
      <p className="m-0 text-[.75rem] leading-[1.55] text-slate-400">{tier.aiReason}</p>
    </div>
  );
}

function PriceCard({ tier, index }: { tier: PricingTier; index: number }) {
  const Icon = ICONS[tier.icon] ?? RectangleHorizontal;

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article
        className={`relative grid h-full content-start gap-4 rounded-2xl p-6 transition hover:-translate-y-1 ${
          tier.featured
            ? "border-[1.5px] border-v2blue-400 bg-white/[.09] shadow-v2-xl"
            : "border border-white/15 bg-white/[.04] hover:border-white/25"
        }`}
      >
        {tier.featured && (
          <span className="absolute -top-3 left-6 rounded-full bg-v2blue-400 px-3 py-1 text-[.6875rem] font-bold uppercase tracking-[.06em] text-v2blue-900">
            Được chọn nhiều nhất
          </span>
        )}

        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-v2blue-500/25 text-v2blue-200">
            <Icon className="h-[19px] w-[19px]" />
          </span>
          <h3 className="m-0 font-v2display text-[1.1875rem] font-semibold text-white">
            {tier.label}
          </h3>
        </div>

        <p className="m-0 text-[.875rem] leading-[1.6] text-slate-300">{tier.bestFor}</p>

        <div className="grid gap-0.5 border-y border-white/12 py-4">
          <span className="text-[.75rem] font-semibold uppercase tracking-[.06em] text-slate-400">
            Chi phí tham khảo từ
          </span>
          <strong className="font-mono text-[1.5rem] font-bold tabular-nums leading-tight text-white">
            {tier.priceFrom}
          </strong>
          <span className="text-[.8125rem] text-slate-400">{tier.priceNote}</span>
        </div>

        <dl className="m-0 grid gap-2">
          {tier.specs.map((sp) => (
            <div key={sp.label} className="flex items-baseline justify-between gap-3">
              <dt className="text-[.8125rem] text-slate-400">{sp.label}</dt>
              <dd className="m-0 text-right font-mono text-[.8125rem] font-semibold tabular-nums text-white">
                {sp.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="m-0 grid list-none gap-2 p-0">
          {tier.includes.map((inc) => (
            <li key={inc} className="flex items-start gap-2 text-[.8125rem] leading-[1.5] text-slate-200">
              <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-v2blue-500 text-white">
                <Check className="h-2.5 w-2.5" />
              </span>
              {inc}
            </li>
          ))}
        </ul>

        <AiScore tier={tier} />

        <a
          href="#lien-he"
          className={`mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[.9375rem] font-semibold transition ${
            tier.featured
              ? "v3-shine bg-v2blue-500 text-white hover:bg-v2blue-400"
              : "border border-white/30 text-white hover:bg-white/10"
          }`}
        >
          Nhận báo giá chi tiết <ArrowRight className="h-[17px] w-[17px]" />
        </a>
      </article>
    </Reveal>
  );
}

/**
 * Bảng giá theo loại hình (v4) — nền NAVY, đặt sau Quy trình (sáng) để giữ
 * nhịp xen kẽ sáng–đậm của trang. Mỗi thẻ mang đủ: định vị, giá tham khảo,
 * thông số, hạng mục đã bao gồm và điểm AI kèm lý do.
 *
 * ⚠️ Con số lấy từ lib/v4-content.ts — hiện là DỮ LIỆU MINH HOẠ, cần thay bằng
 * biểu giá thật trước khi phát hành (xem ghi chú đầu file dữ liệu).
 */
export function PricingV4() {
  return (
    <section
      id="bang-gia"
      className="relative overflow-hidden py-20 lg:py-24"
      style={{ background: "linear-gradient(165deg,#0D2F5E 0%,#134384 100%)" }}
    >
      <HexTexture size={30} glow={10} className="opacity-45" />
      <StarField count={8} />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 grid max-w-[680px] gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-100 backdrop-blur">
            Chi phí tham khảo
          </span>
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] text-white sm:text-4xl">
            Bốn loại hình, bốn mức ngân sách
          </h2>
          <p className="m-0 text-[1.0625rem] leading-[1.7] text-slate-300">
            Mức giá thay đổi theo vị trí cụ thể, thời gian thuê và mùa chiến dịch. Bảng dưới đây
            giúp bạn ước lượng nhanh trước khi nhận báo giá chính thức.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((t, i) => (
            <PriceCard key={t.label} tier={t} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="m-0 mt-8 max-w-[760px] text-[.8125rem] leading-[1.65] text-slate-400">
            Giá trên chưa bao gồm VAT và là mức khởi điểm cho vị trí phổ thông. Vị trí đắc địa,
            khung giờ vàng hoặc yêu cầu sản xuất đặc biệt sẽ được báo riêng theo từng chiến dịch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
