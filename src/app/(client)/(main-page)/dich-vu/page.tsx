export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { clientApi } from '@/app/lib/api';
import { Service } from '@/app/types';
import DynamicIcon from '@/app/components/shared/DynamicIcon';
import SeoMetadataSetter from '@/app/lib/helper/SeoMetadataSetter';
import { PageHeader } from '@/app/components/shared/PageHeader';
import { ArrowRight, Check, Eye, Users, TrendingUp } from 'lucide-react';

const processSteps = [
  { step: 1, title: 'Tư Vấn & Phân Tích', description: 'Lắng nghe và phân tích nhu cầu, mục tiêu của khách hàng để đưa ra giải pháp phù hợp nhất.', tag: 'Discovery' },
  { step: 2, title: 'Lập Kế Hoạch', description: 'Xây dựng chiến lược và kế hoạch chi tiết với timeline và KPIs cụ thể.', tag: 'Strategy' },
  { step: 3, title: 'Triển Khai', description: 'Thực hiện theo kế hoạch với sự giám sát chặt chẽ và báo cáo định kỳ.', tag: 'Execution' },
  { step: 4, title: 'Đánh Giá & Tối Ưu', description: 'Đo lường kết quả, đánh giá hiệu quả và tối ưu hóa liên tục.', tag: 'Growth' },
];

// Màu badge theo displayOrder hoặc index
const BADGE_COLORS = [
  '#F4A261', // cam
  '#9B59B6', // tím
  '#E74C3C', // đỏ
  '#2ECC71', // xanh lá
  '#3498DB', // xanh dương
  '#E91E8C', // hồng
  '#0A9396', // teal
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

      {/* Services Grid */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {activeServices.length === 0 ? (
            <p className="text-center text-[#6C757D] py-16 font-['Nunito_Sans']">Chưa có dịch vụ nào</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeServices.map((service, index) => {
                const slug = (service as any).slug
                  || service.title
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .replace(/đ/g, 'd')
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');

                const hasDetailPage = !!(service as any).slug;
                const badgeColor = BADGE_COLORS[index % BADGE_COLORS.length];

                // Lấy tối đa 3 feature đầu làm "stats" hiển thị ở bottom card
                const activeFeatures = (service.features ?? [])
                  .filter((f) => f.isActive)
                  .sort((a, b) => a.displayOrder - b.displayOrder);

                const statFeatures = activeFeatures.slice(0, 3);
                const checkFeatures = activeFeatures.slice(3);

                return (
                  <div
                    key={service.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(10,147,150,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail / Icon banner */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden" style={{ background: `linear-gradient(135deg, ${badgeColor}22, ${badgeColor}44)` }}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, ${badgeColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0A9396 0%, transparent 50%)`
                      }} />

                      {/* Center icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: badgeColor }}
                        >
                          <DynamicIcon
                            name={service.icon || 'Megaphone'}
                            className="w-10 h-10 text-white"
                            fallback={<span className="text-3xl">🎯</span>}
                          />
                        </div>
                      </div>

                      {/* Badge top-left */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className="inline-flex items-center px-2.5 py-[3px] rounded-md text-white text-[10px] font-bold tracking-wide"
                          style={{ backgroundColor: badgeColor }}
                        >
                          Dịch vụ
                        </span>
                        <span className="inline-flex items-center px-2 py-[3px] rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                          #{index + 1}
                        </span>
                      </div>

                      {/* "Xem chi tiết" badge top-right */}
                      {hasDetailPage && (
                        <div className="absolute top-3 right-3">
                          <Link
                            href={`/dich-vu/${slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-[3px] rounded-md bg-white/90 text-[10px] font-bold backdrop-blur-sm hover:bg-white transition-colors duration-200"
                            style={{ color: badgeColor }}
                          >
                            Xem chi tiết <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Title */}
                      <h2
                        className="font-['Be_Vietnam_Pro'] text-[15px] font-bold text-[#1A1A1A] leading-snug mb-2 group-hover:transition-colors duration-200 line-clamp-2"
                        style={{ '--hover-color': badgeColor } as React.CSSProperties}
                      >
                        {hasDetailPage ? (
                          <Link
                            href={`/dich-vu/${slug}`}
                            className="hover:text-[#0A9396] transition-colors duration-200"
                          >
                            {service.title}
                          </Link>
                        ) : service.title}
                      </h2>

                      {/* Description */}
                      <p className="font-['Nunito_Sans'] text-[#6C757D] text-[12.5px] leading-relaxed mb-4 line-clamp-2 flex-1">
                        {service.description}
                      </p>

                      {/* Check features (nếu có) */}
                      {checkFeatures.length > 0 && (
                        <div className="grid grid-cols-1 gap-1.5 mb-4">
                          {checkFeatures.slice(0, 3).map((feature) => (
                            <div key={feature.id} className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: badgeColor }}
                              >
                                <Check className="w-2.5 h-2.5 text-white" />
                              </div>
                              <span className="font-['Nunito_Sans'] text-[#2C3E50] text-[11.5px]">
                                {feature.content}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-gray-100 mb-4 mt-auto" />

                      {/* Stats row — dùng 3 feature đầu làm stats */}
                      {statFeatures.length > 0 ? (
                        <div className="flex items-stretch">
                          {statFeatures.map((feature, fi) => {
                            const icons = [
                              <Eye className="w-3 h-3" />,
                              <Users className="w-3 h-3" />,
                              <TrendingUp className="w-3 h-3" />,
                            ];
                            return (
                              <div
                                key={feature.id}
                                className={`flex-1 flex flex-col items-center text-center ${fi < statFeatures.length - 1 ? 'border-r border-gray-100' : ''}`}
                              >
                                <div className="flex items-center gap-1 text-[#A0ADB8] mb-1">
                                  {icons[fi]}
                                  <span className="text-[9px] font-['Nunito_Sans'] font-semibold tracking-wide uppercase">
                                    {fi === 0 ? 'Nổi bật' : fi === 1 ? 'Khách hàng' : 'Kết quả'}
                                  </span>
                                </div>
                                <span
                                  className="font-['Be_Vietnam_Pro'] text-[11px] font-bold leading-tight line-clamp-1 px-1"
                                  style={{ color: badgeColor }}
                                >
                                  {feature.content}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Fallback nếu không có features */
                        <div className="flex items-center justify-between">
                          <span className="font-['Nunito_Sans'] text-[11px] text-[#A0ADB8]">
                            Không có tính năng
                          </span>
                          {hasDetailPage && (
                            <Link
                              href={`/dich-vu/${slug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold font-['Nunito_Sans'] transition-colors duration-200"
                              style={{ color: badgeColor }}
                            >
                              Tìm hiểu <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      )}
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