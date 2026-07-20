/**
 * Dữ liệu nội dung bổ sung cho trang /v4 — bốn nhóm mới:
 * quy trình triển khai, bảng giá theo loại hình, câu hỏi thường gặp,
 * cam kết vận hành.
 *
 * ⚠️ DỮ LIỆU MINH HOẠ — CẦN THAY BẰNG SỐ THẬT TRƯỚC KHI PHÁT HÀNH:
 *  - `pricingTiers[].priceFrom` / `.priceNote`: khoảng giá dưới đây là ví dụ
 *    tham chiếu mặt bằng thị trường, KHÔNG phải báo giá của Toàn Cầu ADV.
 *  - `pricingTiers[].aiScore`: điểm AI mẫu, cần lấy từ hệ thống chấm điểm thật.
 *  - `processSteps[].duration`: SLA dự kiến, cần đối chiếu với vận hành thực tế.
 * Các mục còn lại (FAQ, cam kết vận hành) mô tả quy trình chứ không nêu số hiệu
 * giấy phép hay chứng chỉ — tránh khẳng định pháp lý chưa kiểm chứng.
 */

import type { LucideName } from "./v3-data";

/* ---------- QUY TRÌNH TRIỂN KHAI ---------- */

export type ProcessIcon =
  | "message-square"
  | "map-pinned"
  | "file-text"
  | "pen-tool"
  | "hard-hat"
  | "line-chart";

export interface ProcessStep {
  step: string;
  icon: ProcessIcon;
  title: string;
  desc: string;
  /** SLA dự kiến — hiển thị dạng chip mono. */
  duration: string;
  /** Đầu ra bàn giao cho khách ở mỗi bước. */
  output: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    icon: "message-square",
    title: "Tiếp nhận nhu cầu",
    desc: "Trao đổi ngành hàng, tệp khách mục tiêu, khu vực ưu tiên và ngân sách dự kiến của chiến dịch.",
    duration: "Trong 24h",
    output: "Bản tóm tắt yêu cầu",
  },
  {
    step: "02",
    icon: "map-pinned",
    title: "Khảo sát và đề xuất vị trí",
    desc: "Lọc vị trí còn trống theo tuyến, chấm điểm AI theo ngành hàng kèm lý do đề xuất và ảnh hiện trạng.",
    duration: "2 đến 3 ngày",
    output: "Danh sách vị trí có điểm AI",
  },
  {
    step: "03",
    icon: "file-text",
    title: "Báo giá và hợp đồng",
    desc: "Báo giá PDF chi tiết theo từng mặt biển, thời gian thuê và hạng mục sản xuất. Chốt điều khoản, ký hợp đồng.",
    duration: "2 đến 5 ngày",
    output: "Báo giá PDF và hợp đồng",
  },
  {
    step: "04",
    icon: "pen-tool",
    title: "Thiết kế và xin giấy phép",
    desc: "Dàn trang market theo đúng tỉ lệ mặt biển, chuẩn bị hồ sơ và làm việc với cơ quan quản lý địa phương.",
    duration: "7 đến 15 ngày",
    output: "Market duyệt và hồ sơ cấp phép",
  },
  {
    step: "05",
    icon: "hard-hat",
    title: "Thi công và lên sóng",
    desc: "In ấn, vận chuyển và lắp đặt theo lịch đã chốt. Với màn hình LED, nội dung được nạp và phát theo khung giờ đăng ký.",
    duration: "3 đến 7 ngày",
    output: "Ảnh nghiệm thu tại vị trí",
  },
  {
    step: "06",
    icon: "line-chart",
    title: "Báo cáo và bảo trì",
    desc: "Báo cáo hình ảnh định kỳ, log phát sóng với DOOH, kiểm tra kết cấu và xử lý sự cố trong suốt thời gian thuê.",
    duration: "Hàng tháng",
    output: "Báo cáo chiến dịch",
  },
];

/* ---------- BẢNG GIÁ THEO LOẠI HÌNH ---------- */

export interface PricingTier {
  icon: LucideName;
  label: string;
  /** Câu định vị ngắn — ai nên chọn loại hình này. */
  bestFor: string;
  /** ⚠️ Giá minh hoạ, chưa phải báo giá chính thức. */
  priceFrom: string;
  priceNote: string;
  /** Thông số kỹ thuật hiển thị dạng bảng nhỏ. */
  specs: { label: string; value: string }[];
  /** Hạng mục đã bao gồm trong giá. */
  includes: string[];
  /** ⚠️ Điểm AI mẫu cho ngành hàng phổ biến của loại hình. */
  aiScore: number;
  aiTier: "Khá" | "Cao";
  aiReason: string;
  /** Loại hình được đề xuất nhiều nhất — làm nổi bật thẻ giữa. */
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    icon: "lamp",
    label: "Pano · Nhà chờ",
    bestFor: "Phủ dày theo tuyến, mở điểm bán khu vực",
    priceFrom: "8.500.000đ",
    priceNote: "/mặt/tháng",
    specs: [
      { label: "Kích thước phổ biến", value: "1,2×1,8m" },
      { label: "Thời gian thuê tối thiểu", value: "3 tháng" },
      { label: "Tệp tiếp cận ước tính", value: "~35.000 lượt/ngày" },
    ],
    includes: ["In ấn và lắp đặt", "Bảo trì định kỳ", "Ảnh nghiệm thu"],
    aiScore: 71,
    aiTier: "Khá",
    aiReason: "Phù hợp chiến dịch khu vực nhờ chi phí vào cửa thấp và mật độ điểm dày.",
  },
  {
    icon: "monitor",
    label: "Màn hình LED",
    bestFor: "Đổi nội dung theo khung giờ, đo được tần suất",
    priceFrom: "28.000.000đ",
    priceNote: "/tháng, spot 15 giây",
    specs: [
      { label: "Kích thước phổ biến", value: "8×12m" },
      { label: "Thời gian thuê tối thiểu", value: "1 tháng" },
      { label: "Tệp tiếp cận ước tính", value: "~120.000 lượt/ngày" },
    ],
    includes: ["Nạp nội dung không giới hạn", "Log phát sóng hàng tháng", "Đổi market miễn phí 2 lần"],
    aiScore: 88,
    aiTier: "Cao",
    aiReason: "Linh hoạt theo khung giờ vàng, đo lường được nên tối ưu ngân sách tốt nhất.",
    featured: true,
  },
  {
    icon: "rectangle-horizontal",
    label: "Billboard cửa ngõ",
    bestFor: "Xây nhận diện quy mô lớn, hiện diện dài hạn",
    priceFrom: "45.000.000đ",
    priceNote: "/mặt/tháng",
    specs: [
      { label: "Kích thước phổ biến", value: "10×20m" },
      { label: "Thời gian thuê tối thiểu", value: "6 tháng" },
      { label: "Tệp tiếp cận ước tính", value: "~180.000 lượt/ngày" },
    ],
    includes: ["Khảo sát và thiết kế", "Hỗ trợ giấy phép quảng cáo", "Thi công trọn gói"],
    aiScore: 84,
    aiTier: "Cao",
    aiReason: "Vị trí cửa ngõ giữ nhận diện liên tục với lưu lượng phương tiện cao mỗi ngày.",
  },
  {
    icon: "plane",
    label: "Quảng cáo sân bay",
    bestFor: "Tiếp cận nhóm khách chi trả cao và khách quốc tế",
    priceFrom: "120.000.000đ",
    priceNote: "/vị trí/tháng",
    specs: [
      { label: "Kích thước phổ biến", value: "3×6m" },
      { label: "Thời gian thuê tối thiểu", value: "3 tháng" },
      { label: "Tệp tiếp cận ước tính", value: "~45.000 lượt/ngày" },
    ],
    includes: ["Sản xuất theo chuẩn cảng", "Lắp đặt ngoài giờ khai thác", "Báo cáo hình ảnh"],
    aiScore: 79,
    aiTier: "Khá",
    aiReason: "Thời gian chờ chuyến kéo dài giúp thông điệp được đọc kỹ hơn các kênh khác.",
  },
];

/* ---------- CÂU HỎI THƯỜNG GẶP ---------- */

export interface FaqItem {
  q: string;
  a: string;
  /** Nhóm để lọc — giúp người đọc quét nhanh đúng mối quan tâm. */
  group: "Chi phí" | "Triển khai" | "Pháp lý" | "Đo lường";
}

export const faqItems: FaqItem[] = [
  {
    group: "Chi phí",
    q: "Ngân sách tối thiểu cho một chiến dịch OOH là bao nhiêu?",
    a: "Tuỳ loại hình. Nhà chờ và pano có chi phí vào cửa thấp nhất nên phù hợp thử nghiệm khu vực; billboard cửa ngõ và sân bay cần ngân sách lớn hơn và thường thuê dài hạn. Bạn để lại ngành hàng và khoảng ngân sách, chúng tôi đề xuất tổ hợp vị trí hợp lý nhất trong tầm đó.",
  },
  {
    group: "Chi phí",
    q: "Giá đã bao gồm thiết kế và thi công chưa?",
    a: "Báo giá của chúng tôi tách rõ ba phần: phí thuê mặt biển, chi phí sản xuất và chi phí lắp đặt. Với phần lớn loại hình, thiết kế market cơ bản và thi công đã nằm trong gói. Các hạng mục phát sinh như đổi market giữa kỳ hay sản xuất chất liệu đặc biệt được ghi thành dòng riêng.",
  },
  {
    group: "Triển khai",
    q: "Từ lúc chốt đến khi biển lên sóng mất bao lâu?",
    a: "Với màn hình LED, nội dung có thể lên sóng trong vài ngày vì không cần sản xuất vật lý. Với billboard và pano, thời gian phụ thuộc bước xin giấy phép, thường 7 đến 15 ngày, cộng thêm 3 đến 7 ngày in ấn và thi công.",
  },
  {
    group: "Triển khai",
    q: "Tôi có thể chọn vị trí cụ thể thay vì mua theo gói không?",
    a: "Được. Bản đồ vị trí trực tuyến cho phép bạn lọc theo tỉnh thành, loại biển và ngân sách, xem ảnh hiện trạng cùng điểm AI của từng vị trí, rồi thêm đúng những mặt biển bạn muốn vào báo giá.",
  },
  {
    group: "Pháp lý",
    q: "Ai lo thủ tục giấy phép quảng cáo?",
    a: "Chúng tôi chuẩn bị hồ sơ và làm việc với cơ quan quản lý địa phương thay bạn, gồm hồ sơ thiết kế, vị trí và kết cấu. Bạn chỉ cần cung cấp giấy tờ doanh nghiệp và bộ nhận diện thương hiệu.",
  },
  {
    group: "Pháp lý",
    q: "Nội dung quảng cáo có bị giới hạn gì không?",
    a: "Nội dung cần tuân thủ quy định quảng cáo hiện hành và quy chuẩn riêng của từng địa phương hoặc đơn vị quản lý mặt bằng. Chúng tôi rà soát market trước khi nộp hồ sơ và báo lại sớm nếu có chi tiết cần chỉnh.",
  },
  {
    group: "Đo lường",
    q: "Điểm AI được tính dựa trên gì?",
    a: "Hệ thống chấm điểm mức độ phù hợp giữa vị trí và ngành hàng của bạn, dựa trên lưu lượng theo khung giờ, đặc điểm khu vực xung quanh và dữ liệu các chiến dịch đã chạy. Mỗi điểm số luôn đi kèm nhãn mức độ và một dòng lý do để bạn đối chiếu, không chỉ hiển thị màu.",
  },
  {
    group: "Đo lường",
    q: "Trong lúc chạy, tôi theo dõi chiến dịch bằng cách nào?",
    a: "Bạn nhận báo cáo hình ảnh định kỳ chụp tại vị trí thực tế. Riêng màn hình LED có thêm log phát sóng ghi số lần và khung giờ nội dung được phát, đối chiếu được với số spot đã đăng ký.",
  },
];

/* ---------- CAM KẾT VẬN HÀNH ---------- */

export type CommitmentIcon = "shield-check" | "camera" | "wrench" | "receipt";

export interface Commitment {
  icon: CommitmentIcon;
  title: string;
  desc: string;
}

/** Mô tả cách chúng tôi vận hành — không nêu số hiệu giấy phép hay chứng chỉ. */
export const commitments: Commitment[] = [
  {
    icon: "shield-check",
    title: "Hồ sơ pháp lý đầy đủ",
    desc: "Mỗi vị trí bàn giao kèm hồ sơ cấp phép và hợp đồng thuê mặt bằng còn hiệu lực.",
  },
  {
    icon: "camera",
    title: "Nghiệm thu bằng hình ảnh",
    desc: "Ảnh chụp tại vị trí sau khi lắp đặt và trong suốt thời gian thuê, có ghi thời gian.",
  },
  {
    icon: "wrench",
    title: "Kiểm tra kết cấu định kỳ",
    desc: "Rà soát khung, đèn chiếu và bạt theo lịch; xử lý sự cố trong thời gian đã cam kết.",
  },
  {
    icon: "receipt",
    title: "Báo giá minh bạch",
    desc: "Tách rõ phí thuê, sản xuất và lắp đặt theo từng dòng, không có chi phí ẩn.",
  },
];
