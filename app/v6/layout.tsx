import type { Metadata } from "next";

import "./v6.css";

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — Một chuyến bay đêm qua thành phố quảng cáo",
  description:
    "Trải nghiệm 3D: một chuyến bay drone xuyên thành phố đêm — billboard, pano, màn hình LED, 20 năm Toàn Cầu ADV, bản đồ dự án toàn quốc.",
};

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#04091a] text-slate-100 antialiased">{children}</div>;
}
