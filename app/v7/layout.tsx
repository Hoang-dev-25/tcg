import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./v7.css";

/* Spec v7 yêu cầu sans-serif hiện đại, to, rõ → dùng Plus Jakarta Sans cho cả
   tiêu đề lẫn thân bài (không dùng serif như v6). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-v7-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — Thương hiệu của bạn, vươn tầm đại chúng",
  description:
    "Trải nghiệm cuộn-zoom 3D: từ toàn cảnh thành phố đêm, xuyên qua màn hình LED vào không gian dữ liệu AI, lan tỏa tới billboard – pano – màn LED và bản đồ 500+ dự án của Toàn Cầu ADV.",
};

export default function V7Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${jakarta.variable} v7-root bg-[#04070f] text-slate-100 antialiased`}>
      {children}
    </div>
  );
}
