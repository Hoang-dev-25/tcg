import { Facebook, Phone, Youtube } from "lucide-react";

import { contactInfo, footerCols, footerLegal, logo } from "@/lib/v3-data";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-14">
      <div className="mx-auto grid max-w-[1280px] gap-9 px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Cột thương hiệu */}
          <div className="grid justify-items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.alt} className="h-[52px] w-auto" />
            <strong className="text-[1.0625rem] text-slate-900">{footerLegal.name}</strong>
            <p className="m-0 text-[.9375rem] leading-[1.7] text-slate-700">
              <strong className="text-slate-900">Trụ sở chính:</strong> {contactInfo.address}
            </p>
            <p className="m-0 text-[.9375rem] leading-[1.7] text-slate-700">
              <strong className="text-slate-900">Hotline:</strong> {contactInfo.hotline}
            </p>
            <p className="m-0 text-[.9375rem] leading-[1.7] text-slate-700">
              <strong className="text-slate-900">Email:</strong> {contactInfo.email}
            </p>
            <p className="m-0 text-[.9375rem] leading-[1.7] text-slate-700">
              <strong className="text-slate-900">Thời gian làm việc:</strong> {contactInfo.hours}
            </p>
            <span className="mt-1.5 text-[.9375rem] text-slate-700">Theo dõi chúng tôi qua:</span>
            <div className="flex gap-3">
              {[Facebook, Youtube, Phone].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-v2blue-700"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Bản đồ trụ sở */}
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Bản đồ trụ sở Toàn Cầu ADV"
              src="https://www.google.com/maps?q=265+Th%E1%BB%A5y+Khu%C3%AA,+T%C3%A2y+H%E1%BB%93,+H%C3%A0+N%E1%BB%99i&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Cột liên kết */}
        <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8 lg:grid-cols-4">
          {footerCols.map((col) => (
            <div key={col.title} className="grid content-start gap-3">
              <strong className="text-base text-slate-900">{col.title}</strong>
              {col.items.map((item) => (
                <a key={item} className="cursor-pointer text-[.9375rem] text-slate-600 hover:text-v2blue-700">
                  {item}
                </a>
              ))}
            </div>
          ))}
          <div className="grid content-start gap-3">
            <strong className="text-base text-slate-900">Hotline</strong>
            <div className="grid gap-0.5">
              <span className="text-[.9375rem] text-slate-600">Tư vấn quảng cáo</span>
              <strong className="font-mono text-[1.0625rem] text-slate-900">{contactInfo.hotline}</strong>
            </div>
            <div className="grid gap-0.5">
              <span className="text-[.9375rem] text-slate-600">Chăm sóc khách hàng</span>
              <strong className="font-mono text-[1.0625rem] text-slate-900">{contactInfo.careline}</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-slate-200 py-5 text-[.8125rem] text-slate-500">
          <span>{footerLegal.copyright}</span>
          <span className="flex-1" />
          <span>Chính sách bảo mật</span>
          <span>Điều khoản</span>
        </div>
      </div>
    </footer>
  );
}
