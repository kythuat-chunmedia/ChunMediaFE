// ============================================================
// AwardsSection.tsx
// app/components/service-page/AwardsSection.tsx
// ============================================================
import type { ServicePageData } from "@/app/types";
import Image from "next/image";

type Props = { data: NonNullable<ServicePageData["awards"]> }

export default function AwardsSection({ data }: Props) {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#F1F8F8,#E8F4F4)" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] mb-5">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Chứng nhận</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
            {data.title || "Được Công Nhận Bởi Các Tổ Chức Uy Tín"}
          </h2>
        </div>

        <div className={`grid gap-6 ${
          data.items.length <= 2 ? "md:grid-cols-2 max-w-2xl mx-auto"
          : data.items.length === 3 ? "md:grid-cols-3"
          : "md:grid-cols-4"
        }`}>
          {data.items.map((award, i) => (
            <div key={i}
              className="group bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 text-center hover:border-[rgba(10,147,150,0.35)] hover:shadow-[0_12px_40px_rgba(10,147,150,0.1)] hover:-translate-y-1 transition-all duration-300">

              {/* Award logo or icon */}
              {award.logoUrl ? (
                <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  <Image src={award.logoUrl} alt={award.organization} width={80} height={80}
                    className="object-contain" />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-linear-to-br from-[#0A9396] to-[#94D2BD] flex items-center justify-center shadow-[0_4px_16px_rgba(10,147,150,0.25)]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              )}

              <div className="font-['Be_Vietnam_Pro'] font-extrabold text-[#1A1A1A] text-sm mb-1 group-hover:text-[#0A9396] transition-colors">
                {award.name}
              </div>
              <div className="font-['Nunito_Sans'] text-xs text-[#95A5A6]">{award.organization}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.15)]">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#0A9396]">{award.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}