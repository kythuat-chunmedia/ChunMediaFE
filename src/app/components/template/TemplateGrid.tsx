"use client";

import { useState, useMemo } from "react";
import type { TemplateLocal } from "@/app/types";
import TemplateCard from "./TemplateCard";

const PER_PAGE = 6;

interface TemplateGridProps {
  templates: TemplateLocal[];
  categories: string[];
}

export default function TemplateGrid({ templates, categories }: TemplateGridProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat = activeCategory === "Tất cả" || t.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [templates, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section id="templates" className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest mb-4 block text-cyan">Bộ sưu tập</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Chọn giao diện <span className="gradient-text">phù hợp</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">Đa dạng ngành nghề, chuẩn UI/UX, tối ưu hiệu suất</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative gradient-border rounded-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Tìm kiếm giao diện, ngành nghề..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/60 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-mint/20 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-10 justify-start md:justify-center px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                activeCategory === cat
                  ? "border-mint/50 bg-mint/[0.15] text-mint"
                  : "border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-gray-600">
            Hiển thị <span className="text-gray-400">{paginated.length}</span> / <span className="text-gray-400">{filtered.length}</span> giao diện
          </p>
          {totalPages > 1 && (
            <p className="text-xs text-gray-600">
              Trang <span className="text-mint">{currentPage}</span> / {totalPages}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((template, idx) => (
            <TemplateCard key={template.id} template={template} index={idx} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-mint/[0.08]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>
            <p className="text-gray-500 text-sm">Không tìm thấy giao diện phù hợp</p>
            <button onClick={() => { setActiveCategory("Tất cả"); setSearchQuery(""); }} className="mt-3 text-xs font-medium text-mint">Xóa bộ lọc</button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800 text-gray-500 hover:text-white hover:border-mint/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-linear-to-r from-mint to-cyan text-dark"
                    : "border border-gray-800 text-gray-500 hover:text-white hover:border-mint/30"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800 text-gray-500 hover:text-white hover:border-mint/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
