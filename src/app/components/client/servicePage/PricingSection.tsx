// ============================================================
// PricingSection.tsx
// app/components/service-page/PricingSection.tsx
// ============================================================
import type { ServicePageData } from "@/app/types";
import Link from "next/link";

type Props = { data: NonNullable<ServicePageData["pricing"]> }

export default function PricingSection({ data }: Props) {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#F1F8F8,#E8F4F4)" }}>
      {/* Bg decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(10,147,150,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] mb-5">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Bảng giá</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
            {data.title || "Bảng Giá Dịch Vụ"}
          </h2>
          {data.subtitle && (
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-base">{data.subtitle}</p>
          )}
        </div>

        <div className={`grid gap-6 ${
          data.packages.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto"
          : "md:grid-cols-3"
        }`}>
          {data.packages.map((pkg, i) => (
            <div key={pkg.id} className={`relative group flex flex-col rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 ${
              pkg.isPopular
                ? "bg-linear-to-br from-[#0A9396] to-[#094F50] shadow-[0_16px_48px_rgba(10,147,150,0.35)]"
                : "bg-white border border-[rgba(10,147,150,0.12)] shadow-[0_4px_24px_rgba(10,147,150,0.06)] hover:shadow-[0_16px_48px_rgba(10,147,150,0.12)] hover:border-[rgba(10,147,150,0.3)]"
            }`}>

              {/* Popular badge */}
              {pkg.isPopular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#EE9B00] rounded-full font-['Nunito_Sans'] text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[0_4px_12px_rgba(238,155,0,0.4)]">
                  Phổ biến
                </div>
              )}

              <div className="p-8 flex-1">
                <h3 className={`font-['Be_Vietnam_Pro'] font-extrabold text-lg mb-2 ${pkg.isPopular ? "text-white" : "text-[#1A1A1A]"}`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  {pkg.price === "Liên hệ" ? (
                    <div className={`font-['Be_Vietnam_Pro'] text-3xl font-extrabold ${pkg.isPopular ? "text-white" : "text-[#0A9396]"}`}>
                      Liên hệ
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className={`font-['Be_Vietnam_Pro'] text-3xl font-extrabold tracking-tight ${pkg.isPopular ? "text-white" : "text-[#0A9396]"}`}>
                        {pkg.price}đ
                      </span>
                      {pkg.priceNote && (
                        <span className={`font-['Nunito_Sans'] text-sm mb-1 ${pkg.isPopular ? "text-white/70" : "text-[#95A5A6]"}`}>
                          {pkg.priceNote}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className={`h-px mb-6 ${pkg.isPopular ? "bg-white/20" : "bg-[rgba(10,147,150,0.12)]"}`} />

                {/* Features */}
                <ul className="space-y-3">
                  {pkg.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        pkg.isPopular ? "bg-white/20" : "bg-[rgba(10,147,150,0.1)]"
                      }`}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke={pkg.isPopular ? "#fff" : "#0A9396"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className={`font-['Nunito_Sans'] text-sm leading-snug ${pkg.isPopular ? "text-white/85" : "text-[#2C3E50]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <Link href={pkg.ctaUrl || "#contact"}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-['Nunito_Sans'] font-extrabold text-sm transition-all duration-300 group/btn relative overflow-hidden ${
                    pkg.isPopular
                      ? "bg-[#EE9B00] text-white shadow-[0_4px_16px_rgba(238,155,0,0.4)] hover:shadow-[0_8px_24px_rgba(238,155,0,0.6)] hover:-translate-y-0.5"
                      : "bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_16px_rgba(10,147,150,0.25)] hover:shadow-[0_8px_24px_rgba(10,147,150,0.4)] hover:-translate-y-0.5"
                  }`}>
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                  {pkg.ctaText || "Bắt đầu ngay"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}