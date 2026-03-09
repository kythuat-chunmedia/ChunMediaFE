"use client";
import React from "react";
import type { ServiceClientStats } from "@/app/types";

interface ClientStatsSectionProps {
  data: ServiceClientStats;
}

export default function ClientStatsSection({ data }: ClientStatsSectionProps) {
  if (!data) return null;
  return (
    <section className="py-14 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Big client count */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-12">
          {data.totalClients && (
            <div className="flex items-baseline gap-3">
              <span
                className="text-6xl lg:text-7xl font-black"
                style={{
                  backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.totalClients}
              </span>
              {data.description && (
                <span className="text-xl lg:text-2xl font-bold text-gray-700 max-w-xs leading-tight">
                  {data.description}
                </span>
              )}
            </div>
          )}
          {data.sectionTitle && (
            <div className="lg:ml-auto">
              <h2 className="text-2xl font-bold text-gray-800">{data.sectionTitle}</h2>
            </div>
          )}
        </div>

        {/* Logo grid */}
        {data.logos && data.logos.length > 0 && (
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 w-16 pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }}
            />
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none z-10"
              style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }}
            />
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {data.logos.map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow grayscale hover:grayscale-0 transition-all"
                  style={{ minWidth: 120, minHeight: 56 }}
                >
                  <img
                    src={logo.logoUrl}
                    alt={logo.name}
                    className="h-8 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.querySelector("span")!.style.display = "block";
                    }}
                  />
                  <span className="hidden text-sm font-semibold text-gray-500">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}