// Dữ liệu trang /v3 — CẤU TRÚC & NỘI DUNG lấy từ v1-tcg (homepage đầy đủ),
// TRÌNH BÀY theo ngôn ngữ thiết kế của v2 (font Lora + Jakarta, palette v2blue, shadow/animation v2).
// Ảnh dùng thẳng từ public/v1-assets và public/v2-assets đã copy sẵn.

export const logo = {
  src: "/v2-assets/assets/logo-full.png",
  alt: "Toàn Cầu ADV",
};

export const nav = [
  { href: "#top", label: "Trang chủ" },
  { href: "#spotlight", label: "Dịch vụ" },
  { href: "#ban-do", label: "Bản đồ" },
  { href: "#tin-tuc", label: "Tin tức" },
  { href: "#lien-he", label: "Liên hệ" },
];

/* ---------- HERO (v1: typewriter + floating cards) ---------- */
export interface HeroWord {
  word: string;
  img: string;
}
export const heroWords: HeroWord[] = [
  { word: "Billboard", img: "/v1-assets/assets/ooh/phapvan-51a.png" },
  { word: "Màn hình LED", img: "/v1-assets/assets/ooh/hanoi-cg01-nct.png" },
  { word: "Sân bay", img: "/v1-assets/assets/ooh/noibai-41b.jpg" },
  { word: "Nhà chờ xe bus", img: "/v1-assets/assets/ooh/quangninh-hl16.jpg" },
];
export const heroStats = [
  { value: "730+", label: "Vị trí quảng cáo toàn quốc" },
  { value: "400+", label: "Nhãn hàng đồng hành" },
  { value: "20+", label: "Năm kinh nghiệm" },
];

/* ---------- PARTNERS (v1 Stats marquee: logo đối tác thật qua logo.dev) ---------- */
export const partnerLogoToken = "pk_X-1ZO13GSgeOoUrIuJ6GMQ";
export interface Partner {
  name: string;
  domain: string;
}
export const partners: Partner[] = [
  { name: "Vinamilk", domain: "vinamilk.com.vn" },
  { name: "Viettel", domain: "viettel.com.vn" },
  { name: "Vietcombank", domain: "vietcombank.com.vn" },
  { name: "Vietnam Airlines", domain: "vietnamairlines.com" },
  { name: "VinFast", domain: "vinfastauto.com" },
  { name: "FPT", domain: "fpt.com" },
  { name: "Techcombank", domain: "techcombank.com.vn" },
  { name: "Highlands Coffee", domain: "highlandscoffee.com.vn" },
  { name: "MB Bank", domain: "mbbank.com.vn" },
  { name: "Thế Giới Di Động", domain: "thegioididong.com" },
  { name: "BIDV", domain: "bidv.com.vn" },
  { name: "Masan", domain: "masangroup.com" },
];

/* ---------- SPOTLIGHT (v1: 5 dịch vụ nổi bật, tab switcher) ---------- */
export type LucideName =
  | "plane"
  | "rectangle-horizontal"
  | "monitor"
  | "lamp"
  | "briefcase";
export interface FeaturedService {
  icon: LucideName;
  label: string;
  title: string;
  desc: string;
  img: string;
  cta: string;
}
export const featuredServices: FeaturedService[] = [
  {
    icon: "plane",
    label: "Sân bay",
    title: "Tiếp cận nhóm khách chi trả cao",
    desc: "Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn: băng chuyền, sảnh đến/đi, ống lồng. Tiếp cận doanh nhân, khách du lịch và khách quốc tế trong thời gian chờ chuyến kéo dài.",
    img: "/v1-assets/assets/ooh/noibai-41b.jpg",
    cta: "Xem dịch vụ sân bay",
  },
  {
    icon: "rectangle-horizontal",
    label: "Billboard",
    title: "Hiện diện tại cửa ngõ và trục đường lớn",
    desc: "Biển quảng cáo tấm lớn tại nút giao, cửa ngõ đô thị và cao tốc trên 30+ tỉnh thành. Khảo sát, thiết kế, in ấn và thi công trọn gói, hỗ trợ giấy phép quảng cáo.",
    img: "/v1-assets/assets/ooh/phapvan-19a.png",
    cta: "Xem dịch vụ billboard",
  },
  {
    icon: "monitor",
    label: "Màn hình LED",
    title: "Nội dung linh hoạt, đổi theo khung giờ",
    desc: "LED ngoài trời và LCD/frame tại thang máy, trung tâm thương mại. Đặt theo spot 15 đến 30 giây, đổi nội dung nhanh, báo cáo tần suất phát thực tế.",
    img: "/v1-assets/assets/ooh/hanoi-cg01-nct.png",
    cta: "Xem dịch vụ LED",
  },
  {
    icon: "lamp",
    label: "Pano · Hộp đèn",
    title: "Phủ dày theo tuyến, chi phí hợp lý",
    desc: "Quảng cáo tại nhà chờ xe bus, giải phân cách và tuyến phố. Chi phí vào cửa thấp, phù hợp chiến dịch khu vực và mở điểm bán, có combo nhiều mặt giảm chi phí.",
    img: "/v1-assets/assets/ooh/quangninh-hl16.jpg",
    cta: "Xem dịch vụ pano",
  },
  {
    icon: "briefcase",
    label: "Dự án tiêu biểu",
    title: "Đồng hành cùng 400+ nhãn hàng",
    desc: "Từ FMCG, ngân hàng đến hàng không và công nghệ. Xem các chiến dịch OOH tiêu biểu Toàn Cầu ADV đã triển khai trên toàn quốc.",
    img: "/v1-assets/assets/ooh/haiphong-caurao2.jpg",
    cta: "Xem dự án tiêu biểu",
  },
];

/* ---------- MAP PREVIEW (v1: bản đồ dotted + badge, CTA sang trang bản đồ) ---------- */
export const mapPreview = {
  eyebrow: "Bản đồ trực tuyến",
  title: "Bản đồ vị trí OOH toàn quốc",
  desc: "Lọc theo tỉnh/thành, loại biển, ngân sách. Xem điểm AI và chọn vị trí để nhận báo giá trong vài phút.",
  image: "/v1-assets/assets/world-map-dotted.png",
  stats: [
    { value: "~730", label: "Vị trí OOH" },
    { value: "30+", label: "Tỉnh/thành" },
  ],
  liveLabel: "Đang khai thác trực tiếp",
  aiLabel: "Điểm AI theo ngành hàng",
};

/* ---------- JOURNEY (v1: dòng thời gian 20 năm) ---------- */
export type JourneyIcon = "building" | "trending" | "plane" | "map" | "sparkles";
export interface JourneyItem {
  year: string;
  icon: JourneyIcon;
  title: string;
  desc: string;
}
export const journey: JourneyItem[] = [
  {
    year: "2003",
    icon: "building",
    title: "Thành lập doanh nghiệp",
    desc: "Bắt đầu từ tổ chức sự kiện, hội chợ triển lãm, tư vấn quy hoạch quảng cáo, thiết kế và in ấn.",
  },
  {
    year: "2005",
    icon: "trending",
    title: "Mở rộng biển quảng cáo ngoài trời",
    desc: "Phát triển mạnh sang biển quảng cáo tấm lớn ngoài trời trên toàn quốc.",
  },
  {
    year: "2010s",
    icon: "plane",
    title: "Mở rộng sân bay và LED",
    desc: "Đầu tư hệ thống LED, quảng cáo tại sân bay, nhà chờ, billboard và pano.",
  },
  {
    year: "2020s",
    icon: "map",
    title: "Mạng lưới toàn quốc",
    desc: "Vận hành ~730 vị trí, 89.000 m² diện tích khai thác, phục vụ 400+ nhãn hàng.",
  },
  {
    year: "2026",
    icon: "sparkles",
    title: "Chuyển đổi số",
    desc: "Ra mắt bản đồ vị trí và điểm AI, số hóa dữ liệu và tự động hoá báo giá.",
  },
];

/* ---------- CASES (v1: tin tức / dự án tiêu biểu) ---------- */
export interface NewsCard {
  img: string;
  date: string;
  tag: string;
  title: string;
}
export const newsCards: NewsCard[] = [
  {
    img: "/v1-assets/assets/ooh/phapvan-57a.png",
    date: "14.07.2026",
    tag: "Hệ thống vị trí",
    title: "Khai trương màn hình LED 250m² tại nút giao Pháp Vân – Cầu Giẽ",
  },
  {
    img: "/v1-assets/assets/ooh/hanoi-133-stkm.jpg",
    date: "11.07.2026",
    tag: "Thị trường OOH",
    title: "Chi tiêu quảng cáo ngoài trời Việt Nam tăng 12,4% nửa đầu 2026",
  },
  {
    img: "/v1-assets/assets/ooh/hanoi-cg01-nct.png",
    date: "08.07.2026",
    tag: "Sản phẩm số",
    title: "Điểm AI phiên bản 2.0: bổ sung dữ liệu lưu lượng theo khung giờ",
  },
  {
    img: "/v1-assets/assets/ooh/bacninh-10b.png",
    date: "02.07.2026",
    tag: "Hệ thống vị trí",
    title: "Toàn Cầu mở rộng hệ thống LED tại trục Phạm Hùng",
  },
];

/* ---------- LEAD FORM (v1: form đầy đủ + lợi ích + số liệu) ---------- */
export const leadForm = {
  title: "Nhận tư vấn OOH miễn phí",
  desc: "Để lại thông tin, đội ngũ Toàn Cầu liên hệ trong 24h.",
  benefits: [
    "Tư vấn vị trí theo ngành hàng, có điểm AI gợi ý",
    "Báo giá PDF nháp trong vài phút, 24/7",
    "Khảo sát và thi công trọn gói toàn quốc",
    "20 năm kinh nghiệm, 400+ nhãn hàng đã hợp tác",
  ],
  stats: [
    { value: "20+", label: "Năm OOH" },
    { value: "~730", label: "Vị trí" },
    { value: "30+", label: "Tỉnh/thành" },
  ],
  hotline: "024 3929 0088",
  fields: [
    { label: "Họ tên", placeholder: "Nguyễn Văn A", required: true },
    { label: "Số điện thoại", placeholder: "09xx xxx xxx", required: true },
    { label: "Doanh nghiệp", placeholder: "Tên công ty", required: false },
    { label: "Email", placeholder: "ban@congty.vn", required: false },
    { label: "Ngành hàng", placeholder: "Ví dụ: F&B, Thời trang, Mỹ phẩm…", required: false },
    { label: "Ngân sách", placeholder: "Ví dụ: 50-150 triệu/tháng", required: false },
  ],
};

/* ---------- CTA BAND (v1) ---------- */
export const ctaBand = {
  title: "Sẵn sàng tìm vị trí OOH cho chiến dịch tiếp theo?",
  desc: "Dù bạn là nhãn hàng, agency hay chủ mặt bằng, Toàn Cầu ADV có dữ liệu và đội ngũ để chiến dịch của bạn thành công.",
  note: "Bạn là chủ biển muốn cho thuê? Sàn OOH sắp ra mắt.",
  image: "/v1-assets/assets/ooh/quangninh-hl30-cta.jpg",
  badge: {
    title: "Cầu Bãi Cháy — Hạ Long",
    sub: "Thương hiệu của bạn trên hành trình mỗi ngày",
  },
};

/* ---------- CONTACT / FOOTER (v1) ---------- */
export const contactInfo = {
  hotline: "024 3929 0088",
  careline: "1900 6522",
  email: "info@toancauadv.vn",
  address: "265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam",
  hours: "Giờ hành chính từ thứ 2 đến sáng thứ 7",
};
export const footerLegal = {
  name: "Công Ty Cổ Phần Tập Đoàn Quảng Cáo Toàn Cầu",
  copyright: "© 2026 Công ty Cổ phần Tập đoàn Quảng cáo Toàn Cầu",
};
export interface FooterCol {
  title: string;
  items: string[];
}
export const footerCols: FooterCol[] = [
  { title: "Doanh nghiệp", items: ["Về Toàn Cầu", "Khách hàng", "Tin tức", "Tuyển dụng", "Liên hệ"] },
  { title: "Dịch vụ", items: ["Quảng cáo sân bay", "Billboard · Pano", "Màn hình LED", "Nhà chờ xe bus"] },
  { title: "Vị trí OOH", items: ["Bản đồ vị trí", "Theo tỉnh/thành", "Vị trí còn trống"] },
];
