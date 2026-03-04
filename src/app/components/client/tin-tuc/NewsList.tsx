'use client';

import { New } from '@/app/types';
import { NewsCard } from './NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Pagination { currentPage:number; pageSize:number; totalItems:number; totalPages:number; hasNext:boolean; hasPrevious:boolean; }
interface NewsListProps { news:New[]; pagination:Pagination|null; onPageChange:(p:number)=>void; getCategoryName:(id:number)=>string; }

export function NewsList({ news, pagination, onPageChange, getCategoryName }: NewsListProps) {
  if (!pagination) return null;
  const { currentPage, totalPages, totalItems, hasNext, hasPrevious } = pagination;

  const pages = (): (number|string)[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1,2,3,4,'…',totalPages];
    if (currentPage >= totalPages - 2) return [1,'…',totalPages-3,totalPages-2,totalPages-1,totalPages];
    return [1,'…',currentPage-1,currentPage,currentPage+1,'…',totalPages];
  };

  const btnBase = "min-w-[38px] h-[38px] rounded-xl font-['Nunito_Sans'] text-sm font-600 transition-all duration-200";

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-['Nunito_Sans'] text-xs text-[#95A5A6] mb-6">
          Hiển thị {news.length} / {totalItems} bài viết{currentPage > 1 ? ` · Trang ${currentPage}/${totalPages}` : ''}
        </p>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} categoryName={getCategoryName(item.categoryNewId)} />
            ))}
          </div>
        ) : (
          <p className="text-center font-['Nunito_Sans'] text-[#6C757D] py-16">Không có bài viết nào</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-12">
            <button onClick={() => onPageChange(currentPage-1)} disabled={!hasPrevious} className={`${btnBase} p-2 ${hasPrevious ? 'text-[#1A1A1A] hover:bg-[rgba(10,147,150,0.08)]' : 'text-[#D0D0D0] cursor-not-allowed'}`}>
              <ChevronLeft size={18} />
            </button>
            {pages().map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === 'number' && onPageChange(p)}
                disabled={p === '…'}
                className={`${btnBase} ${p === currentPage ? 'bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_12px_rgba(10,147,150,0.3)]' : p === '…' ? 'text-[#95A5A6] cursor-default' : 'text-[#1A1A1A] hover:bg-[rgba(10,147,150,0.08)]'}`}
              >{p}</button>
            ))}
            <button onClick={() => onPageChange(currentPage+1)} disabled={!hasNext} className={`${btnBase} p-2 ${hasNext ? 'text-[#1A1A1A] hover:bg-[rgba(10,147,150,0.08)]' : 'text-[#D0D0D0] cursor-not-allowed'}`}>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}