import { Footer } from "@/components/v3/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HeaderV5 } from "@/components/v5/header";
import { V5Hero } from "@/components/v5/hero";
import { IntroV4 } from "@/components/v4/intro";
import { AiShowcase } from "@/components/v4/ai-showcase";
import { ServicesDeck } from "@/components/v4/services-deck";
import { DriftText } from "@/components/v4/drift-text";
import { CasesV4 } from "@/components/v4/cases";
import { LeadFormV4 } from "@/components/v4/lead-form";
import { CtaBandV4 } from "@/components/v4/cta-band";

/**
 * v5 = nhịp trang của v4 nhưng đổi ngôn ngữ nền: mọi section trong suốt / kính mờ
 * trên nền vũ trụ fixed (UniverseBg ở layout) — starfield parallax theo scroll,
 * nebula trôi, texture nhiễu hạt. Màu nền/chữ của các section v4 được remap
 * sang tông tối trong app/v5/v5-theme.css (khối "V5 Universe overrides").
 */
export default function V5Page() {
  return (
    <SmoothScroll anchorOffset={-72}>
      <HeaderV5 />
      <V5Hero />
      {/* -mt-[100dvh]: phần này trượt lên phủ hero đang ghim (hiệu ứng camera zoom) */}
      <main className="relative z-10 -mt-[100dvh]">
        {/* Kính mờ tối thay cho bg-white của v4 — vẫn lộ sao phía sau */}
        <div className="overflow-clip rounded-t-[8px] border-t border-white/10 bg-[#081226]/55 shadow-[0_-24px_60px_rgba(2,6,18,.55)]">
          <IntroV4 />
          <AiShowcase />
          <DriftText />
          <ServicesDeck />
          <CasesV4 />
          <LeadFormV4 />
          <CtaBandV4 />
        </div>
      </main>
      {/* v5: footer nằm trong luồng thường — curtain reveal của v4 đặt footer
          SAU nội dung (sticky z-0), nhưng section v5 trong suốt nên footer sẽ
          "xuyên thấu" lên mọi section nếu giữ cách đó */}
      <div className="relative z-10">
        <Footer />
      </div>
    </SmoothScroll>
  );
}
