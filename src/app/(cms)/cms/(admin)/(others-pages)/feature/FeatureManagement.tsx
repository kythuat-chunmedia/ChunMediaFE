"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { Feature, FeatureFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { featureApi } from "@/app/lib/api/endpoints/feature.api";

// ============ INITIAL FORM DATA ============
const initialFormData: FeatureFormData = {
  name: "",
  code: "",
  description: "",
  icon: "",
  category: "",
  isActive: true,
  sortOrder: 0,
  basePrice: null,
};

const CATEGORIES = ["Core", "Ecommerce", "Content", "Marketing", "Advanced"];

// ============ COMPONENT ============
export default function FeatureManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FeatureFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await featureApi.getAllNoPaging();
      setFeatures(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadFeatures = async () => {
    try {
      const data = await featureApi.getAllNoPaging();
      setFeatures(data);
    } catch (error) {
      console.error("Error reloading features:", error);
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
      newValue = value === "" ? null : parseInt(value) || 0;
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

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên tính năng";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Vui lòng nhập mã code";
    } else if (!/^[a-z_]+$/.test(formData.code)) {
      newErrors.code = "Mã code chỉ gồm chữ thường và dấu _";
    }

    if (formData.sortOrder < 0) {
      newErrors.sortOrder = "Thứ tự phải >= 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (feature: Feature) => {
    setSelectedId(feature.id);
    setIsEditing(true);
    setFormData({
      name: feature.name,
      code: feature.code,
      description: feature.description || "",
      icon: feature.icon || "",
      category: feature.category || "",
      isActive: feature.isActive,
      sortOrder: feature.sortOrder,
      basePrice: feature.basePrice,
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
      console.log("Form Data to submit:", formData);

      if (isEditing && selectedId) {
        const existingFeature = features.find((f) => f.id === selectedId);
        // Tạo full Feature object để update
        const featureToUpdate: Feature = {
          id: selectedId,
          name: formData.name,
          code: formData.code,
          value: formData.name, // Assuming 'value' is same as 'name' for display purposes
          description: formData.description || null,
          icon: formData.icon || null,
          category: formData.category || null,
          isActive: formData.isActive,
          sortOrder: formData.sortOrder,
          basePrice: formData.basePrice,
          createdAt: existingFeature?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await featureApi.update(featureToUpdate);
      } else {
        await featureApi.create(formData as unknown as Partial<Feature>);
      }

      await reloadFeatures();
      handleReset();
    } catch (error) {
      console.error("Error saving feature:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete feature
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tính năng này?")) {
      try {
        setLoading(true);
        await featureApi.delete(id);
        await reloadFeatures();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting feature:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Format price
  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "—";
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  // Filter + sort
  const filteredFeatures = features
    .filter(
      (f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật tính năng" : "➕ Thêm tính năng mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.name}`
              : "Điền thông tin để thêm tính năng mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tên */}
            <div>
              <Label>
                Tên tính năng <span className="text-error-500">*</span>
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="VD: Form liên hệ"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                hint={errors.name || "Tên hiển thị của tính năng"}
              />
            </div>

            {/* Code */}
            <div>
              <Label>
                Mã code <span className="text-error-500">*</span>
              </Label>
              <Input
                name="code"
                type="text"
                placeholder="VD: contact_form"
                value={formData.code}
                onChange={handleChange}
                error={!!errors.code}
                hint={errors.code || "Chữ thường + dấu gạch dưới"}
              />
            </div>

            {/* Icon */}
            <div>
              <Label>Icon (Emoji)</Label>
              <Input
                name="icon"
                type="text"
                placeholder="📝"
                value={formData.icon}
                onChange={handleChange}
                hint="Emoji hoặc icon code"
              />
            </div>

            {/* Category */}
            <div>
              <Label>Nhóm</Label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="">— Chọn nhóm —</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <Label>Thứ tự hiển thị</Label>
              <Input
                name="sortOrder"
                type="number"
                placeholder="0"
                min="0"
                value={formData.sortOrder}
                onChange={handleChange}
                error={!!errors.sortOrder}
                hint={errors.sortOrder || "Số nhỏ hiển thị trước"}
              />
            </div>

            {/* Base Price */}
            <div>
              <Label>Giá cơ bản (VNĐ)</Label>
              <Input
                name="basePrice"
                type="number"
                placeholder="0"
                min="0"
                value={formData.basePrice ?? ""}
                onChange={handleChange}
                hint="Giá tham khảo cho tính năng"
              />
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <Label>Mô tả</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả chi tiết tính năng..."
                rows={2}
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            {/* Active */}
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
                  Hiển thị tính năng
                </span>
              </label>
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
              Danh sách tính năng
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredFeatures.length} tính năng
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="Tìm kiếm tính năng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Chọn</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Icon</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tên</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Mã code</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Nhóm</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Giá</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Thứ tự</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Trạng thái</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ngày tạo</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Xóa</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && features.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredFeatures.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy tính năng" : "Chưa có tính năng nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredFeatures.map((feature) => (
                  <tr
                    key={feature.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === feature.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedFeature"
                        checked={selectedId === feature.id}
                        onChange={() => handleSelectRow(feature)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Icon */}
                    <td className="px-4 py-4">
                      <span className="text-xl">{feature.icon || "—"}</span>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90">{feature.name}</p>
                      {feature.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[200px]">
                          {feature.description}
                        </p>
                      )}
                    </td>

                    {/* Code */}
                    <td className="px-4 py-4">
                      <code className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {feature.code}
                      </code>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      {feature.category ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-500/10 text-xs text-brand-700 dark:text-brand-400">
                          {feature.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {formatPrice(feature.basePrice)}
                      </span>
                    </td>

                    {/* Sort Order */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 text-sm font-medium dark:bg-gray-800 dark:text-gray-300">
                        {feature.sortOrder}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {feature.isActive ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-6 h-6" />
                          <span className="text-xs">Hiện</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-6 h-6" />
                          <span className="text-xs">Ẩn</span>
                        </span>
                      )}
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(feature.createdAt)}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(feature.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa tính năng"
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
            Hiển thị {filteredFeatures.length} tính năng
          </p>
        </div>
      </div>
    </div>
  );
}