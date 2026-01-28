'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Briefcase } from 'lucide-react';
import { newsItems } from '@/config/site.config';

const categories = ['Tất cả', 'Blog Chuyên Môn', 'Tin Nội Bộ', 'Tuyển Dụng'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredItems = newsItems.filter((item) => {
    return selectedCategory === 'Tất cả' || item.category === selectedCategory;
  });

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-header-title">Tin Tức</h1>
          <p className="page-header-subtitle">
            Cập nhật tin tức, blog chuyên môn và cơ hội tuyển dụng
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-gray-100">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="card card-hover overflow-hidden">
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Hiring Badge */}
                  {item.isHiring && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                        <Briefcase className="w-3 h-3" />
                        Tuyển Dụng
                      </span>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                  </div>

                  {/* Link */}
                  <Link
                    href={`/tin-tuc/${item.id}`}
                    className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                  >
                    Đọc thêm
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Đang Tìm Kiếm Cơ Hội Nghề Nghiệp?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp trong ngành truyền thông
          </p>
          <button
            onClick={() => setSelectedCategory('Tuyển Dụng')}
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Xem Vị Trí Tuyển Dụng
          </button>
        </div>
      </section>
    </>
  );
}
