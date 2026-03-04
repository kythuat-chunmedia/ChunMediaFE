'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { New, CategoryNew, PaginatedResponse } from '@/app/types';
import { clientApi } from '@/app/lib/api';
import { NewsFilter } from './NewsFilter';
import { NewsList } from './NewsList';
import { ArrowRight, Briefcase, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Pagination {
  currentPage: number; pageSize: number; totalItems: number;
  totalPages: number; hasNext: boolean; hasPrevious: boolean;
}

interface NewsContainerProps {
  initialNews: New[];
  initialPagination: Pagination | null;
  categories: CategoryNew[];
  initialCategoryId?: number;
  initialSearchTerm?: string;
}

const PAGE_SIZE = 9;

export function NewsContainer({ initialNews, initialPagination, categories, initialCategoryId, initialSearchTerm }: NewsContainerProps) {
  const router = useRouter();
  const [news, setNews] = useState<New[]>(initialNews);
  const [pagination, setPagination] = useState<Pagination | null>(initialPagination);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialCategoryId ?? null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = useCallback(async (params: { page?: number; categoryId?: number | null; search?: string; }) => {
    setIsLoading(true);
    try {
      const response = await clientApi.getNewsForNewPage({
        pageNumber: params.page || 1, pageSize: PAGE_SIZE,
        categoryId: params.categoryId ?? undefined,
        searchTerm: params.search || undefined,
      });
      setNews(response.items || []);
      setPagination(response.pagination || null);

      const p = new URLSearchParams();
      if (params.page && params.page > 1) p.set('page', params.page.toString());
      if (params.categoryId) p.set('category', params.categoryId.toString());
      if (params.search) p.set('search', params.search);
      router.push(`/tin-tuc${p.toString() ? `?${p}` : ''}`, { scroll: false });
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleCategoryChange = (id: number | null) => { setSelectedCategory(id); fetchNews({ page: 1, categoryId: id, search: searchTerm }); };
  const handlePageChange = (page: number) => { fetchNews({ page, categoryId: selectedCategory, search: searchTerm }); window.scrollTo({ top: 400, behavior: 'smooth' }); };
  const handleSearch = (term: string) => { setSearchTerm(term); fetchNews({ page: 1, categoryId: selectedCategory, search: term }); };
  const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.name || 'Chưa phân loại';

  return (
    <>
      <NewsFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} searchTerm={searchTerm} onSearch={handleSearch} isLoading={isLoading} />

      {isLoading ? (
        <div className="flex justify-center items-center py-16 bg-white">
          <Loader2 className="w-7 h-7 animate-spin text-[#0A9396]" />
        </div>
      ) : (
        <NewsList news={news} pagination={pagination} onPageChange={handlePageChange} getCategoryName={getCategoryName} />
      )}

      {/* Career CTA */}
      {/* <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center py-14 px-8 bg-white border border-[rgba(10,147,150,0.15)] rounded-3xl shadow-[0_8px_40px_rgba(10,147,150,0.08)] relative overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(10,147,150,0.04)_0%,transparent_70%)] animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
              Đang Tìm Kiếm Cơ Hội Nghề Nghiệp?
            </h2>
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-relaxed mb-8">
              Tham gia đội ngũ của chúng tôi và phát triển sự nghiệp trong ngành truyền thông
            </p>
            <button
              onClick={() => handleCategoryChange(3)}
              disabled={isLoading}
              className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] transition-all duration-300 disabled:opacity-50 group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <Briefcase size={16} />
              Xem Vị Trí Tuyển Dụng
            </button>
          </div>
        </div>
      </section> */}


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