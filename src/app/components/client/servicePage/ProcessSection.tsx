"use client";
import React from "react";
import type { ServiceProcess } from "@/app/types";

interface ProcessSectionProps {
  data: ServiceProcess;
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  if (!data?.steps?.length) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Steps — horizontal timeline */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg,#57F5B2,#37BADE)", marginLeft: "5%", marginRight: "5%" }}
          />

          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${Math.min(data.steps.length, 5)}, minmax(0,1fr))` }}
          >
            {data.steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {/* Step circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg relative z-10"
                  style={{ background: "linear-gradient(135deg,#57F5B2,#37BADE)" }}
                >
                  <span className="text-white text-2xl font-black">{step.stepNumber}</span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">{step.description}</p>
                {step.duration && (
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1"
                    style={{
                      background: "linear-gradient(90deg,#57F5B220,#37BADE20)",
                      color: "#37BADE",
                    }}
                  >
                    ⏱ {step.duration}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}