"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import type { ServiceTestimonials } from "@/app/types";

interface TestimonialsSectionProps {
  data: ServiceTestimonials;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data) return null;

  const cardGradient = "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)";

  // ── Slider state ──
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Group items into slides of 5 (matching the 5-column industry layout)
  const ITEMS_PER_SLIDE = 5;
  const slides: typeof data.items[] = [];
  for (let i = 0; i < (data.items?.length ?? 0); i += ITEMS_PER_SLIDE) {
    slides.push(data.items.slice(i, i + ITEMS_PER_SLIDE));
  }
  const totalSlides = Math.max(slides.length, 1);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(next, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, isHovered]);

  return (
    <section className="bg-white">

      {/* ══ PART 1: Purple gradient top ══ */}
      <div
        style={{
          background: cardGradient,
          padding: "48px 32px 40px",
        }}
      >
        <div className="max-w-4xl mx-auto">

          {/* Label */}
          {data.title && (
            <p
              className="text-center font-extrabold uppercase tracking-widest mb-4"
              style={{ color: "#fff", fontSize: "clamp(12px, 1.5vw, 15px)", letterSpacing: "0.15em" }}
            >
              {data.title}
            </p>
          )}

          {/* White box — subtitle */}
          {data.subtitle && (
            <div
              className="rounded-2xl text-center mb-8 mx-auto"
              style={{
                background: "#fff",
                padding: "20px 40px",
                maxWidth: 520,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              }}
            >
              <p
                className="font-extrabold uppercase leading-tight"
                style={{
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  backgroundImage: cardGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.subtitle}
              </p>
            </div>
          )}

          {/* Screenshots grid — use authorAvatarUrl as screenshot src */}
          {data.items && data.items.slice(0, 2).some((t) => t.authorAvatarUrl) && (
            <div className="grid grid-cols-2 gap-4">
              {data.items.slice(0, 2).map((t, i) =>
                t.authorAvatarUrl ? (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      border: "2px solid rgba(255,255,255,0.30)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img
                      src={t.authorAvatarUrl}
                      alt={t.authorName}
                      className="w-full object-cover"
                      style={{ maxHeight: 260, objectPosition: "top" }}
                    />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      minHeight: 200,
                      border: "2px solid rgba(255,255,255,0.25)",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                      Screenshot {i + 1}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* ══ PART 2: Logo industry slider ══ */}
      <div
        style={{
          background: "#F8F8FB",
          padding: "48px 0 48px",
        }}
      >
        <div className="max-w-5xl mx-auto px-8">

          {/* Title */}
          <div className="text-center mb-8">
            <p
              className="font-extrabold uppercase"
              style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "#222", letterSpacing: "0.04em" }}
            >
              SEONGON MANG NĂNG LỰC SEO ĐẾN
            </p>
            <h3
              className="font-extrabold uppercase"
              style={{
                fontSize: "clamp(20px, 3vw, 32px)",
                backgroundImage: cardGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MỌI THỊ TRƯỜNG, MỌI NGÀNH HÀNG
            </h3>
          </div>

          {/* Slider wrapper */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
              style={{ background: "#fff", border: "1px solid #EEE" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="#37BADE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Slides */}
            <div className="overflow-hidden rounded-2xl">
              <div
                style={{
                  display: "flex",
                  transform: `translateX(-${current * 100}%)`,
                  transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {slides.map((slide, si) => (
                  <div
                    key={si}
                    style={{
                      minWidth: "100%",
                      display: "grid",
                      gridTemplateColumns: `repeat(${Math.min(slide.length, 5)}, 1fr)`,
                      gap: 1,
                      background: "#E8E8EE",
                    }}
                  >
                    {slide.map((item, ii) => (
                      <div
                        key={ii}
                        className="flex flex-col"
                        style={{ background: "#fff" }}
                      >
                        {/* Industry header */}
                        <div
                          className="px-3 py-2 text-center font-bold uppercase text-xs tracking-wider border-b"
                          style={{
                            color: "#37BADE",
                            borderColor: "#F0F0F5",
                            background: "#FAFAFE",
                            fontSize: "10px",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {item.authorRole ?? item.authorName}
                        </div>

                        {/* Logo grid inside column */}
                        <div className="p-3 flex flex-col gap-2 flex-1">
                          {/* Use content as newline-separated logo names or show placeholder logos */}
                          {item.content
                            ? item.content.split("\n").filter(Boolean).map((logo, li) => (
                                <div
                                  key={li}
                                  className="flex items-center justify-center px-2 py-1.5 rounded-lg"
                                  style={{
                                    background: "#F5F5FA",
                                    minHeight: 36,
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    color: "#555",
                                    textAlign: "center",
                                  }}
                                >
                                  {logo}
                                </div>
                              ))
                            : /* Placeholder boxes */
                              Array.from({ length: 6 }).map((_, pi) => (
                                <div
                                  key={pi}
                                  className="rounded-lg"
                                  style={{
                                    background: "#F5F5FA",
                                    height: 32,
                                    opacity: 0.6,
                                  }}
                                />
                              ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
              style={{ background: "#fff", border: "1px solid #EEE" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="#37BADE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current
                      ? "linear-gradient(90deg,#57F5B2,#37BADE)"
                      : "#DDD",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}