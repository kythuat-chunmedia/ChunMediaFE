"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { BRAND_COLORS, DESIGN_STYLE_OPTIONS, HAS_LOGO_OPTIONS, CONTENT_READY_OPTIONS, HAS_DOMAIN_OPTIONS } from "@/app/types";
import { FormGroup, TextInput, SelectEnum, OptionCard, SectionDivider, StepHeader } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
  toggleNumArray: (field: "features" | "designStyles" | "addons", value: number) => void;
}

export default function StepDesign({ formData, errors, updateField, toggleNumArray }: Props) {
  const addRefUrl = () => {
    if (formData.referenceWebsites.length >= 3) return;
    updateField("referenceWebsites", [...formData.referenceWebsites, { url: "", reason: "" }]);
  };

  const updateRefUrl = (index: number, field: "url" | "reason", value: string) => {
    const newRefs = [...formData.referenceWebsites];
    newRefs[index] = { ...newRefs[index], [field]: value };
    updateField("referenceWebsites", newRefs);
  };

  return (
    <div className="animate-stepFadeIn">
      <StepHeader
        icon="🎨"
        iconBg="rgba(244,114,182,0.15)"
        iconColor="#f472b6"
        title="Thương hiệu & Thiết kế"
        description="Giúp chúng tôi hiểu phong cách và bộ nhận diện thương hiệu của bạn"
      />

      {/* Has Logo - enum HasLogoStatus */}
      <div className="mb-6">
        <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
          Bạn đã có logo chưa? <span className="text-red-500">*</span>
        </label>
        {errors.hasLogo && <p className="text-xs text-red-500 mb-2">{errors.hasLogo}</p>}
        <div className="grid grid-cols-3 gap-3">
          {HAS_LOGO_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              selected={formData.hasLogo === opt.value}
              onClick={() => updateField("hasLogo", opt.value)}
              title={opt.title}
            />
          ))}
        </div>
      </div>

      {/* Brand Color */}
      <SectionDivider label="Màu sắc thương hiệu" />
      <div className="mb-7">
        <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
          Chọn màu chủ đạo <span className="text-[#64748b] font-normal text-xs ml-1">(nếu có)</span>
        </label>
        <div className="flex gap-3 items-center flex-wrap">
          {BRAND_COLORS.map((color) => (
            <div
              key={color}
              onClick={() => updateField("brandColor", color)}
              className={`w-10 h-10 rounded-[10px] cursor-pointer transition-all duration-300 hover:scale-110 relative ${
                formData.brandColor === color ? "border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.3)]" : "border-2 border-transparent"
              }`}
              style={{ background: color }}
            >
              {formData.brandColor === color && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-base font-bold drop-shadow-md">✓</span>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={formData.brandColor || "#6366f1"}
              onChange={(e) => updateField("brandColor", e.target.value)}
              className="w-10 h-10 border-none rounded-[10px] cursor-pointer bg-transparent"
            />
            <span className="text-xs text-[#64748b]">Tùy chỉnh</span>
          </div>
        </div>
      </div>

      {/* Design Styles - enum DesignStyle[] */}
      <div className="mb-7">
        <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
          Phong cách thiết kế <span className="text-[#64748b] font-normal text-xs ml-1">(chọn nhiều)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DESIGN_STYLE_OPTIONS.map((ds) => (
            <OptionCard
              key={ds.value}
              selected={formData.designStyles.includes(ds.value)}
              onClick={() => toggleNumArray("designStyles", ds.value)}
              title={`${ds.icon} ${ds.title}`}
              desc={ds.desc}
              type="checkbox"
            />
          ))}
        </div>
      </div>

      {/* Reference Websites */}
      <SectionDivider label="Website tham khảo" />
      <div className="mb-6">
        <label className="block text-[13px] font-semibold text-[#94a3b8] mb-3">
          Website bạn thích <span className="text-[#64748b] font-normal text-xs ml-1">(nếu có)</span>
        </label>
        <div className="flex flex-col gap-4">
          {formData.referenceWebsites.map((ref, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#0f1629] border border-[#2a3456] rounded-xl">
              <TextInput value={ref.url} onChange={(v) => updateRefUrl(i, "url", v)} placeholder="https://example.com" type="url" />
              <TextInput value={ref.reason} onChange={(v) => updateRefUrl(i, "reason", v)} placeholder="Thích điểm gì? (layout, màu...)" />
            </div>
          ))}
          {formData.referenceWebsites.length < 3 && (
            <button
              type="button"
              onClick={addRefUrl}
              className="flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-[#2a3456] rounded-xl bg-transparent text-[#64748b] text-sm cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:text-indigo-400 hover:bg-[rgba(99,102,241,0.15)]"
            >
              + Thêm website tham khảo
            </button>
          )}
        </div>
      </div>

      {/* Content & Domain - enum ContentReadyStatus, HasDomainStatus */}
      <SectionDivider label="Nội dung" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Đã có sẵn nội dung?" required error={errors.contentReady}>
          <SelectEnum value={formData.contentReady} onChange={(v) => updateField("contentReady", v)} options={CONTENT_READY_OPTIONS} error={errors.contentReady} />
        </FormGroup>
        <FormGroup label="Đã có tên miền (domain)?">
          <SelectEnum value={formData.hasDomain} onChange={(v) => updateField("hasDomain", v)} options={HAS_DOMAIN_OPTIONS} />
        </FormGroup>
      </div>
    </div>
  );
}
