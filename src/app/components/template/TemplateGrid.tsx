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

  const filtered = useMemo(() =>
    templates.filter((t) => {
      const matchCat = activeCategory === "Tất cả" || t.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    }), [templates, activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleCategory = (cat: string) => { setActiveCategory(cat); setCurrentPage(1); };
  const handleSearch   = (val: string) => { setSearchQuery(val);    setCurrentPage(1); };

  return (
    <section id="templates" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)]">
            <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Bộ sưu tập</span>
          </div>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-3">
            Chọn giao diện{" "}
            <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
              phù hợp
            </span>
          </h2>
          <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm">Đa dạng ngành nghề, chuẩn UI/UX, tối ưu hiệu suất</p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#95A5A6]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm kiếm giao diện, ngành nghề..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[rgba(10,147,150,0.2)] rounded-xl font-['Nunito_Sans'] text-sm text-[#1A1A1A] placeholder-[#95A5A6] outline-none focus:border-[#0A9396] focus:ring-2 focus:ring-[rgba(10,147,150,0.12)] transition-all shadow-[0_2px_12px_rgba(10,147,150,0.06)]"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 justify-start md:justify-center px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl font-['Nunito_Sans'] text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_12px_rgba(10,147,150,0.3)]"
                  : "bg-[rgba(10,147,150,0.06)] border border-[rgba(10,147,150,0.15)] text-[#6C757D] hover:text-[#0A9396] hover:border-[rgba(10,147,150,0.3)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-['Nunito_Sans'] text-xs text-[#95A5A6]">
            Hiển thị <span className="text-[#1A1A1A] font-bold">{paginated.length}</span> /{" "}
            <span className="text-[#1A1A1A] font-bold">{filtered.length}</span> giao diện
          </p>
          {totalPages > 1 && (
            <p className="font-['Nunito_Sans'] text-xs text-[#95A5A6]">
              Trang <span className="text-[#0A9396] font-bold">{currentPage}</span> / {totalPages}
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.15)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A9396" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm mb-3">Không tìm thấy giao diện phù hợp</p>
            <button
              onClick={() => { handleCategory("Tất cả"); handleSearch(""); }}
              className="font-['Nunito_Sans'] text-xs font-bold text-[#0A9396] hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(10,147,150,0.2)] text-[#6C757D] hover:text-[#0A9396] hover:border-[#0A9396] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-['Nunito_Sans'] text-sm font-bold transition-all ${
                  currentPage === page
                    ? "bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white shadow-[0_4px_12px_rgba(10,147,150,0.3)]"
                    : "border border-[rgba(10,147,150,0.2)] text-[#6C757D] hover:text-[#0A9396] hover:border-[#0A9396]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(10,147,150,0.2)] text-[#6C757D] hover:text-[#0A9396] hover:border-[#0A9396] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}