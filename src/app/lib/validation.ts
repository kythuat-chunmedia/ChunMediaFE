import { LandingFormData } from "@/app/types";

export function validateStep(
  step: number,
  formData: LandingFormData
): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1:
      if (!formData.fullName.trim())
        errors.fullName = "Vui lòng nhập họ tên";
      if (!formData.phone.trim())
        errors.phone = "Vui lòng nhập số điện thoại";
      else if (!/^[0-9\s+()-]{9,15}$/.test(formData.phone.trim()))
        errors.phone = "Số điện thoại không hợp lệ";
      if (!formData.email.trim())
        errors.email = "Vui lòng nhập email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
        errors.email = "Email không hợp lệ";
      break;

    case 2:
      if (!formData.websiteType)
        errors.websiteType = "Vui lòng chọn loại website";
      if (!formData.industry)
        errors.industry = "Vui lòng chọn ngành nghề";
      if (!formData.hasWebsite)
        errors.hasWebsite = "Vui lòng chọn";
      break;

    case 3:
      if (!formData.language)
        errors.language = "Vui lòng chọn ngôn ngữ website";
      break;

    case 4:
      if (!formData.hasLogo)
        errors.hasLogo = "Vui lòng chọn";
      if (!formData.contentReady)
        errors.contentReady = "Vui lòng chọn";
      break;

    case 5:
      if (!formData.budget)
        errors.budget = "Vui lòng chọn ngân sách";
      if (!formData.timeline)
        errors.timeline = "Vui lòng chọn thời gian hoàn thành";
      break;

    case 6:
      if (!formData.agree)
        errors.agree = "Vui lòng đồng ý điều khoản";
      break;
  }

  return errors;
}
