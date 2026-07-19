/** Tin tức/dự án cho v4 — dữ liệu thật từ hệ thống v1 (ui_kits/website/data.js),
 *  bản làm giàu: thêm excerpt, tác giả, thời gian đọc; 8 bài cho lưới sóng 4×2 (Lớp 11). */
export interface NewsCardRich {
  img: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  read: number; // phút đọc
}

export const newsCardsRich: NewsCardRich[] = [
  {
    img: "/v1-assets/assets/ooh/phapvan-57a.png",
    date: "14.07.2026",
    tag: "Hệ thống vị trí",
    title: "Khai trương màn hình LED 250m² tại nút giao Pháp Vân – Cầu Giẽ",
    excerpt:
      "Màn hình LED ngoài trời lớn nhất cửa ngõ phía Nam Hà Nội chính thức phát sóng, phục vụ hơn 120.000 lượt phương tiện mỗi ngày.",
    author: "Minh Anh",
    read: 4,
  },
  {
    img: "/v1-assets/assets/ooh/hanoi-133-stkm.jpg",
    date: "11.07.2026",
    tag: "Thị trường OOH",
    title: "Chi tiêu quảng cáo ngoài trời Việt Nam tăng 12,4% nửa đầu 2026",
    excerpt:
      "OOH là kênh tăng trưởng nhanh thứ hai sau video trực tuyến, dẫn dắt bởi nhóm ngành F&B, tài chính và thương mại điện tử.",
    author: "Thu Hà",
    read: 6,
  },
  {
    img: "/v1-assets/assets/ooh/hanoi-cg01-nct.png",
    date: "08.07.2026",
    tag: "Sản phẩm số",
    title: "Điểm AI phiên bản 2.0: bổ sung dữ liệu lưu lượng theo khung giờ",
    excerpt:
      "Thuật toán chấm điểm vị trí nay phân tích lưu lượng theo từng khung giờ, giúp chọn đúng vị trí cho đúng thời điểm vàng.",
    author: "Quang Huy",
    read: 5,
  },
  {
    img: "/v1-assets/assets/ooh/bacninh-10b.png",
    date: "02.07.2026",
    tag: "Hệ thống vị trí",
    title: "Toàn Cầu mở rộng hệ thống LED tại trục Phạm Hùng",
    excerpt: "Bổ sung 4 màn hình LED mới tại khu văn phòng phía Tây Hà Nội, khai thác từ quý 3/2026.",
    author: "Đức Long",
    read: 3,
  },
  {
    img: "/v1-assets/assets/ooh/quangninh-hl30.jpg",
    date: "27.06.2026",
    tag: "Hợp tác",
    title: "Ký kết hợp tác với chuỗi trung tâm thương mại khu vực miền Trung",
    excerpt:
      "Đưa hệ thống LCD/frame của Toàn Cầu vào 8 trung tâm thương mại tại Đà Nẵng, Huế và Quy Nhơn từ tháng 9/2026.",
    author: "Phương Linh",
    read: 4,
  },
  {
    img: "/v1-assets/assets/ooh/phapvan-19a.png",
    date: "18.06.2026",
    tag: "Sản phẩm số",
    title: "Ra mắt bản đồ vị trí OOH tra cứu trực tuyến",
    excerpt:
      "Khách hàng tự khám phá vị trí, xem điểm AI theo ngành hàng và tạo báo giá PDF trong vài phút.",
    author: "Quang Huy",
    read: 5,
  },
  {
    img: "/v1-assets/assets/ooh/vungtau-sgvt.jpg",
    date: "12.06.2026",
    tag: "Thị trường OOH",
    title: "DOOH chiếm 38% ngân sách ngoài trời: cơ hội cho thương hiệu nội địa",
    excerpt:
      "Màn hình số cho phép đặt chỗ theo spot và đổi nội dung theo giờ, hạ rào cản ngân sách cho doanh nghiệp vừa và nhỏ.",
    author: "Thu Hà",
    read: 7,
  },
  {
    img: "/v1-assets/assets/ooh/quangninh-hl16.jpg",
    date: "05.06.2026",
    tag: "Hợp tác",
    title: "Hợp tác quảng cáo tại nhà chờ xe bus 5 tỉnh thành",
    excerpt: "Mạng lưới nhà chờ mở rộng tại Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ và Nghệ An.",
    author: "Phương Linh",
    read: 3,
  },
];
