'use client';

import { New } from '@/app/types';
import { NewsCard } from './NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface NewsListProps {
  news: New[];
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
  getCategoryName: (categoryId: number) => string;
}

export function NewsList({ news, pagination, onPageChange, getCategoryName }: NewsListProps) {
  if (!pagination) return null;

  const { currentPage, totalPages, totalItems, hasNext, hasPrevious } = pagination;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          Hiển thị {news.length} / {totalItems} bài viết
          {currentPage > 1 && ` • Trang ${currentPage}/${totalPages}`}
        </div>

        {/* News Grid */}
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                categoryName={getCategoryName(item.categoryNewId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">Không có bài viết nào</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevious}
              className={`p-2 rounded-lg transition-colors ${
                hasPrevious
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`min-w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-teal-600 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNext}
              className={`p-2 rounded-lg transition-colors ${
                hasNext
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}