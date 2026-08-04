/* Nội dung /v7 — số liệu lấy nguyên từ dữ liệu đã dùng ở v3/v6.
   KHÔNG bịa tên khách hàng: các dự án gọi theo NGÀNH HÀNG. */

export const BRAND = {
  short: "Toàn Cầu ADV",
  legal: "Công ty Cổ phần Tập đoàn Quảng cáo Toàn Cầu",
  tagline: "ooh · billboard · pano · led",
  hotline: "024 3929 0088",
  email: "info@toancauadv.vn",
  address: "265 Thụy Khuê, Tây Hồ, Hà Nội",
};

/* --- Giai đoạn 1 --- */
export const HERO = {
  eyebrow: "Quảng cáo ngoài trời · Biển tấm lớn",
  title: "Thương hiệu của bạn, vươn tầm đại chúng",
  sub: "Billboard · Pano · Màn hình LED — phủ sóng 30+ tỉnh thành.",
  cta: "Khám phá ngay",
};

/* --- Giai đoạn 2: 20 năm --- */
export const TIMELINE_TITLE = "Hành trình 20 năm kiến tạo dấu ấn";

export const MILESTONES = [
  { year: "2005", title: "Văn phòng đầu tiên", note: "Khởi đầu tại TP. Hồ Chí Minh với 5 thành viên" },
  { year: "2009", title: "Billboard đầu tay", note: "Biển tấm lớn đầu tiên trên trục QL1A" },
  { year: "2014", title: "100 khách hàng", note: "Cột mốc 100 nhãn hàng đồng hành" },
  { year: "2019", title: "Mạng lưới LED", note: "Phủ màn hình LED tại 30 tỉnh thành" },
  { year: "2024", title: "Nền tảng AI", note: "Ra mắt hệ thống dữ liệu + AI đo lường" },
];

/* --- Giai đoạn 3: AI --- */
export const AI = {
  title: "AI tối ưu hoá hiệu quả quảng cáo",
  sub: "Phân tích thời gian thực trên toàn mạng lưới biển.",
};

export const AI_STATS = [
  { key: "views", value: 1183420, label: "lượt nhìn hôm nay", format: "int" as const },
  { key: "cvr", value: 3.8, label: "tỷ lệ chuyển đổi TB", format: "percent" as const },
  { key: "screens", value: 214, label: "màn hình đang phát", format: "int" as const },
  { key: "provinces", value: 30, label: "tỉnh thành phủ sóng", format: "plus" as const },
];

/* --- Giai đoạn 4: dịch vụ --- */
export const SERVICES = [
  {
    id: "billboard" as const,
    name: "Billboard",
    kicker: "Biển tấm lớn",
    desc: "Vị trí cửa ngõ, quốc lộ, vòng xoay — khung thép, đèn rọi, bảo trì định kỳ.",
    specs: ["Mặt biển 10×5m / 12×6m", "Cột đơn hoặc giàn 4 chân", "Dàn đèn 4–6 bóng"],
  },
  {
    id: "pano" as const,
    name: "Pano",
    kicker: "Bạt Hiflex in UV",
    desc: "In UV chất liệu bạt, chịu thời tiết, căng khoen dây chằng đúng kỹ thuật.",
    specs: ["Bạt Hiflex 3.2oz–5oz", "In UV bền màu 24–36 tháng", "Khung thép hộp mạ kẽm"],
  },
  {
    id: "led-cabinet" as const,
    name: "Màn hình LED",
    kicker: "Outdoor P4–P10",
    desc: "Độ phân giải cao, đổi nội dung và quản lý từ xa theo lịch phát.",
    specs: ["Cabinet chuẩn 960×960mm", "Độ sáng 6.500–8.000 nits", "Điều khiển từ xa 24/7"],
  },
];

/* --- Giai đoạn 5: bản đồ & dự án ---
   x,y là % trên khung bản đồ gốc (giữ nguyên hệ toạ độ của v6). */
export const PINS = [
  { name: "Hà Nội", x: 46, y: 16, sector: "Ngành F&B", metric: "3 biển LED · 1,2M lượt nhìn/ngày" },
  { name: "Hải Phòng", x: 55, y: 20, sector: "Ngành bán lẻ", metric: "Pano cửa ngõ QL5 · 12×6m" },
  { name: "Đà Nẵng", x: 68, y: 47, sector: "Ngành du lịch", metric: "Billboard sân bay · 730 mặt hệ thống" },
  { name: "Nha Trang", x: 73, y: 61, sector: "Ngành khách sạn", metric: "Cụm 4 pano ven biển" },
  { name: "TP.HCM", x: 52, y: 79, sector: "Ngành tài chính", metric: "LED trung tâm · phát 18h/ngày" },
  { name: "Cần Thơ", x: 44, y: 85, sector: "Ngành nông nghiệp", metric: "Billboard QL1A · 10×5m" },
];

export const MAP_TITLE = "Hơn 500 dự án · 200 khách hàng · 10 triệu lượt nhìn mỗi ngày";

export const MAP_STATS = [
  { value: "500+", label: "dự án đã thi công" },
  { value: "200+", label: "khách hàng" },
  { value: "10M+", label: "lượt nhìn mỗi ngày" },
];

/* --- Giai đoạn 6 --- */
export const CONTACT = {
  title: "Sẵn sàng đưa thương hiệu của bạn lên tầm cao mới?",
  sub: "Để lại thông tin, đội ngũ Toàn Cầu liên hệ trong 24h làm việc.",
  cta: "Liên hệ ngay",
};

export const CONTACT_FIELDS = [
  { name: "name", label: "Họ tên", placeholder: "Nguyễn Văn A", type: "text", required: true },
  { name: "email", label: "Email", placeholder: "ban@congty.vn", type: "email", required: true },
  { name: "phone", label: "Số điện thoại", placeholder: "09xx xxx xxx", type: "tel", required: true },
  { name: "need", label: "Nhu cầu", placeholder: "Ví dụ: 2 billboard cửa ngõ Hà Nội, 6 tháng", type: "text", required: false },
];

/* Đường bao Việt Nam trong hệ 220×420 (giữ nguyên từ v6) */
export const VN_OUTLINE: Array<[number, number]> = [
  [104, 16], [128, 30], [126, 58], [112, 72], [118, 96], [134, 130], [152, 172],
  [164, 214], [166, 252], [156, 296], [134, 330], [110, 356], [92, 378], [84, 354],
  [98, 324], [118, 296], [128, 262], [124, 228], [106, 190], [90, 152], [80, 118],
  [68, 92], [60, 64], [76, 44],
];
