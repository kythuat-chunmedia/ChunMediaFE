import Link from 'next/link';
import DynamicIcon from '@/app/components/shared/DynamicIcon';
import { Service } from '@/app/types';
import { ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="py-32 px-4 relative" id="services">
      <div className="text-center mb-20">
        <span className="inline-block px-5 py-2 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-xs font-bold tracking-widest uppercase mb-5 font-['Nunito_Sans']">
          Our Services
        </span>
        <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-snug mb-6 text-[#1A1A1A]">
          Giải Pháp Truyền Thông<br />Toàn Diện
        </h2>
        <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] max-w-[680px] mx-auto leading-[1.85]">
          Kết hợp công nghệ AI, dữ liệu lớn và chiến lược sáng tạo để mang đến hiệu quả vượt trội cho thương hiệu của bạn.
        </p>
      </div>

      {/* Grid 3 cột, mỗi card chia trái/phải */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2  gap-5">
        {activeServices.map((service, index) => {
          const slug = service.slug
            || service.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

          const hasDetailPage = !!service.slug;

          const activeFeatures = (service.features ?? [])
            .filter((f) => f.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);

          const orderNumber = String(index + 1).padStart(2, '0');

          const Wrapper = hasDetailPage ? Link : 'div';
          const wrapperProps = hasDetailPage ? { href: `/dich-vu/${slug}` } : {};

          return (
            <Wrapper
              key={service.id}
              {...(wrapperProps as any)}
              className="group relative grid grid-cols-[4fr_6fr] bg-white border border-[rgba(10,147,150,0.15)] rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#0A9396] hover:shadow-[0_8px_36px_rgba(10,147,150,0.14)]"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#0A9396] to-[#94D2BD] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-10" />

              {/* ── Phần trên: Ảnh ── */}
              <div className="relative w-full h-full shrink-0 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[rgba(10,147,150,0.07)] to-[rgba(148,210,189,0.15)]">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] rounded-2xl flex items-center justify-center shadow-lg">
                      <DynamicIcon
                        name={service.icon || 'Megaphone'}
                        className="w-8 h-8 text-white"
                        fallback={<span className="text-2xl">🎯</span>}
                      />
                    </div>
                  </div>
                )}

                {/* Số thứ tự */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm z-10">
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold text-[#0A9396]">
                    {orderNumber}
                  </span>
                </div>

                {/* Overlay bottom blend */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/60 to-transparent" />
              </div>

              {/* ── Phần dưới: Nội dung ── */}
              <div className="flex flex-col flex-1 px-6 py-5">
                {/* Icon + Title */}
                <div className="flex items-center gap-2.5 mb-2">
                  {/* {service.icon && (
                    <div className="w-7 h-7 bg-[rgba(10,147,150,0.1)] rounded-lg flex items-center justify-center shrink-0">
                      <DynamicIcon name={service.icon} className="w-3.5 h-3.5 text-[#0A9396]" />
                    </div>
                  )} */}
                  <h3 className="font-['Be_Vietnam_Pro'] text-[15px] font-bold tracking-[-0.02em] text-[#1A1A1A] group-hover:text-[#0A9396] transition-colors duration-300 leading-snug line-clamp-1">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-['Nunito_Sans'] text-[#6C757D] text-[12.5px] leading-[1.75] mb-4 line-clamp-2">
                  {service.description}
                </p>



                {/* Features — tags */}
{activeFeatures.length > 0 && (
  <div className="flex flex-col items-start gap-1.5 mb-4">
    {activeFeatures.slice(0, 3).map((f) => (
      <span
        key={f.id}
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[rgba(10,147,150,0.07)] border border-[rgba(10,147,150,0.15)] text-[#0A9396] text-[11px] font-medium font-['Nunito_Sans']"
      >
        <span className="w-1 h-1 rounded-full bg-[#0A9396] shrink-0" />
        {f.content}
      </span>
    ))}
  </div>
)}
                {/* {activeFeatures.length > 0 && (
                  <div className="flex flex-row gap-1.5 mb-4">
                    {activeFeatures.slice(0, 3).map((f) => (
                      <span
                        key={f.id}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[rgba(10,147,150,0.07)] border border-[rgba(10,147,150,0.15)] text-[#0A9396] text-[11px] font-medium font-['Nunito_Sans']"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#0A9396] shrink-0" />
                        {f.content}
                      </span>
                    ))}
                  </div>
                )} */}

                {/* CTA */}
                {hasDetailPage && (
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-['Nunito_Sans'] text-[11px] text-gray-400">
                      Dịch vụ chuyên nghiệp
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#0A9396] text-[12px] font-bold font-['Nunito_Sans'] group-hover:gap-2.5 transition-all duration-300">
                      Xem chi tiết <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}