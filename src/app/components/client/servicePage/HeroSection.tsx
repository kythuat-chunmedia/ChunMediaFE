"use client";
import React from "react";
import type { ServiceHero } from "@/app/types";

interface HeroSectionProps {
  data: ServiceHero;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[520px] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #57F5B2 0%, #3DDACC 50%, #37BADE 100%)",
      }}
    >
      {/* Subtle noise/depth overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(55,186,222,0.30) 0%, transparent 70%)",
        }}
      />

      {/* Top-right soft glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(87,245,178,0.35) 0%, transparent 65%)",
          transform: "translate(20%, -20%)",
        }}
      />

      {/* Decorative 4-point star top-center */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "38px", left: "52%", transform: "translateX(-50%)" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 0 C14 0 15.5 10 14 14 C12.5 10 14 0 14 0Z"
            fill="rgba(255,255,255,0.7)"
          />
          <path
            d="M28 14 C28 14 18 15.5 14 14 C18 12.5 28 14 28 14Z"
            fill="rgba(255,255,255,0.7)"
          />
          <path
            d="M14 28 C14 28 12.5 18 14 14 C15.5 18 14 28 14 28Z"
            fill="rgba(255,255,255,0.7)"
          />
          <path
            d="M0 14 C0 14 10 12.5 14 14 C10 15.5 0 14 0 14Z"
            fill="rgba(255,255,255,0.7)"
          />
        </svg>
      </div>

      {/* Decorative pie chart icon top-right area */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "72px", right: "calc(38% - 60px)" }}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="19" r="17" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          <path
            d="M19 19 L19 4 A15 15 0 0 1 34 19 Z"
            fill="rgba(255,255,255,0.22)"
          />
          <path
            d="M19 19 L34 19 A15 15 0 0 1 9 31 Z"
            fill="rgba(255,255,255,0.12)"
          />
        </svg>
      </div>

      {/* Decorative bar chart bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "60px", right: "calc(38% - 20px)" }}
      >
        <svg width="56" height="32" viewBox="0 0 56 32" fill="none">
          <rect x="0" y="18" width="8" height="14" rx="2" fill="rgba(255,255,255,0.15)" />
          <rect x="12" y="10" width="8" height="22" rx="2" fill="rgba(255,255,255,0.22)" />
          <rect x="24" y="4" width="8" height="28" rx="2" fill="rgba(255,255,255,0.30)" />
          <rect x="36" y="12" width="8" height="20" rx="2" fill="rgba(255,255,255,0.22)" />
          <rect x="48" y="8" width="8" height="24" rx="2" fill="rgba(255,255,255,0.18)" />
          {/* trend line */}
          <polyline
            points="4,16 16,8 28,3 40,10 52,6"
            stroke="rgba(0,80,60,0.6)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Horizontal lines decoration bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "48px", right: "calc(38% - 80px)" }}
      >
        {[0, 8, 16].map((offset) => (
          <div
            key={offset}
            style={{
              width: `${48 - offset}px`,
              height: "2px",
              borderRadius: "2px",
              background: "rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-8 pt-16 pb-12 flex flex-col lg:flex-row items-center gap-10 min-h-[520px]">
        
        {/* LEFT: Text */}
        <div className="flex-1 max-w-lg z-10">
          {data.badge && (
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(0,0,0,0.10)",
                color: "rgba(0,40,30,0.85)",
                border: "1px solid rgba(0,0,0,0.10)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {data.badge}
            </span>
          )}

          <h1
            className="font-black leading-none mb-4"
            style={{ color: "#0A2E2A" }}
          >
            {data.highlightText ? (
              <>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(14px, 2vw, 18px)",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(0,50,40,0.75)",
                  }}
                >
                  {data.title.split(data.highlightText)[0].trim()}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(48px, 7vw, 88px)",
                    fontWeight: 900,
                    color: "#0A2E2A",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {data.highlightText}
                </span>
                {data.title.split(data.highlightText)[1] && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "clamp(14px, 2vw, 18px)",
                      fontWeight: 700,
                      color: "rgba(0,50,40,0.75)",
                    }}
                  >
                    {data.title.split(data.highlightText)[1].trim()}
                  </span>
                )}
              </>
            ) : (
              <span style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>{data.title}</span>
            )}
          </h1>

          {/* Divider line */}
          <div
            style={{
              width: "180px",
              height: "1.5px",
              background: "rgba(0,0,0,0.15)",
              marginBottom: "20px",
            }}
          />

          {data.subtitle && (
            <p
              className="text-base lg:text-lg mb-8 leading-relaxed"
              style={{ color: "rgba(0,50,40,0.80)" }}
            >
              {data.subtitle}
            </p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 items-start">
            {/* Secondary CTA — top pill (outline style like "Lên top Google...") */}
            {data.ctaSecondaryText && data.ctaSecondaryUrl && (
              <a
                href={data.ctaSecondaryUrl}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "rgba(0,0,0,0.10)",
                  color: "#0A2E2A",
                  border: "1px solid rgba(0,0,0,0.15)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {data.ctaSecondaryText}
              </a>
            )}

            {/* Primary CTAs — row */}
            <div className="flex flex-wrap gap-3 mt-1">
              {data.ctaText && data.ctaUrl && (
                <a
                  href={data.ctaUrl}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-white text-sm shadow-lg transition-transform hover:scale-105"
                  style={{
                    background: "linear-gradient(90deg, #C850C0, #9B4DCA)",
                    boxShadow: "0 4px 20px rgba(180,80,200,0.45)",
                  }}
                >
                  {data.ctaText}
                </a>
              )}
              <a
                href={data.ctaSecondaryUrl || "#"}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white hover:text-purple-900"
                style={{
                  border: "2px solid rgba(0,0,0,0.35)",
                  color: "#0A2E2A",
                  background: "transparent",
                }}
              >
                Báo giá chi tiết
              </a>
            </div>
          </div>

          {/* Stats row */}
          {data.stats && data.stats.length > 0 && (
            <div className="flex flex-wrap gap-8 mt-10">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl font-black"
                    style={{ color: "#0A2E2A" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs font-medium mt-0.5"
                    style={{ color: "rgba(0,50,40,0.65)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Hero image in arch frame */}
        {data.heroImageUrl && (
          <div className="flex-1 flex justify-center lg:justify-end items-end z-10 self-end">
            <div className="relative" style={{ width: "340px", maxWidth: "45vw" }}>
              {/* Arch/rounded-top frame */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "180px 180px 24px 24px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.20)",
                  border: "1.5px solid rgba(255,255,255,0.40)",
                  padding: "3px",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                }}
              >
                <img
                  src={data.heroImageUrl}
                  alt={data.title}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    borderRadius: "176px 176px 20px 20px",
                    minHeight: "360px",
                    maxHeight: "440px",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}