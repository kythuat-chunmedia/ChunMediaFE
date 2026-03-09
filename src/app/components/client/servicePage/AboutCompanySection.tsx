"use client";
import React from "react";
import type { ServiceAboutCompany } from "@/app/types";

interface AboutCompanySectionProps {
  data: ServiceAboutCompany;
}

export default function AboutCompanySection({ data }: AboutCompanySectionProps) {
  if (!data) return null;

  return (
    <section className="bg-white">

      {/* ══ PART 1: Brand + Title + Image + Bullet list ══ */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — brand label + title + subtitle */}
          <div>
            {/* Brand label */}
            <span
              className="block text-sm font-extrabold mb-2 tracking-wider"
              style={{
                backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SEONGON
            </span>

            {/* Main title */}
            {data.sectionTitle && (
              <h2
                className="font-extrabold leading-tight mb-3"
                style={{
                  fontSize: "clamp(22px, 3vw, 34px)",
                  color: "#111",
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                }}
              >
                {data.sectionTitle}
              </h2>
            )}

            {/* Subtitle — gradient text */}
            {data.sectionSubtitle && (
              <p
                className="font-semibold text-sm leading-snug"
                style={{
                  backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {data.sectionSubtitle}
              </p>
            )}
          </div>

          {/* RIGHT — image with shapes + bullet list side by side */}
          <div className="flex flex-col sm:flex-row items-center gap-8">

            {/* Image with decorative blob shapes */}
            {data.imageUrl && (
              <div className="relative flex-shrink-0" style={{ width: 240 }}>
                {/* Teal shape top-right */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: -8,
                    right: -16,
                    width: 80,
                    height: 80,
                    borderRadius: "50% 20% 50% 20%",
                    background: "linear-gradient(135deg,#57F5B2,#37BADE)",
                    opacity: 0.9,
                    zIndex: 0,
                  }}
                />
                {/* Pink shape bottom-left */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: -8,
                    left: -8,
                    width: 90,
                    height: 55,
                    borderRadius: "40% 60% 40% 60%",
                    background: "linear-gradient(135deg,#F857A6,#C850C0)",
                    opacity: 0.85,
                    zIndex: 0,
                  }}
                />
                <img
                  src={data.imageUrl}
                  alt={data.sectionTitle || "About company"}
                  className="relative w-full object-cover object-top"
                  style={{
                    zIndex: 1,
                    maxHeight: 300,
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.10))",
                  }}
                />
              </div>
            )}

            {/* Bullet list — stats as bullet points */}
            {data.stats && data.stats.length > 0 && (
              <ul className="flex flex-col gap-3 flex-1 min-w-0">
                {data.stats.map((stat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "#333" }}
                  >
                    <span
                      className="flex-shrink-0 mt-1"
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: 14,
                        borderRadius: 2,
                        background: "linear-gradient(180deg,#57F5B2,#37BADE)",
                      }}
                    />
                    <span className="leading-snug">
                      {stat.value && (
                        <strong style={{ color: "#111" }}>{stat.value} </strong>
                      )}
                      {stat.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Fallback: parse content line by line if no stats */}
            {(!data.stats || data.stats.length === 0) && data.content && (
              <ul className="flex flex-col gap-3 flex-1 min-w-0">
                {data.content.split("\n").filter(Boolean).map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "#333" }}
                  >
                    <span
                      className="flex-shrink-0 mt-1"
                      style={{
                        display: "inline-block",
                        width: 3,
                        height: 14,
                        borderRadius: 2,
                        background: "linear-gradient(180deg,#57F5B2,#37BADE)",
                      }}
                    />
                    <span className="leading-snug">{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ══ Thin divider ══ */}
      <div className="max-w-7xl mx-auto px-8">
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #C8EEF8, transparent)",
          }}
        />
      </div>

      {/* ══ PART 2: Big number + tagline ══ */}
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="flex flex-col sm:flex-row items-baseline gap-6">

          {/* Left — label + big number */}
          <div className="flex-shrink-0">
            <span
              className="block font-semibold mb-1"
              style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "#444" }}
            >
              LÝ DO MÀ HƠN
            </span>
            <span
              style={{
                fontSize: "clamp(60px, 9vw, 100px)",
                fontWeight: 900,
                lineHeight: 1,
                backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              {/* Try to find the big stat value, fallback hardcode */}
              {data.stats?.find(
                (s) =>
                  s.value?.includes("5.000") ||
                  s.value?.includes("5000") ||
                  s.value?.includes("5,000")
              )?.value ?? "5.000+"}
            </span>
          </div>

          {/* Right — tagline lines */}
          <div className="flex flex-col justify-center gap-1">
            <span
              className="font-extrabold uppercase"
              style={{ fontSize: "clamp(15px, 2vw, 26px)", color: "#111", lineHeight: 1.2 }}
            >
              DOANH NGHIỆP HÀNG ĐẦU
            </span>
            <span
              className="font-extrabold uppercase"
              style={{ fontSize: "clamp(15px, 2vw, 26px)", color: "#111", lineHeight: 1.2 }}
            >
              CHỌN SEONGON ĐỂ{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg,#57F5B2,#37BADE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TRIỂN KHAI SEO AI MAX
              </span>
            </span>
          </div>
        </div>

        {/* CTA button */}
        {data.ctaText && data.ctaUrl && (
          <div className="mt-8">
            <a
              href={data.ctaUrl}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm hover:scale-105 transition-transform"
              style={{
                background: "linear-gradient(90deg,#57F5B2,#37BADE)",
                boxShadow: "0 4px 20px rgba(55,186,222,0.30)",
              }}
            >
              {data.ctaText}
            </a>
          </div>
        )}
      </div>

    </section>
  );
}