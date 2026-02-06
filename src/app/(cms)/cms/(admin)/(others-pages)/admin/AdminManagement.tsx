"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { AdminInfo, AdminFormData, AdminCreateData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { adminManagementApi } from "@/app/lib/api/index";
import { useAdminProfile } from '@/app/contexts/AdminProfileContext';


// ============ CONSTANTS ============
const ROLES = [
  { value: 'Content', label: 'Content' },
  { value: 'Admin', label: 'Admin' },
  { value: 'SuperAdmin', label: 'Super Admin' },
] as const;

// ============ INITIAL FORM DATA ============
const initialFormData: AdminFormData & { password: string } = {
  username: "",
  email: "",
  password: "",
  fullName: "",
  role: "Content",
  isActive: true,
};

// ============ COMPONENT ============
export default function AdminManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AdminFormData & { password: string }>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [admins, setAdmins] = useState<AdminInfo[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const { profile } = useAdminProfile();




  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await adminManagementApi.getAllNoPaging();
      // const data = await adminManagementApi.getByRole("Admin");

      console.log(profile);
      // const data = await adminManagementApi.getByRole(profile?.role);


      setAdmins(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadAdmins = async () => {
    try {
      const data = await adminManagementApi.getAllNoPaging();
      setAdmins(data);
    } catch (error) {
      console.error("Error reloading admins:", error);
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

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Password (chỉ bắt buộc khi tạo mới)
    if (!isEditing) {
      if (!formData.password.trim()) {
        newErrors.password = "Vui lòng nhập mật khẩu";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }
    }

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    // Role
    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select row to edit
  const handleSelectRow = (admin: AdminInfo) => {
    setSelectedId(admin.id);
    setIsEditing(true);
    setFormData({
      username: admin.username,
      email: admin.email,
      password: "", // Không hiển thị password cũ
      fullName: admin.fullName,
      role: admin.role,
      isActive: admin.isActive,
    });
    setErrors({});
    setShowPassword(false);

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
    setShowPassword(false);
  };

  // Submit form (Add/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      if (isEditing && selectedId) {
        // Update admin (không gửi password nếu rỗng)
        const updateData: AdminFormData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role,
          isActive: formData.isActive,
        };


        // Nếu có nhập password mới thì đổi password
        // if (formData.password.trim()) {
        //   await adminManagementApi.changePassword(selectedId, formData.password);
        // }else { 
          await adminManagementApi.update(selectedId, updateData);
        // }
      } else {
        // Create admin
        const createData: AdminCreateData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role,
          isActive: formData.isActive,
        };
        await adminManagementApi.create(createData);
      }

      await reloadAdmins();
      handleReset();
    } catch (error) {
      console.error("Error saving admin:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const handleDelete = async (id: number) => {
    // Không cho xóa chính mình (cần check với current user)
    if (window.confirm("Bạn có chắc chắn muốn xóa admin này?")) {
      try {
        setLoading(true);
        await adminManagementApi.delete(id);
        await reloadAdmins();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle status
  const handleToggleStatus = async (id: number) => {
    try {
      setLoading(true);
      await adminManagementApi.toggleStatus(id);
      await reloadAdmins();
    } catch (error) {
      console.error("Error toggling status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Chưa đăng nhập";
    return new Date(dateString).toLocaleString("vi-VN");
  };

  // Get role badge color
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "SuperAdmin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400";
      case "Admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Filter admins by search
  const filteredAdmins = admins.filter(
    (a) =>
      a.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Form Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật Admin" : "➕ Thêm Admin mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.fullName} (@${formData.username})`
              : "Điền thông tin để thêm admin mới"}
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Username */}
            <div>
              <Label>
                Tên đăng nhập <span className="text-error-500">*</span>
              </Label>
              <Input
                name="username"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                hint={errors.username || "Chỉ chứa chữ, số và dấu _"}
                disabled={isEditing} // Không cho sửa username
              />
            </div>

            {/* Email */}
            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                hint={errors.email || "Email đăng nhập"}
              />
            </div>

            {/* Password */}
            <div>
              <Label>
                Mật khẩu {!isEditing && <span className="text-error-500">*</span>}
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isEditing ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  hint={errors.password || (isEditing ? "Để trống nếu không muốn đổi mật khẩu" : "Tối thiểu 6 ký tự")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <Label>
                Họ và tên <span className="text-error-500">*</span>
              </Label>
              <Input
                name="fullName"
                type="text"
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                hint={errors.fullName || "Tên hiển thị"}
              />
            </div>

            {/* Role */}
            <div>
              <Label>
                Vai trò <span className="text-error-500">*</span>
              </Label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${
                  errors.role
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              >
                {ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1.5 text-xs text-error-500">{errors.role}</p>
              )}
              {!errors.role && (
                <p className="mt-1.5 text-xs text-gray-500">Phân quyền cho admin</p>
              )}
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
                  Kích hoạt tài khoản
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
              👥 Danh sách Admin
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredAdmins.length} admin
            </p>
          </div>

          {/* Search */}
          <div className="w-72">
            <Input
              type="text"
              placeholder="🔍 Tìm kiếm admin..."
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
                    Admin
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Email
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Vai trò
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Đăng nhập lần cuối
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
              {loading && admins.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">👤</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy admin" : "Chưa có admin nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr
                    key={admin.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === admin.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedAdmin"
                        checked={selectedId === admin.id}
                        onChange={() => handleSelectRow(admin)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* Admin Info */}
                    <td className="px-4 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {admin.fullName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          @{admin.username}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {admin.email}
                      </span>
                    </td>

                    {/* Role */}
                    {/* <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(
                          admin.role
                        )}`}
                      >
                        {admin.role === "SuperAdmin" ? "👑 Super Admin" : "🔐 Admin"}
                      </span>
                    </td> */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(
                          admin.role
                        )}`}
                      >
                        {admin.role === "SuperAdmin" && "👑 Super Admin"}
                        {admin.role === "Admin" && "🔐 Admin"}
                        {admin.role === "Content" && "📝 Content"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(admin.id)}
                        disabled={loading}
                        className="inline-flex items-center gap-1 disabled:opacity-50"
                        title="Click để đổi trạng thái"
                      >
                        {admin.isActive ? (
                          <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                            <CheckCircleIcon className="w-6 h-6" />
                            <span className="text-xs">Hoạt động</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400">
                            <XIcon className="w-6 h-6" />
                            <span className="text-xs">Vô hiệu</span>
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Last Login */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(admin.lastLoginAt)}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(admin.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa admin"
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
            Hiển thị {filteredAdmins.length} admin
          </p>
        </div>
      </div>
    </div>
  );
}