"use client";
import React from "react";
import type { ServiceHighlight } from "@/app/types";

interface HighlightsSectionProps {
  highlights: ServiceHighlight[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  centerLabel?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export default function HighlightsSection({
  highlights,
  sectionTitle,
  sectionSubtitle,
  centerLabel = "SEO AI\nMAX",
  ctaText,
  ctaUrl,
}: HighlightsSectionProps) {
  if (!highlights?.length) return null;

  // Card gradient — xanh theo yêu cầu
  const cardBg = "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)";

  // Layout: top-left, bottom-left, bottom-center, bottom-right, top-right
  // Matches image: card 1 top-left, card 2 bottom-left, card 3 bottom-center, card 4 bottom-right, card 5 top-right
  const positions = [
    { gridColumn: "1", gridRow: "1" },   // 1 — top left
    { gridColumn: "1", gridRow: "2" },   // 2 — bottom left
    { gridColumn: "2", gridRow: "2" },   // 3 — bottom center
    { gridColumn: "3", gridRow: "2" },   // 4 — bottom right
    { gridColumn: "3", gridRow: "1" },   // 5 — top right
  ];

  const cards = highlights.slice(0, 5);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="text-center mb-14">
            {sectionTitle && (
              <h2
                className="font-extrabold mb-4 leading-tight"
                style={{ fontSize: "clamp(22px, 3.5vw, 38px)", color: "#111" }}
                dangerouslySetInnerHTML={{ __html: sectionTitle }}
              />
            )}
            {sectionSubtitle && (
              <p
                className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sectionSubtitle }}
              />
            )}
          </div>
        )}

        {/* ── Wheel layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "20px",
            alignItems: "center",
            justifyItems: "stretch",
          }}
        >
          {/* Cards 1–5 positioned around center */}
          {cards.map((h, i) => {
            const pos = positions[i] ?? { gridColumn: "1", gridRow: "1" };
            return (
              <div
                key={i}
                style={{
                  gridColumn: pos.gridColumn,
                  gridRow: pos.gridRow,
                  background: cardBg,
                  borderRadius: "20px",
                  padding: "24px 28px",
                  color: "#fff",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.4,
                  }}
                >
                  {i + 1}. {h.title}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {h.description}
                </p>
              </div>
            );
          })}

          {/* ── Center circle ── */}
          <div
            style={{
              gridColumn: "2",
              gridRow: "0 / 3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
            }}
          >
            {/* Outer ring */}
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                border: "2px solid #C5B8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {/* Inner filled circle */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 40px rgba(55,186,222,0.35)",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 900,
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    textAlign: "center",
                    lineHeight: 1.2,
                    whiteSpace: "pre-line",
                  }}
                >
                  {centerLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA button ── */}
        {ctaText && (
          <div className="flex justify-center mt-12">
            <a
              href={ctaUrl || "#"}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-base transition-transform hover:scale-105"
              style={{
                background: cardBg,
                boxShadow: "0 6px 28px rgba(55,186,222,0.35)",
              }}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}