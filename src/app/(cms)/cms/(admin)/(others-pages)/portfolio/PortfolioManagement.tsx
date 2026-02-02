"use client";

import React, { useState, useEffect, useMemo } from "react";
import Label from "@/app/(cms)/cms/components/form/Label";
import Input from "@/app/(cms)/cms/components/form/input/InputField";
import { Portfolio, PortfolioFormData } from "@/app/types";
import { portfolioApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon, EyeIcon } from "./icons";

// ============ INITIAL FORM DATA ============
const initialFormData: PortfolioFormData = {
  slug: "",
  title: "",
  seoTitle: "",
  seoDescription: "",
  shortDescription: "",
  content: "",
  thumbnailUrl: "",
  bannerUrl: "",
  clientName: "",
  industry: "",
  year: new Date().getFullYear(),
  reach: 0,
  engagement: 0,
  conversionRate: 0,
  orderQuantity: 0,
  revenue: 0,
  isPublished: false,
};

// ============ INDUSTRY OPTIONS ============
const INDUSTRY_OPTIONS = [
  "E-commerce",
  "F&B (Food & Beverage)",
  "Fashion & Beauty",
  "Healthcare",
  "Education",
  "Real Estate",
  "Finance & Banking",
  "Technology",
  "Entertainment",
  "Travel & Tourism",
  "Manufacturing",
  "Retail",
  "Automotive",
  "FMCG",
  "Khác",
];

// ============ COMPONENT ============
export default function PortfolioManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState<number | "">("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PortfolioFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  // Tab state for form sections
  const [activeTab, setActiveTab] = useState<"basic" | "content" | "kpi" | "seo">("basic");

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getAllNoPaging();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadPortfolios = async () => {
    try {
      const data = await portfolioApi.getAllNoPaging();
      setPortfolios(data);
    } catch (error) {
      console.error("Error reloading portfolios:", error);
    }
  };
  //#endregion

  //#region COMPUTED VALUES
  // Get unique years from portfolios
  const availableYears = useMemo(() => {
    const years = [...new Set(portfolios.map(p => p.year))].sort((a, b) => b - a);
    return years;
  }, [portfolios]);

  // Get unique industries from portfolios
  const availableIndustries = useMemo(() => {
    const industries = [...new Set(portfolios.map(p => p.industry).filter(Boolean))] as string[];
    return industries.sort();
  }, [portfolios]);

  // KPI Summary
  const kpiSummary = useMemo(() => {
    const published = portfolios.filter(p => p.isPublished);
    return {
      totalReach: published.reduce((sum, p) => sum + p.reach, 0),
      totalEngagement: published.reduce((sum, p) => sum + p.engagement, 0),
      avgConversionRate: published.length > 0
        ? published.reduce((sum, p) => sum + p.conversionRate, 0) / published.length
        : 0,
      totalOrderQuantity: published.reduce((sum, p) => sum + p.orderQuantity, 0),
      totalRevenue: published.reduce((sum, p) => sum + p.revenue, 0),
      projectCount: published.length,
    };
  }, [portfolios]);

  // Filter portfolios
  const filteredPortfolios = useMemo(() => {
    return portfolios.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      const matchYear = filterYear === "" || p.year === filterYear;
      const matchIndustry = filterIndustry === "" || p.industry === filterIndustry;

      return matchSearch && matchYear && matchIndustry;
    });
  }, [portfolios, searchTerm, filterYear, filterIndustry]);
  //#endregion

  //#region HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Auto-generate slug from title
    if (name === "title" && !isEditing) {
      const slug = generateSlug(value);
      setFormData((prev) => ({ ...prev, slug }));
    }

    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Generate slug from title
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Vui lòng nhập slug";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Slug chỉ chứa chữ thường, số và dấu gạch ngang";
    }
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Vui lòng nhập tên khách hàng";
    }
    if (!formData.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = "Vui lòng chọn ảnh thumbnail";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Vui lòng nhập nội dung";
    }
    if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = "Năm không hợp lệ";
    }
    if (formData.conversionRate < 0 || formData.conversionRate > 100) {
      newErrors.conversionRate = "Tỷ lệ chuyển đổi phải từ 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (portfolio: Portfolio) => {
    setSelectedId(portfolio.id);
    setIsEditing(true);
    setFormData({
      slug: portfolio.slug,
      title: portfolio.title,
      seoTitle: portfolio.seoTitle || "",
      seoDescription: portfolio.seoDescription || "",
      shortDescription: portfolio.shortDescription || "",
      content: portfolio.content,
      thumbnailUrl: portfolio.thumbnailUrl,
      bannerUrl: portfolio.bannerUrl || "",
      clientName: portfolio.clientName,
      industry: portfolio.industry || "",
      year: portfolio.year,
      reach: portfolio.reach,
      engagement: portfolio.engagement,
      conversionRate: portfolio.conversionRate,
      orderQuantity: portfolio.orderQuantity,
      revenue: portfolio.revenue,
      isPublished: portfolio.isPublished,
    });
    setErrors({});
    setActiveTab("basic");

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
    setActiveTab("basic");
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // Switch to tab with error
      if (errors.title || errors.slug || errors.clientName || errors.thumbnailUrl) {
        setActiveTab("basic");
      } else if (errors.content) {
        setActiveTab("content");
      } else if (errors.conversionRate) {
        setActiveTab("kpi");
      }
      return;
    }

    try {
      setLoading(true);
      console.log("Form Data to submit:", formData);

      if (isEditing && selectedId) {
        const existing = portfolios.find(p => p.id === selectedId);
        const portfolioToUpdate: Portfolio = {
          id: selectedId,
          ...formData,
          seoTitle: formData.seoTitle || null,
          seoDescription: formData.seoDescription || null,
          shortDescription: formData.shortDescription || null,
          bannerUrl: formData.bannerUrl || null,
          industry: formData.industry || null,
          publishedAt: existing?.publishedAt || new Date().toISOString(),
          createdAt: existing?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await portfolioApi.update(portfolioToUpdate);
      } else {
        await portfolioApi.create(formData);
      }

      await reloadPortfolios();
      handleReset();
    } catch (error) {
      console.error("Error saving portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      try {
        setLoading(true);
        await portfolioApi.delete(id);
        await reloadPortfolios();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (
    file: File,
    field: "thumbnailUrl" | "bannerUrl",
    setUploading: (value: boolean) => void
  ) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("File quá lớn! Tối đa 2MB");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file, "portfolio");

      if (response.success && response.url) {
        setFormData((prev) => ({ ...prev, [field]: response.url as string }));
      } else {
        alert(response.message || "Upload thất bại");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Không thể upload hình ảnh");
    } finally {
      setUploading(false);
    }
  };
  //#endregion

  //#region FORMATTERS
  const formatNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value.toLocaleString("vi-VN");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ KPI SUMMARY CARDS ============ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">{kpiSummary.projectCount}</p>
              <p className="text-xs text-gray-500">Dự án</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👁️</span>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">{formatNumber(kpiSummary.totalReach)}</p>
              <p className="text-xs text-gray-500">Reach</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">{formatNumber(kpiSummary.totalEngagement)}</p>
              <p className="text-xs text-gray-500">Engagement</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">{kpiSummary.avgConversionRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Avg. CVR</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛒</span>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">{formatNumber(kpiSummary.totalOrderQuantity)}</p>
              <p className="text-xs text-gray-500">Đơn hàng</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-500/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-lg font-bold text-brand-700 dark:text-brand-400">{formatNumber(kpiSummary.totalRevenue)}</p>
              <p className="text-xs text-brand-600 dark:text-brand-500">Doanh thu</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật Portfolio" : "➕ Thêm Portfolio mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? `Đang chỉnh sửa: ${formData.title}` : "Điền thông tin để thêm case study mới"}
          </p>
        </div>

        {/* Form Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex gap-1 px-5">
            {[
              { key: "basic", label: "📋 Thông tin cơ bản" },
              { key: "content", label: "📝 Nội dung" },
              { key: "kpi", label: "📊 KPIs" },
              { key: "seo", label: "🔍 SEO" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-brand-500 text-brand-600 dark:text-brand-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* TAB: Basic Info */}
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Tiêu đề */}
              <div className="lg:col-span-2">
                <Label>Tiêu đề <span className="text-error-500">*</span></Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Nhập tiêu đề dự án"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  hint={errors.title || "Tiêu đề hiển thị chính của case study"}
                />
              </div>

              {/* Slug */}
              <div>
                <Label>Slug (URL) <span className="text-error-500">*</span></Label>
                <Input
                  name="slug"
                  type="text"
                  placeholder="url-friendly-slug"
                  value={formData.slug}
                  onChange={handleChange}
                  error={!!errors.slug}
                  hint={errors.slug || "Đường dẫn URL thân thiện"}
                />
              </div>

              {/* Client Name */}
              <div>
                <Label>Tên khách hàng <span className="text-error-500">*</span></Label>
                <Input
                  name="clientName"
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  value={formData.clientName}
                  onChange={handleChange}
                  error={!!errors.clientName}
                  hint={errors.clientName || "Tên công ty/thương hiệu khách hàng"}
                />
              </div>

              {/* Industry */}
              <div>
                <Label>Ngành nghề</Label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 bg-transparent cursor-pointer"
                >
                  <option value="">-- Chọn ngành --</option>
                  {INDUSTRY_OPTIONS.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-gray-500">Phân loại theo ngành nghề</p>
              </div>

              {/* Year */}
              <div>
                <Label>Năm thực hiện <span className="text-error-500">*</span></Label>
                <Input
                  name="year"
                  type="number"
                  placeholder="2024"
                  min="2000"
                  max={(new Date().getFullYear() + 1).toString()}
                  value={formData.year}
                  onChange={handleChange}
                  error={!!errors.year}
                  hint={errors.year || "Năm triển khai dự án"}
                />
              </div>

              {/* Thumbnail */}
              <div className="lg:col-span-2">
                <Label>Ảnh Thumbnail <span className="text-error-500">*</span></Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, "thumbnailUrl", setUploadingThumbnail);
                      }}
                      disabled={uploadingThumbnail}
                      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${
                        errors.thumbnailUrl ? "border border-error-500 rounded-lg" : ""
                      } ${uploadingThumbnail ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    {uploadingThumbnail && <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>}
                    {errors.thumbnailUrl && <p className="mt-1.5 text-xs text-error-500">{errors.thumbnailUrl}</p>}
                    {!errors.thumbnailUrl && !uploadingThumbnail && (
                      <p className="mt-1.5 text-xs text-gray-500">Ảnh đại diện cho dự án (Tối đa 2MB)</p>
                    )}
                  </div>
                  {formData.thumbnailUrl && (
                    <div className="relative">
                      <img
                        src={formData.thumbnailUrl}
                        alt="Thumbnail"
                        className="w-20 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, thumbnailUrl: "" }))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner (Optional) */}
              <div>
                <Label>Ảnh Banner</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, "bannerUrl", setUploadingBanner);
                      }}
                      disabled={uploadingBanner}
                      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${
                        uploadingBanner ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                    {uploadingBanner && <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>}
                    {!uploadingBanner && <p className="mt-1.5 text-xs text-gray-500">Ảnh header lớn (optional)</p>}
                  </div>
                  {formData.bannerUrl && (
                    <div className="relative">
                      <img
                        src={formData.bannerUrl}
                        alt="Banner"
                        className="w-20 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, bannerUrl: "" }))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Published Status */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Xuất bản công khai
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* TAB: Content */}
          {activeTab === "content" && (
            <div className="space-y-5">
              {/* Short Description */}
              <div>
                <Label>Mô tả ngắn</Label>
                <textarea
                  name="shortDescription"
                  rows={2}
                  placeholder="Tóm tắt ngắn về dự án..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
                />
                <p className="mt-1.5 text-xs text-gray-500">Hiển thị trong danh sách portfolio</p>
              </div>

              {/* Content */}
              <div>
                <Label>Nội dung chi tiết <span className="text-error-500">*</span></Label>
                <textarea
                  name="content"
                  rows={12}
                  placeholder="Nhập nội dung chi tiết về dự án (hỗ trợ HTML/Markdown)..."
                  value={formData.content}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 font-mono ${
                    errors.content
                      ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                      : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                  }`}
                />
                {errors.content ? (
                  <p className="mt-1.5 text-xs text-error-500">{errors.content}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-500">
                    Nội dung HTML chi tiết: bối cảnh, thách thức, giải pháp, kết quả...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB: KPIs */}
          {activeTab === "kpi" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-3 mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Nhập các chỉ số KPI đã đạt được trong dự án này
                </p>
              </div>

              {/* Reach */}
              <div>
                <Label>👁️ Reach (Tiếp cận)</Label>
                <Input
                  name="reach"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.reach}
                  onChange={handleChange}
                  hint="Số lượng người tiếp cận"
                />
              </div>

              {/* Engagement */}
              <div>
                <Label>💬 Engagement (Tương tác)</Label>
                <Input
                  name="engagement"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.engagement}
                  onChange={handleChange}
                  hint="Số lượng tương tác (like, comment, share...)"
                />
              </div>

              {/* Conversion Rate */}
              <div>
                <Label>📈 Conversion Rate (%)</Label>
                <Input
                  name="conversionRate"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.conversionRate}
                  onChange={handleChange}
                  error={!!errors.conversionRate}
                  hint={errors.conversionRate || "Tỷ lệ chuyển đổi (0-100%)"}
                />
              </div>

              {/* Order Quantity */}
              <div>
                <Label>🛒 Số đơn hàng</Label>
                <Input
                  name="orderQuantity"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.orderQuantity}
                  onChange={handleChange}
                  hint="Tổng số đơn hàng đạt được"
                />
              </div>

              {/* Revenue */}
              <div className="lg:col-span-2">
                <Label>💰 Doanh thu (VNĐ)</Label>
                <Input
                  name="revenue"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="1000000"
                  value={formData.revenue}
                  onChange={handleChange}
                  hint="Tổng doanh thu đạt được"
                />
                {formData.revenue > 0 && (
                  <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    = {formatCurrency(formData.revenue)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === "seo" && (
            <div className="space-y-5">
              <div className="lg:col-span-3 mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🔍 Tối ưu SEO để dự án được tìm thấy trên Google
                </p>
              </div>

              {/* SEO Title */}
              <div>
                <Label>SEO Title</Label>
                <Input
                  name="seoTitle"
                  type="text"
                  placeholder="Tiêu đề hiển thị trên Google (50-60 ký tự)"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  hint={`${formData.seoTitle.length}/60 ký tự - Để trống sẽ dùng tiêu đề chính`}
                />
              </div>

              {/* SEO Description */}
              <div>
                <Label>SEO Description</Label>
                <textarea
                  name="seoDescription"
                  rows={3}
                  placeholder="Mô tả hiển thị trên Google (150-160 ký tự)"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  {formData.seoDescription.length}/160 ký tự - Để trống sẽ dùng mô tả ngắn
                </p>
              </div>

              {/* SEO Preview */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 uppercase mb-2">Xem trước trên Google:</p>
                <div className="space-y-1">
                  <p className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer">
                    {formData.seoTitle || formData.title || "Tiêu đề dự án"}
                  </p>
                  <p className="text-green-700 dark:text-green-500 text-sm">
                    example.com/portfolio/{formData.slug || "slug-url"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.seoDescription || formData.shortDescription || "Mô tả ngắn về dự án sẽ hiển thị ở đây..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? (
                <>
                  <PencilIcon className="w-4 h-4" />
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  {loading ? "Đang thêm..." : "Thêm mới"}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Làm mới
            </button>
          </div>
        </form>
      </div>

      {/* ============ TABLE SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              🏆 Danh sách Portfolio
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredPortfolios.length} dự án
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="w-60">
              <Input
                type="text"
                placeholder="🔍 Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Year Filter */}
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value ? parseInt(e.target.value) : "")}
              className="h-11 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
            >
              <option value="">Tất cả năm</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Industry Filter */}
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              className="h-11 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
            >
              <option value="">Tất cả ngành</option>
              {availableIndustries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chọn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dự án</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Năm</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Reach</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">CVR</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Xóa</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && portfolios.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredPortfolios.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterYear || filterIndustry
                          ? "Không tìm thấy dự án"
                          : "Chưa có portfolio nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPortfolios.map((portfolio) => (
                  <tr
                    key={portfolio.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === portfolio.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedPortfolio"
                        checked={selectedId === portfolio.id}
                        onChange={() => handleSelectRow(portfolio)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Project Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                          {portfolio.thumbnailUrl ? (
                            <img
                              src={portfolio.thumbnailUrl}
                              alt={portfolio.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">IMG</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">
                            {portfolio.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {portfolio.industry || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-800 dark:text-white/90">
                        {portfolio.clientName}
                      </span>
                    </td>

                    {/* Year */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {portfolio.year}
                      </span>
                    </td>

                    {/* Reach */}
                    <td className="px-4 py-4 text-right">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {formatNumber(portfolio.reach)}
                      </span>
                    </td>

                    {/* Revenue */}
                    <td className="px-4 py-4 text-right">
                      <span className="font-medium text-brand-600 dark:text-brand-400">
                        {formatNumber(portfolio.revenue)}
                      </span>
                    </td>

                    {/* CVR */}
                    <td className="px-4 py-4 text-center">
                      {portfolio.conversionRate > 0 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400">
                          {portfolio.conversionRate.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {portfolio.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span className="text-xs">Public</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-4 h-4" />
                          <span className="text-xs">Draft</span>
                        </span>
                      )}
                    </td>

                    {/* Delete */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(portfolio.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa portfolio"
                      >
                        <TrashBinIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredPortfolios.length} / {portfolios.length} dự án
          </p>
        </div>
      </div>
    </div>
  );
}