export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Eye, Users, BarChart3, ShoppingCart, DollarSign } from 'lucide-react';
import { clientApi } from '@/app/lib/api';
import { formatNumber, formatCurrency } from '@/app/lib/helper/index';
import { Portfolio } from '@/app/types';

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const p = await clientApi.getPortfolioDetail(slug);
    if (!p) return { title: 'Portfolio không tìm thấy' };
    return { title: p.seoTitle || p.title, description: p.seoDescription || p.shortDescription, openGraph: { title: p.seoTitle || p.title, description: p.seoDescription || p.shortDescription, ...(p.thumbnailUrl && { images: [{ url: p.thumbnailUrl, alt: p.title }] }) } };
  } catch { return { title: 'Portfolio không tìm thấy' }; }
}

const getServiceType = (industry?: string | null) => {
  const map: Record<string, string> = { 'Fashion & Beauty': 'Marketing', 'Technology': 'Sự Kiện', 'F&B (Food & Beverage)': 'Video', 'Healthcare': 'PR', 'Finance & Banking': 'Sự Kiện' };
  return map[industry ?? ''] ?? 'Marketing';
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  let portfolio: Portfolio | null = null;
  try { portfolio = await clientApi.getPortfolioDetail(slug); } catch {}
  if (!portfolio) notFound();

  const kpiCards = [
    { icon: <Eye className="w-6 h-6 text-[#0A9396]" />, label: 'Reach', value: formatNumber(portfolio.reach) },
    { icon: <Users className="w-6 h-6 text-[#0A9396]" />, label: 'Engagement', value: formatNumber(portfolio.engagement) },
    { icon: <BarChart3 className="w-6 h-6 text-[#0A9396]" />, label: 'Conversion Rate', value: `${portfolio.conversionRate}%` },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]" />
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(10,147,150,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.04) 1px,transparent 1px)', backgroundSize:'44px 44px' }} />
        <div className="max-w-[1400px] mx-auto">
          <Link href="/portfolio" className="inline-flex items-center gap-2 font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors mb-6">
            <ArrowLeft size={16} /> Quay lại Portfolio
          </Link>
          <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-[#1A1A1A] mb-5">
            {portfolio.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white font-['Nunito_Sans'] text-xs font-700 rounded-lg">{getServiceType(portfolio.industry)}</span>
            <span className="px-3 py-1.5 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] text-[#0A9396] font-['Nunito_Sans'] text-xs font-700 rounded-lg">{portfolio.year}</span>
            {portfolio.industry && <span className="px-3 py-1.5 bg-white border border-[rgba(10,147,150,0.15)] text-[#6C757D] font-['Nunito_Sans'] text-xs rounded-lg">{portfolio.industry}</span>}
            {portfolio.clientName && <span className="px-3 py-1.5 bg-white border border-[rgba(10,147,150,0.15)] text-[#6C757D] font-['Nunito_Sans'] text-xs rounded-lg">{portfolio.clientName}</span>}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="px-4 pb-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative aspect-21/9 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(10,147,150,0.12)] border border-[rgba(10,147,150,0.1)]">
            <Image src={portfolio.bannerUrl || portfolio.thumbnailUrl} alt={portfolio.title} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-4" style={{ background:'linear-gradient(135deg,#F1F8F8,#E8F4F4)' }}>
        <div className="max-w-[1400px] mx-auto space-y-6">

          {/* Overview */}
          <div className="bg-white/90 backdrop-blur-sm border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 shadow-[0_4px_24px_rgba(10,147,150,0.07)]">
            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] mb-5">Tổng Quan Dự Án</h2>
            {portfolio.shortDescription && (
              <p className="font-['Nunito_Sans'] text-[#6C757D] text-base leading-[1.85] mb-6">{portfolio.shortDescription}</p>
            )}
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: portfolio.content }} />
          </div>

          {/* KPIs */}
          <div className="bg-white/90 backdrop-blur-sm border border-[rgba(10,147,150,0.12)] rounded-2xl p-8 shadow-[0_4px_24px_rgba(10,147,150,0.07)]">
            <h2 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] text-[#1A1A1A] mb-6">Kết Quả (KPIs)</h2>
            <div className="grid grid-cols-3 gap-5 mb-5">
              {kpiCards.map(({ icon, label, value }) => (
                <div key={label} className="text-center p-5 bg-[rgba(10,147,150,0.04)] border border-[rgba(10,147,150,0.1)] rounded-xl">
                  <div className="flex justify-center mb-3">{icon}</div>
                  <p className="font-['Nunito_Sans'] text-xs text-[#95A5A6] mb-1">{label}</p>
                  <p className="font-['Be_Vietnam_Pro'] text-2xl font-extrabold tracking-[-0.03em] bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">{value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: <ShoppingCart className="w-5 h-5 text-[#0A9396]" />, label: 'Đơn Hàng', value: `${portfolio.orderQuantity.toLocaleString('vi-VN')}+ đơn hàng` },
                { icon: <DollarSign className="w-5 h-5 text-[#0A9396]" />, label: 'Doanh Thu', value: formatCurrency(portfolio.revenue).replace('₫','VNĐ') },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between p-5 bg-[rgba(10,147,150,0.04)] border border-[rgba(10,147,150,0.1)] rounded-xl">
                  <div className="flex items-center gap-3">{icon}<span className="font-['Nunito_Sans'] text-sm text-[#6C757D]">{label}</span></div>
                  <span className="font-['Be_Vietnam_Pro'] font-bold text-[#0A9396]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center py-14 px-8 bg-white border border-[rgba(10,147,150,0.15)] rounded-3xl shadow-[0_8px_40px_rgba(10,147,150,0.08)] relative overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(10,147,150,0.04)_0%,transparent_70%)] animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">Bạn Có Dự Án Tương Tự?</h2>
            <p className="font-['Nunito_Sans'] text-[#6C757D] mb-8 text-sm leading-relaxed">Liên hệ với chúng tôi để được tư vấn và triển khai dự án của bạn</p>
            <Link href="/lien-he" className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 group">
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              Liên Hệ Ngay
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}