'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { New, CategoryNew, PaginatedResponse } from '@/app/types';
import { clientApi } from '@/app/lib/api';
import { NewsFilter } from './NewsFilter';
import { NewsList } from './NewsList';
import { Briefcase, Loader2 } from 'lucide-react';



interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface NewsContainerProps {
  initialNews: New[];
  initialPagination: Pagination | null;
  categories: CategoryNew[];
  initialCategoryId?: number;
  initialSearchTerm?: string;
}

const PAGE_SIZE = 9;

export function NewsContainer({
  initialNews,
  initialPagination,
  categories,
  initialCategoryId,
  initialSearchTerm,
}: NewsContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [news, setNews] = useState<New[]>(initialNews);
  const [pagination, setPagination] = useState<Pagination | null>(initialPagination);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId ?? null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [isLoading, setIsLoading] = useState(false);

  // Update URL và fetch data
  const fetchNews = useCallback(async (params: {
    page?: number;
    categoryId?: number | null;
    search?: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await clientApi.getNewsForNewPage({
        pageNumber: params.page || 1,
        pageSize: PAGE_SIZE,
        categoryId: params.categoryId ?? undefined,
        searchTerm: params.search || undefined,
      });

      setNews(response.items || []);
      setPagination(response.pagination || null);

      // Update URL
      const newParams = new URLSearchParams();
      if (params.page && params.page > 1) newParams.set('page', params.page.toString());
      if (params.categoryId) newParams.set('category', params.categoryId.toString());
      if (params.search) newParams.set('search', params.search);

      const query = newParams.toString();
      router.push(`/tin-tuc${query ? `?${query}` : ''}`, { scroll: false });

    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Handle category change
  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    fetchNews({ page: 1, categoryId, search: searchTerm });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchNews({ page, categoryId: selectedCategory, search: searchTerm });
    // Scroll to top of list
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchNews({ page: 1, categoryId: selectedCategory, search: term });
  };

  // Get category name
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || 'Chưa phân loại';
  };

  return (
    <>
      {/* Category Filter */}
      <NewsFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      )}

      {/* News List */}
      {!isLoading && (
        <NewsList
          news={news}
          pagination={pagination}
          onPageChange={handlePageChange}
          getCategoryName={getCategoryName}
        />
      )}

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
            onClick={() => handleCategoryChange(3)}
            disabled={isLoading}
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            <Briefcase size={18} />
            Xem Vị Trí Tuyển Dụng
          </button>
        </div>
      </section>
    </>
  );
}