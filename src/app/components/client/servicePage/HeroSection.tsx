// ============================================================
// HeroSection.tsx
// app/components/service-page/HeroSection.tsx
// ============================================================
import type { ServiceHero } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface Props { data: ServiceHero }

export default function HeroSection({ data }: Props) {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-[#0A9396] via-[#0A9396] to-[#094F50] min-h-[560px] flex items-center">
            {/* Background pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(148,210,189,0.15) 0%, transparent 40%)",
                    }}
                />
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                {/* Decorative circles */}
                <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-white/10" />
                <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full border border-white/6" />
                <div className="absolute right-1/3 bottom-0 w-[500px] h-[500px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(148,210,189,0.12) 0%, transparent 65%)" }} />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 w-full">
                <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">

                    {/* Left — Content */}
                    <div>
                        {/* Badge */}
                        {data.badge && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#EE9B00] animate-pulse" />
                                <span className="font-['Be_Vietnam_Pro'] text-xs font-bold tracking-[0.12em] uppercase text-white">
                                    {data.badge}
                                </span>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(2.4rem,4.5vw,3.8rem)] font-extrabold tracking-[-0.03em] leading-[1.06] text-white mb-5">
                            {data.title}{" "}
                            {data.highlightText && (
                                <span className="relative inline-block">
                                    <span className="relative z-10 bg-linear-to-r from-[#EE9B00] to-[#FFD166] bg-clip-text text-transparent">
                                        {data.highlightText}
                                    </span>
                                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-linear-to-r from-[#EE9B00] to-[#FFD166] rounded-full opacity-60" />
                                </span>
                            )}
                        </h1>

                        {/* Subtitle */}
                        {data.subtitle && (
                            <p className="font-['Nunito_Sans'] text-lg text-white/75 max-w-xl leading-relaxed mb-8">
                                {data.subtitle}
                            </p>
                        )}

                        {/* CTA buttons */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {data.ctaText && (
                                <Link href={data.ctaUrl || "#"}
                                    className="relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 bg-[#EE9B00] text-white font-['Nunito_Sans'] font-extrabold text-sm rounded-xl shadow-[0_4px_20px_rgba(238,155,0,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(238,155,0,0.6)] transition-all duration-300 group">
                                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                    {data.ctaText}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            )}
                            {data.ctaSecondaryText && (
                                <Link href={data.ctaSecondaryUrl || "#"}
                                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 border border-white/30 text-white font-['Nunito_Sans'] font-bold text-sm rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm">
                                    {data.ctaSecondaryText}
                                </Link>
                            )}
                        </div>

                        {/* Stats */}
                        {data.stats && data.stats.length > 0 && (
                            <div className="flex flex-wrap gap-6">
                                {data.stats.map((stat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {i > 0 && <div className="w-px h-10 bg-white/20" />}
                                        <div>
                                            <div className="font-['Be_Vietnam_Pro'] text-2xl font-extrabold text-white tracking-tight">{stat.value}</div>
                                            <div className="font-['Nunito_Sans'] text-xs text-white/60 font-medium">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — Hero image */}
                    {data.heroImageUrl && (
                        <div className="hidden lg:flex justify-center items-end relative">
                            <div className="absolute inset-0 rounded-3xl"
                                style={{ background: "radial-gradient(ellipse at center, rgba(148,210,189,0.2) 0%, transparent 70%)" }} />
                            <div className="relative w-full max-w-[380px]">
                                {/* Floating card decoration */}
                                <div className="absolute -left-8 top-16 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-20">
                                    <div className="font-['Be_Vietnam_Pro'] text-xs font-bold text-[#0A9396] mb-0.5">Top 3 Google</div>
                                    <div className="font-['Nunito_Sans'] text-[11px] text-[#6C757D]">trong 90 ngày</div>
                                </div>
                                <div className="absolute -right-6 bottom-24 bg-[#EE9B00] rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(238,155,0,0.3)] z-20">
                                    <div className="font-['Be_Vietnam_Pro'] text-xs font-extrabold text-white">+320%</div>
                                    <div className="font-['Nunito_Sans'] text-[11px] text-white/80">Organic traffic</div>
                                </div>
{data.heroImageUrl?.trim() ? (
  <Image src={"/" + data.heroImageUrl} alt="Hero" width={380} height={460}
    className="relative z-10 object-contain drop-shadow-2xl" />
) : (
  <div className="relative z-10 w-[380px] h-[460px]" />
)}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 48L60 42.7C120 37.3 240 26.7 360 24C480 21.3 600 26.7 720 29.3C840 32 960 32 1080 29.3C1200 26.7 1320 21.3 1380 18.7L1440 16V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z" fill="#F8F9FA" />
                </svg>
            </div>
        </section>
    );
}