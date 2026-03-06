"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TemplateLocal } from "@/app/types";

interface TemplateCardProps {
  template: TemplateLocal;
  index: number;
}

export default function TemplateCard({ template, index }: TemplateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1, rootMargin: "50px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${(index % 6) * 80}ms, transform 0.4s ease ${(index % 6) * 80}ms`,
      }}
    >
      <Link href={`/hub/${template.slug}`}>
        <div className="group bg-white border border-[rgba(10,147,150,0.1)] rounded-2xl overflow-hidden h-full shadow-[0_2px_20px_rgba(10,147,150,0.06)] hover:border-[rgba(10,147,150,0.35)] hover:shadow-[0_12px_40px_rgba(10,147,150,0.12)] transition-all duration-400 hover:-translate-y-1">

          {/* Image */}
          <div className="relative overflow-hidden aspect-video">
            <Image
              src={template.image}
              alt={template.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {template.popular && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#0A9396] to-[#94D2BD] text-white shadow-[0_2px_8px_rgba(10,147,150,0.4)]">
                Phổ biến
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[rgba(10,147,150,0.08)] backdrop-blur-sm">
              <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_16px_rgba(10,147,150,0.4)] font-['Nunito_Sans']">
                Xem chi tiết
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-['Be_Vietnam_Pro'] font-bold text-sm text-[#1A1A1A] group-hover:text-[#0A9396] transition-colors">
                {template.name}
              </h3>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#95A5A6] uppercase tracking-wider bg-[rgba(10,147,150,0.06)] border border-[rgba(10,147,150,0.12)] px-2 py-0.5 rounded-lg shrink-0 ml-2">
                {template.category}
              </span>
            </div>
            <p className="font-['Nunito_Sans'] text-xs text-[#6C757D] leading-relaxed mb-4 line-clamp-2">
              {template.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {template.tags.slice(0, 2).map((tag) => (
                  <span key={tag}
                    className="font-['Nunito_Sans'] text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[rgba(10,147,150,0.07)] text-[#0A9396] border border-[rgba(10,147,150,0.15)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#95A5A6] font-['Nunito_Sans']">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                  {template.pages} trang
                </span>
                {template.responsive && (
                  <span className="flex items-center gap-1 text-[#0A9396] font-bold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
                    RWD
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}