import type { Metadata } from "next";

import "./v6.css";

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — v6 Wireframe: hành trình zoom xuyên thành phố",
  description:
    "Bản wireframe v6: một viewport duy nhất, cuộn chuột điều khiển camera zoom xuyên 6 lớp cảnh — thành phố đêm, màn LED 20 năm, không gian AI, dịch vụ, bản đồ dự án, liên hệ.",
};

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    /* Khóa scroll tài liệu: toàn bộ cuộn diễn ra trong scroller ẩn thanh cuộn của page */
    <div className="fixed inset-0 overflow-hidden bg-[#04091a] text-slate-100 antialiased">
      {children}
    </div>
  );
}
