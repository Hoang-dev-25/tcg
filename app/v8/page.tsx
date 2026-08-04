import { Hero } from "@/components/v8/Hero";
import { QuoteSection } from "@/components/v8/QuoteSection";

/**
 * v8 — "Serene": landing 2 màn hình full-viewport cho thương hiệu
 * beauty/wellness cao cấp. Hero video + navbar liquid, quote section
 * parallax cầu vồng/mây theo tiến trình cuộn (rAF + lerp).
 */
export default function V8Page() {
  return (
    <div className="bg-[#0a0608]">
      <Hero />
      <QuoteSection />
    </div>
  );
}
