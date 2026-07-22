import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";

import "./v5-theme.css";

import { SelectGuard } from "@/components/v4/select-guard";
import { UniverseBg } from "@/components/v5/universe-bg";

const v2Lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v2-lora",
  display: "swap",
});

const v2Jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-v2-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — v5 Universe: OOH đúng vị trí, đúng thời điểm",
  description:
    "Bản thử nghiệm v5: nội dung v4 trên nền vũ trụ trong suốt — starfield parallax, nebula, texture nhiễu hạt.",
};

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${v2Lora.variable} ${v2Jakarta.variable} v5-scope v4-select-guard font-v2sans bg-[#050B1D] text-slate-100 antialiased`}
    >
      <SelectGuard />
      <UniverseBg />
      {children}
    </div>
  );
}
