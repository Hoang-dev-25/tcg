/* Cầu nối duy nhất giữa bộ điều khiển cuộn ảo (ghi) và useFrame/rAF (đọc).
   Module ref — KHÔNG setState theo frame. */
export const scrollState = {
  /** đích do con lăn/vuốt/phím đẩy tới, 0 → 1 */
  target: 0,
  /** giá trị đã làm mượt — camera & overlay đọc cái này */
  current: 0,
  /** tốc độ cuộn tức thời (dùng cho FOV kick, streak, skew) */
  velocity: 0,
  /** con trỏ chuột chuẩn hoá -1..1, cho parallax nhẹ theo chuột */
  pointer: { x: 0, y: 0 },
  /** true khi người dùng đang thực sự tương tác (ẩn gợi ý cuộn) */
  engaged: false,
};

/* Điều khiển tiến trình từ DOM (nút CTA, chấm chuyển giai đoạn).
   useVirtualScroll gán hàm thật vào đây khi mount. */
export const scrollApi = {
  goTo: (_p: number, _duration?: number) => {},
};

/* Toàn bộ "phim" dài bằng ngần này chiều cao viewport — quyết định độ nhạy
   của con lăn. 8 màn hình ≈ 60–70 nấc lăn cho trọn hành trình. */
export const VIRTUAL_TRACK_VH = 8;
