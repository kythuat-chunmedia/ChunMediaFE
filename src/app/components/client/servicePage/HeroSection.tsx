"use client";
import React from "react";
import type { ServiceHero } from "@/app/types";

interface HeroSectionProps {
  data: ServiceHero;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-white">
      {/* Gradient background blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(55,186,222,0.13) 0%, rgba(87,245,178,0.08) 60%, transparent 100%)",
        }}
      />
      {/* Purple top-right decoration */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(120,80,200,0.18) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-10 flex flex-col lg:flex-row items-center gap-10">
        {/* LEFT: Text */}
        <div className="flex-1 max-w-xl">
          {data.badge && (
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{
                background: "linear-gradient(90deg,#57F5B2,#37BADE)",
                color: "#fff",
              }}
            >
              {data.badge}
            </span>
          )}

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {data.highlightText ? (
              <>
                {data.title.split(data.highlightText)[0]}
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {data.highlightText}
                </span>
                {data.title.split(data.highlightText)[1]}
              </>
            ) : (
              data.title
            )}
          </h1>

          {data.subtitle && (
            <p className="text-gray-600 text-base lg:text-lg mb-8 leading-relaxed">
              {data.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-sm shadow-lg transition-transform hover:scale-105"
                style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
              >
                {data.ctaText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {data.ctaSecondaryText && data.ctaSecondaryUrl && (
              <a
                href={data.ctaSecondaryUrl}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm border-2 transition-all hover:shadow-md"
                style={{ borderColor: "#37BADE", color: "#37BADE" }}
              >
                {data.ctaSecondaryText}
              </a>
            )}
          </div>

          {/* Stats row */}
          {data.stats && data.stats.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-10">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl font-black"
                    style={{
                      backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500 font-medium mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Hero image */}
        {data.heroImageUrl && (
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg,#57F5B220,#37BADE20)",
                padding: "3px",
              }}
            >
              <img
                src={data.heroImageUrl}
                alt={data.title}
                className="w-full max-w-md object-cover rounded-3xl"
                style={{ minHeight: 320 }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}