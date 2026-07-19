"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { leadBenefits } from "@/lib/landing-data";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:border-brand-500";

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-brick-500"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function MiniStat({ value, prefix, suffix, label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="grid gap-0.5">
      <strong ref={ref} className="font-mono text-2xl font-bold text-brand-900">
        {prefix}
        {current}
        {suffix}
      </strong>
      <span className="text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">{label}</span>
    </div>
  );
}

/**
 * Form nhận tư vấn OOH — bố cục tham chiếu: trái là lợi ích + chỉ số + hotline,
 * phải là form 2 cột. Không dùng submit mặc định của thẻ form.
 */
export function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", company: "", email: "", industry: "", budget: "", note: "" });
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: event.target.value }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    setError(null);
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1200);
  };

  return (
    <section id="lien-he" className="scroll-mt-24 bg-brand-50 py-20 sm:py-24" aria-label="Nhận tư vấn OOH miễn phí">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Parallax speed={0.2}>
          <Reveal>
            <div className="grid gap-4">
              <h2 className="text-3xl font-bold leading-tight text-brand-900 sm:text-4xl">
                Nhận tư vấn OOH miễn phí
              </h2>
              <p className="text-lg text-slate-600">Để lại thông tin, đội ngũ Toàn Cầu liên hệ trong 24h.</p>
              <ul className="grid gap-2.5">
                {leadBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 font-medium text-slate-800">
                    <span className="font-bold text-emerald-600" aria-hidden="true">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="flex gap-7 border-y border-slate-200 py-3.5">
                <MiniStat value={20} suffix="+" label="Năm OOH" />
                <MiniStat value={730} prefix="~" label="Vị trí" />
                <MiniStat value={30} suffix="+" label="Tỉnh/thành" />
              </div>
              <div className="grid gap-1.5">
                <span className="text-sm text-slate-600">Cần tư vấn ngay? Gọi trực tiếp:</span>
                <a
                  href="tel:02439290088"
                  className="font-mono text-[22px] font-bold text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  024 3929 0088
                </a>
              </div>
            </div>
          </Reveal>
        </Parallax>

        <Parallax speed={0.34}>
          {status === "success" ? (
            <div
              className="grid justify-items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-md"
              role="status"
            >
              <CheckCircle2 className="h-14 w-14 text-emerald-500" aria-hidden="true" />
              <strong className="text-2xl font-semibold text-slate-900">Đã nhận yêu cầu của bạn</strong>
              <p className="text-slate-500">
                Chúng tôi sẽ liên hệ trong 24h làm việc. Mã yêu cầu:{" "}
                <span className="font-mono font-semibold text-slate-800">TC-2607-018</span>
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 inline-flex h-11 items-center rounded-lg border-[1.5px] border-slate-300 px-5 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <Reveal>
              <div className="grid grid-cols-1 gap-3.5 rounded-2xl border border-slate-200 bg-white p-7 shadow-lg sm:grid-cols-2">
                <Field id="lead-name" label="Họ tên" required>
                  <input id="lead-name" className={inputClass} placeholder="Nguyễn Văn A" value={form.name} onChange={set("name")} autoComplete="name" />
                </Field>
                <Field id="lead-phone" label="Số điện thoại" required>
                  <input id="lead-phone" type="tel" className={inputClass} placeholder="09xx xxx xxx" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                </Field>
                <Field id="lead-company" label="Doanh nghiệp">
                  <input id="lead-company" className={inputClass} placeholder="Tên công ty" value={form.company} onChange={set("company")} autoComplete="organization" />
                </Field>
                <Field id="lead-email" label="Email">
                  <input id="lead-email" type="email" className={inputClass} placeholder="ban@congty.vn" value={form.email} onChange={set("email")} autoComplete="email" />
                </Field>
                <Field id="lead-industry" label="Ngành hàng">
                  <input id="lead-industry" className={inputClass} placeholder="Ví dụ: F&B, Thời trang, Mỹ phẩm…" value={form.industry} onChange={set("industry")} />
                </Field>
                <Field id="lead-budget" label="Ngân sách">
                  <input id="lead-budget" className={inputClass} placeholder="Ví dụ: 50-150 triệu/tháng" value={form.budget} onChange={set("budget")} />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="lead-note" label="Nhu cầu / ghi chú">
                    <textarea
                      id="lead-note"
                      rows={3}
                      className={cn(inputClass, "h-auto py-2.5")}
                      placeholder="Mô tả ngắn nhu cầu quảng cáo…"
                      value={form.note}
                      onChange={set("note")}
                    />
                  </Field>
                </div>
                <label className="flex select-none items-center gap-2.5 text-sm font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(event) => setAgree(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  />
                  Đồng ý nhận liên hệ
                </label>
                <div className="grid justify-items-end gap-2">
                  {error ? (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    disabled={!agree || status === "submitting"}
                    onClick={submit}
                    className="inline-flex h-11 items-center rounded-lg bg-brick-500 px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brick-600 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    {status === "submitting" ? "Đang gửi…" : "Gửi yêu cầu tư vấn"}
                  </button>
                </div>
              </div>
            </Reveal>
          )}
        </Parallax>
      </div>
    </section>
  );
}
