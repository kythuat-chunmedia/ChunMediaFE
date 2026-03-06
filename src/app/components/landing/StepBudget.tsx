"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { BUDGET_UI_OPTIONS, TIMELINE_UI_OPTIONS, ADDON_UI_OPTIONS } from "@/app/types";
import { FormGroup, SelectInput, TextArea, OptionCard, SectionDivider, StepHeader, inputBase } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
  toggleNumArray: (field: "features" | "designStyles" | "addons", value: number) => void;
}

export default function StepBudget({ formData, errors, updateField, toggleNumArray }: Props) {
  return (
    <div>
      <StepHeader
        icon="💰"
        iconBg="rgba(10,147,150,0.1)"
        iconColor="#0A9396"
        title="Ngân sách & Tiến độ"
        description="Giúp chúng tôi đưa ra giải pháp phù hợp nhất"
      />

      <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
        Ngân sách dự kiến <span className="text-red-500">*</span>
      </label>
      {errors.budget && <p className="text-xs text-red-500 mb-2 flex items-center gap-1"><span>⚠</span>{errors.budget}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
        {BUDGET_UI_OPTIONS.map((b) => (
          <div key={b.value} className="relative cursor-pointer" onClick={() => updateField("budget", b.value)}>
            <div
              className={`p-5 bg-white border-[1.5px] rounded-xl text-center transition-all duration-200 ${
                formData.budget === b.value
                  ? "border-[#0A9396] bg-[rgba(10,147,150,0.05)] shadow-[0_0_0_3px_rgba(10,147,150,0.1)]"
                  : "border-[rgba(10,147,150,0.2)] hover:border-[rgba(10,147,150,0.5)]"
              }`}
            >
              <div className={`text-sm font-bold mb-1 ${formData.budget === b.value ? "text-[#0A9396]" : "text-[#1A1A1A]"}`}>{b.label}</div>
              <div className="text-xs text-[#95A5A6]">{b.range}</div>
            </div>
            {b.popular && (
              <div className="absolute -top-2 -right-2 px-2.5 py-0.5 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] rounded-full text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(10,147,150,0.4)]">
                PHỔ BIẾN
              </div>
            )}
          </div>
        ))}
      </div>

      <SectionDivider label="Tiến độ & Dịch vụ thêm" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Thời gian hoàn thành" required error={errors.timeline}>
          <select
            value={formData.timeline === null ? "" : formData.timeline.toString()}
            onChange={(e) => { const v = e.target.value; updateField("timeline", v === "" ? null : parseInt(v, 10)); }}
            className={`${inputBase} cursor-pointer [&>option]:bg-white [&>option]:text-[#1A1A1A] ${
              errors.timeline
                ? "border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                : "border-[rgba(10,147,150,0.2)] hover:border-[rgba(10,147,150,0.4)]"
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

        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
            Dịch vụ thêm <span className="text-[#95A5A6] font-normal text-xs ml-1">(chọn nhiều)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ADDON_UI_OPTIONS.map((a) => (
              <OptionCard key={a.value} selected={formData.addons.includes(a.value)}
                onClick={() => toggleNumArray("addons", a.value)} title={a.label} type="checkbox" />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <FormGroup label="Ghi chú thêm" optional>
            <TextArea value={formData.notes} onChange={(v) => updateField("notes", v)}
              placeholder="Mục tiêu kinh doanh, đối tượng khách hàng, kỳ vọng..." rows={4} />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}