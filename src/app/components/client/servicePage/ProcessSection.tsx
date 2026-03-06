// ============================================================
// ProcessSection.tsx
// app/components/service-page/ProcessSection.tsx
// ============================================================
import type { ServicePageData } from "@/app/types";

type Props = { data: NonNullable<ServicePageData["process"]> }

export default function ProcessSection({ data }: Props) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] mb-5">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Quy trình</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
            {data.title || "Quy Trình Triển Khai"}
          </h2>
          {data.subtitle && (
            <p className="font-['Nunito_Sans'] text-[#6C757D] mt-3 text-base">{data.subtitle}</p>
          )}
        </div>

        {/* Steps — horizontal timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-9 left-[calc(10%+28px)] right-[calc(10%+28px)] h-0.5"
            style={{ background: "linear-gradient(90deg, #0A9396, #94D2BD)" }} />

          <div className={`grid gap-8 ${
            data.steps.length <= 4 ? "md:grid-cols-4"
            : data.steps.length === 5 ? "md:grid-cols-5"
            : "md:grid-cols-3"
          }`}>
            {data.steps.map((step, i) => (
              <div key={step.stepNumber} className="relative flex flex-col items-center text-center group">

                {/* Step circle */}
                <div className="relative z-10 mb-5">
                  <div className="w-[72px] h-[72px] rounded-full bg-linear-to-br from-[#0A9396] to-[#94D2BD] flex items-center justify-center shadow-[0_4px_20px_rgba(10,147,150,0.3)] group-hover:shadow-[0_8px_32px_rgba(10,147,150,0.5)] transition-all duration-300 group-hover:scale-110">
                    {step.icon ? (
                      <span className="text-2xl">{step.icon}</span>
                    ) : (
                      <span className="font-['Be_Vietnam_Pro'] text-xl font-extrabold text-white">
                        {String(step.stepNumber).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#EE9B00] flex items-center justify-center shadow-[0_2px_8px_rgba(238,155,0,0.4)]">
                    <span className="font-['Be_Vietnam_Pro'] text-[9px] font-extrabold text-white">{step.stepNumber}</span>
                  </div>
                </div>

                <h3 className="font-['Be_Vietnam_Pro'] font-extrabold text-[#1A1A1A] text-sm mb-2 group-hover:text-[#0A9396] transition-colors">
                  {step.title}
                </h3>
                <p className="font-['Nunito_Sans'] text-xs text-[#6C757D] leading-relaxed mb-3">
                  {step.description}
                </p>
                {step.duration && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[rgba(10,147,150,0.07)] border border-[rgba(10,147,150,0.15)]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A9396" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    <span className="font-['Nunito_Sans'] text-[10px] font-bold text-[#0A9396]">{step.duration}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}