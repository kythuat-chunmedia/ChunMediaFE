'use client';

import { useState } from 'react';
import { CategoryNew } from '@/app/types';
import { Search, X } from 'lucide-react';

interface NewsFilterProps {
  categories: CategoryNew[];
  selectedCategory: number | null;
  onCategoryChange: (id: number | null) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function NewsFilter({ categories, selectedCategory, onCategoryChange, searchTerm, onSearch, isLoading }: NewsFilterProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSearch(inputValue); };

  return (
    <section className="py-5 px-4 bg-white/95 backdrop-blur-sm border-b border-[rgba(10,147,150,0.1)] sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Search */}
        <form onSubmit={handleSubmit} className="mb-4 max-w-sm">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              disabled={isLoading}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[rgba(10,147,150,0.2)] rounded-xl font-['Nunito_Sans'] text-sm placeholder-[#95A5A6] focus:outline-none focus:border-[#0A9396] focus:ring-2 focus:ring-[rgba(10,147,150,0.12)] transition-all disabled:opacity-50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#95A5A6]" />
            {inputValue && (
              <button type="button" onClick={() => { setInputValue(''); onSearch(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95A5A6] hover:text-[#1A1A1A] transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            disabled={isLoading}
            className={`px-4 py-1.5 rounded-full font-['Nunito_Sans'] text-sm font-600 transition-all duration-200 disabled:opacity-50 ${selectedCategory === null ? 'bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_12px_rgba(10,147,150,0.3)]' : 'bg-[rgba(10,147,150,0.08)] text-[#0A9396] border border-[rgba(10,147,150,0.2)] hover:bg-[rgba(10,147,150,0.14)]'}`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              disabled={isLoading}
              className={`px-4 py-1.5 rounded-full font-['Nunito_Sans'] text-sm font-600 transition-all duration-200 disabled:opacity-50 ${selectedCategory === cat.id ? 'bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_12px_rgba(10,147,150,0.3)]' : 'bg-[rgba(10,147,150,0.08)] text-[#0A9396] border border-[rgba(10,147,150,0.2)] hover:bg-[rgba(10,147,150,0.14)]'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}