"use client";
import React, { useState } from "react";
import type { ServiceProcess } from "@/app/types";

interface ProcessSectionProps {
  data: ServiceProcess;
}

// Group steps by phase based on stepNumber ranges or use all as one group
// Phase 1: stepNumber 1-7 (Tư vấn), Phase 2: 8-10 (Ký kết), Phase 3: 11+ (Triển khai)
// Fallback: split steps into 3 equal groups

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data?.steps?.length) return null;

  const cardGradient = "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)";

  // Build tabs from steps — group by phase tag or split into 3
  const phaseLabels = [
    (data as any).tab1 ?? "QUY TRÌNH TƯ VẤN",
    (data as any).tab2 ?? "KÝ KẾT HỢP ĐỒNG",
    (data as any).tab3 ?? "QUY TRÌNH TRIỂN KHAI",
  ];

  const chunkSize = Math.ceil(data.steps.length / 3);
  const phases = [
    data.steps.slice(0, chunkSize),
    data.steps.slice(chunkSize, chunkSize * 2),
    data.steps.slice(chunkSize * 2),
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [openStep, setOpenStep] = useState(0);

  const currentSteps = phases[activeTab] ?? [];
  const imageUrl = (data as any).imageUrl as string | undefined;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          {data.title && (
            <p
              className="font-extrabold uppercase tracking-wider mb-4"
              style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "#111" }}
            >
              {data.title}
            </p>
          )}
          {data.subtitle && (
            <div
              className="inline-block rounded-xl px-8 py-3 mb-2"
              style={{ background: cardGradient }}
            >
              <p
                className="font-extrabold uppercase text-white"
                style={{ fontSize: "clamp(14px, 2vw, 20px)", letterSpacing: "0.03em" }}
              >
                {data.subtitle}
              </p>
            </div>
          )}
        </div>

        {/* ── Tab bar with arrow timeline ── */}
        <div className="relative flex items-center justify-center gap-0 mb-8">
          {phaseLabels.map((label, i) => {
            const isActive = activeTab === i;
            const isFirst = i === 0;
            const isLast = i === phaseLabels.length - 1;

            return (
              <React.Fragment key={i}>
                {/* Arrow between tabs */}
                {i > 0 && (
                  <div className="flex items-center px-2">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                      <path
                        d="M0 8h16M12 3l5 5-5 5"
                        stroke={activeTab > i - 1 ? "#37BADE" : "#CCC"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                <button
                  onClick={() => { setActiveTab(i); setOpenStep(0); }}
                  className="px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wide transition-all"
                  style={
                    isActive
                      ? {
                          background: cardGradient,
                          color: "#fff",
                          boxShadow: "0 4px 16px rgba(55,186,222,0.30)",
                          border: "none",
                        }
                      : isLast
                      ? {
                          background: "transparent",
                          color: "#37BADE",
                          border: "2px solid #37BADE",
                        }
                      : {
                          background: "transparent",
                          color: "#888",
                          border: "none",
                        }
                  }
                >
                  {label}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Dotted timeline line ── */}
        <div
          className="w-full mb-6"
          style={{
            borderTop: "2px dashed #DDD",
            position: "relative",
          }}
        />

        {/* ── Content: Image left + Accordion right ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT — image */}
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: 300 }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Process"
                className="w-full h-full object-cover"
                style={{ minHeight: 300 }}
              />
            ) : (
              /* Placeholder when no image provided */
              <div
                className="w-full flex items-center justify-center rounded-2xl"
                style={{
                  minHeight: 300,
                  background: "linear-gradient(135deg,#F0FDF9,#E0F5FF)",
                  border: "1px solid #D0EEF8",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: cardGradient }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 20l6-6 4 4 6-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#37BADE" }}>
                    {phaseLabels[activeTab]}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Accordion steps */}
          <div className="flex flex-col gap-2">
            {currentSteps.map((step, i) => {
              const isOpen = openStep === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{
                    border: isOpen
                      ? "1.5px solid #37BADE"
                      : "1.5px solid #EEE",
                    background: isOpen ? "#FAFFFE" : "#fff",
                  }}
                >
                  {/* Accordion header */}
                  <button
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left"
                    onClick={() => setOpenStep(isOpen ? -1 : i)}
                  >
                    <span
                      className="font-semibold text-sm"
                      style={{ color: isOpen ? "#37BADE" : "#333" }}
                    >
                      Bước {step.stepNumber}: {step.title}
                    </span>
                    {/* +/- icon */}
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center ml-3"
                      style={{
                        background: isOpen ? cardGradient : "#F5F5F5",
                        color: isOpen ? "#fff" : "#999",
                        fontSize: 18,
                        lineHeight: 1,
                        fontWeight: 700,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <div
                      className="px-5 pb-4 text-sm leading-relaxed"
                      style={{ color: "#555" }}
                    >
                      {step.description}
                      {step.duration && (
                        <span
                          className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(55,186,222,0.08)",
                            color: "#37BADE",
                          }}
                        >
                          ⏱ {step.duration}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}