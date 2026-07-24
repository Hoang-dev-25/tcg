import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";

import "./v6.css";

/* Font theo design system: Lora cho display, Plus Jakarta Sans cho body */
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  variable: "--font-v6-display",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-v6-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — Một chuyến bay đêm qua thành phố quảng cáo",
  description:
    "Trải nghiệm 3D: một chuyến bay drone xuyên thành phố đêm — billboard, pano, màn hình LED, 20 năm Toàn Cầu ADV, bản đồ dự án toàn quốc.",
};

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${lora.variable} ${jakarta.variable} v6-root bg-[#060a13] text-slate-100 antialiased`}>
      {children}
    </div>
  );
}
