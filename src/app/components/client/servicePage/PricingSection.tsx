"use client";
import React from "react";
import type { ServicePricing } from "@/app/types";

interface PricingSectionProps {
  data: ServicePricing;
}

export default function PricingSection({ data }: PricingSectionProps) {
  if (!data) return null;
  return (
    <section className="py-20 bg-gray-50">
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

        {/* Packages */}
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${Math.min(data.packages?.length || 1, 3)}, minmax(0,1fr))`,
          }}
        >
          {data.packages?.map((pkg, i) => (
            <div
              key={pkg.id || i}
              className="relative rounded-3xl overflow-hidden flex flex-col"
              style={
                pkg.isPopular
                  ? {
                      background: "linear-gradient(135deg,#57F5B2,#37BADE)",
                      boxShadow: "0 20px 60px rgba(55,186,222,0.35)",
                      transform: "scale(1.04)",
                    }
                  : {
                      background: "#fff",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                    }
              }
            >
              {pkg.isPopular && (
                <div className="absolute top-4 right-4 bg-white/25 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PHỔ BIẾN NHẤT
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                <h3
                  className={`text-xl font-bold mb-2 ${pkg.isPopular ? "text-white" : "text-gray-900"}`}
                >
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <span
                    className={`text-4xl font-black ${pkg.isPopular ? "text-white" : "text-gray-900"}`}
                  >
                    {pkg.price}
                  </span>
                  {pkg.priceNote && (
                    <span className={`text-sm ml-1 ${pkg.isPopular ? "text-white/80" : "text-gray-400"}`}>
                      {pkg.priceNote}
                    </span>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {pkg.features?.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="flex-shrink-0"
                      >
                        <circle cx="9" cy="9" r="9" fill={pkg.isPopular ? "rgba(255,255,255,0.3)" : "#57F5B230"} />
                        <path
                          d="M5 9l3 3 5-5"
                          stroke={pkg.isPopular ? "#fff" : "#37BADE"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={`text-sm ${pkg.isPopular ? "text-white" : "text-gray-700"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                {pkg.ctaText && pkg.ctaUrl && (
                  <a
                    href={pkg.ctaUrl}
                    className="block text-center py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-90"
                    style={
                      pkg.isPopular
                        ? { background: "rgba(255,255,255,0.25)", color: "#fff", border: "2px solid rgba(255,255,255,0.5)" }
                        : { background: "linear-gradient(90deg,#57F5B2,#37BADE)", color: "#fff" }
                    }
                  >
                    {pkg.ctaText}
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