"use client";
import React from "react";
import type { ServiceAbout } from "@/app/types";

interface AboutSectionProps {
  data: ServiceAbout;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">

        {/* ── ROW 1: Text (left, purple dark) + Image (right, purple light) ── */}
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">

          {/* LEFT — dark purple text block */}
          <div
            className="rounded-3xl p-10 flex flex-col justify-center"
            style={{
              background: "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)",
              minHeight: 280,
            }}
          >
            {data.sectionTitle && (
              <h2
                className="font-extrabold mb-5 leading-tight"
                style={{
                  color: "#0A3D2E",
                  fontSize: "clamp(22px, 3vw, 34px)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {data.sectionTitle}
              </h2>
            )}

            {/* Divider */}
            <div
              style={{
                width: 48,
                height: 3,
                borderRadius: 4,
                background: "rgba(0,0,0,0.20)",
                marginBottom: 20,
              }}
            />

            {data.sectionSubtitle && (
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(0,50,35,0.82)" }}
              ></p>
            )}
          </div>

          {/* RIGHT — image block */}
          {data.imageUrl ? (
            <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: 280 }}>
              <img
                src={data.imageUrl}
                alt={data.sectionTitle || "About"}
                className="w-full h-full object-cover"
                style={{ minHeight: 280 }}
              />
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
          ) : (
            /* fallback purple-light block if no image */
            <div
              className="rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #7FFAD4 0%, #57D9F0 100%)",
                minHeight: 280,
              }}
            />
          )}
        </div>

        {/* ── Divider between rows ── */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #37BADE55, transparent)",
            margin: "4px 0",
          }}
        />

        {/* ── ROW 2: Image (left) + Text (right, purple dark) ── */}
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">

          {/* LEFT — image / screenshot block */}
          {data.imageUrl ? (
            <div
              className="rounded-3xl overflow-hidden border"
              style={{
                borderColor: "#B0EEE0",
              }}
            >
              <img
                src={data.imageUrl}
                alt="detail"
                className="w-full h-full object-cover"
                style={{ minHeight: 280 }}
              />
            </div>
          ) : (
            <div
              className="rounded-3xl border"
              style={{
                borderColor: "#B0EEE0",
                minHeight: 280,
                background: "#F0FDF8",
              }}
            />
          )}

          {/* RIGHT — dark purple content block */}
          <div
            className="rounded-3xl p-10 flex flex-col justify-center"
            style={{
              background: "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)",
              minHeight: 280,
            }}
          >
            {/* Sub-label */}
            {data.sectionSubtitle && (
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3 block"
                style={{ color: "rgba(0,50,35,0.60)" }}
              >
                Điểm khác biệt
              </span>
            )}

            {data.sectionTitle && (
              <h3
                className="font-extrabold mb-5 leading-tight"
                style={{
                  color: "#0A3D2E",
                  fontSize: "clamp(20px, 2.5vw, 30px)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                {data.sectionTitle} CÓ GÌ KHÁC BIỆT?
              </h3>
            )}

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(0,50,35,0.82)" }}
            >
              {data.content}
            </p>

            {/* Stats grid */}
            {data.stats && data.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {data.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background: "rgba(0,0,0,0.08)" }}
                  >
                    {stat.icon && (
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm flex-shrink-0"
                        style={{ background: "rgba(0,0,0,0.12)" }}
                      >
                        ✦
                      </div>
                    )}
                    <div>
                      <div className="text-xl font-black" style={{ color: "#0A3D2E" }}>{stat.value}</div>
                      <div className="text-xs font-medium" style={{ color: "rgba(0,50,35,0.65)" }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.ctaText && data.ctaUrl && (
              <a
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 self-start"
                style={{
                  background: "rgba(0,0,0,0.10)",
                  color: "#0A3D2E",
                  border: "1.5px solid rgba(0,0,0,0.20)",
                }}
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