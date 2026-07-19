# v3 — Trang chủ Toàn Cầu ADV: layout/màu sắc của v2 + nội dung thật của v1

## Bối cảnh

Dự án đã có hai bản clone tĩnh:
- `/v2` — clone 1:1 từ `d:\tcg\v2-tcg`: HTML/CSS/JS thuần, Tailwind CDN, palette xanh brand `#368FFF` (thang `blue-50..900`), font Lora (tiêu đề) + Plus Jakarta Sans (thân bài). Được đánh giá là **đúng màu sắc/layout theo design system** hiện tại (Lora chỉ dùng cho tiêu đề, tránh lỗi "UI không thân thiện" từng bị phản hồi khi dùng serif toàn trang).
- `/v1` — clone 1:1 từ `d:\tcg\v1-tcg`: React biên dịch bằng Babel trên trình duyệt, gắn với **hệ thống dữ liệu đầy đủ**: 6 vị trí thật (toạ độ, giá, điểm AI theo 5 ngành hàng), catalog 10 dịch vụ, dòng thời gian 20 năm, marquee 12 logo đối tác, 12 bài tin tức, 5 văn phòng, 4 phát biểu lãnh đạo thật. v1 dùng Lora cho toàn bộ typography (kể cả thân bài) — đây là điểm bị coi là sai theo design system hiện tại.

**Yêu cầu:** xây `/v3` — giữ nguyên layout/màu sắc/hiệu ứng của v2, thay toàn bộ nội dung minh hoạ/hư cấu bằng dữ liệu thật của v1.

## Phạm vi (đã chốt qua brainstorming)

1. Giữ **đúng khung 10 khối** của v2 (Header, Hero, Tư vấn, Case Study, Bản đồ+điểm AI, Dịch vụ, Quy trình AI, Testimonials, FAQ, Liên hệ, Footer) — không thêm/bớt khối, không đưa bản đồ tương tác hay giỏ báo giá của v1 vào.
2. Với 2 khối không có dữ liệu thật tương đương (Testimonials, Case Study): dùng dữ liệu thật **gần nhất** của v1, diễn giải lại cho khớp khung UI của v2 (không giữ nguyên như v2, không thay bằng tính năng khác của v1).
3. Xây bằng **React thật** (`app/v3/page.tsx` + `components/v3/*`), không sửa trực tiếp file tĩnh như cách làm `/v1`/`/v2`.

## Kiến trúc kỹ thuật

```
app/v3/
  layout.tsx        # nạp font Lora + Plus Jakarta Sans qua next/font/google,
                     # bọc children trong 1 div riêng — KHÔNG đụng <html> gốc
  page.tsx           # ráp 10 section theo đúng thứ tự v2, export metadata
components/v3/
  header.tsx
  hero.tsx
  consulting.tsx      # rotator 3 thẻ chồng, cycle 3.2s
  case-study.tsx       # rotator objective/strategy/results, 3 case
  map-score.tsx         # ảnh bản đồ tĩnh + 4 badge điểm AI thật
  services.tsx           # 8 thẻ nghiêng nền + 4 stat
  ai-process.tsx          # 3 bước + 2 stat hiệu quả
  testimonials.tsx          # carousel kéo-thả, 4 thẻ
  faq.tsx                    # accordion 5 câu
  contact.tsx                 # form 3 trường + trust bullets
  footer.tsx
lib/v3-data.ts        # dữ liệu đã merge (xem "Nguồn dữ liệu" bên dưới)
```

Ảnh dùng thẳng từ `public/v1-assets/assets/...` và `public/v2-assets/...` đã có sẵn (không copy thêm file mới).

### Token thị giác (đúng y hệt v2, tách biệt hoàn toàn khỏi theme gốc)

Thêm vào `tailwind.config.ts` → `theme.extend`, dùng namespace mới để không đụng `colors.blue` mặc định hay `colors.brand` hiện có (2 bảng đó lệch vài mã hex so với v2):

```ts
colors: {
  v2blue: {50:'#EBF4FF',100:'#D6E9FF',200:'#ADD3FF',300:'#7BB8FF',400:'#57A3FF',
           500:'#368FFF',600:'#2374D9',700:'#1A5BB0',800:'#134384',900:'#0D2F5E'},
},
fontFamily: {
  v2display: ['var(--font-v2-lora)','Georgia','serif'],
  v2sans: ['var(--font-v2-jakarta)','system-ui','sans-serif'],
},
boxShadow: {
  'v2-sm':'0 1px 2px rgba(13,47,94,.06)', 'v2-md':'0 2px 10px rgba(13,47,94,.08)',
  'v2-lg':'0 8px 24px rgba(13,47,94,.10)', 'v2-xl':'0 16px 40px rgba(13,47,94,.14)',
},
```

`app/v3/layout.tsx` nạp `Lora` và `Plus_Jakarta_Sans` qua `next/font/google` với các variable trên, gắn vào một `<div className="font-v2sans ...">` bọc riêng cho route này.

### Tái dùng / viết mới

- Tái dùng nguyên trạng: `components/landing/reveal.tsx` (`<Reveal>` — fade-up khi cuộn, tương đương `[data-reveal]` của v2) và `components/scroll-progress.tsx` (`<ScrollProgress className="...">` — đổi màu qua prop có sẵn).
- **Không** tái dùng các component khác trong `components/landing/*` (RotateShowcase, ServiceDeck, StatsDrift...) — chúng thuộc ngôn ngữ thiết kế "Parallax Lab" (xoay theo cuộn, tông `brand-900`/`brick-500`), khác hẳn tương tác cụ thể của v2 (carousel `setInterval`, kéo-thả, accordion). 8/10 khối viết component mới, bám sát timing/easing gốc trong `v2-tcg/index.html`.

## Nguồn dữ liệu — map từng khối

| Khối | Giữ từ v2 | Thay bằng v1 |
|---|---|---|
| Header | Nav (`Trang chủ/Bản đồ/Dịch vụ/Tin tức/Liên hệ`), logo, CTA — khớp sẵn 2 bên | — |
| Hero | Headline "Quảng cáo ngoài trời đúng vị trí, đúng thời điểm", layout 4-stat, hiệu ứng Ken-Burns | Ảnh hero: `v1-assets/assets/ooh/noibai-41b.jpg` ("Nội Bài T2, băng chuyền đến") thay ảnh generic của v2. Số liệu 730+/400+/20+ đã khớp; giữ thêm "89.000 m²" của v2 (không mâu thuẫn v1, chỉ v2 mới có số này) |
| Tư vấn (rotator) | Cơ chế xoay 3 thẻ chồng | 5 tỉnh có ảnh thật trong v1 (thay 5 tỉnh hư cấu của v2): Hà Nội (`phapvan-19a.png`), Bắc Ninh (`bacninh-10b.png`), Hải Phòng (`haiphong-caurao2.jpg`), Quảng Ninh (`quangninh-hl30.jpg`), Vũng Tàu (`vungtau-sgvt.jpg`) |
| Case Study | Khung objective/strategy/results + badge + rotator | 3 case dựng lại từ `v1 data.js → cases[]` + diễn giải chiến lược theo dịch vụ thật: **F&B** (`haiphong-caurao2.jpg`, phủ 12 billboard nội đô Hà Nội), **Hàng không** (`noibai-24a1.jpg`, chuỗi vị trí sân bay 2 miền), **Điện tử** (`quangninh-hl30.jpg`, LED giờ vàng trục văn phòng) |
| Bản đồ + điểm AI | Ảnh bản đồ tĩnh `v2-assets/uploads/pasted-1784080055153-0.png` (không làm bản đồ tương tác) | 4 badge điểm AI = số thật từ `v1 data.js → locations[].scores`: 92 (Ngã tư Sở — F&B), 88 (Nội Bài T2 — Thời trang), 86 (Tân Sơn Nhất — Mỹ phẩm), 78 (LED Phạm Hùng — Công nghệ) |
| Dịch vụ (8 thẻ) | Layout thẻ nghiêng + nền + 4 stat | 8 icon/nhãn = đúng `v1 data.js → capabilities[]`; desc/vị trí/quy mô lấy từ `servicesCatalog` tương ứng (billboard, san-bay, led-ngoai-troi, lcd-frame, tu-van-quy-hoach, thiet-ke-thi-cong, roadshow-su-kien, gộp nha-cho-xe-bus+xe-bus-taxi); ảnh thật từng thẻ |
| Quy trình AI (3 bước) | Layout 3 bước + 2 stat hiệu quả (-18%/+32%, giữ như v2, không mâu thuẫn v1) | Gộp 5 bước thật (`v1 data.js → steps[]`) thành 3: (1) Khám phá bản đồ & điểm AI, (2) Chọn vị trí & nhận báo giá PDF, (3) Sales liên hệ & triển khai |
| Testimonials | Khung carousel kéo-thả (mở rộng 3→4 thẻ, cơ chế không đổi) | 4 phát biểu thật có tên+chức danh từ `v1 data.js → newsOpinions[]`: Nguyễn Văn Toàn (Giám đốc điều hành), Thu Hà (Trưởng phòng NCTT), Quang Huy (Giám đốc sản phẩm số), Đức Long (Giám đốc vận hành). Avatar: giữ cơ chế placeholder picsum.photos của v2 (seed theo tên thật) vì không có ảnh thật |
| FAQ | 5 câu hỏi, cơ chế accordion | Viết lại 5 câu trả lời bằng số liệu/dịch vụ thật (~730 vị trí, 30+ tỉnh thành, đúng danh sách loại hình dịch vụ) |
| Liên hệ | Layout form 3 trường + trust bullets + office info | Hotline `024 3929 0088`, email `info@toancauadv.vn` (thay số giả `1900 xxxx`) |
| Footer | Bố cục 2 cột + Google Maps iframe thật (giữ, tốt hơn placeholder tĩnh của v1) | Tên pháp nhân đầy đủ "Công Ty Cổ Phần Tập Đoàn Quảng Cáo Toàn Cầu", hotline/email thật, cột "Vị trí OOH" = 5 văn phòng thật (Hà Nội trụ sở, TP.HCM, Đà Nẵng, Cần Thơ, Nghệ An) |

## Kiểm thử

Theo skill `verify`: chạy dev server, `curl` route `/v3` xác nhận 200 + không còn placeholder cũ của v2 (`1900 xxxx`, `lienhe@toancauadv.vn`, tên case study hư cấu), đối chiếu từng khối với bảng map ở trên. Chạy `npm run typecheck`. Không có trang tương tự để chạy Playwright/browser trong phiên này — nếu cần xác nhận thị giác, người dùng tự mở `http://localhost:3001/v3`.

## Ngoài phạm vi

- Không làm bản đồ tương tác (MapLibre) hay giỏ báo giá (QuoteTray/Toast) của v1.
- Không tạo các trang phụ (`about`, `map`, `services`, `news`) — chỉ trang chủ, đúng như `/v1` và `/v2` hiện có.
- Không sửa `/v1`, `/v2`, hay theme gốc của `/ooh`.
