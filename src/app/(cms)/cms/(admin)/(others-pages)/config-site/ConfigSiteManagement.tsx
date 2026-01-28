"use client";

import React, { useState, useEffect } from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { ConfigSite, ConfigSiteFormData } from "@/app/types";
import { PencilIcon, CheckCircleIcon } from "./icons";
import { configSiteApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// ============ INITIAL FORM DATA ============
const initialFormData: ConfigSiteFormData = {
  // Thông tin chung
  title: "",
  email: "",
  hotline: "",
  description: "",
  infoContact: "",
  infoFooter: "",
  image: "",
  favicon: "",
  googleMap: "",
  googleAnalytics: "",
  place: "",
  aboutImage: "",
  aboutText: "",
  aboutUrl: "",
  // Mạng xã hội
  facebook: "",
  zalo: "",
  instagram: "",
  linkedin: "",
  tiktok: "",
  twitter: "",
  x: "",
  youtube: "",
  pinterest: "",
  liveChat: "",
};

// ============ TABS ============
type TabKey = "general" | "contact" | "about" | "social" | "advanced";

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: "general", label: "Thông tin chung", icon: "🏠" },
  { key: "contact", label: "Liên hệ", icon: "📞" },
  { key: "about", label: "Giới thiệu", icon: "ℹ️" },
  { key: "social", label: "Mạng xã hội", icon: "🌐" },
  { key: "advanced", label: "Nâng cao", icon: "⚙️" },
];

// ============ COMPONENT ============
export default function ConfigSiteManagement() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<ConfigSiteFormData>(initialFormData);
  const [configId, setConfigId] = useState<number | null>(null);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  //#region API CALLS
  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const config = await configSiteApi.get();

      if (config) {
        setConfigId(config.id);
        setFormData({
          title: config.title || "",
          email: config.email || "",
          hotline: config.hotline || "",
          description: config.description || "",
          infoContact: config.infoContact || "",
          infoFooter: config.infoFooter || "",
          image: config.image || "",
          favicon: config.favicon || "",
          googleMap: config.googleMap || "",
          googleAnalytics: config.googleAnalytics || "",
          place: config.place || "",
          aboutImage: config.aboutImage || "",
          aboutText: config.aboutText || "",
          aboutUrl: config.aboutUrl || "",
          facebook: config.facebook || "",
          zalo: config.zalo || "",
          instagram: config.instagram || "",
          linkedin: config.linkedin || "",
          tiktok: config.tiktok || "",
          twitter: config.twitter || "",
          x: config.x || "",
          youtube: config.youtube || "",
          pinterest: config.pinterest || "",
          liveChat: config.liveChat || "",
        });
      }
    } catch (error) {
      console.error("Error fetching config:", error);
    } finally {
      setLoading(false);
    }
  };
  //#endregion

  //#region HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Reset saved state when editing
    if (saved) setSaved(false);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate URLs
    const urlFields = [
      "facebook", "zalo", "instagram", "linkedin", "tiktok",
      "twitter", "x", "youtube", "pinterest", "aboutUrl"
    ];

    urlFields.forEach((field) => {
      const value = formData[field as keyof ConfigSiteFormData];
      if (value && !/^https?:\/\/.+/.test(value)) {
        newErrors[field] = "URL phải bắt đầu bằng http:// hoặc https://";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSaving(true);
      await configSiteApi.update(formData);
      setSaved(true);

      // Auto hide saved message after 3s
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving config:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (
    file: File,
    fieldName: keyof ConfigSiteFormData,
    slug: string
  ) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("File quá lớn! Tối đa 2MB");
      return;
    }

    try {
      setUploading((prev) => ({ ...prev, [fieldName]: true }));
      const response = await uploadApi.uploadImage(file, slug);

      if (response.success && response.url) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: response.url as string,
        }));
        if (saved) setSaved(false);
      } else {
        alert(response.message || "Upload thất bại");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Không thể upload hình ảnh");
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const clearImage = (fieldName: keyof ConfigSiteFormData) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
    if (saved) setSaved(false);
  };
  //#endregion

  //#region RENDER HELPERS
  const renderImageUpload = (
    fieldName: keyof ConfigSiteFormData,
    label: string,
    slug: string,
    hint?: string,
    size?: string
  ) => (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, fieldName, slug);
            }}
            disabled={uploading[fieldName]}
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${
              uploading[fieldName] ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          {uploading[fieldName] && (
            <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>
          )}
          {!uploading[fieldName] && (
            <p className="mt-1.5 text-xs text-gray-500">
              {hint || `Khuyến nghị: ${size || "Tối đa 2MB"}`}
            </p>
          )}
        </div>
        {formData[fieldName] && (
          <div className="relative">
            <img
              src={formData[fieldName] as string}
              alt={label}
              className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
            <button
              type="button"
              onClick={() => clearImage(fieldName)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSocialInput = (
    fieldName: keyof ConfigSiteFormData,
    label: string,
    icon: string,
    placeholder: string
  ) => (
    <div>
      <Label>
        <span className="inline-flex items-center gap-2">
          <span>{icon}</span>
          {label}
        </span>
      </Label>
      <Input
        name={fieldName}
        type="url"
        placeholder={placeholder}
        value={(formData[fieldName] as string) || ""}
        onChange={handleChange}
        error={!!errors[fieldName]}
        hint={errors[fieldName]}
      />
    </div>
  );
  //#endregion

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Đang tải cấu hình...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ============ HEADER ============ */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            ⚙️ Cấu hình Website
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Thiết lập thông tin chung và mạng xã hội cho website
          </p>
        </div>

        {/* Save status */}
        {saved && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-50 text-success-700 rounded-lg dark:bg-success-500/10 dark:text-success-400">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Đã lưu thành công!</span>
          </div>
        )}
      </div>

      {/* ============ TABS ============ */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-brand-500 text-brand-600 dark:text-brand-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* ============ FORM ============ */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="p-6">
            {/* TAB: Thông tin chung */}
            {activeTab === "general" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label>Tên website</Label>
                  <Input
                    name="title"
                    type="text"
                    placeholder="Tên website của bạn"
                    value={formData.title || ""}
                    onChange={handleChange}
                    hint="Hiển thị trên title và header"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Mô tả website</Label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Mô tả ngắn về website..."
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Hiển thị trong meta description cho SEO
                  </p>
                </div>

                {renderImageUpload("image", "Logo website", "config", "Logo chính của website", "200x60px")}
                {renderImageUpload("favicon", "Favicon", "config", "Icon hiển thị trên tab trình duyệt", "32x32px hoặc 64x64px")}
              </div>
            )}

            {/* TAB: Liên hệ */}
            {activeTab === "contact" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Email liên hệ</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.email || ""}
                    onChange={handleChange}
                    error={!!errors.email}
                    hint={errors.email || "Email nhận liên hệ từ khách hàng"}
                  />
                </div>

                <div>
                  <Label>Hotline</Label>
                  <Input
                    name="hotline"
                    type="tel"
                    placeholder="0123 456 789"
                    value={formData.hotline || ""}
                    onChange={handleChange}
                    hint="Số điện thoại liên hệ"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Địa chỉ</Label>
                  <Input
                    name="place"
                    type="text"
                    placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                    value={formData.place || ""}
                    onChange={handleChange}
                    hint="Địa chỉ công ty/cửa hàng"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Thông tin liên hệ (HTML)</Label>
                  <textarea
                    name="infoContact"
                    rows={4}
                    placeholder="Nội dung HTML hiển thị ở trang liên hệ..."
                    value={formData.infoContact || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Thông tin footer (HTML)</Label>
                  <textarea
                    name="infoFooter"
                    rows={4}
                    placeholder="Nội dung HTML hiển thị ở footer..."
                    value={formData.infoFooter || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB: Giới thiệu */}
            {activeTab === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderImageUpload("aboutImage", "Hình ảnh giới thiệu", "config", "Hình ảnh cho trang About", "800x600px")}

                <div>
                  <Label>Link giới thiệu</Label>
                  <Input
                    name="aboutUrl"
                    type="url"
                    placeholder="https://example.com/about"
                    value={formData.aboutUrl || ""}
                    onChange={handleChange}
                    error={!!errors.aboutUrl}
                    hint={errors.aboutUrl || "Link đến trang giới thiệu chi tiết"}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Nội dung giới thiệu (HTML)</Label>
                  <textarea
                    name="aboutText"
                    rows={8}
                    placeholder="Nội dung HTML giới thiệu về công ty/website..."
                    value={formData.aboutText || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB: Mạng xã hội */}
            {activeTab === "social" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderSocialInput("facebook", "Facebook", "📘", "https://facebook.com/yourpage")}
                {renderSocialInput("youtube", "YouTube", "📺", "https://youtube.com/@yourchannel")}
                {renderSocialInput("instagram", "Instagram", "📷", "https://instagram.com/yourprofile")}
                {renderSocialInput("tiktok", "TikTok", "🎵", "https://tiktok.com/@yourprofile")}
                {renderSocialInput("zalo", "Zalo", "💬", "https://zalo.me/yourpage")}
                {renderSocialInput("linkedin", "LinkedIn", "💼", "https://linkedin.com/company/yourcompany")}
                {renderSocialInput("twitter", "Twitter", "🐦", "https://twitter.com/yourprofile")}
                {renderSocialInput("x", "X (Twitter)", "✖️", "https://x.com/yourprofile")}
                {renderSocialInput("pinterest", "Pinterest", "📌", "https://pinterest.com/yourprofile")}

                <div className="md:col-span-2">
                  <Label>
                    <span className="inline-flex items-center gap-2">
                      <span>💬</span>
                      Live Chat Script
                    </span>
                  </Label>
                  <textarea
                    name="liveChat"
                    rows={4}
                    placeholder="Paste script live chat (Tawk.to, Crisp, Zendesk, etc.)..."
                    value={formData.liveChat || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 font-mono"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Script sẽ được inject vào trang web
                  </p>
                </div>
              </div>
            )}

            {/* TAB: Nâng cao */}
            {activeTab === "advanced" && (
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label>Google Analytics ID</Label>
                  <Input
                    name="googleAnalytics"
                    type="text"
                    placeholder="G-XXXXXXXXXX hoặc UA-XXXXXXXX-X"
                    value={formData.googleAnalytics || ""}
                    onChange={handleChange}
                    hint="ID theo dõi Google Analytics"
                  />
                </div>

                <div>
                  <Label>Google Maps Embed URL</Label>
                  <textarea
                    name="googleMap"
                    rows={3}
                    placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>'
                    value={formData.googleMap || ""}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 font-mono"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Embed code từ Google Maps
                  </p>
                </div>

                {/* Preview Google Map */}
                {formData.googleMap && (
                  <div>
                    <Label>Xem trước bản đồ</Label>
                    <div
                      className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                      dangerouslySetInnerHTML={{ __html: formData.googleMap }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============ FORM ACTIONS ============ */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Thay đổi sẽ được áp dụng ngay sau khi lưu
            </p>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PencilIcon className="w-4 h-4" />
              {saving ? "Đang lưu..." : "Lưu cấu hình"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}