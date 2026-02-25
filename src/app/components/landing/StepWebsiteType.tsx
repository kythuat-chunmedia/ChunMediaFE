"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { WEBSITE_TYPE_OPTIONS, HAS_WEBSITE_OPTIONS, INDUSTRIES } from "@/app/types";
import { WebsiteType, HasWebsiteStatus } from "@/app/types";
import { FormGroup, TextInput, SelectInput, SelectEnum, OptionCard, SectionDivider, StepHeader } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
}

export default function StepWebsiteType({ formData, errors, updateField }: Props) {
  return (
    <div className="animate-stepFadeIn">
      <StepHeader
        icon="🌐"
        iconBg="rgba(59,130,246,0.15)"
        iconColor="#60a5fa"
        title="Loại hình website"
        description="Cho chúng tôi biết bạn cần loại website nào và thuộc ngành nghề gì"
      />

      <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
        Loại website <span className="text-red-500">*</span>
      </label>
      {errors.websiteType && <p className="text-xs text-red-500 mb-2">{errors.websiteType}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-7">
        {WEBSITE_TYPE_OPTIONS.map((wt) => (
          <OptionCard
            key={wt.value}
            selected={formData.websiteType === wt.value}
            onClick={() => updateField("websiteType", wt.value)}
            icon={wt.icon}
            title={wt.title}
            desc={wt.desc}
          />
        ))}
      </div>

      {formData.websiteType === WebsiteType.Other && (
        <div className="mb-6 animate-[fadeIn_0.3s]">
          <FormGroup label="Mô tả loại website">
            <TextInput value={formData.otherTypeDescription} onChange={(v) => updateField("otherTypeDescription", v)} placeholder="VD: Website đấu giá, cộng đồng..." />
          </FormGroup>
        </div>
      )}

      <SectionDivider label="Ngành nghề" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Ngành nghề" required error={errors.industry}>
          <SelectInput value={formData.industry} onChange={(v) => updateField("industry", v)} options={INDUSTRIES} placeholder="— Chọn ngành nghề —" error={errors.industry} />
        </FormGroup>
        <FormGroup label="Đã có website chưa?" required error={errors.hasWebsite}>
          <SelectEnum
            value={formData.hasWebsite } 
            onChange={(v) => updateField("hasWebsite", v)}
            options={HAS_WEBSITE_OPTIONS}
            error={errors.hasWebsite}
          />
        </FormGroup>
      </div>

      {(formData.hasWebsite === HasWebsiteStatus.YesRedesign || formData.hasWebsite === HasWebsiteStatus.YesUpgrade) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 animate-[fadeIn_0.3s]">
          <FormGroup label="URL website hiện tại">
            <TextInput value={formData.currentUrl} onChange={(v) => updateField("currentUrl", v)} placeholder="https://website-cua-ban.vn" type="url" />
          </FormGroup>
          <FormGroup label="Điều chưa hài lòng?">
            <TextInput value={formData.currentIssue} onChange={(v) => updateField("currentIssue", v)} placeholder="Chậm, xấu, không lên SEO..." />
          </FormGroup>
        </div>
      )}
    </div>
  );
}
