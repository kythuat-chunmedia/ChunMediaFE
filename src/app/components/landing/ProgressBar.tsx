"use client";

import React from "react";
import { STEPS } from "@/app/types";

interface Props {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function ProgressBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="sticky top-[72px] z-50 py-5 bg-[#0a0e1a]/90 backdrop-blur-[20px] mb-10 rounded-[20px]">
      <div className="flex items-center justify-between max-w-[800px] mx-auto px-2 md:px-5">
        {STEPS.map((step, idx) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          const hasConnector = idx < STEPS.length - 1;

          return (
            <div
              key={step.num}
              onClick={() => { if (step.num < currentStep) onStepClick(step.num); }}
              className={`flex flex-col items-center gap-2 cursor-pointer relative flex-1 ${
                hasConnector
                  ? `after:content-[''] after:absolute after:top-[18px] after:left-[55%] after:w-[90%] after:h-0.5 after:-z-1 after:transition-colors after:duration-500 ${isCompleted ? "after:bg-indigo-500" : "after:bg-[#2a3456]"}`
                  : ""
              }`}
            >
              <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all duration-400 ${
                isActive
                  ? "border-indigo-500 bg-[rgba(99,102,241,0.3)] text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-110"
                  : isCompleted
                  ? "border-emerald-500 bg-[rgba(16,185,129,0.15)] text-emerald-500"
                  : "border-[#2a3456] bg-[#111827] text-[#64748b]"
              }`}>
                {isCompleted ? "✓" : step.num}
              </div>
              <div className={`text-[9px] md:text-[11px] font-medium text-center whitespace-nowrap transition-colors duration-300 ${
                isActive ? "text-indigo-400" : isCompleted ? "text-emerald-500" : "text-[#64748b]"
              }`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
