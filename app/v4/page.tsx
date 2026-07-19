import { Partners } from "@/components/v3/partners";
import { Footer } from "@/components/v3/footer";
import { Reveal } from "@/components/landing/reveal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HeaderV4 } from "@/components/v4/header";
import { V4Hero } from "@/components/v4/hero";
import { IntroV4 } from "@/components/v4/intro";
import { AiShowcase } from "@/components/v4/ai-showcase";
import { ServicesDeck } from "@/components/v4/services-deck";
import { DriftText } from "@/components/v4/drift-text";
import { CasesV4 } from "@/components/v4/cases";
import { LeadFormV4 } from "@/components/v4/lead-form";
import { CtaBandV4 } from "@/components/v4/cta-band";
import { FooterReveal } from "@/components/v4/footer-reveal";

/**
 * Nhịp trang (theo brief): hero ĐÈ (cover) → logo nghỉ → hành trình ngang →
 * AI Showcase KHỰNG (pin) → dịch vụ TRÔI tự nhiên → cases navy → form → CTA echo →
 * footer MỞ MÀN (curtain). Xen kẽ động–tĩnh, sáng–đậm.
 */
export default function V4Page() {
  return (
    <SmoothScroll anchorOffset={-72}>
      <HeaderV4 />
      <V4Hero />
      {/* -mt-[100dvh]: phần này trượt lên phủ hero đang ghim (hiệu ứng camera zoom) */}
      <main className="relative z-10 -mt-[100dvh]">
        {/* overflow-clip (không phải hidden) để position:sticky của các section con vẫn hoạt động */}
        <div className="overflow-clip rounded-t-[8px] bg-white shadow-[0_-24px_60px_rgba(13,47,94,.35)]">
          <IntroV4 />
          <AiShowcase />
          <DriftText />
          <ServicesDeck />
          <CasesV4 />
          <LeadFormV4 />
          <CtaBandV4 />
        </div>
      </main>
      {/* Footer curtain: fixed sau toàn trang (kể cả hero) + spacer cuối luồng */}
      <FooterReveal>
        <Footer />
      </FooterReveal>
    </SmoothScroll>
  );
}
