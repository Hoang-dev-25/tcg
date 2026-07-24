"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { leadForm } from "@/lib/v3-data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);

  if (submitted) {
    return (
      <div className="v6-card grid place-content-center justify-items-center gap-2.5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-cyan-300" />
        <strong className="font-sans text-2xl text-white">Đã nhận yêu cầu của bạn</strong>
        <p className="text-sm text-slate-300">Chúng tôi sẽ liên hệ trong 24h làm việc.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="v6-card mt-2 inline-flex h-11 items-center px-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-400/10"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="v6-card grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6"
    >
      {leadForm.fields.map((f) => (
        <label key={f.label} className="flex flex-col gap-1 border border-dashed border-blue-300/30 px-3 py-2">
          <span className="v6-label">
            {f.label}
            {f.required && <span className="text-rose-400"> *</span>}
          </span>
          <input
            required={f.required}
            placeholder={f.placeholder}
            className="bg-transparent font-sans text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      ))}
      <label className="flex items-center gap-2.5 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 accent-cyan-400"
        />
        Đồng ý nhận liên hệ
      </label>
      <button
        type="submit"
        disabled={!agree}
        className="v6-card inline-flex h-12 items-center justify-center gap-2 px-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-45 sm:justify-self-end"
      >
        Liên hệ ngay <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
