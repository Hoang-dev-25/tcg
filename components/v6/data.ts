/* Nội dung /v6 — chuyển từ wireframe cũ, KHÔNG bịa số liệu mới (spec mục 4). */

export const MILESTONES = [
  { year: "2005", title: "Văn phòng đầu tiên", note: "Khởi đầu tại TP. Hồ Chí Minh với 5 thành viên" },
  { year: "2009", title: "Billboard đầu tay", note: "Biển tấm lớn đầu tiên trên trục QL1A" },
  { year: "2014", title: "100 khách hàng", note: "Cột mốc 100 nhãn hàng đồng hành" },
  { year: "2019", title: "Mạng lưới LED", note: "Phủ màn hình LED tại 30 tỉnh thành" },
  { year: "2024", title: "Nền tảng AI", note: "Ra mắt hệ thống dữ liệu + AI đo lường" },
];

export const SERVICES = [
  { name: "Billboard", desc: "Biển tấm lớn truyền thống — vị trí cửa ngõ, quốc lộ, vòng xoay." },
  { name: "Pano", desc: "In UV chất liệu bạt, chịu thời tiết, bảo trì định kỳ." },
  { name: "Màn hình LED", desc: "Độ phân giải cao, đổi nội dung và quản lý từ xa." },
];

/* Toạ độ % trên khung bản đồ (gốc từ wireframe cũ) */
export const PINS = [
  { name: "Hà Nội", x: 46, y: 16 },
  { name: "Hải Phòng", x: 55, y: 20 },
  { name: "Đà Nẵng", x: 68, y: 47 },
  { name: "Nha Trang", x: 73, y: 61 },
  { name: "TP.HCM", x: 52, y: 79 },
  { name: "Cần Thơ", x: 44, y: 85 },
];

export const MAP_STATS = [
  { value: "500+", label: "dự án đã thi công" },
  { value: "200+", label: "khách hàng" },
  { value: "10M+", label: "lượt nhìn mỗi ngày" },
];

export const AI_STATS = [
  { value: "1.183.420", label: "lượt nhìn hôm nay" },
  { value: "3,8%", label: "tỷ lệ chuyển đổi trung bình" },
  { value: "214", label: "màn hình đang phát · 30 tỉnh thành" },
];

/* Đường bao VN trong hệ 220×420 (gốc từ SVG wireframe cũ) */
export const VN_OUTLINE: Array<[number, number]> = [
  [104, 16], [128, 30], [126, 58], [112, 72], [118, 96], [134, 130], [152, 172],
  [164, 214], [166, 252], [156, 296], [134, 330], [110, 356], [92, 378], [84, 354],
  [98, 324], [118, 296], [128, 262], [124, 228], [106, 190], [90, 152], [80, 118],
  [68, 92], [60, 64], [76, 44],
];

/* TP.HCM (52%, 79%) neo về gốc thế giới (0,0) — mốc neo tỉ lệ (spec 6.4).
   1% bản đồ = MAP_SCALE đơn vị thế giới. */
export const MAP_SCALE = 40;
export function pinToWorld(xPct: number, yPct: number): [number, number] {
  return [(xPct - 52) * MAP_SCALE, (yPct - 79) * MAP_SCALE];
}
