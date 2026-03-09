"use client";
import React from "react";
import type { ServiceAboutCompany } from "@/app/types";

interface AboutCompanySectionProps {
  data: ServiceAboutCompany;
}

export default function AboutCompanySection({ data }: AboutCompanySectionProps) {
  if (!data) return null;
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT: Content */}
          <div>
            {data.sectionTitle && (
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
                {data.sectionTitle}
              </h2>
            )}
            {data.sectionSubtitle && (
              <p
                className="text-lg font-semibold mb-6"
                style={{ color: "#37BADE" }}
              >
                {data.sectionSubtitle}
              </p>
            )}
            <div
              className="h-1 w-16 rounded-full mb-6"
              style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
            />
            {data.content && (
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                {data.content}
              </p>
            )}

            {/* Stats */}
            {data.stats && data.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl text-center"
                    style={{
                      background: "linear-gradient(135deg,#57F5B210,#37BADE10)",
                      border: "1px solid #37BADE25",
                    }}
                  >
                    <div
                      className="text-3xl font-black mb-1"
                      style={{
                        backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm shadow-md hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
              >
                {data.ctaText}
              </a>
            )}
          </div>

          {/* RIGHT: Image */}
          {data.imageUrl && (
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl opacity-20 blur-xl"
                style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
              />
              <img
                src={data.imageUrl}
                alt={data.sectionTitle || "About company"}
                className="relative rounded-2xl shadow-xl w-full object-cover"
                style={{ maxHeight: 420 }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}