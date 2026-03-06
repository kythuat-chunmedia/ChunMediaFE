"use client";

import React from "react";
import { STEPS } from "@/app/types";

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function ProgressBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="sticky top-[64px] z-40 py-4 mb-8 bg-white/95 backdrop-blur-xl border-b border-[rgba(10,147,150,0.08)] shadow-[0_2px_12px_rgba(10,147,150,0.06)] rounded-b-2xl">
      <div className="flex items-center justify-between max-w-[800px] mx-auto px-3 md:px-6">
        {STEPS.map((step, idx) => {
          const isActive    = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const hasConnector = idx < STEPS.length - 1;

          return (
            <div
              key={step.num}
              onClick={() => { if (step.num < currentStep) onStepClick(step.num); }}
              className={`flex flex-col items-center gap-1.5 cursor-pointer relative flex-1 ${
                hasConnector
                  ? `after:content-[''] after:absolute after:top-[17px] after:left-[55%] after:w-[90%] after:h-[1.5px] after:-z-[1] after:transition-colors after:duration-500 ${
                      isCompleted ? "after:bg-gradient-to-r after:from-[#0A9396] after:to-[#94D2BD]" : "after:bg-[rgba(10,147,150,0.15)]"
                    }`
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all duration-300 ${
                  isActive
                    ? "border-[#0A9396] bg-[rgba(10,147,150,0.1)] text-[#0A9396] shadow-[0_0_0_3px_rgba(10,147,150,0.15)] scale-110"
                    : isCompleted
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-[rgba(10,147,150,0.2)] bg-white text-[#95A5A6]"
                }`}
              >
                {isCompleted ? "✓" : step.num}
              </div>
              <div
                className={`text-[9px] md:text-[11px] font-semibold text-center whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-[#0A9396]" : isCompleted ? "text-emerald-600" : "text-[#95A5A6]"
                }`}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}