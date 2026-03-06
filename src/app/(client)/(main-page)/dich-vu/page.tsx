export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { clientApi } from '@/app/lib/api';
import { Service } from '@/app/types';
import DynamicIcon from '@/app/components/shared/DynamicIcon';
import SeoMetadataSetter from '@/app/lib/helper/SeoMetadataSetter';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { Check, ArrowRight } from 'lucide-react';

// ── Hardcode process chỉ dùng làm fallback nếu service không có slug ──
const processSteps = [
  { step: 1, title: 'Tư Vấn & Phân Tích', description: 'Lắng nghe và phân tích nhu cầu, mục tiêu của khách hàng để đưa ra giải pháp phù hợp nhất.', tag: 'Discovery' },
  { step: 2, title: 'Lập Kế Hoạch', description: 'Xây dựng chiến lược và kế hoạch chi tiết với timeline và KPIs cụ thể.', tag: 'Strategy' },
  { step: 3, title: 'Triển Khai', description: 'Thực hiện theo kế hoạch với sự giám sát chặt chẽ và báo cáo định kỳ.', tag: 'Execution' },
  { step: 4, title: 'Đánh Giá & Tối Ưu', description: 'Đo lường kết quả, đánh giá hiệu quả và tối ưu hóa liên tục.', tag: 'Growth' },
];

export default async function ServicesPage() {
  let services: Service[] = [];
  try {
    services = await clientApi.getServicesPublic();
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <SeoMetadataSetter />
      <PageHeader
        badge="Our Services"
        title="Dịch Vụ"
        description="Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp"
      />

      {/* Services List */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {activeServices.length === 0 ? (
            <p className="text-center text-[#6C757D] py-12 font-['Nunito_Sans']">Chưa có dịch vụ nào</p>
          ) : (
            <div className="space-y-6">
              {activeServices.map((service) => {
                // ── Ưu tiên slug từ DB, fallback normalize title ──────
                const slug = (service as any).slug
                  || service.title
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/đ/g, 'd')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');

                // Có slug trong DB → có trang detail riêng
                const hasDetailPage = !!(service as any).slug;

                return (
                  <div
                    key={service.id}
                    id={slug}
                    className="group relative bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 lg:p-10 shadow-[0_2px_20px_rgba(10,147,150,0.06)] hover:border-[rgba(10,147,150,0.35)] hover:shadow-[0_8px_40px_rgba(10,147,150,0.1)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-[#0A9396] to-[#94D2BD] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(10,147,150,0.3)]">
                        <DynamicIcon
                          name={service.icon || 'Megaphone'}
                          className="w-7 h-7 text-white"
                          fallback={<span className="text-xl">🎯</span>}
                        />
                      </div>

                      <div className="grow">
                        {/* Title — link nếu có detail page */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          {hasDetailPage ? (
                            <Link
                              href={`/dich-vu/${slug}`}
                              className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] hover:text-[#0A9396] transition-colors duration-200"
                            >
                              {service.title}
                            </Link>
                          ) : (
                            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A]">
                              {service.title}
                            </h2>
                          )}

                          {/* Badge "Xem chi tiết" nếu có detail page */}
                          {hasDetailPage && (
                            <Link
                              href={`/dich-vu/${slug}`}
                              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0A9396] border border-[rgba(10,147,150,0.3)] rounded-full hover:bg-[rgba(10,147,150,0.06)] hover:border-[#0A9396] transition-all duration-200 shrink-0 font-['Nunito_Sans']"
                            >
                              Xem chi tiết <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>

                        <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-[1.8] mb-6">
                          {service.description}
                        </p>

                        {service.features && service.features.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-2.5">
                            {service.features
                              .filter((f) => f.isActive)
                              .sort((a, b) => a.displayOrder - b.displayOrder)
                              .map((feature) => (
                                <div key={feature.id} className="flex items-center gap-3">
                                  <div className="w-5 h-5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="font-['Nunito_Sans'] text-[#2C3E50] text-sm font-500">
                                    {feature.content}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* CTA bottom — mobile */}
                        {hasDetailPage && (
                          <div className="sm:hidden mt-5">
                            <Link
                              href={`/dich-vu/${slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A9396] hover:gap-2.5 transition-all duration-200 font-['Nunito_Sans']"
                            >
                              Xem chi tiết <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#F1F8F8,#E8F4F4)' }}>
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-[0.7rem] font-bold tracking-widest uppercase mb-4 font-['Nunito_Sans']">
              Workflow
            </span>
            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
              Quy Trình Triển Khai
            </h2>
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm">Quy trình làm việc chuyên nghiệp và hiệu quả</p>
          </div>

          <div className="space-y-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group flex items-center gap-6 bg-white/80 backdrop-blur-sm border border-[rgba(10,147,150,0.12)] rounded-2xl p-6 hover:border-[#0A9396] hover:shadow-[0_8px_32px_rgba(10,147,150,0.1)] transition-all duration-300"
              >
                <div className="w-11 h-11 border-[1.5px] border-[rgba(10,147,150,0.25)] rounded-xl flex items-center justify-center shrink-0 font-['JetBrains_Mono'] text-[0.75rem] font-500 text-[#0A9396] group-hover:bg-[#0A9396] group-hover:text-white group-hover:border-[#0A9396] transition-all duration-300">
                  0{step.step}
                </div>
                <div className="grow">
                  <h3 className="font-['Be_Vietnam_Pro'] text-base font-bold text-[#1A1A1A] mb-1 group-hover:text-[#0A9396] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-relaxed">{step.description}</p>
                </div>
                <span className="font-['JetBrains_Mono'] text-[0.62rem] text-[rgba(10,147,150,0.5)] whitespace-nowrap hidden sm:block">
                  {step.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center py-16 px-8 bg-white/80 backdrop-blur-xl border border-[rgba(10,147,150,0.15)] rounded-3xl shadow-[0_8px_40px_rgba(10,147,150,0.1)] relative overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(10,147,150,0.04)_0%,transparent_70%)] animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-4">
              Sẵn Sàng Bắt Đầu Dự Án?
            </h2>
            <p className="font-['Nunito_Sans'] text-[#6C757D] mb-8 leading-relaxed">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
            </p>
            <Link
              href="/lien-he"
              className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              Liên Hệ Ngay <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}