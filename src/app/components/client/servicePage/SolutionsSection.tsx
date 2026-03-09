"use client";
import React from "react";
import type { ServiceSolutions } from "@/app/types";

interface SolutionsSectionProps {
  data: ServiceSolutions;
}

export default function SolutionsSection({ data }: SolutionsSectionProps) {
  if (!data?.items?.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {data.title && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.subtitle}</p>
          )}
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
              style={{ background: "#fff" }}
            >
              {/* Gradient hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "linear-gradient(135deg,#57F5B210,#37BADE15)" }}
              />

              {/* Image */}
              {item.imageUrl && (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: "linear-gradient(to bottom, transparent, #37BADE)" }}
                  />
                </div>
              )}

              <div className="relative p-6">
                {/* Icon badge */}
                {item.icon && (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    <span className="text-white text-lg">✦</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent transition-all"
                  style={{ backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)", WebkitBackgroundClip: "text", backgroundClip: "text" } as React.CSSProperties}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>
                {item.ctaText && item.ctaUrl && (
                  <a
                    href={item.ctaUrl}
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "#37BADE" }}
                  >
                    {item.ctaText}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}