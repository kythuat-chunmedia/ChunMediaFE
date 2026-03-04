'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, BarChart3, Filter } from 'lucide-react';
import { Portfolio } from '@/app/types';
import { formatNumber } from '@/app/lib/helper/index';
import { PageHeader } from '@/app/components/shared/PageHeader';

interface PortfolioPageClientProps {
  portfolios: Portfolio[];
  years: string[];
  industries: string[];
}

const SERVICE_MAP: Record<string, { label: string; color: string }> = {
  'Fashion & Beauty': { label: 'Marketing', color: 'bg-[#0A9396]' },
  'Fashion':          { label: 'Marketing', color: 'bg-[#0A9396]' },
  'Technology':       { label: 'Sự Kiện',   color: 'bg-blue-600' },
  'F&B (Food & Beverage)': { label: 'Video', color: 'bg-orange-500' },
  'F&B':              { label: 'Video',      color: 'bg-orange-500' },
  'Healthcare':       { label: 'PR',         color: 'bg-purple-600' },
  'Finance & Banking':{ label: 'Sự Kiện',   color: 'bg-blue-600' },
  'Finance':          { label: 'Sự Kiện',   color: 'bg-blue-600' },
};
const getServiceType = (industry?: string | null) =>
  SERVICE_MAP[industry ?? ''] ?? { label: 'Video', color: 'bg-orange-500' };

const selectClass = "px-4 py-2 bg-white border border-[rgba(10,147,150,0.2)] rounded-xl font-['Nunito_Sans'] text-sm text-[#1A1A1A] focus:outline-none focus:border-[#0A9396] focus:ring-2 focus:ring-[rgba(10,147,150,0.12)] transition-all";

export default function PortfolioPageClient({ portfolios = [], years = [], industries = [] }: PortfolioPageClientProps) {
  const [selectedYear, setSelectedYear] = useState('Tất cả');
  const [selectedIndustry, setSelectedIndustry] = useState('Tất cả');

  const filtered = useMemo(() =>
    (portfolios ?? []).filter((p) => {
      const y = selectedYear === 'Tất cả' || p.year.toString() === selectedYear;
      const i = selectedIndustry === 'Tất cả' || p.industry === selectedIndustry;
      return y && i;
    }), [portfolios, selectedYear, selectedIndustry]);

  return (
    <>
      <PageHeader badge="Portfolio" title="Portfolio" description="Những dự án thành công và kết quả ấn tượng của chúng tôi" />

      {/* Filters */}
      <section className="py-6 px-4 bg-white border-b border-[rgba(10,147,150,0.1)] sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#0A9396]" />
            <span className="font-['Be_Vietnam_Pro'] text-sm font-700 text-[#1A1A1A]">Lọc</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['Nunito_Sans'] text-sm text-[#6C757D]">Năm</span>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className={selectClass}>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['Nunito_Sans'] text-sm text-[#6C757D]">Ngành</span>
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className={selectClass}>
              {industries.map((i) => <option key={i}>{i}</option>)}
            </select>
          </div>
          <span className="font-['Nunito_Sans'] text-xs text-[#95A5A6] ml-auto">Hiển thị {filtered.length} dự án</span>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((portfolio) => {
              const st = getServiceType(portfolio.industry);
              return (
                <div key={portfolio.id} className="group bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(10,147,150,0.06)] hover:border-[rgba(10,147,150,0.35)] hover:shadow-[0_12px_40px_rgba(10,147,150,0.12)] transition-all duration-400 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Link href={`/portfolio/${portfolio.slug}`}>
                      <Image src={portfolio.thumbnailUrl} alt={portfolio.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`${st.color} text-white font-['Nunito_Sans'] text-[0.7rem] font-700 px-3 py-1 rounded-lg`}>{st.label}</span>
                      <span className="bg-[#EE9B00] text-white font-['Nunito_Sans'] text-[0.7rem] font-700 px-3 py-1 rounded-lg">{portfolio.year}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-['Nunito_Sans'] text-[0.7rem] text-[#95A5A6] mb-1.5">{portfolio.industry || 'N/A'}</p>
                    <h3 className="font-['Be_Vietnam_Pro'] font-bold text-[#1A1A1A] mb-2 line-clamp-2">{portfolio.title}</h3>
                    <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm mb-4 line-clamp-2">{portfolio.shortDescription}</p>

                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(10,147,150,0.08)]">
                      {[
                        { icon: <Eye className="w-3.5 h-3.5" />, label: 'Reach', value: formatNumber(portfolio.reach) },
                        { icon: <Users className="w-3.5 h-3.5" />, label: 'Engagement', value: formatNumber(portfolio.engagement) },
                        { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Conversion', value: `${portfolio.conversionRate}%` },
                      ].map(({ icon, label, value }) => (
                        <div key={label} className="text-center">
                          <div className="flex justify-center text-[rgba(10,147,150,0.4)] mb-1">{icon}</div>
                          <p className="font-['Nunito_Sans'] text-[0.65rem] text-[#95A5A6]">{label}</p>
                          <p className="font-['Be_Vietnam_Pro'] text-sm font-bold text-[#0A9396]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-['Nunito_Sans'] text-[#6C757D] py-16">Không tìm thấy dự án phù hợp</p>
          )}
        </div>
      </section>
    </>
  );
}