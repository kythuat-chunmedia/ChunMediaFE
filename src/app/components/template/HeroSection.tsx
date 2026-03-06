import Counter from "./Counter";
import type { ConfigSite } from "@/app/types";

interface HeroSectionProps {
  config?: ConfigSite | null;
  templateCount?: number;
}

export default function HeroSection({ config, templateCount = 50 }: HeroSectionProps) {
  const siteName = config?.title || "Kho giao diện";
  const siteDesc = config?.description || null;

  return (
    <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] via-white to-[#E9ECEF]" />
      <div className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(10,147,150,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.04) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle,rgba(10,147,150,0.1) 0%,transparent 65%)" }} />
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle,rgba(148,210,189,0.12) 0%,transparent 65%)" }} />

      {/* Floating shapes */}
      <div className="absolute top-40 left-[10%] w-3 h-3 rounded-full bg-[#0A9396]/30 animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute top-60 right-[15%] w-2 h-2 rounded-full bg-[#94D2BD]/40 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      <div className="absolute top-32 right-[30%] w-5 h-5 rounded rotate-45 border border-[#0A9396]/20 animate-bounce" style={{ animationDuration: "5s", animationDelay: "2s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#0A9396] animate-pulse" />
          <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">
            Phiên bản mới 2026
          </span>
        </div>

        <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] mb-6 text-[#1A1A1A]">
          {siteName}<br />
          <span className="bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
            chuyên nghiệp
          </span>
        </h1>

        <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] max-w-2xl mx-auto mb-10 leading-relaxed">
          {siteDesc || (
            <>
              Hơn <span className="text-[#0A9396] font-bold">{templateCount}+ mẫu giao diện</span> website được thiết kế tỉ mỉ,
              tối ưu SEO và responsive hoàn hảo — sẵn sàng triển khai trong vài phút.
            </>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#templates"
            className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-['Nunito_Sans'] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 w-full sm:w-auto justify-center group">
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            Khám phá ngay
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-[rgba(10,147,150,0.2)] text-[#0A9396] rounded-xl font-['Nunito_Sans'] font-bold text-sm hover:border-[#0A9396] hover:bg-[rgba(10,147,150,0.04)] transition-all duration-200 w-full sm:w-auto justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Liên hệ tư vấn
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: templateCount, suffix: "+", label: "Mẫu giao diện" },
            { value: 200,           suffix: "+", label: "Khách hàng" },
            { value: 99,            suffix: "%", label: "Hài lòng" },
            { value: 5,             suffix: " phút", label: "Triển khai" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-white/70 border border-[rgba(10,147,150,0.1)] rounded-2xl backdrop-blur-sm">
              <div className="font-['Be_Vietnam_Pro'] text-3xl font-extrabold tracking-tight bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent mb-1">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-['Nunito_Sans'] text-xs text-[#95A5A6] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}