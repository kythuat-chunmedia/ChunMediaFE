"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { MemberTeam, MemberTeamFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { memberTeamApi } from "@/app/lib/api/endpoints/memberTeam.api";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// ============ INITIAL FORM DATA ============
const initialFormData: MemberTeamFormData = {
  image: "",
  name: "",
  description: "",
  role: "",
};

// ============ COMPONENT ============
export default function MemberTeamManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<MemberTeamFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [members, setMembers] = useState<MemberTeam[]>([]);

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await memberTeamApi.getAllNoPaging();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadMembers = async () => {
    try {
      const data = await memberTeamApi.getAllNoPaging();
      setMembers(data);
    } catch (error) {
      console.error("Error reloading members:", error);
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
      newErrors.name = "Vui lòng nhập tên thành viên";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Vui lòng chọn hình ảnh";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Vui lòng nhập vai trò / chức vụ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (member: MemberTeam) => {
    setSelectedId(member.id);
    setIsEditing(true);
    setFormData({
      image: member.image,
      name: member.name,
      description: member.description || "",
      role: member.role,
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
        const existingMember = members.find((m) => m.id === selectedId);
        const memberToUpdate: MemberTeam = {
          id: selectedId,
          image: formData.image,
          name: formData.name,
          description: formData.description || null,
          role: formData.role,
          createdAt: existingMember?.createdAt || new Date().toISOString(),
        };
        await memberTeamApi.update(memberToUpdate);
      } else {
        await memberTeamApi.create(formData);
      }

      await reloadMembers();
      handleReset();
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete member
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thành viên này?")) {
      try {
        setLoading(true);
        await memberTeamApi.delete(id);
        await reloadMembers();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting member:", error);
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

  // Filter members by search
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật thành viên" : "➕ Thêm thành viên mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.name}`
              : "Điền thông tin để thêm thành viên mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tên thành viên */}
            <div>
              <Label>
                Tên thành viên <span className="text-error-500">*</span>
              </Label>
              <Input
                name="name"
                type="text"
                placeholder="Nhập tên thành viên"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                hint={errors.name || "Họ và tên thành viên"}
              />
            </div>

            {/* Vai trò / Chức vụ */}
            <div>
              <Label>
                Vai trò / Chức vụ <span className="text-error-500">*</span>
              </Label>
              <Input
                name="role"
                type="text"
                placeholder="VD: Giám đốc, Trưởng phòng, Developer..."
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                hint={errors.role || "Chức vụ hoặc vai trò trong team"}
              />
            </div>

            {/* Mô tả */}
            <div className="md:col-span-2">
              <Label>Mô tả</Label>
              <textarea
                name="description"
                placeholder="Mô tả ngắn về thành viên (tùy chọn)"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Giới thiệu ngắn gọn về thành viên
              </p>
            </div>

            {/* Hình ảnh */}
            <div className="md:col-span-2">
              <Label>
                Ảnh đại diện <span className="text-error-500">*</span>
              </Label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (file.size > 5 * 1024 * 1024) {
                        alert("File quá lớn! Tối đa 5MB");
                        return;
                      }

                      try {
                        setUploading(true);

                        const response = await uploadApi.uploadImage(file, "member-teams");

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
                      Chấp nhận: JPG, PNG, GIF, WEBP (Tối đa 5MB) - Khuyến nghị: 400x400px
                    </p>
                  )}
                </div>
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full border border-gray-200 dark:border-gray-700"
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
              👥 Danh sách thành viên
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredMembers.length} thành viên
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm thành viên..."
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
                    Ảnh
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Tên thành viên
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Vai trò
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Mô tả
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
              {loading && members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm
                          ? "Không tìm thấy thành viên"
                          : "Chưa có thành viên nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === member.id
                        ? "bg-brand-50 dark:bg-brand-500/10"
                        : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedMember"
                        checked={selectedId === member.id}
                        onChange={() => handleSelectRow(member)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Image */}
                    <td className="px-4 py-4">
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">IMG</span>
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {member.name}
                      </p>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                        {member.role}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[300px]">
                        {member.description || "—"}
                      </p>
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(member.createdAt)}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa thành viên"
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
            Hiển thị {filteredMembers.length} thành viên
          </p>
        </div>
      </div>
    </div>
  );
}