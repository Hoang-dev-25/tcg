import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";

import "./v3-theme.css";

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
  title: "Toàn Cầu ADV — Quảng cáo ngoài trời (OOH) đúng vị trí, đúng thời điểm",
  description:
    "Bản phối layout/màu sắc của v2 với dữ liệu thật (vị trí, dịch vụ, điểm AI, tin tức) từ hệ thống v1.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${v2Lora.variable} ${v2Jakarta.variable} font-v2sans bg-white text-slate-900 antialiased`}
    >
      {children}
    </div>
  );
}
