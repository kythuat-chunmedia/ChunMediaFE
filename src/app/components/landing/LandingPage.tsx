"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import type { Feature } from "@/app/types";
import type { LandingFormData } from "@/app/types";
import { initialFormData } from "@/app/types";
import { clientApi } from "@/app/lib/api";
import { validateStep } from "@/app/lib/validation";

import BackgroundEffects from "./BackgroundEffects";
import HeroSection from "./HeroSection";
import ProgressBar from "./ProgressBar";
import StepContact from "./StepContact";
import StepWebsiteType from "./StepWebsiteType";
import StepFeatures from "./StepFeatures";
import StepDesign from "./StepDesign";
import StepBudget from "./StepBudget";
import StepReview from "./StepReview";
import { SuccessState, TrustSection } from "./SuccessAndTrust";

export default function LandingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LandingFormData>(initialFormData);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clientApi.getFeatures().then(setFeatures).catch(console.error);
  }, []);

  const updateField = useCallback(
    (field: keyof LandingFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
      }
    },
    [errors]
  );

  const toggleNumArray = useCallback(
    (field: "features" | "designStyles" | "addons", value: number) => {
      setFormData((prev) => {
        const arr = prev[field] as number[];
        return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
      });
    },
    []
  );

  const scrollToForm = () => {
    setTimeout(() => { formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
  };

  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > 6) return;
    setCurrentStep(step);
    scrollToForm();
  }, []);

  const nextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    setErrors({});
    goToStep(currentStep + 1);
  }, [currentStep, formData, goToStep]);

  const prevStep = useCallback(() => goToStep(currentStep - 1), [currentStep, goToStep]);

  const handleSubmit = useCallback(async () => {
    const stepErrors = validateStep(6, formData);
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
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
    <div className="font-vietnam bg-[#F8F9FA] text-[#1A1A1A] min-h-screen overflow-x-hidden relative">
      <BackgroundEffects />
      <HeroSection features={features} />

      <div ref={formRef} id="form-section" className="relative z-10 max-w-[960px] mx-auto px-4 md:px-6 pb-24">
        {!isSuccess && <ProgressBar currentStep={currentStep} onStepClick={goToStep} />}

        {/* Form card */}
        <div className="bg-white border border-[rgba(10,147,150,0.12)] rounded-2xl p-6 md:p-12 shadow-[0_4px_40px_rgba(10,147,150,0.08)] relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0A9396] via-[#94D2BD] to-[#0A9396]" />

          {!isSuccess ? (
            <>
              {renderStep()}

              {/* Navigation buttons */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-7 border-t border-[rgba(10,147,150,0.1)] gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full md:w-auto px-8 py-3.5 bg-white border-[1.5px] border-[rgba(10,147,150,0.2)] rounded-xl text-[#6C757D] font-bold text-[15px] cursor-pointer transition-all duration-200 hover:border-[#0A9396] hover:text-[#0A9396] hover:bg-[rgba(10,147,150,0.03)] flex items-center justify-center gap-2"
                  >
                    ← {currentStep === 6 ? "Chỉnh sửa" : "Quay lại"}
                  </button>
                ) : <div />}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full md:w-auto relative overflow-hidden px-8 py-3.5 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] rounded-xl text-white font-bold text-[15px] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(10,147,150,0.4)] shadow-[0_4px_16px_rgba(10,147,150,0.25)] flex items-center justify-center gap-2 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    {currentStep === 5 ? "Xem lại & Gửi →" : "Tiếp theo →"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full md:w-auto relative overflow-hidden px-10 py-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl text-white font-bold text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] shadow-[0_4px_16px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Đang gửi...
                      </>
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