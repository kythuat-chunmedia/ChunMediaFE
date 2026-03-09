"use client";
import React from "react";
import type { ServiceSolutions, SolutionItem } from "@/app/types";

interface SolutionsSectionProps {
  data: ServiceSolutions;
}

export default function SolutionsSection({ data }: SolutionsSectionProps) {
  if (!data?.items?.length) return null;

  const cardGradient = "linear-gradient(135deg, #57F5B2 0%, #37BADE 100%)";

  // Nhóm items theo icon tag để phân vùng layout
  const checkboxItems = data.items.filter((i) => i.icon === "checkbox");
  const pillItems     = data.items.filter((i) => i.icon === "pill");
  const descItem      = data.items.find((i)  => i.icon === "desc");

  // Fallback nếu chưa tag icon: dùng slice theo thứ tự
  const topCards = checkboxItems.length ? checkboxItems : data.items.slice(0, 3);
  const pills    = pillItems.length     ? pillItems     : data.items.slice(3, 11);

  // Flowchart hardcoded (vì đây là visual diagram, không phải data-driven)
  const flowRows = [
    ["Từ khóa hạt nhân (Cộ 5x1)", "Tách thành các chủ đề lần 2 (NG)", "Từ khóa hạt nhân CĐ 02"],
    ["Keyword Planner",            "Danh sách từ khóa 5x2",             "Keyword Planner"],
    ["Keywordtool.io",             "Keywordtool.io",                    "Keywordtool.io"],
    ["Danh sách từ khóa 5x1",     "Keyword Planner",                   "Danh sách từ khóa 5x3"],
    ["Tách thành các chủ đề lần 1 (5x2)", "Từ khóa hạt nhân (Cộ 01)", "Chia nhóm từ khóa"],
  ];

  // Cells với màu gradient xanh (highlight)
  const greenCells = new Set(["0-0","1-1","2-0","2-1","2-2","3-1","4-2"]);
  const blueCells  = new Set(["0-2","3-0","4-0","1-2","3-2"]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">

        {/* ══ TOP ROW: Title left + 3 checkbox cards right ══ */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-14">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {data.subtitle && (
              <span
                className="text-xs font-bold uppercase tracking-widest mb-2 block"
                style={{ color: "#999" }}
              >
                {data.subtitle}
              </span>
            )}
            {data.title && (
              <h2
                className="font-extrabold leading-tight"
                style={{
                  fontSize: "clamp(20px, 3vw, 34px)",
                  color: "#111",
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                }}
              >
                {data.title}
              </h2>
            )}
          </div>

          {/* RIGHT — checkbox gradient cards */}
          <div className="flex flex-col gap-3">
            {topCards.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl px-5 py-4"
                style={{ background: cardGradient }}
              >
                {/* Checkbox */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.5)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "#fff" }}>
                  {item.description || item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ BOTTOM ROW: Method left + Desc+Flow right ══ */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — method + pill grid */}
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest block mb-1"
              style={{ color: "#999" }}
            >
              PHƯƠNG PHÁP
            </span>
            <h3
              className="font-extrabold leading-tight mb-1"
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                color: "#111",
                textTransform: "uppercase",
              }}
            >
              {(data as any).methodTitle ?? "SEO AI MAX ĐỘC QUYỀN"}
            </h3>
            {(data as any).methodSubtitle && (
              <p className="text-xs text-gray-500 mb-5">
                {(data as any).methodSubtitle}
              </p>
            )}

            {/* Pill tag grid — 2 cols */}
            <div className="grid grid-cols-2 gap-2">
              {(pills.length ? pills : data.items.slice(3, 11)).map((pill, i) => (
                <div
                  key={i}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-center leading-snug"
                  style={{
                    border: "1.5px solid #37BADE",
                    color: "#37BADE",
                    background: "rgba(55,186,222,0.06)",
                  }}
                >
                  {pill.title}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — description box + flowchart */}
          <div className="flex flex-col gap-4">

            {/* Description gradient box */}
            {descItem && (
              <div
                className="rounded-2xl px-5 py-4 text-sm leading-relaxed"
                style={{ background: cardGradient, color: "#fff" }}
              >
                {descItem.description}
              </div>
            )}

            {/* Flowchart table */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #D8F0FA" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                {flowRows.map((row, ri) =>
                  row.map((cell, ci) => {
                    const key = `${ri}-${ci}`;
                    const isGreen = greenCells.has(key);
                    const isBlue  = blueCells.has(key);
                    return (
                      <div
                        key={key}
                        style={{
                          padding: "8px 10px",
                          fontSize: "10px",
                          fontWeight: 500,
                          lineHeight: 1.45,
                          color: isGreen || isBlue ? "#fff" : "#333",
                          background: isGreen
                            ? "linear-gradient(135deg,#57F5B2,#3DDACC)"
                            : isBlue
                            ? "linear-gradient(135deg,#3DDACC,#37BADE)"
                            : "#fff",
                          borderRight: ci < 2 ? "1px solid #D8F0FA" : "none",
                          borderBottom: ri < 4 ? "1px solid #D8F0FA" : "none",
                        }}
                      >
                        {cell}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══ CTA ══ */}
        {(data as any).ctaText && (
          <div className="flex justify-center mt-14">
            <a
              href={(data as any).ctaUrl ?? "#"}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-sm transition-transform hover:scale-105"
              style={{
                background: cardGradient,
                boxShadow: "0 6px 28px rgba(55,186,222,0.28)",
              }}
            >
              <span>›</span>
              {(data as any).ctaText}
              <span>‹</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
}