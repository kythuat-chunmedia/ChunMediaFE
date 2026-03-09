"use client";
import React from "react";
import type { ServiceClientStats } from "@/app/types";

interface ClientStatsSectionProps {
  data: ServiceClientStats;
}

export default function ClientStatsSection({ data }: ClientStatsSectionProps) {
  if (!data) return null;

  const logos = data.logos ?? [];
  // Duplicate enough times to fill screen seamlessly
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="py-6 bg-white overflow-hidden border-y border-gray-100">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          /* width = 3× content so we only need to move 1/3 */
          width: max-content;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header — only shown if sectionTitle or totalClients exist */}
      {(data.sectionTitle || data.totalClients) && (
        <div className="max-w-7xl mx-auto px-8 mb-6 flex items-center gap-4">
          {data.totalClients && (
            <span
              className="text-4xl font-black"
              style={{
                backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.totalClients}
            </span>
          )}
          {data.description && (
            <span className="text-base font-semibold text-gray-600 max-w-xs leading-snug">
              {data.description}
            </span>
          )}
          {data.sectionTitle && (
            <h2 className="ml-auto text-lg font-bold text-gray-700">{data.sectionTitle}</h2>
          )}
        </div>
      )}

      {/* Marquee strip */}
      {logos.length > 0 && (
        <div
          className="relative w-full overflow-hidden"
          style={{
            /* fade edges */
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="marquee-track">
            {track.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center flex-shrink-0"
                style={{ padding: "0 40px", minWidth: 140, height: 64 }}
              >
                <img
                  src={logo.logoUrl}
                  alt={logo.name}
                  style={{
                    height: 40,
                    maxWidth: 120,
                    objectFit: "contain",
                    filter: "grayscale(0%)",
                    transition: "opacity 0.2s",
                    opacity: 0.85,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const span = el.nextElementSibling as HTMLElement;
                    if (span) span.style.display = "block";
                  }}
                />
                <span
                  className="hidden text-xs font-semibold text-gray-400"
                  style={{ maxWidth: 100, textAlign: "center" }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}