'use client';

import { useState } from 'react';
import { CategoryNew } from '@/app/types';
import { Search, X } from 'lucide-react';

interface NewsFilterProps {
  categories: CategoryNew[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function NewsFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearch,
  isLoading,
}: NewsFilterProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClearSearch = () => {
    setInputValue('');
    onSearch('');
  };


  return (
    <section className="py-6 bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative max-w-md">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isLoading}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            {inputValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategoryChange(null)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50
              ${selectedCategory === null
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tất cả
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50
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
  );
}