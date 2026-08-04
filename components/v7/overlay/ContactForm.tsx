"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CONTACT, CONTACT_FIELDS } from "@/components/v7/data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="v7-card grid place-content-center justify-items-center gap-2 p-7 text-center">
        <CheckCircle2 className="h-9 w-9 text-[#7bb8ff]" />
        <strong className="text-xl font-bold text-white">Đã nhận yêu cầu của bạn</strong>
        <p className="text-sm text-slate-300">Chúng tôi sẽ liên hệ trong 24h làm việc.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="v7-btn-ghost mt-1">
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="v7-card grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2 sm:p-5"
    >
      {CONTACT_FIELDS.map((f) => (
        <label key={f.name} className="v7-field">
          <span className="v7-label">
            {f.label}
            {f.required && <span className="text-[#f472b6]"> *</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            placeholder={f.placeholder}
            autoComplete="off"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      ))}
      <button type="submit" className="v7-cta group sm:col-span-2">
        {CONTACT.cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
