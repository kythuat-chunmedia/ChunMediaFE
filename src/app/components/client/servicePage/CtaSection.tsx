"use client";
import React, { useState } from "react";
import type { ServiceCta } from "@/app/types";

interface CtaSectionProps {
  data: ServiceCta;
}

export default function CtaSection({ data }: CtaSectionProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)" }}
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#57F5B2,transparent)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#37BADE,transparent)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`grid ${data.formEnabled ? "lg:grid-cols-2" : ""} gap-14 items-center`}>
          {/* Left: Text */}
          <div className={data.formEnabled ? "" : "text-center max-w-2xl mx-auto"}>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-gray-400 text-lg mb-8">{data.subtitle}</p>
            )}
            {!data.formEnabled && data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg shadow-2xl transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
              >
                {data.ctaText}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </a>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {["Tư vấn miễn phí", "Phản hồi trong 2h", "Cam kết kết quả"].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          {data.formEnabled && (
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14l6 6 12-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Gửi thành công!</h3>
                  <p className="text-gray-400">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3
                    className="text-white font-bold text-lg mb-6"
                    style={{
                      backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {data.ctaText || "Liên hệ với chúng tôi"}
                  </h3>
                  {[
                    { key: "name", label: "Họ và tên", placeholder: "Nguyễn Văn A", type: "text" },
                    { key: "phone", label: "Số điện thoại", placeholder: "0901 234 567", type: "tel" },
                    { key: "email", label: "Email", placeholder: "email@company.com", type: "email" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="text-gray-300 text-sm font-medium mb-1.5 block">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 transition-all"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#57F5B2"; e.target.style.boxShadow = "0 0 0 2px #57F5B230"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-gray-300 text-sm font-medium mb-1.5 block">Nhu cầu của bạn</label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả ngắn gọn nhu cầu..."
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none resize-none"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#57F5B2"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
                  >
                    {data.ctaText || "Gửi yêu cầu tư vấn"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}