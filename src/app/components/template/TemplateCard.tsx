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
    <div ref={ref} className={`card-enter ${visible ? "visible" : ""}`} style={{ transitionDelay: `${(index % 6) * 80}ms` }}>
      <Link href={`/hub/${template.slug}`}>
        <div className="glow-card rounded-2xl overflow-hidden cursor-pointer group bg-dark2/50 border border-white/5 h-full">
          <div className="relative overflow-hidden aspect-video">
            <Image src={template.image} alt={template.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent" />
            {template.popular && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-linear-to-r from-mint to-cyan text-dark">Phổ biến</div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-dark/60 backdrop-blur-xs">
              <span className="btn-primary px-5 py-2.5 rounded-lg text-xs font-semibold text-gray-950"><span>Xem chi tiết</span></span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white text-sm group-hover:text-mint transition-colors">{template.name}</h3>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider bg-gray-800/50 px-2 py-0.5 rounded shrink-0 ml-2">{template.category}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{template.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {template.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-mint/[0.06] text-mint border border-mint/10">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-gray-600">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                  {template.pages} trang
                </span>
                {template.responsive && (
                  <span className="flex items-center gap-1 text-mint">
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
