import type { Metadata } from "next";

import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { RotateShowcase } from "@/components/landing/rotate-showcase";
import { RevealTransition } from "@/components/landing/reveal-transition";
import { ServiceDeck } from "@/components/landing/service-deck";
import { StatsDrift } from "@/components/landing/stats-drift";
import { LeadForm } from "@/components/landing/lead-form";
import { SiteFooter } from "@/components/landing/site-footer";

export const metadata: Metadata = {
  title: "Toàn Cầu ADV | Trang chủ",
  description:
    "Giải pháp quảng cáo ngoài trời hàng đầu Việt Nam: ~730 vị trí billboard, LED, sân bay và nhà chờ xe bus trên 30+ tỉnh thành, kèm điểm AI theo ngành hàng.",
};

export default function OohPage() {
  return (
    <div className="bg-white font-body text-slate-800">
      <SmoothScroll anchorOffset={-72}>
        <ScrollProgress className="from-brand-600 via-brand-500 to-brick-500" />
        <SiteNav />
        <main>
          <Hero />
          <RotateShowcase />
          <RevealTransition />
          <ServiceDeck />
          <StatsDrift />
          <LeadForm />
        </main>
        <SiteFooter />
      </SmoothScroll>
    </div>
  );
}
