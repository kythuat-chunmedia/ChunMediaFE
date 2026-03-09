"use client";
import React from "react";
import type { ServicePricing } from "@/app/types";

interface PricingSectionProps {
  data: ServicePricing;
}

export default function PricingSection({ data }: PricingSectionProps) {
  if (!data) return null;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #57F5B2 0%, #3DDACC 50%, #37BADE 100%)",
      }}
    >
      {/* Subtle texture overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(55,186,222,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(87,245,178,0.20) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* ── Title box ── */}
        <div className="flex justify-center mb-8">
          <div
            className="text-center px-12 py-6 rounded-2xl"
            style={{
              background: "#fff",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              maxWidth: 600,
              width: "100%",
            }}
          >
            {data.title && (
              <h2
                className="font-extrabold leading-tight"
                style={{
                  fontSize: "clamp(20px, 3vw, 32px)",
                  color: "#57F5B2",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  backgroundImage: "linear-gradient(90deg, #57F5B2, #37BADE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.title}
              </h2>
            )}
          </div>
        </div>

        {/* ── Subtitle ── */}
        {data.subtitle && (
          <p
            className="text-center text-sm mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(0,50,35,0.80)" }}
          >
            {data.subtitle}
          </p>
        )}

        {/* ── Pricing Table ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.30)",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Table header */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr",
              background: "rgba(0,0,0,0.12)",
              borderBottom: "1px solid rgba(255,255,255,0.20)",
            }}
          >
            {["Gói dịch vụ SEO", "Mức giá", "Thời gian SEO", "Loại KPIs"].map(
              (col, i) => (
                <div
                  key={i}
                  className="px-6 py-4 font-bold text-sm"
                  style={{ color: "#fff" }}
                >
                  {col}
                </div>
              )
            )}
          </div>

          {/* Table rows from packages */}
          {data.packages?.map((pkg, i) => (
            <div
              key={pkg.id || i}
              className="grid transition-colors hover:bg-white/10"
              style={{
                gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr",
                borderBottom:
                  i < (data.packages?.length ?? 0) - 1
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "none",
              }}
            >
              {/* Tên gói */}
              <div
                className="px-6 py-5 text-sm font-medium"
                style={{ color: "#fff" }}
              >
                {pkg.name}
              </div>

              {/* Mức giá */}
              <div
                className="px-6 py-5 text-sm"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {pkg.price}
                {pkg.priceNote && (
                  <span
                    className="block text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {pkg.priceNote}
                  </span>
                )}
              </div>

              {/* Thời gian — dùng field duration nếu có, fallback features[0] */}
              <div
                className="px-6 py-5 text-sm"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {(pkg as any).duration ?? pkg.features?.[0] ?? "—"}
              </div>

              {/* Loại KPIs — dùng field kpi nếu có, fallback features[1] */}
              <div
                className="px-6 py-5 text-sm"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {(pkg as any).kpi ?? pkg.features?.[1] ?? "—"}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        {data.packages?.[0]?.ctaText && data.packages?.[0]?.ctaUrl && (
          <div className="flex justify-center mt-12">
            <a
              href={data.packages[0].ctaUrl}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105"
              style={{
                background: "#fff",
                color: "#37BADE",
                boxShadow: "0 6px 28px rgba(0,0,0,0.15)",
              }}
            >
              {data.packages[0].ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}