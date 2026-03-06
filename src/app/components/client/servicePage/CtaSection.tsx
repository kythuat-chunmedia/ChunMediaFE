// ================================================================
// src/app/components/client/servicePage/CtaSection.tsx
// ================================================================
"use client";

import type { ServicePageData } from "@/app/types";
import Link from "next/link";
import { useState, useRef, type FormEvent } from "react";

type Props = { data: NonNullable<ServicePageData["ctaSection"]> }

export default function CTASection({ data }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2233] via-[#0A2E3D] to-[#093040]">
      {/* Bg effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(10,147,150,0.15) 0%, transparent 65%)" }} />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(148,210,189,0.1) 0%, transparent 65%)" }} />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(10,147,150,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,147,150,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20">
        <div className={`grid gap-12 items-start ${
          data.formEnabled ? "lg:grid-cols-[1fr_480px]" : "max-w-3xl mx-auto text-center"
        }`}>

          {/* Left — Text */}
          <div className={data.formEnabled ? "" : "text-center"}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.15)] border border-[rgba(10,147,150,0.3)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#EE9B00] animate-pulse" />
              <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#94D2BD]">
                Bắt đầu ngay
              </span>
            </div>

            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold tracking-[-0.03em] text-white leading-[1.1] mb-4">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="font-['Nunito_Sans'] text-[#94D2BD]/80 text-lg leading-relaxed mb-8">
                {data.subtitle}
              </p>
            )}

            {!data.formEnabled && (
              <Link href={data.ctaUrl}
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-[#EE9B00] text-white font-['Nunito_Sans'] font-extrabold text-base rounded-xl shadow-[0_4px_20px_rgba(238,155,0,0.45)] hover:shadow-[0_8px_32px_rgba(238,155,0,0.6)] hover:-translate-y-0.5 transition-all duration-300 group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                {data.ctaText}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            )}

            <div className={`mt-8 flex flex-wrap gap-5 ${!data.formEnabled ? "justify-center" : ""}`}>
              {["Tư vấn miễn phí", "Phản hồi trong 2h", "Không ràng buộc"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[rgba(10,147,150,0.2)] border border-[rgba(10,147,150,0.4)] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#94D2BD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-['Nunito_Sans'] text-sm text-white/70 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Inline form */}
          {data.formEnabled && <ContactForm ctaText={data.ctaText} />}
        </div>
      </div>
    </section>
  );
}

// ── Inline contact form ─────────────────────────────────────────
function ContactForm({ ctaText }: { ctaText: string }) {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const honeypotRef = useRef("");
  const loadedAt    = useRef(Date.now());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypotRef.current) return;
    if (Date.now() - loadedAt.current < 2500) { setError("Vui lòng thử lại sau."); return; }
    if (!name.trim() || !phone.trim()) { setError("Vui lòng điền họ tên và số điện thoại."); return; }
    setLoading(true); setError("");
    try {
      // TODO: await clientApi.insertContact({ name, phone, email, message, subject: "Tư vấn dịch vụ" });
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess(true);
    } catch {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-white/[0.06] border border-white/[0.12] rounded-xl font-['Nunito_Sans'] text-sm text-white placeholder-white/30 outline-none focus:border-[#94D2BD] focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(148,210,189,0.15)] transition-all";

  if (success) {
    return (
      <div className="bg-white/[0.06] border border-[rgba(10,147,150,0.3)] rounded-2xl p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-3xl">🎉</div>
        <h3 className="font-['Be_Vietnam_Pro'] text-xl font-extrabold text-white mb-2">Gửi thành công!</h3>
        <p className="font-['Nunito_Sans'] text-[#94D2BD]/80 text-sm">
          Chúng tôi sẽ liên hệ bạn trong vòng <strong className="text-white">2 giờ làm việc</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-sm">
      <h3 className="font-['Be_Vietnam_Pro'] text-xl font-extrabold text-white mb-1">Nhận tư vấn miễn phí</h3>
      <p className="font-['Nunito_Sans'] text-sm text-white/50 mb-6">Điền thông tin — chúng tôi gọi lại trong 2 giờ</p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <p className="font-['Nunito_Sans'] text-xs text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot anti-spam */}
        <input type="text" tabIndex={-1} autoComplete="off"
          style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          onChange={(e) => { honeypotRef.current = e.target.value; }} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-['Be_Vietnam_Pro'] text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block">Họ tên *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A" required className={inputClass} />
          </div>
          <div>
            <label className="font-['Be_Vietnam_Pro'] text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block">Điện thoại *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="0912 345 678" required className={inputClass} />
          </div>
        </div>

        <div>
          <label className="font-['Be_Vietnam_Pro'] text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.vn" className={inputClass} />
        </div>

        <div>
          <label className="font-['Be_Vietnam_Pro'] text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5 block">Nhu cầu</label>
          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Mô tả ngắn nhu cầu của bạn..."
            className={`${inputClass} resize-none`} />
        </div>

        <button type="submit" disabled={loading}
          className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 bg-[#EE9B00] text-white font-['Nunito_Sans'] font-extrabold text-sm rounded-xl shadow-[0_4px_20px_rgba(238,155,0,0.4)] hover:shadow-[0_8px_28px_rgba(238,155,0,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Đang gửi...
            </>
          ) : (
            <>
              {ctaText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}