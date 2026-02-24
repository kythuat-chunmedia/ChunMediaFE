"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { BUDGET_UI_OPTIONS, TIMELINE_UI_OPTIONS, ADDON_UI_OPTIONS } from "@/app/types";
import { FormGroup, SelectInput, TextArea, OptionCard, SectionDivider, StepHeader } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
  toggleNumArray: (field: "features" | "designStyles" | "addons", value: number) => void;
}

export default function StepBudget({ formData, errors, updateField, toggleNumArray }: Props) {
  return (
    <div className="animate-stepFadeIn">
      <StepHeader
        icon="💰"
        iconBg="rgba(245,158,11,0.15)"
        iconColor="#fbbf24"
        title="Ngân sách & Tiến độ"
        description="Giúp chúng tôi đưa ra giải pháp phù hợp nhất"
      />

      {/* Budget Grid - enum BudgetRange */}
      <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
        Ngân sách dự kiến <span className="text-red-500">*</span>
      </label>
      {errors.budget && <p className="text-xs text-red-500 mb-2">{errors.budget}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
        {BUDGET_UI_OPTIONS.map((b) => (
          <div key={b.value} className="relative cursor-pointer" onClick={() => updateField("budget", b.value)}>
            <div className={`p-5 bg-[#0f1629] border-[1.5px] rounded-xl text-center transition-all duration-300 ${
              formData.budget === b.value
                ? "border-indigo-500 bg-[rgba(99,102,241,0.15)]"
                : "border-[#2a3456] hover:border-[rgba(99,102,241,0.4)]"
            }`}>
              <div className="text-sm font-semibold text-[#f1f5f9] mb-1">{b.label}</div>
              <div className="text-xs text-[#64748b]">{b.range}</div>
            </div>
            {b.popular && (
              <div className="absolute -top-2 -right-2 px-2.5 py-0.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full text-[10px] font-bold text-white">
                PHỔ BIẾN
              </div>
            )}
          </div>
        ))}
      </div>

      <SectionDivider label="Tiến độ & Dịch vụ thêm" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Timeline - enum Timeline */}
        <FormGroup label="Thời gian hoàn thành" required error={errors.timeline}>
          <select
            value={formData.timeline === null ? "" : formData.timeline.toString()}
            onChange={(e) => {
              const v = e.target.value;
              updateField("timeline", v === "" ? null : parseInt(v, 10));
            }}
            className={`landing-select w-full px-4 py-3.5 bg-[#0f1629] border-[1.5px] rounded-xl text-[#f1f5f9] text-sm outline-none transition-all duration-300 cursor-pointer focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] [&>option]:bg-[#111827] [&>option]:text-[#f1f5f9] ${
              errors.timeline ? "border-red-500" : "border-[#2a3456]"
            }`}
          >
            <option value="">— Chọn —</option>
            {TIMELINE_UI_OPTIONS.map((t) => (
              <option key={t.value} value={t.value.toString()}>{t.label}</option>
            ))}
          </select>
        </FormGroup>

        <FormGroup label="Hình thức thanh toán">
          <SelectInput
            value={formData.paymentMethod}
            onChange={(v) => updateField("paymentMethod", v)}
            options={["Thanh toán 1 lần", "Trả góp 50/50", "Trả góp 30/40/30", "Thuê theo tháng/năm", "Cần tư vấn"]}
          />
        </FormGroup>

        {/* Addons - enum AddonService[] */}
        <div className="md:col-span-2">
          <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
            Dịch vụ thêm <span className="text-[#64748b] font-normal text-xs ml-1">(chọn nhiều)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ADDON_UI_OPTIONS.map((a) => (
              <OptionCard
                key={a.value}
                selected={formData.addons.includes(a.value)}
                onClick={() => toggleNumArray("addons", a.value)}
                title={a.label}
                type="checkbox"
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <FormGroup label="Ghi chú thêm" optional>
            <TextArea value={formData.notes} onChange={(v) => updateField("notes", v)} placeholder="Mục tiêu kinh doanh, đối tượng khách hàng, kỳ vọng..." rows={4} />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
