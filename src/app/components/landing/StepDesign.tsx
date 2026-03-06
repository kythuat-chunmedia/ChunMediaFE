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
    <div>
      <StepHeader icon="🎨" iconBg="rgba(10,147,150,0.1)" iconColor="#0A9396"
        title="Thương hiệu & Thiết kế"
        description="Giúp chúng tôi hiểu phong cách và bộ nhận diện thương hiệu của bạn" />

      <div className="mb-6">
        <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
          Bạn đã có logo chưa? <span className="text-red-500">*</span>
        </label>
        {errors.hasLogo && <p className="text-xs text-red-500 mb-2 flex items-center gap-1"><span>⚠</span>{errors.hasLogo}</p>}
        <div className="grid grid-cols-3 gap-3">
          {HAS_LOGO_OPTIONS.map((opt) => (
            <OptionCard key={opt.value} selected={formData.hasLogo === opt.value}
              onClick={() => updateField("hasLogo", opt.value)} title={opt.title} />
          ))}
        </div>
      </div>

      <SectionDivider label="Màu sắc thương hiệu" />
      <div className="mb-7">
        <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
          Chọn màu chủ đạo <span className="text-[#95A5A6] font-normal text-xs ml-1">(nếu có)</span>
        </label>
        <div className="flex gap-3 items-center flex-wrap">
          {BRAND_COLORS.map((color) => (
            <div key={color} onClick={() => updateField("brandColor", color)}
              className={`w-10 h-10 rounded-[10px] cursor-pointer transition-all duration-200 hover:scale-110 relative ${
                formData.brandColor === color
                  ? "ring-2 ring-[#0A9396] ring-offset-2"
                  : "ring-2 ring-transparent"
              }`}
              style={{ background: color }}
            >
              {formData.brandColor === color && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-base font-black drop-shadow">✓</span>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input type="color" value={formData.brandColor || "#0A9396"}
              onChange={(e) => updateField("brandColor", e.target.value)}
              className="w-10 h-10 border-none rounded-[10px] cursor-pointer bg-transparent" />
            <span className="text-xs text-[#95A5A6] font-medium">Tùy chỉnh</span>
          </div>
        </div>
      </div>

      <div className="mb-7">
        <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
          Phong cách thiết kế <span className="text-[#95A5A6] font-normal text-xs ml-1">(chọn nhiều)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {DESIGN_STYLE_OPTIONS.map((ds) => (
            <OptionCard key={ds.value} selected={formData.designStyles.includes(ds.value)}
              onClick={() => toggleNumArray("designStyles", ds.value)}
              title={`${ds.icon} ${ds.title}`} desc={ds.desc} type="checkbox" />
          ))}
        </div>
      </div>

      <SectionDivider label="Website tham khảo" />
      <div className="mb-6">
        <label className="block text-[13px] font-bold text-[#2C3E50] mb-3">
          Website bạn thích <span className="text-[#95A5A6] font-normal text-xs ml-1">(nếu có)</span>
        </label>
        <div className="flex flex-col gap-4">
          {formData.referenceWebsites.map((ref, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[rgba(10,147,150,0.04)] border border-[rgba(10,147,150,0.15)] rounded-xl">
              <TextInput value={ref.url} onChange={(v) => updateRefUrl(i, "url", v)} placeholder="https://example.com" type="url" />
              <TextInput value={ref.reason} onChange={(v) => updateRefUrl(i, "reason", v)} placeholder="Thích điểm gì? (layout, màu...)" />
            </div>
          ))}
          {formData.referenceWebsites.length < 3 && (
            <button type="button" onClick={addRefUrl}
              className="flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-[rgba(10,147,150,0.25)] rounded-xl bg-transparent text-[#6C757D] text-sm cursor-pointer transition-all duration-200 hover:border-[#0A9396] hover:text-[#0A9396] hover:bg-[rgba(10,147,150,0.04)] font-medium">
              + Thêm website tham khảo
            </button>
          )}
        </div>
      </div>

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