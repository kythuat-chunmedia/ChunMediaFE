"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { FEATURE_UI_OPTIONS } from "@/app/types";
import { FormGroup, SelectInput, TextArea, OptionCard, SectionDivider, StepHeader } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
  toggleNumArray: (field: "features" | "designStyles" | "addons", value: number) => void;
}

export default function StepFeatures({ formData, errors, updateField, toggleNumArray }: Props) {
  return (
    <div className="animate-stepFadeIn">
      <StepHeader
        icon="⚡"
        iconBg="rgba(16,185,129,0.15)"
        iconColor="#34d399"
        title="Tính năng mong muốn"
        description="Chọn các tính năng bạn muốn có trên website (có thể chọn nhiều)"
      />

      <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
        Tính năng cần có
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
        {FEATURE_UI_OPTIONS.map((f) => (
          <OptionCard
            key={f.value}
            selected={formData.features.includes(f.value)}
            onClick={() => toggleNumArray("features", f.value)}
            title={f.label}
            type="checkbox"
          />
        ))}
      </div>

      <SectionDivider label="Thông tin thêm" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Số lượng trang dự kiến">
          <SelectInput
            value={formData.pageCount}
            onChange={(v) => updateField("pageCount", v)}
            options={["1-5 trang", "5-10 trang", "10-20 trang", "Trên 20 trang", "Chưa xác định"]}
          />
        </FormGroup>
        <FormGroup label="Ngôn ngữ website" required error={errors.language}>
          <SelectInput
            value={formData.language}
            onChange={(v) => updateField("language", v)}
            options={["Chỉ Tiếng Việt", "Chỉ Tiếng Anh", "Tiếng Việt + Tiếng Anh", "Nhiều hơn 2 ngôn ngữ"]}
            error={errors.language}
          />
        </FormGroup>
        <div className="md:col-span-2">
          <FormGroup label="Yêu cầu đặc biệt" optional>
            <TextArea value={formData.specialRequirements} onChange={(v) => updateField("specialRequirements", v)} placeholder="VD: Tích hợp phần mềm, API bên thứ 3, hệ thống điểm thưởng..." rows={3} />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
