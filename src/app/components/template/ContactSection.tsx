"use client";

import { useState, useRef, type FormEvent } from "react";
import type { ConfigSite } from "@/app/types";
import { clientApi } from "@/app/lib/api";

interface ContactSectionProps {
  config?: ConfigSite | null;
}

export default function ContactSection({ config }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-spam
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const formLoadedAt = useRef(Date.now());

  const displayEmail = config?.email || "hello@templatehub.vn";
  const displayPhone = config?.hotline || "0123 456 789";
  const displayAddress = config?.place || "TP. Hồ Chí Minh, Việt Nam";

  // Collect social links from config
  const socialLinks = [
    config?.facebook && { name: "Facebook", url: config.facebook },
    config?.zalo && { name: "Zalo", url: config.zalo },
    config?.linkedin && { name: "LinkedIn", url: config.linkedin },
    config?.instagram && { name: "Instagram", url: config.instagram },
    config?.tiktok && { name: "TikTok", url: config.tiktok },
    config?.youtube && { name: "YouTube", url: config.youtube },
  ].filter(Boolean) as { name: string; url: string }[];

  // Fallback if no social links configured
  const displaySocials = socialLinks.length > 0
    ? socialLinks
    : [
        { name: "Facebook", url: "#" },
        { name: "Zalo", url: "#" },
        { name: "LinkedIn", url: "#" },
      ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Honeypot check
    if (honeypot) return;

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    // Time check (bot submits too fast)
    const elapsed = Date.now() - formLoadedAt.current;
    if (elapsed < 3000) {
      setError("Vui lòng thử lại sau.");
      return;
    }

    setLoading(true);

    try {
      await clientApi.insertContact({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: `Liên hệ từ ${config?.title || "TemplateHub"}`,
        message: message.trim(),
        website: honeypot || undefined,
        formLoadedAt: formLoadedAt.current,
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      formLoadedAt.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{ bottom: "-200px", left: "50%", transform: "translateX(-50%)", background: "#57F5B2", filter: "blur(150px)", opacity: 0.1 }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest mb-4 block text-cyan">Liên hệ</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Sẵn sàng <span className="gradient-text">khởi tạo</span> website?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">Gửi thông tin để được tư vấn giải pháp phù hợp — đội ngũ chúng tôi sẽ phản hồi trong 24 giờ</p>
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-10">
          {/* Contact Info */}
          <div className=" space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-mint/[0.08] flex items-center justify-center text-mint shrink-0 group-hover:bg-mint/[0.15] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm text-white font-medium">{displayEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-mint/[0.08] flex items-center justify-center text-mint shrink-0 group-hover:bg-mint/[0.15] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.87.36 1.72.7 2.53a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.81.34 1.66.57 2.53.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Điện thoại</p>
                <p className="text-sm text-white font-medium">{displayPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-mint/[0.08] flex items-center justify-center text-mint shrink-0 group-hover:bg-mint/[0.15] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Địa chỉ</p>
                <p className="text-sm text-white font-medium">{displayAddress}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800/50">
              <p className="text-xs text-gray-600 mb-3">Theo dõi chúng tôi</p>
              <div className="flex flex-wrap gap-3">
                {displaySocials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag-chip px-3 py-1.5 rounded-lg text-xs text-mint cursor-pointer"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="">
            <div className="gradient-border rounded-2xl p-8 bg-dark2/60">
              <h3 className="text-xl font-bold text-white mb-6">Gửi tin nhắn</h3>

              {/* Success message */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-mint/[0.1] border border-mint/20">
                  <p className="text-sm text-mint font-medium">✓ Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi trong 24 giờ.</p>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Họ và tên *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-mint/20 border border-white/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@company.com"
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-mint/20 border border-white/5 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0123 456 789"
                    className="w-full px-4 py-3 bg-gray-900/60 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-mint/20 border border-white/5 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Nội dung *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mô tả nhu cầu website của bạn..."
                    required
                    className="w-full px-4 py-3 bg-gray-900/60 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-2 focus:ring-mint/20 border border-white/5 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-gray-950 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2 justify-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" /><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        Gửi tin nhắn
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
