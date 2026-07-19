"use client";

const layers = [
  "Đa lớp tốc độ",
  "Depth zoom",
  "Chữ đối lưu",
  "Thẻ xếp chồng",
  "Cuộn ngang",
  "Xoay theo cuộn",
  "Phân rã lớp",
  "Vận tốc & skew",
  "Vòng tròn mở màn",
  "Phối cảnh 3D",
  "Lưới lệch nhịp",
  "Canvas scrub",
  "Vẽ nét SVG",
  "Chữ hiện dần",
  "Đổi màu nền",
  "Parallax chuột",
  "Tiến độ toàn trang",
  "Footer reveal",
];

/** Chấm điều hướng cố định bên phải — nhảy nhanh tới từng layer. */
export function LayerNav() {
  return (
    <nav
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      aria-label="Điều hướng 18 lớp"
    >
      {layers.map((name, i) => (
        <a
          key={name}
          href={`#layer-${String(i + 1).padStart(2, "0")}`}
          title={`Lớp ${i + 1}: ${name}`}
          aria-label={`Tới lớp ${i + 1}: ${name}`}
          className="group relative flex h-3 w-3 items-center justify-center"
        >
          <span className="h-2 w-2 rounded-full bg-white/25 transition-all group-hover:scale-125 group-hover:bg-neon-cyan group-focus-visible:bg-neon-cyan" />
        </a>
      ))}
    </nav>
  );
}
