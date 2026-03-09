"use client";
import React from "react";
import type { ServiceHighlight } from "@/app/types";

interface HighlightsSectionProps {
  highlights: ServiceHighlight[];
}

export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
  if (!highlights?.length) return null;
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#57F5B2 0%,#37BADE 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(highlights.length, 4)}, minmax(0, 1fr))` }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl font-black">{i + 1}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{h.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}