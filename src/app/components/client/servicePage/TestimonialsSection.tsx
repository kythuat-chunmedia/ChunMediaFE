"use client";
import React from "react";
import type { ServiceTestimonials } from "@/app/types";

interface TestimonialsSectionProps {
  data: ServiceTestimonials;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={s <= rating ? "#57F5B2" : "#e5e7eb"}
        >
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.3l-3.7 1.9.7-4.1-3-2.9 4.2-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data?.items?.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {data.title && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.subtitle}</p>
          )}
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((t, i) => (
            <div
              key={i}
              className="relative p-6 rounded-3xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white group"
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-5 text-6xl font-black leading-none opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: "#37BADE", fontFamily: "Georgia, serif" }}
              >
                "
              </div>

              <StarRating rating={t.rating} />

              <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-6 relative z-10">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                {t.authorAvatarUrl ? (
                  <img
                    src={t.authorAvatarUrl}
                    alt={t.authorName}
                    className="w-10 h-10 rounded-full object-cover border-2"
                    style={{ borderColor: "#57F5B2" }}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    {t.authorName?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.authorName}</p>
                  <p className="text-xs text-gray-400">
                    {[t.authorRole, t.authorCompany].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}