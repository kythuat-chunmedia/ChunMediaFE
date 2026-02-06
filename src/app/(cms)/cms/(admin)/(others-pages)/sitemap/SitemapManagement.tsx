"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import {
  SitemapEntry,
  SitemapEntryFormData,
  SitemapSyncResult,
  CHANGE_FREQUENCY_OPTIONS,
  PAGE_TYPE_OPTIONS,
  PRIORITY_PRESETS,
} from "@/app/types";
import {
  PlusIcon,
  PencilIcon,
  TrashBinIcon,
  CheckCircleIcon,
  XIcon,
  RefreshCcwIcon,
  GlobeIcon,
  FileTextIcon,
  LinkIcon,
} from "../../../icons";
import { sitemapApi } from "@/app/lib/api/index";

// ============ INITIAL FORM DATA ============
const initialFormData: SitemapEntryFormData = {
  url: "",
  pageType: "custom",
  menuId: null,
  newsId: null,
  lastModified: null,
  changeFrequency: "weekly",
  priority: 0.5,
  isActive: true,
  sortOrder: 0,
  note: "",
};

// ============ COMPONENT ============
export default function SitemapManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [formData, setFormData] = useState<SitemapEntryFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [entries, setEntries] = useState<SitemapEntry[]>([]);
  const [filterPageType, setFilterPageType] = useState<string>("");

  // Toast message
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await sitemapApi.getAll();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching sitemap entries:", error);
      showToast("error", "Không thể tải danh sách sitemap");
    } finally {
      setLoading(false);
    }
  };

  const reloadEntries = async () => {
    try {
      const data = await sitemapApi.getAll();
      setEntries(data);
    } catch (error) {
      console.error("Error reloading sitemap entries:", error);
    }
  };

  // Show toast
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };
  //#endregion

  //#region SYNC FUNCTIONS
  const handleSyncMenus = async () => {
    try {
      setSyncing(true);
      const result: SitemapSyncResult = await sitemapApi.syncFromMenus();
      showToast("success", result.message || `Đã thêm ${result.added} URL từ Menu`);
      await reloadEntries();
    } catch (error) {
      console.error("Error syncing from menus:", error);
      showToast("error", "Không thể đồng bộ từ Menu");
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncNews = async () => {
    try {
      setSyncing(true);
      const result: SitemapSyncResult = await sitemapApi.syncFromNews();
      showToast("success", result.message || `Đã thêm ${result.added} URL từ News`);
      await reloadEntries();
    } catch (error) {
      console.error("Error syncing from news:", error);
      showToast("error", "Không thể đồng bộ từ News");
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncAll = async () => {
    try {
      setSyncing(true);
      const result: SitemapSyncResult = await sitemapApi.syncAll();
      showToast("success", result.message || `Đã thêm ${result.added} URL`);
      await reloadEntries();
    } catch (error) {
      console.error("Error syncing all:", error);
      showToast("error", "Không thể đồng bộ");
    } finally {
      setSyncing(false);
    }
  };
  //#endregion

  //#region FUNCTION HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean | null = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.url.trim()) {
      newErrors.url = "Vui lòng nhập URL";
    } else if (!formData.url.startsWith("/") && !formData.url.startsWith("http")) {
      newErrors.url = "URL phải bắt đầu bằng / hoặc http";
    }

    if (!formData.pageType) {
      newErrors.pageType = "Vui lòng chọn loại trang";
    }

    if (formData.priority < 0 || formData.priority > 1) {
      newErrors.priority = "Priority phải từ 0.0 đến 1.0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (entry: SitemapEntry) => {
    setSelectedId(entry.id);
    setIsEditing(true);
    setFormData({
      url: entry.url,
      pageType: entry.pageType,
      menuId: entry.menuId,
      newsId: entry.newsId,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      isActive: entry.isActive,
      sortOrder: entry.sortOrder,
      note: entry.note || "",
    });
    setErrors({});

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
  };

  // Submit form (Add/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      if (isEditing && selectedId) {
        const entryToUpdate: SitemapEntry = {
          id: selectedId,
          url: formData.url,
          pageType: formData.pageType,
          menuId: formData.menuId || null,
          newsId: formData.newsId || null,
          lastModified: formData.lastModified || null,
          changeFrequency: formData.changeFrequency,
          priority: formData.priority,
          isActive: formData.isActive,
          sortOrder: formData.sortOrder,
          note: formData.note || null,
          createdAt: entries.find((e) => e.id === selectedId)?.createdAt || new Date().toISOString(),
          updatedAt: null,
          menuTitle: null,
          newsTitle: null,
        };
        await sitemapApi.update(entryToUpdate);
        showToast("success", "Cập nhật thành công!");
      } else {
        await sitemapApi.create(formData);
        showToast("success", "Thêm mới thành công!");
      }

      await reloadEntries();
      handleReset();
    } catch (error: any) {
      console.error("Error saving sitemap entry:", error);
      showToast("error", error?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  // Delete entry
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa URL này khỏi sitemap?")) {
      try {
        setLoading(true);
        await sitemapApi.delete(id);
        showToast("success", "Đã xóa thành công!");
        await reloadEntries();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting sitemap entry:", error);
        showToast("error", "Không thể xóa");
      } finally {
        setLoading(false);
      }
    }
  };

  // Get page type icon
  const getPageTypeIcon = (pageType: string) => {
    switch (pageType) {
      case "page":
        return <FileTextIcon className="w-4 h-4" />;
      case "news":
        return <FileTextIcon className="w-4 h-4" />;
      case "custom":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <GlobeIcon className="w-4 h-4" />;
    }
  };

  // Get page type label
  const getPageTypeLabel = (pageType: string) => {
    return PAGE_TYPE_OPTIONS.find((opt) => opt.value === pageType)?.label || pageType;
  };

  // Get priority color
  const getPriorityColor = (priority: number) => {
    if (priority >= 0.8) return "text-success-600 dark:text-success-400";
    if (priority >= 0.5) return "text-warning-600 dark:text-warning-400";
    return "text-gray-500 dark:text-gray-400";
  };

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.menuTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.newsTitle?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = !filterPageType || entry.pageType === filterPageType;

    return matchesSearch && matchesType;
  });
  //#endregion

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
            toast.type === "success"
              ? "bg-success-500 text-white"
              : "bg-error-500 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircleIcon className="w-6 h-6" />
          ) : (
            <XIcon className="w-6 h-6" />
          )}
          {toast.message}
        </div>
      )}

      {/* ============ SYNC SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            🔄 Đồng bộ Sitemap
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tự động thêm URL từ Menu và Bài viết vào sitemap
          </p>
        </div>

        <div className="p-5 flex flex-wrap gap-3">
          <button
            onClick={handleSyncMenus}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcwIcon className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            Sync từ Menu
          </button>

          <button
            onClick={handleSyncNews}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcwIcon className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            Sync từ News
          </button>

          <button
            onClick={handleSyncAll}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcwIcon className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            Sync Tất Cả
          </button>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <GlobeIcon className="w-4 h-4" />
            Xem sitemap.xml
          </a>
        </div>
      </div>

      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật URL" : "➕ Thêm URL mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.url}`
              : "Thêm URL tùy chỉnh vào sitemap (landing page, campaign...)"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* URL */}
            <div className="lg:col-span-2">
              <Label>
                URL <span className="text-error-500">*</span>
              </Label>
              <Input
                name="url"
                type="text"
                placeholder="/landing-page hoặc https://..."
                value={formData.url}
                onChange={handleChange}
                error={!!errors.url}
                hint={errors.url || "VD: /dich-vu, /khuyen-mai-tet"}
              />
            </div>

            {/* Page Type */}
            <div>
              <Label>
                Loại trang <span className="text-error-500">*</span>
              </Label>
              <select
                name="pageType"
                value={formData.pageType}
                onChange={handleChange}
                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${
                  errors.pageType
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              >
                {PAGE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.pageType && (
                <p className="mt-1.5 text-xs text-error-500">{errors.pageType}</p>
              )}
            </div>

            {/* Change Frequency */}
            <div>
              <Label>Tần suất thay đổi</Label>
              <select
                name="changeFrequency"
                value={formData.changeFrequency}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 bg-transparent cursor-pointer"
              >
                {CHANGE_FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-gray-500">Tần suất Google crawl</p>
            </div>

            {/* Priority */}
            <div>
              <Label>
                Độ ưu tiên <span className="text-error-500">*</span>
              </Label>
              <select
                name="priority"
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, priority: parseFloat(e.target.value) }))
                }
                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${
                  errors.priority
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              >
                {PRIORITY_PRESETS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="mt-1.5 text-xs text-error-500">{errors.priority}</p>
              )}
              {!errors.priority && (
                <p className="mt-1.5 text-xs text-gray-500">0.0 (thấp) → 1.0 (cao)</p>
              )}
            </div>

            {/* Sort Order */}
            <div>
              <Label>Thứ tự</Label>
              <Input
                name="sortOrder"
                type="number"
                placeholder="0"
                min="0"
                value={formData.sortOrder}
                onChange={handleChange}
                hint="Số nhỏ hiển thị trước"
              />
            </div>

            {/* Last Modified */}
            <div>
              <Label>Ngày cập nhật</Label>
              <Input
                name="lastModified"
                type="date"
                value={formData.lastModified?.split("T")[0] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastModified: e.target.value ? new Date(e.target.value).toISOString() : null,
                  }))
                }
                hint="lastmod trong sitemap.xml"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hiển thị trong sitemap
                </span>
              </label>
            </div>

            {/* Note */}
            <div className="lg:col-span-4">
              <Label>Ghi chú</Label>
              <textarea
                name="note"
                rows={2}
                placeholder="Ghi chú cho admin (không hiển thị trong sitemap.xml)..."
                value={formData.note || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                VD: Landing page Tết 2025, Campaign Black Friday...
              </p>
            </div>
          </div>

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
              🗺️ Danh sách URL trong Sitemap
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredEntries.length} URL
              {filteredEntries.filter((e) => e.isActive).length < filteredEntries.length && (
                <span className="ml-2">
                  ({filteredEntries.filter((e) => e.isActive).length} active)
                </span>
              )}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Filter by type */}
            <select
              value={filterPageType}
              onChange={(e) => setFilterPageType(e.target.value)}
              className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 bg-transparent cursor-pointer"
            >
              <option value="">Tất cả loại</option>
              {PAGE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="w-64">
              <Input
                type="text"
                placeholder="🔍 Tìm URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Chọn
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    URL
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Loại
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Priority
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Freq
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Active
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Last Modified
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Xóa
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && entries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🗺️</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterPageType
                          ? "Không tìm thấy URL"
                          : "Chưa có URL nào trong sitemap"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Nhấn "Sync Tất Cả" để thêm tự động từ Menu và News
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === entry.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    } ${!entry.isActive ? "opacity-50" : ""}`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedEntry"
                        checked={selectedId === entry.id}
                        onChange={() => handleSelectRow(entry)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* URL */}
                    <td className="px-4 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[300px]">
                          {entry.url}
                        </p>
                        {(entry.menuTitle || entry.newsTitle || entry.note) && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                            {entry.menuTitle || entry.newsTitle || entry.note}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Page Type */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {getPageTypeIcon(entry.pageType)}
                        {getPageTypeLabel(entry.pageType)}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-4 text-center">
                      <span className={`font-medium ${getPriorityColor(entry.priority)}`}>
                        {entry.priority.toFixed(1)}
                      </span>
                    </td>

                    {/* Change Frequency */}
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.changeFrequency}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {entry.isActive ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-6 h-6" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-6 h-6" />
                        </span>
                      )}
                    </td>

                    {/* Last Modified */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.lastModified
                          ? new Date(entry.lastModified).toLocaleDateString("vi-VN")
                          : "-"}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa URL"
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
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredEntries.length} URL
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success-500"></span>
              Active
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              Inactive
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}