"use client";

import { useState, useRef, type FormEvent } from "react";
import type { ConfigSite } from "@/app/types";
import { clientApi } from "@/app/lib/api";

interface ContactSectionProps {
  config?: ConfigSite | null;
}

const inputClass =
  "w-full px-4 py-3 bg-white border border-[rgba(10,147,150,0.2)] rounded-xl font-['Nunito_Sans'] text-sm text-[#1A1A1A] placeholder-[#95A5A6] outline-none focus:border-[#0A9396] focus:ring-2 focus:ring-[rgba(10,147,150,0.12)] transition-all";

export default function ContactSection({ config }: ContactSectionProps) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const formLoadedAt = useRef(Date.now());

  const displayEmail   = config?.email   || "hello@templatehub.vn";
  const displayPhone   = config?.hotline || "0123 456 789";
  const displayAddress = config?.place   || "TP. Hồ Chí Minh, Việt Nam";

  const socialLinks = [
    config?.facebook  && { name: "Facebook",  url: config.facebook },
    config?.zalo      && { name: "Zalo",       url: config.zalo },
    config?.linkedin  && { name: "LinkedIn",   url: config.linkedin },
    config?.instagram && { name: "Instagram",  url: config.instagram },
    config?.tiktok    && { name: "TikTok",     url: config.tiktok },
    config?.youtube   && { name: "YouTube",    url: config.youtube },
  ].filter(Boolean) as { name: string; url: string }[];

  const displaySocials = socialLinks.length > 0
    ? socialLinks
    : [{ name: "Facebook", url: "#" }, { name: "Zalo", url: "#" }, { name: "LinkedIn", url: "#" }];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess(false);
    if (honeypot) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc."); return;
    }
    if (Date.now() - formLoadedAt.current < 3000) {
      setError("Vui lòng thử lại sau."); return;
    }
    setLoading(true);
    try {
      await clientApi.insertContact({
        name: name.trim(), email: email.trim(),
        phone: phone.trim() || undefined,
        subject: `Liên hệ từ ${config?.title || "TemplateHub"}`,
        message: message.trim(),
        website: honeypot || undefined,
        formLoadedAt: formLoadedAt.current,
      });
      setSuccess(true);
      setName(""); setEmail(""); setPhone(""); setMessage("");
      formLoadedAt.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { label: "Email", value: displayEmail,
      icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
    { label: "Điện thoại", value: displayPhone,
      icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.87.36 1.72.7 2.53a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.81.34 1.66.57 2.53.7A2 2 0 0 1 22 16.92z"/> },
    { label: "Địa chỉ", value: displayAddress,
      icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></> },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#F1F8F8,#E8F4F4)" }}>
      {/* Subtle glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle,rgba(10,147,150,0.08) 0%,transparent 65%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)]">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Liên hệ</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
            Sẵn sàng{" "}
            <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
              khởi tạo
            </span>{" "}
            website?
          </h2>
          <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm max-w-lg mx-auto">
            Gửi thông tin để được tư vấn giải pháp phù hợp — đội ngũ chúng tôi sẽ phản hồi trong 24 giờ
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-10">

          {/* Info */}
          <div className="space-y-5">
            {infoItems.map(({ label, value, icon }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A9396] to-[#94D2BD] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(10,147,150,0.25)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">{icon}</svg>
                </div>
                <div>
                  <p className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#95A5A6] mb-0.5 uppercase tracking-wider">{label}</p>
                  <p className="font-['Nunito_Sans'] text-sm text-[#1A1A1A] font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="pt-5 border-t border-[rgba(10,147,150,0.12)]">
              <p className="font-['Nunito_Sans'] text-xs text-[#95A5A6] mb-3 uppercase tracking-wider">Theo dõi chúng tôi</p>
              <div className="flex flex-wrap gap-2">
                {displaySocials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="font-['Nunito_Sans'] text-xs font-bold px-3 py-1.5 rounded-lg bg-white border border-[rgba(10,147,150,0.2)] text-[#0A9396] hover:border-[#0A9396] hover:bg-[rgba(10,147,150,0.06)] transition-all duration-200">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 shadow-[0_8px_40px_rgba(10,147,150,0.08)]">
            <h3 className="font-['Be_Vietnam_Pro'] text-lg font-bold text-[#1A1A1A] mb-6">Gửi tin nhắn</h3>

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.25)]">
                <p className="font-['Nunito_Sans'] text-sm text-[#0A9396] font-medium">
                  ✓ Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi trong 24 giờ.
                </p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="font-['Nunito_Sans'] text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", opacity: 0 }} />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#2C3E50] mb-2 block">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A" required className={inputClass} />
                </div>
                <div>
                  <label className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#2C3E50] mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com" required className={inputClass} />
                </div>
              </div>

              <div>
                <label className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#2C3E50] mb-2 block">Số điện thoại</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="0123 456 789" className={inputClass} />
              </div>

              <div>
                <label className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#2C3E50] mb-2 block">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mô tả nhu cầu website của bạn..." required
                  className={`${inputClass} resize-none`} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full relative overflow-hidden inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-['Nunito_Sans'] font-bold text-sm shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/>
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi tin nhắn
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}