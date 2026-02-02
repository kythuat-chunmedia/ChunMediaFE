"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/(cms)/cms/components/form/Label";
import Input from "@/app/(cms)/cms/components/form/input/InputField";
import { CategoryProduct, CategoryProductFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { categoryProductApi } from "@/app/lib/api/index";

// ============ INITIAL FORM DATA ============
const initialFormData: CategoryProductFormData = {
  name: "",
  description: "",
  isActive: true,
};

// ============ COMPONENT ============
export default function CategoryProductManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CategoryProductFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [categories, setCategories] = useState<CategoryProduct[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await categoryProductApi.getAllNoPaging();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadCategories = async () => {
    try {
      const data = await categoryProductApi.getAllNoPaging();
      setCategories(data);
    } catch (error) {
      console.error("Error reloading categories:", error);
    }
  };
  //#endregion

  //#region FUNCTION HANDLE CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
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
      newErrors.name = "Vui lòng nhập tên danh mục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (category: CategoryProduct) => {
    setSelectedId(category.id);
    setIsEditing(true);
    setFormData({
      name: category.name,
      description: category.description || "",
      isActive: category.isActive,
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
        // Tạo full CategoryProduct object để update
        const categoryToUpdate: CategoryProduct = {
          id: selectedId,
          ...formData,
          description: formData.description || null,
          createdAt: categories.find((c) => c.id === selectedId)?.createdAt || new Date().toISOString(),
        };
        await categoryProductApi.update(categoryToUpdate);
      } else {
        await categoryProductApi.create(formData);
      }

      await reloadCategories();
      handleReset();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        setLoading(true);
        await categoryProductApi.delete(id);
        await reloadCategories();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter categories by search
  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật danh mục" : "➕ Thêm danh mục mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.name}`
              : "Điền thông tin để thêm danh mục sản phẩm mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tên danh mục */}
            <div>
              <Label>
                Tên danh mục <span className="text-error-500">*</span>
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="Nhập tên danh mục"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                hint={errors.name || "Tên hiển thị của danh mục"}
              />
            </div>

            {/* Trạng thái */}
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
                  Hiển thị danh mục
                </span>
              </label>
            </div>

            {/* Mô tả */}
            <div className="md:col-span-2">
              <Label>Mô tả</Label>
              <textarea
                name="description"
                rows={3}
                placeholder="Nhập mô tả cho danh mục..."
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Mô tả ngắn gọn về danh mục (không bắt buộc)
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
              📂 Danh sách danh mục sản phẩm
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredCategories.length} danh mục
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm danh mục..."
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
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Chọn
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Tên danh mục
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Mô tả
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
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
              {loading && categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy danh mục" : "Chưa có danh mục nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === category.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedCategory"
                        checked={selectedId === category.id}
                        onChange={() => handleSelectRow(category)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {category.name}
                      </p>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[300px]">
                        {category.description || "-"}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {category.isActive ? (
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span className="text-xs">Hiện</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XIcon className="w-4 h-4" />
                          <span className="text-xs">Ẩn</span>
                        </span>
                      )}
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(category.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(category.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa danh mục"
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
            Hiển thị {filteredCategories.length} danh mục
          </p>
        </div>
      </div>
    </div>
  );
}