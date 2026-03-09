"use client";
import React, { useState } from "react";
import type { ServiceQnA } from "@/app/types";

interface QnASectionProps {
  data: ServiceQnA;
}

export default function QnASection({ data }: QnASectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!data?.items?.length) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          {data.title && (
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">{data.title}</h2>
          )}
          {data.subtitle && (
            <p className="text-gray-500 text-lg max-w-xl mx-auto">{data.subtitle}</p>
          )}
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)" }}
          />
        </div>

        <div className="space-y-3">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border transition-all duration-200"
                style={{
                  borderColor: isOpen ? "#37BADE50" : "#e5e7eb",
                  boxShadow: isOpen ? "0 4px 20px rgba(55,186,222,0.12)" : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                  style={{ background: isOpen ? "linear-gradient(90deg,#57F5B208,#37BADE08)" : "#fff" }}
                >
                  <span
                    className="font-semibold text-base pr-4"
                    style={{ color: isOpen ? "#37BADE" : "#111827" }}
                  >
                    {item.question}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: isOpen
                        ? "linear-gradient(135deg,#57F5B2,#37BADE)"
                        : "linear-gradient(135deg,#57F5B215,#37BADE15)",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path
                        d="M2 4.5l5 5 5-5"
                        stroke={isOpen ? "#fff" : "#37BADE"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div
                    className="px-6 pb-5"
                    style={{ background: "linear-gradient(90deg,#57F5B205,#37BADE05)" }}
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}