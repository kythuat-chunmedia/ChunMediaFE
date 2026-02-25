"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import type { Feature } from "@/app/types";
import type { LandingFormData } from "@/app/types";
import { initialFormData } from "@/app/types";
import { clientApi } from "@/app/lib/api";
import { validateStep } from "@/app/lib/validation";

import BackgroundEffects from "./BackgroundEffects";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProgressBar from "./ProgressBar";
import StepContact from "./StepContact";
import StepWebsiteType from "./StepWebsiteType";
import StepFeatures from "./StepFeatures";
import StepDesign from "./StepDesign";
import StepBudget from "./StepBudget";
import StepReview from "./StepReview";
import { SuccessState, TrustSection } from "./SuccessAndTrust";
// import { Header } from "./Header";

export default function LandingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LandingFormData>(initialFormData);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Fetch features from BE (same pattern as clientApi.getBanners)
  useEffect(() => {
    clientApi.getFeatures().then(setFeatures).catch(console.error);
  }, []);

  // ---- Update field (any type: string, number, null, boolean, array, object) ----
  const updateField = useCallback(
    (field: keyof LandingFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors]
  );

  // ---- Toggle number in array (cho features[], designStyles[], addons[]) ----
  const toggleNumArray = useCallback(
    (field: "features" | "designStyles" | "addons", value: number) => {
      setFormData((prev) => {
        const arr = prev[field] as number[];
        const newArr = arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value];
        return { ...prev, [field]: newArr };
      });
    },
    []
  );

  // ---- Navigation ----
  const scrollToForm = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > 6) return;
    setCurrentStep(step);
    scrollToForm();
  }, []);

  const nextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    goToStep(currentStep + 1);
  }, [currentStep, formData, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  // ---- Submit (same pattern as clientApi.insertContact) ----
  const handleSubmit = useCallback(async () => {
    const stepErrors = validateStep(6, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await clientApi.insertContactRequest(formData);
      setIsSuccess(true);
      scrollToForm();
    } catch (err: any) {
      alert(err.message || "Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // ---- Render Step ----
  const renderStep = () => {
    const base = { formData, errors, updateField };
    const withToggle = { ...base, toggleNumArray };

    switch (currentStep) {
      case 1: return <StepContact {...base} />;
      case 2: return <StepWebsiteType {...base} />;
      case 3: return <StepFeatures {...withToggle} />;
      case 4: return <StepDesign {...withToggle} />;
      case 5: return <StepBudget {...withToggle} />;
      case 6: return <StepReview {...base} />;
      default: return null;
    }
  };


  return (
    <div className="landing-page font-vietnam bg-[#0a0e1a] text-[#f1f5f9] min-h-screen overflow-x-hidden relative">

      
      <HeroSection features={features} />

      <div ref={formRef} id="form-section" className="relative z-1 max-w-[960px] mx-auto px-4 md:px-6 pb-24">
        {!isSuccess && <ProgressBar currentStep={currentStep} onStepClick={goToStep} />}

        <div className="bg-[#1a2035] border border-[#2a3456] rounded-[20px] p-6 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.03)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500" />

          {!isSuccess ? (
            <>
              {renderStep()}

              <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-7 border-t border-white/6 gap-3">
                {currentStep > 1 ? (
                  <button type="button" onClick={prevStep}
                    className="w-full md:w-auto px-8 py-3.5 bg-transparent border-[1.5px] border-[#2a3456] rounded-[10px] text-[#94a3b8] font-semibold text-[15px] cursor-pointer transition-all duration-300 hover:border-[#64748b] hover:text-[#f1f5f9] flex items-center justify-center gap-2">
                    ← {currentStep === 6 ? "Chỉnh sửa" : "Quay lại"}
                  </button>
                ) : <div />}

                {currentStep < 6 ? (
                  <button type="button" onClick={nextStep}
                    className="w-full md:w-auto px-8 py-3.5 bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 rounded-[10px] text-white font-semibold text-[15px] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)] shadow-[0_4px_16px_rgba(99,102,241,0.3)] flex items-center justify-center gap-2">
                    {currentStep === 5 ? "Xem lại & Gửi →" : "Tiếp theo →"}
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-[10px] text-white font-semibold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(16,185,129,0.4)] shadow-[0_4px_16px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <><span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Đang gửi...</>
                    ) : "🚀 Gửi yêu cầu báo giá"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <SuccessState />
          )}
        </div>

        <TrustSection />
      </div>
    </div>
  );
}
