"use client";
import React from "react";
import type { ServiceAwardsSection } from "@/app/types";

interface AwardsSectionProps {
  data: ServiceAwardsSection;
}

export default function AwardsSection({ data }: AwardsSectionProps) {
  if (!data?.items?.length) return null;
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#57F5B2 0%,#37BADE 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/10 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          {data.title && (
            <h2 className="text-3xl font-extrabold text-white mb-2">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="text-white/80">{data.subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data.items.map((award, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/30 transition-all min-w-[220px] max-w-[280px]"
            >
              {award.logoUrl ? (
                <img
                  src={award.logoUrl}
                  alt={award.name}
                  className="w-14 h-14 object-contain rounded-xl bg-white/20 p-1"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-white/30 flex items-center justify-center text-2xl">
                  🏆
                </div>
              )}
              <div>
                <p className="text-white font-bold text-sm leading-tight">{award.name}</p>
                <p className="text-white/70 text-xs mt-0.5">{award.organization}</p>
                {award.year && (
                  <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {award.year}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}