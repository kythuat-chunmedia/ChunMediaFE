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
    <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden mesh-bg grid-pattern">
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{ top: "-200px", left: "-100px", background: "#57F5B2", filter: "blur(150px)", opacity: 0.15 }} />
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{ top: "-100px", right: "-200px", background: "#37BADE", filter: "blur(150px)", opacity: 0.15 }} />

      <div className="absolute top-40 left-[10%] w-3 h-3 rounded-full animate-float" style={{ background: "#57F5B2", opacity: 0.4 }} />
      <div className="absolute top-60 right-[15%] w-2 h-2 rounded-full animate-float" style={{ background: "#37BADE", opacity: 0.3, animationDelay: "2s" }} />
      <div className="absolute top-32 right-[30%] w-4 h-4 rounded animate-float" style={{ border: "1px solid rgba(87,245,178,0.3)", animationDelay: "1s", transform: "rotate(45deg)" }} />
      <div className="absolute bottom-20 left-[25%] w-6 h-6 rounded-lg animate-float" style={{ border: "1px solid rgba(55,186,222,0.2)", animationDelay: "3s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-mint/[0.08] border border-mint/[0.15]">
          <span className="animate-pulse2 w-2 h-2 rounded-full bg-mint" />
          <span className="text-xs font-medium tracking-wide uppercase text-mint">Phiên bản mới 2025</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          <span className="text-white">{siteName}</span><br />
          <span className="gradient-text">chuyên nghiệp</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {siteDesc || (
            <>
              Hơn <span className="text-mint font-semibold">{templateCount}+ mẫu giao diện</span> website được thiết kế tỉ mỉ, tối ưu SEO và responsive hoàn hảo — sẵn sàng triển khai trong vài phút.
            </>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#templates" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold text-gray-950 w-full sm:w-auto">
            <span className="flex items-center gap-2 justify-center">
              Khám phá ngay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </span>
          </a>
          <a href="#contact" className="btn-ghost px-8 py-3.5 rounded-xl text-sm font-medium text-gray-300 w-full sm:w-auto flex items-center gap-2 justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Liên hệ tư vấn
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: templateCount, suffix: "+", label: "Mẫu giao diện" },
            { value: 200, suffix: "+", label: "Khách hàng" },
            { value: 99, suffix: "%", label: "Hài lòng" },
            { value: 5, suffix: " phút", label: "Triển khai" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
