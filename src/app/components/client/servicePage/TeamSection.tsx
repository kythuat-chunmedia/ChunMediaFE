// ============================================================
// TeamSection.tsx
// app/components/service-page/TeamSection.tsx
// ============================================================
import type { ServicePageData } from "@/app/types";
import Image from "next/image";

type Props = { data: NonNullable<ServicePageData["team"]> }

export default function TeamSection({ data }: Props) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] mb-5">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Đội ngũ</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
            {data.title || "Đội Ngũ Chuyên Gia"}
          </h2>
          {data.subtitle && (
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-base">{data.subtitle}</p>
          )}
        </div>

        <div className={`grid gap-8 ${
          data.experts.length <= 2 ? "md:grid-cols-2 max-w-2xl mx-auto"
          : data.experts.length === 3 ? "md:grid-cols-3"
          : "md:grid-cols-4"
        }`}>
          {data.experts.map((expert, i) => (
            <div key={i} className="group text-center">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#0A9396] to-[#94D2BD] p-[3px] group-hover:p-1 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#E9ECEF]">
                    <Image src={expert.avatarUrl} alt={expert.name} width={128} height={128}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                {expert.experience && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#EE9B00] rounded-full shadow-[0_4px_12px_rgba(238,155,0,0.3)] whitespace-nowrap">
                    <span className="font-['Nunito_Sans'] text-[10px] font-extrabold text-white">{expert.experience}</span>
                  </div>
                )}
              </div>

              <h3 className="font-['Be_Vietnam_Pro'] font-extrabold text-[#1A1A1A] text-base mb-1 group-hover:text-[#0A9396] transition-colors">
                {expert.name}
              </h3>
              <p className="font-['Nunito_Sans'] text-sm text-[#6C757D] mb-4">{expert.role}</p>

              {expert.specialties && expert.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {expert.specialties.map((s, si) => (
                    <span key={si}
                      className="font-['Nunito_Sans'] text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[rgba(10,147,150,0.07)] border border-[rgba(10,147,150,0.15)] text-[#0A9396]">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}