'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, BarChart3, ArrowRight, Filter } from 'lucide-react';
import { mockPortfolios } from '@/app/(client)/lib/mockData';
import { formatNumber } from '@/app/(client)/lib/api';

const years = ['Tất cả', '2024', '2023', '2022'];
const industries = ['Tất cả', 'Fashion', 'Technology', 'F&B', 'Healthcare', 'Finance'];

export default function PortfolioPage() {
  const [selectedYear, setSelectedYear] = useState('Tất cả');
  const [selectedIndustry, setSelectedIndustry] = useState('Tất cả');

  const filteredPortfolios = useMemo(() => {
    return mockPortfolios.filter((portfolio) => {
      const yearMatch = selectedYear === 'Tất cả' || portfolio.year.toString() === selectedYear;
      const industryMatch = selectedIndustry === 'Tất cả' || portfolio.industry === selectedIndustry;
      return yearMatch && industryMatch;
    });
  }, [selectedYear, selectedIndustry]);

  const getServiceType = (industry: string | undefined) => {
    switch (industry) {
      case 'Fashion':
        return { label: 'Marketing', color: 'bg-teal-600' };
      case 'Technology':
        return { label: 'Sự Kiện', color: 'bg-blue-600' };
      case 'F&B':
        return { label: 'Video', color: 'bg-orange-500' };
      case 'Healthcare':
        return { label: 'PR', color: 'bg-purple-600' };
      case 'Finance':
        return { label: 'Sự Kiện', color: 'bg-blue-600' };
      default:
        return { label: 'Video', color: 'bg-orange-500' };
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Những dự án thành công và kết quả ấn tượng của chúng tôi
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-teal-600" />
            <h2 className="font-semibold text-gray-900">Bộ Lọc Dự Án</h2>
          </div>

          <div className="flex flex-wrap gap-6">
            {/* Year Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Năm</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Ngành</span>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Hiển thị {filteredPortfolios.length} dự án
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((portfolio) => {
              const serviceType = getServiceType(portfolio.industry);
              
              return (
                <div
                  key={portfolio.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover"
                >
                  {/* Image */}
                  <div className="image-zoom relative aspect-4/3">
                    <Image
                      src={portfolio.thumbnailUrl}
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`text-white text-xs px-3 py-1 rounded-full ${serviceType.color}`}>
                        {serviceType.label}
                      </span>
                      <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                        {portfolio.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">{portfolio.industry}</p>
                    <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
                      {portfolio.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {portfolio.shortDescription}
                    </p>

                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                          <Eye className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-gray-500">Reach</p>
                        <p className="font-semibold text-teal-600">
                          {formatNumber(portfolio.reach)}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                          <Users className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-gray-500">Engagement</p>
                        <p className="font-semibold text-teal-600">
                          {formatNumber(portfolio.engagement)}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <p className="text-xs text-gray-500">Conversion</p>
                        <p className="font-semibold text-teal-600">
                          {portfolio.conversionRate}%
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/portfolio/${portfolio.slug}`}
                      className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                    >
                      Xem chi tiết
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPortfolios.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">Không tìm thấy dự án phù hợp với bộ lọc</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
