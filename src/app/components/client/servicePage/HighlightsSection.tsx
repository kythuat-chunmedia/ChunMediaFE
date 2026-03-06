// ============================================================
// HighlightsSection.tsx
// app/components/service-page/HighlightsSection.tsx
// ============================================================
import type { ServiceHighlight } from "@/app/types";

interface Props { items: ServiceHighlight[] }

export default function HighlightsSection({ items }: Props) {
  return (
    <section className="py-20 px-6 bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] mb-5">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Tại sao chọn chúng tôi</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
            Lợi ích vượt trội bạn nhận được
          </h2>
        </div>

        <div className={`grid gap-6 ${
          items.length <= 3 ? "grid-cols-1 md:grid-cols-3"
          : items.length === 4 ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-2 md:grid-cols-3"
        }`}>
          {items.map((item, i) => (
            <div key={i}
              className="group relative bg-white border border-[rgba(10,147,150,0.1)] rounded-2xl p-7 overflow-hidden shadow-[0_2px_20px_rgba(10,147,150,0.05)] hover:border-[rgba(10,147,150,0.35)] hover:shadow-[0_12px_40px_rgba(10,147,150,0.12)] hover:-translate-y-1 transition-all duration-400">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-[#0A9396] to-[#94D2BD] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[rgba(10,147,150,0.1)] to-[rgba(148,210,189,0.1)] flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              <h3 className="font-['Be_Vietnam_Pro'] font-extrabold text-[#1A1A1A] text-base mb-2 group-hover:text-[#0A9396] transition-colors">
                {item.title}
              </h3>
              <p className="font-['Nunito_Sans'] text-sm text-[#6C757D] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}