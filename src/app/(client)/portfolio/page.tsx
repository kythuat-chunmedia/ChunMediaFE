'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Filter, Eye, Heart, BarChart3 } from 'lucide-react';
import { portfolioItems } from '@/config/site.config';

const categories = ['Tất cả', 'Marketing', 'Sự Kiện', 'Video', 'PR'];
const years = ['Tất cả', '2024', '2023', '2022'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedYear, setSelectedYear] = useState('Tất cả');

  const filteredItems = portfolioItems.filter((item) => {
    const categoryMatch = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    const yearMatch = selectedYear === 'Tất cả' || item.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-header-title">Portfolio</h1>
          <p className="page-header-subtitle">
            Những dự án thành công và kết quả ấn tượng của chúng tôi
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-100">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Bộ Lọc Dự Án</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Năm
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngành
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-4">
            Hiển thị {filteredItems.length} dự án
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="card card-hover overflow-hidden">
                {/* Image */}
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Category & Year Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-1">{item.industry}</p>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">Reach</span>
                      <span className="font-semibold">{item.stats.reach}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Heart className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">Engagement</span>
                      <span className="font-semibold">{item.stats.engagement}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <BarChart3 className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-600">Conversion</span>
                      <span className="font-semibold">{item.stats.conversion}</span>
                    </div>
                  </div>

                  {/* Link */}
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors mt-4"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
