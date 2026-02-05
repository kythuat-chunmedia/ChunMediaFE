"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { Partner, PartnerFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { partnerApi } from "@/app/lib/api/endpoints/partner.api";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// ============ INITIAL FORM DATA ============
const initialFormData: PartnerFormData = {
  name: "",
  image: "",
  phone: "",
  email: "",
  address: "",
  isActive: true,
};

// ============ COMPONENT ============
export default function PartnerManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<PartnerFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await partnerApi.getAllNoPaging();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadPartners = async () => {
    try {
      const data = await partnerApi.getAllNoPaging();
      setPartners(data);
    } catch (error) {
      console.error("Error reloading partners:", error);
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
    } else if (type === "number") {
      newValue = parseInt(value) || 0;
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
      newErrors.name = "Vui lòng nhập tên đối tác";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Vui lòng chọn hình ảnh";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (partner: Partner) => {
    setSelectedId(partner.id);
    setIsEditing(true);
    setFormData({
      name: partner.name,
      image: partner.image,
      phone: partner.phone,
      email: partner.email,
      address: partner.address,
      isActive: partner.isActive,
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
        const existingPartner = partners.find((p) => p.id === selectedId);
        const partnerToUpdate: Partner = {
          id: selectedId,
          name: formData.name,
          image: formData.image,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          isActive: formData.isActive,
          createdAt: existingPartner?.createdAt || new Date().toISOString(),
        };
        await partnerApi.update(partnerToUpdate);
      } else {
        await partnerApi.create(formData);
      }

      await reloadPartners();
      handleReset();
    } catch (error) {
      console.error("Error saving partner:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete partner
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đối tác này?")) {
      try {
        setLoading(true);
        await partnerApi.delete(id);
        await reloadPartners();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
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

  // Filter partners by search
  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật đối tác" : "➕ Thêm đối tác mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.name}`
              : "Điền thông tin để thêm đối tác mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tên đối tác */}
            <div className="lg:col-span-2">
              <Label>
                Tên đối tác <span className="text-error-500">*</span>
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="Nhập tên đối tác"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                hint={errors.name || "Tên hiển thị của đối tác"}
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <Label>
                Số điện thoại <span className="text-error-500">*</span>
              </Label>
              <Input
                name="phone"
                type="text"
                placeholder="0901234567"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                hint={errors.phone || "Số điện thoại liên hệ"}
              />
            </div>

            {/* Email */}
            <div className="lg:col-span-2">
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="partner@example.com"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                hint={errors.email || "Email liên hệ"}
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
                  Hiển thị đối tác
                </span>
              </label>
            </div>

            {/* Địa chỉ */}
            <div className="lg:col-span-3">
              <Label>
                Địa chỉ <span className="text-error-500">*</span>
              </Label>
              <Input
                name="address"
                type="text"
                placeholder="Nhập địa chỉ đối tác"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                hint={errors.address || "Địa chỉ liên hệ của đối tác"}
              />
            </div>

            {/* Hình ảnh */}
            <div className="lg:col-span-3">
              <Label>
                Hình ảnh / Logo <span className="text-error-500">*</span>
              </Label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Validate
                      if (file.size > 5 * 1024 * 1024) {
                        alert("File quá lớn! Tối đa 5MB");
                        return;
                      }

                      try {
                        setUploading(true);

                        const response = await uploadApi.uploadImage(file, "partners");

                        if (response.success && response.url) {
                          setFormData((prev) => ({
                            ...prev,
                            image: response.url as string,
                          }));
                        } else {
                          alert(response.message || "Upload thất bại");
                        }
                      } catch (error) {
                        console.error("Upload error:", error);
                        alert("Không thể upload hình ảnh");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    disabled={uploading}
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${
                      errors.image ? "border border-error-500 rounded-lg" : ""
                    } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {uploading && (
                    <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>
                  )}
                  {errors.image && (
                    <p className="mt-1.5 text-xs text-error-500">{errors.image}</p>
                  )}
                  {!errors.image && !uploading && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      Chấp nhận: JPG, PNG, GIF, WEBP (Tối đa 5MB) - Khuyến nghị: 300x300px
                    </p>
                  )}
                </div>
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-white p-1"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
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
              🤝 Danh sách đối tác
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredPartners.length} đối tác
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm đối tác..."
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
                    Logo
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Tên đối tác
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Điện thoại
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Email
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Địa chỉ
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
              {loading && partners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy đối tác" : "Chưa có đối tác nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr
                    key={partner.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === partner.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedPartner"
                        checked={selectedId === partner.id}
                        onChange={() => handleSelectRow(partner)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Image/Logo */}
                    <td className="px-4 py-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden p-1">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">IMG</span>
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">
                        {partner.name}
                      </p>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {partner.phone}
                      </p>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <a
                        href={`mailto:${partner.email}`}
                        className="text-sm text-brand-500 hover:underline truncate max-w-[200px] block"
                      >
                        {partner.email}
                      </a>
                    </td>

                    {/* Address */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[250px]">
                        {partner.address}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {partner.isActive ? (
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
                        {formatDate(partner.createdAt)}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(partner.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa đối tác"
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
            Hiển thị {filteredPartners.length} đối tác
          </p>
        </div>
      </div>
    </div>
  );
}