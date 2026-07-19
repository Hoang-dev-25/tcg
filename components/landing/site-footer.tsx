import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

import { assets } from "@/lib/landing-data";

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[15px] leading-7 text-slate-700">
      <strong className="text-slate-900">{label}:</strong> {value}
    </p>
  );
}

function LinkCol({ title, items }: { title: string; items: (string | [string, string])[] }) {
  return (
    <div className="grid content-start gap-3">
      <strong className="text-base text-slate-900">{title}</strong>
      {items.map((item, i) =>
        typeof item === "string" ? (
          <a key={i} href="#top" className="text-[15px] text-slate-600 transition-colors hover:text-brand-900">
            {item}
          </a>
        ) : (
          <div key={i} className="grid gap-0.5">
            <span className="text-[15px] text-slate-600">{item[0]}</span>
            <strong className="font-mono text-[17px] text-slate-900">{item[1]}</strong>
          </div>
        )
      )}
    </div>
  );
}

/** Footer sáng: thông tin công ty + bản đồ minh hoạ + 4 cột liên kết. */
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-6 pt-16">
      <div className="mx-auto grid max-w-6xl gap-9 px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid justify-items-start gap-3">
            <Image src={assets.logo} alt="Toàn Cầu ADV" width={172} height={52} className="h-[52px] w-auto" />
            <strong className="text-[17px] text-slate-900">
              Công Ty Cổ Phần Tập Đoàn Quảng Cáo Toàn Cầu
            </strong>
            <InfoLine label="Trụ sở chính" value="265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam" />
            <InfoLine label="Hotline" value="024 3929 0088" />
            <InfoLine label="Email" value="info@toancauadv.vn" />
            <InfoLine label="Thời gian làm việc" value="Giờ hành chính từ thứ 2 đến sáng thứ 7" />
          </div>

          {/* Bản đồ minh hoạ trụ sở */}
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#E8F0FA] via-[#DCE8F5] to-[#D2E1F0]">
            <div
              className="absolute inset-0 [background-image:linear-gradient(rgba(35,116,217,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(35,116,217,0.07)_1px,transparent_1px)] [background-size:40px_40px]"
              aria-hidden="true"
            />
            <div className="absolute left-[52%] top-[44%] -translate-x-1/2 -translate-y-full text-brand-600" aria-hidden="true">
              <MapPin className="h-9 w-9 fill-brand-600 text-white drop-shadow-md" />
            </div>
            <div className="absolute left-3 top-3 grid gap-0.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 shadow-md">
              <strong className="text-sm text-slate-900">265 Thụy Khuê, Tây Hồ</strong>
              <span className="text-xs text-slate-500">Trụ sở Toàn Cầu ADV, Hà Nội</span>
            </div>
            <span className="absolute bottom-2 right-2.5 text-[11px] text-slate-500">
              Bản đồ minh hoạ. Production: nhúng Google Maps.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8 lg:grid-cols-4">
          <LinkCol title="Doanh nghiệp" items={["Về Toàn Cầu", "Khách hàng", "Tin tức", "Tuyển dụng", "Liên hệ"]} />
          <LinkCol title="Dịch vụ" items={["Quảng cáo sân bay", "Billboard · Pano", "Màn hình LED", "Nhà chờ xe bus"]} />
          <LinkCol title="Vị trí OOH" items={["Bản đồ vị trí", "Theo tỉnh/thành", "Vị trí còn trống"]} />
          <LinkCol
            title="Hotline"
            items={[
              ["Tư vấn quảng cáo", "024 3929 0088"],
              ["Chăm sóc khách hàng", "1900 6522"],
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-[13px] text-slate-500">
          <span>© 2026 Công ty Cổ phần Tập đoàn Quảng cáo Toàn Cầu</span>
          <span className="flex-1" />
          <span className="inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> 024 3929 0088
          </span>
          <span>Chính sách bảo mật</span>
          <span>Điều khoản</span>
        </div>
      </div>
    </footer>
  );
}
