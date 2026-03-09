"use client";
import React from "react";
import type { ServiceAbout } from "@/app/types";

interface AboutSectionProps {
  data: ServiceAbout;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        {(data.sectionTitle || data.sectionSubtitle) && (
          <div className="text-center mb-14">
            {data.sectionTitle && (
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
                {data.sectionTitle}
              </h2>
            )}
            {data.sectionSubtitle && (
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                {data.sectionSubtitle}
              </p>
            )}
            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT: Image */}
          {data.imageUrl && (
            <div className="relative">
              {/* Decorative blob behind image */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
              />
              <img
                src={data.imageUrl}
                alt={data.sectionTitle || "About"}
                className="relative rounded-2xl shadow-xl w-full object-cover"
                style={{ maxHeight: 420 }}
              />
              {/* Video play button overlay */}
              {data.videoUrl && (
                <a
                  href={data.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                    style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </a>
              )}
            </div>
          )}

          {/* RIGHT: Content */}
          <div>
            <p className="text-gray-700 text-base leading-relaxed mb-8 whitespace-pre-line">
              {data.content}
            </p>

            {/* Stats grid */}
            {data.stats && data.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl border"
                    style={{ borderColor: "#37BADE30", background: "linear-gradient(135deg,#57F5B208,#37BADE08)" }}
                  >
                    {stat.icon && (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                      >
                        ✦
                      </div>
                    )}
                    <div>
                      <div
                        className="text-2xl font-black"
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
                  </div>
                ))}
              </div>
            )}

            {data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm shadow-md transition-transform hover:scale-105"
                style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
              >
                {data.ctaText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}