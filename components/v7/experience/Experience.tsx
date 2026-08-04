"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { V7Overlay } from "@/components/v7/overlay/Overlay";
import { useVirtualScroll } from "./useVirtualScroll";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/* ===== /v7 · "Xuyên qua ánh sáng" =====
   Một viewport 100dvh, KHÔNG thanh cuộn dọc. Con lăn/vuốt/phím đẩy tiến trình
   một cú máy 3D liền mạch qua 6 giai đoạn. */
export function V7Experience() {
  const [ready, setReady] = useState(false);
  useVirtualScroll();

  /* Khóa cuộn tài liệu suốt thời gian ở trang này */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    const t = window.setTimeout(() => setReady(true), 90);
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = "";
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="v7-stage relative h-[100dvh] w-full overflow-hidden bg-[#04070f]">
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>
      <V7Overlay />
      {/* Màn che lúc khởi động — tránh nháy trắng trước frame WebGL đầu tiên */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40 bg-[#04070f] transition-opacity duration-700"
        style={{ opacity: ready ? 0 : 1 }}
      />
    </div>
  );
}
