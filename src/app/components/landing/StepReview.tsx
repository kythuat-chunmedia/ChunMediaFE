"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import {
  WEBSITE_TYPE_OPTIONS,
  BUDGET_UI_OPTIONS,
  TIMELINE_UI_OPTIONS,
  FEATURE_UI_OPTIONS,
  DESIGN_STYLE_OPTIONS,
  ADDON_UI_OPTIONS,
  HAS_LOGO_OPTIONS,
  HAS_WEBSITE_OPTIONS,
  CONTENT_READY_OPTIONS,
  HAS_DOMAIN_OPTIONS,
} from "@/app/types";
import { StepHeader, ErrorMsg } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
}

// Utility: tìm label từ enum number value
function findLabel<T extends { value: number; label?: string; title?: string }>(
  options: T[],
  value: number | null
): string {
  if (value === null) return "";
  const opt = options.find((o) => o.value === value);
  return opt ? (opt as any).title || (opt as any).label || "" : "";
}

function findLabels<T extends { value: number; label?: string; title?: string }>(
  options: T[],
  values: number[]
): string {
  return values
    .map((v) => findLabel(options, v))
    .filter(Boolean)
    .join(", ");
}

interface ReviewItem {
  label: string;
  value: string;
  full?: boolean;
  colorPreview?: boolean;
}

export default function StepReview({ formData, errors, updateField }: Props) {
  const budgetOpt = BUDGET_UI_OPTIONS.find((b) => b.value === formData.budget);

  const sections: { title: string; items: ReviewItem[] }[] = [
    {
      title: "👤 Thông tin liên hệ",
      items: [
        { label: "Họ tên", value: formData.fullName },
        { label: "SĐT", value: formData.phone },
        { label: "Email", value: formData.email },
        { label: "Công ty", value: formData.company },
        { label: "Chức vụ", value: formData.position },
        { label: "Thành phố", value: formData.city },
        { label: "Nguồn", value: formData.source },
      ],
    },
    {
      title: "🌐 Loại hình website",
      items: [
        { label: "Loại website", value: findLabel(WEBSITE_TYPE_OPTIONS, formData.websiteType) },
        { label: "Ngành nghề", value: formData.industry },
        { label: "Có website", value: findLabel(HAS_WEBSITE_OPTIONS, formData.hasWebsite) },
        { label: "URL hiện tại", value: formData.currentUrl },
        { label: "Vấn đề", value: formData.currentIssue, full: true },
      ],
    },
    {
      title: "⚡ Tính năng",
      items: [
        { label: "Số trang", value: formData.pageCount },
        { label: "Ngôn ngữ", value: formData.language },
        { label: "Yêu cầu đặc biệt", value: formData.specialRequirements, full: true },
        ...(formData.features.length
          ? [{ label: "Tính năng", value: findLabels(FEATURE_UI_OPTIONS, formData.features), full: true }]
          : []),
      ],
    },
    {
      title: "🎨 Thiết kế",
      items: [
        { label: "Logo", value: findLabel(HAS_LOGO_OPTIONS, formData.hasLogo) },
        { label: "Màu thương hiệu", value: formData.brandColor, colorPreview: true },
        { label: "Nội dung", value: findLabel(CONTENT_READY_OPTIONS, formData.contentReady) },
        { label: "Tên miền", value: findLabel(HAS_DOMAIN_OPTIONS, formData.hasDomain) },
        ...(formData.designStyles.length
          ? [{ label: "Phong cách", value: findLabels(DESIGN_STYLE_OPTIONS, formData.designStyles), full: true }]
          : []),
      ],
    },
    {
      title: "💰 Ngân sách",
      items: [
        { label: "Ngân sách", value: budgetOpt ? `${budgetOpt.label} (${budgetOpt.range})` : "" },
        { label: "Timeline", value: findLabel(TIMELINE_UI_OPTIONS, formData.timeline) },
        { label: "Thanh toán", value: formData.paymentMethod },
        { label: "Ghi chú", value: formData.notes, full: true },
        ...(formData.addons.length
          ? [{ label: "Dịch vụ thêm", value: findLabels(ADDON_UI_OPTIONS, formData.addons), full: true }]
          : []),
      ],
    },
  ];

  return (
    <div className="animate-stepFadeIn">
      <StepHeader
        icon="✅"
        iconBg="rgba(16,185,129,0.15)"
        iconColor="#34d399"
        title="Xác nhận thông tin"
        description="Kiểm tra lại trước khi gửi. Bạn có thể quay lại chỉnh sửa bất kỳ mục nào."
      />

      {sections.map((sec) => {
        const validItems = sec.items.filter((item) => item.value);
        if (validItems.length === 0) return null;
        return (
          <div key={sec.title} className="mb-6">
            <h3 className="text-base font-bold text-indigo-400 mb-4 flex items-center gap-2">{sec.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {validItems.map((item) => (
                <div key={item.label} className={`p-3.5 bg-[#0f1629] border border-white/4 rounded-xl ${item.full ? "md:col-span-2" : ""}`}>
                  <div className="text-xs text-[#64748b] mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-[#f1f5f9] flex items-center gap-1.5">
                    {item.colorPreview && item.value && (
                      <span className="inline-block w-4 h-4 rounded" style={{ background: item.value }} />
                    )}
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Agreement */}
      <div className="mt-7 p-4 bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.2)] rounded-xl">
        <div className="flex items-start gap-3 cursor-pointer" onClick={() => updateField("agree", !formData.agree)}>
          <div className={`w-5 h-5 border-2 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 mt-0.5 ${
            formData.agree ? "border-indigo-500 bg-indigo-500" : errors.agree ? "border-red-500" : "border-[#2a3456]"
          }`}>
            {formData.agree && <span className="text-white text-[11px] font-bold">✓</span>}
          </div>
          <p className="text-[13px] font-semibold leading-relaxed text-[#f1f5f9]">
            Tôi đồng ý chia sẻ thông tin để nhận tư vấn và báo giá. Thông tin sẽ được bảo mật.
          </p>
        </div>
        <ErrorMsg error={errors.agree} />
      </div>
    </div>
  );
}
