"use client";

import { useEffect } from "react";

/**
 * Chặn copy / cut / menu chuột phải trên toàn trang v4 (feedback):
 * ngoài các nút ra không cho thao tác gì với chữ. Chừa ô nhập liệu
 * của form để người dùng vẫn copy/sửa nội dung mình gõ.
 */
export function SelectGuard() {
  useEffect(() => {
    const isEditable = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.closest("input, textarea, select") !== null;
    const block = (e: Event) => {
      if (!isEditable(e.target)) e.preventDefault();
    };
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", block);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", block);
    };
  }, []);

  return null;
}
