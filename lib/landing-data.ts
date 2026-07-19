const ASSETS = "https://hoanglearncode.github.io/v1-tcg/assets";

export const assets = {
  logo: `${ASSETS}/logo-full.png`,
  worldMap: `${ASSETS}/world-map-dotted.png`,
};

/** Hero: từ khoá typewriter + ảnh crossfade tương ứng. */
export const heroWords = [
  { word: "Billboard", img: `${ASSETS}/ooh/phapvan-51a.png` },
  { word: "Màn hình LED", img: `${ASSETS}/ooh/hanoi-cg01-nct.png` },
  { word: "Sân bay", img: `${ASSETS}/ooh/noibai-41b.jpg` },
  { word: "Nhà chờ xe bus", img: `${ASSETS}/ooh/quangninh-hl16.jpg` },
];

export const heroStats = [
  { value: 730, suffix: "+", label: "Vị trí quảng cáo toàn quốc" },
  { value: 400, suffix: "+", label: "Nhãn hàng đồng hành" },
  { value: 20, suffix: "+", label: "Năm kinh nghiệm" },
];

/** Logo đối tác (demo qua logo.dev — thay logo thật khi có). */
const LOGO_TOKEN = "pk_X-1ZO13GSgeOoUrIuJ6GMQ";
export const partnerLogo = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png&size=200&retina=true`;

export const partners = [
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

export type FeaturedService = {
  slug: string;
  label: string;
  title: string;
  desc: string;
  img: string;
  cta: string;
};

/** Spotlight: dịch vụ nổi bật dạng tab. */
export const featuredServices: FeaturedService[] = [
  {
    slug: "san-bay",
    label: "Sân bay",
    title: "Tiếp cận nhóm khách chi trả cao",
    desc: "Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn: băng chuyền, sảnh đến/đi, ống lồng. Tiếp cận doanh nhân, khách du lịch và khách quốc tế trong thời gian chờ chuyến kéo dài.",
    img: `${ASSETS}/ooh/noibai-41b.jpg`,
    cta: "Xem dịch vụ sân bay",
  },
  {
    slug: "billboard",
    label: "Billboard",
    title: "Hiện diện tại cửa ngõ và trục đường lớn",
    desc: "Biển quảng cáo tấm lớn tại nút giao, cửa ngõ đô thị và cao tốc trên 30+ tỉnh thành. Khảo sát, thiết kế, in ấn và thi công trọn gói, hỗ trợ giấy phép quảng cáo.",
    img: `${ASSETS}/ooh/phapvan-19a.png`,
    cta: "Xem dịch vụ billboard",
  },
  {
    slug: "led",
    label: "Màn hình LED",
    title: "Nội dung linh hoạt, đổi theo khung giờ",
    desc: "LED ngoài trời và LCD/frame tại thang máy, trung tâm thương mại. Đặt theo spot 15 đến 30 giây, đổi nội dung nhanh, báo cáo tần suất phát thực tế.",
    img: `${ASSETS}/ooh/hanoi-cg01-nct.png`,
    cta: "Xem dịch vụ LED",
  },
  {
    slug: "pano",
    label: "Pano · Hộp đèn",
    title: "Phủ dày theo tuyến, chi phí hợp lý",
    desc: "Quảng cáo tại nhà chờ xe bus, giải phân cách và tuyến phố. Chi phí vào cửa thấp, phù hợp chiến dịch khu vực và mở điểm bán, có combo nhiều mặt giảm chi phí.",
    img: `${ASSETS}/ooh/quangninh-hl16.jpg`,
    cta: "Xem dịch vụ pano",
  },
  {
    slug: "du-an",
    label: "Dự án tiêu biểu",
    title: "Đồng hành cùng 400+ nhãn hàng",
    desc: "Từ FMCG, ngân hàng đến hàng không và công nghệ. Xem các chiến dịch OOH tiêu biểu Toàn Cầu ADV đã triển khai trên toàn quốc.",
    img: `${ASSETS}/ooh/haiphong-caurao2.jpg`,
    cta: "Xem dự án tiêu biểu",
  },
];

export const journey = [
  {
    year: "2003",
    title: "Thành lập doanh nghiệp",
    desc: "Bắt đầu từ tổ chức sự kiện, hội chợ triển lãm, tư vấn quy hoạch quảng cáo, thiết kế và in ấn.",
  },
  {
    year: "2005",
    title: "Mở rộng biển quảng cáo ngoài trời",
    desc: "Phát triển mạnh sang biển quảng cáo tấm lớn ngoài trời trên toàn quốc.",
  },
  {
    year: "2010s",
    title: "Mở rộng sân bay và LED",
    desc: "Đầu tư hệ thống LED, quảng cáo tại sân bay, nhà chờ, billboard và pano.",
  },
  {
    year: "2020s",
    title: "Mạng lưới toàn quốc",
    desc: "Vận hành ~730 vị trí, 89.000 m² diện tích khai thác, phục vụ 400+ nhãn hàng.",
  },
  {
    year: "2026",
    title: "Chuyển đổi số",
    desc: "Ra mắt bản đồ vị trí và điểm AI, số hóa dữ liệu và tự động hoá báo giá.",
  },
];

export const cases = [
  {
    img: `${ASSETS}/ooh/phapvan-57a.png`,
    date: "14.07.2026",
    tag: "Hệ thống vị trí",
    title: "Khai trương màn hình LED 250m² tại nút giao Pháp Vân – Cầu Giẽ",
  },
  {
    img: `${ASSETS}/ooh/hanoi-133-stkm.jpg`,
    date: "11.07.2026",
    tag: "Thị trường OOH",
    title: "Chi tiêu quảng cáo ngoài trời Việt Nam tăng 12,4% nửa đầu 2026",
  },
  {
    img: `${ASSETS}/ooh/hanoi-cg01-nct.png`,
    date: "08.07.2026",
    tag: "Sản phẩm số",
    title: "Điểm AI phiên bản 2.0: bổ sung dữ liệu lưu lượng theo khung giờ",
  },
  {
    img: `${ASSETS}/ooh/bacninh-10b.png`,
    date: "02.07.2026",
    tag: "Hệ thống vị trí",
    title: "Toàn Cầu mở rộng hệ thống LED tại trục Phạm Hùng",
  },
];

export const leadBenefits = [
  "Tư vấn vị trí theo ngành hàng, có điểm AI gợi ý",
  "Báo giá PDF nháp trong vài phút, 24/7",
  "Khảo sát và thi công trọn gói toàn quốc",
  "20 năm kinh nghiệm, 400+ nhãn hàng đã hợp tác",
];

export const ctaImage = `${ASSETS}/ooh/quangninh-hl30-cta.jpg`;
