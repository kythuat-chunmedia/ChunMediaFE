'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Briefcase } from 'lucide-react';
import { mockNews, mockCategoryNews } from '@/app/(client)/lib/mockData';
import { formatDate } from '@/app/(client)/lib/api';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredNews = useMemo(() => {
    if (selectedCategory === null) {
      return mockNews;
    }
    return mockNews.filter((news) => news.categoryNewId === selectedCategory);
  }, [selectedCategory]);

  const getCategoryName = (categoryId: number) => {
    const category = mockCategoryNews.find((c) => c.id === categoryId);
    return category?.name || 'Chưa phân loại';
  };

  const getCategoryBadgeClass = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return 'bg-teal-100 text-teal-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Tin Tức</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Cập nhật tin tức, blog chuyên môn và cơ hội tuyển dụng
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === null
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Tất cả
            </button>
            {mockCategoryNews.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover"
              >
                {/* Image */}
                <div className="image-zoom relative aspect-16/10">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                  {news.categoryNewId === 3 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Briefcase size={12} />
                        Tuyển Dụng
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className={`badge ${getCategoryBadgeClass(news.categoryNewId)} mb-3`}>
                    {getCategoryName(news.categoryNewId)}
                  </span>

                  <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2">
                    {news.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {news.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(news.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {news.author}
                    </span>
                  </div>

                  <Link
                    href={`/tin-tuc/${news.url}`}
                    className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                  >
                    Đọc thêm
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">Không có bài viết trong danh mục này</p>
            </div>
          )}
        </div>
      </section>

      {/* Career CTA */}
      <section className="page-header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Đang Tìm Kiếm Cơ Hội Nghề Nghiệp?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp trong ngành truyền thông
          </p>
          <button
            onClick={() => setSelectedCategory(3)}
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Xem Vị Trí Tuyển Dụng
          </button>
        </div>
      </section>
    </>
  );
}
