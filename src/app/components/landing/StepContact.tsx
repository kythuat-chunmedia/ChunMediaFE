"use client";

import React from "react";
import type { LandingFormData } from "@/app/types";
import { CITIES, SOURCES } from "@/app/types";
import { FormGroup, TextInput, SelectInput, StepHeader } from "./FormUI";

interface Props {
  formData: LandingFormData;
  errors: Record<string, string>;
  updateField: (field: keyof LandingFormData, value: any) => void;
}

export default function StepContact({ formData, errors, updateField }: Props) {
  return (
    <div>
      <StepHeader icon="👤" iconBg="rgba(10,147,150,0.1)" iconColor="#0A9396"
        title="Thông tin liên hệ"
        description="Để chúng tôi có thể liên hệ và tư vấn cho bạn nhanh nhất" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormGroup label="Họ và tên" required error={errors.fullName}>
          <TextInput value={formData.fullName} onChange={(v) => updateField("fullName", v)} placeholder="Nguyễn Văn A" error={errors.fullName} />
        </FormGroup>
        <FormGroup label="Số điện thoại" required error={errors.phone}>
          <TextInput value={formData.phone} onChange={(v) => updateField("phone", v)} placeholder="0912 345 678" type="tel" error={errors.phone} />
        </FormGroup>
        <FormGroup label="Email" required error={errors.email}>
          <TextInput value={formData.email} onChange={(v) => updateField("email", v)} placeholder="email@congty.vn" type="email" error={errors.email} />
        </FormGroup>
        <FormGroup label="Tên công ty" optional>
          <TextInput value={formData.company} onChange={(v) => updateField("company", v)} placeholder="Công ty TNHH ABC" />
        </FormGroup>
        <FormGroup label="Chức vụ" optional>
          <TextInput value={formData.position} onChange={(v) => updateField("position", v)} placeholder="Giám đốc, Trưởng phòng..." />
        </FormGroup>
        <FormGroup label="Tỉnh / Thành phố">
          <SelectInput value={formData.city} onChange={(v) => updateField("city", v)} options={CITIES} placeholder="— Chọn tỉnh/thành —" />
        </FormGroup>
        <div className="md:col-span-2">
          <FormGroup label="Bạn biết đến chúng tôi qua đâu?">
            <SelectInput value={formData.source} onChange={(v) => updateField("source", v)} options={SOURCES} />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}