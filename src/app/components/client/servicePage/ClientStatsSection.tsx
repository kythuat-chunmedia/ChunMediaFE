// ================================================================
// ClientStatsSection.tsx — REPLACE file trong project
// app/components/service-page/ClientStatsSection.tsx
// ================================================================
import type { ServicePageData, ClientLogo } from "@/app/types";
import Image from "next/image";

// Props spread từ clientStats object — khớp với cách page.tsx truyền vào:
// <ClientStatsSection {...page.clientStats} />
// HOẶC nếu page.tsx truyền data={{ ... }} thì dùng bản bên dưới

// ── Bản 1: page.tsx dùng {...page.clientStats} ──────────────────
// type Props = NonNullable<ServicePageData["clientStats"]>

// ── Bản 2: page.tsx dùng data={page.clientStats} ────────────────
type Props = { data: NonNullable<ServicePageData["clientStats"]> }

export default function ClientStatsSection({ data }: Props) {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Big number */}
        <div className="text-center mb-14">
          <div className="inline-flex flex-col items-center gap-3">
            <span className="font-['Be_Vietnam_Pro'] text-[clamp(4rem,8vw,7rem)] font-extrabold tracking-[-0.04em] bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent leading-none">
              {data.totalClients}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-linear-to-r from-transparent to-[#0A9396]" />
              <p className="font-['Nunito_Sans'] text-lg font-bold text-[#1A1A1A]">
                {data.description || "doanh nghiệp tin tưởng"}
              </p>
              <div className="w-16 h-px bg-linear-to-l from-transparent to-[#0A9396]" />
            </div>
          </div>
        </div>

        {/* Logo grid */}
        {data.logos && data.logos.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
            <div className={`grid gap-6 items-center justify-items-center ${
              data.logos.length <= 4 ? "grid-cols-2 md:grid-cols-4"
              : data.logos.length <= 6 ? "grid-cols-3 md:grid-cols-6"
              : "grid-cols-3 md:grid-cols-5"
            }`}>
              {data.logos.map((logo: ClientLogo, i: number) => (
                <div key={i} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                  <Image src={logo.logoUrl} alt={logo.name} width={120} height={48}
                    className="h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust badges */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏆", label: "Top 1% Agency Việt Nam" },
            { icon: "✅", label: "Cam kết kết quả" },
            { icon: "📊", label: "Báo cáo minh bạch" },
            { icon: "🔒", label: "Bảo mật dữ liệu" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4 bg-[rgba(10,147,150,0.04)] border border-[rgba(10,147,150,0.12)] rounded-xl">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-['Nunito_Sans'] text-sm font-bold text-[#1A1A1A]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}