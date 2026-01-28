// "use client";

// import React, { useState, useEffect } from "react";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import { User, UserFormData } from "@/app/types";
// import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
// import { userManagementApi } from "@/app/lib/api/index";
// import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// // ============ INITIAL FORM DATA ============
// const initialFormData: UserFormData = {
//   username: "",
//   email: "",
//   password: "",
//   fullName: "",
//   phoneNumber: "",
//   avatar: "",
//   role: "User",
//   isActive: true,
//   isEmailVerified: false,
// };

// // ============ COMPONENT ============
// export default function UserManagement() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<UserFormData>(initialFormData);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [users, setUsers] = useState<User[]>([]);

//   // Filter states
//   const [filterRole, setFilterRole] = useState<string>("");
//   const [filterStatus, setFilterStatus] = useState<string>("");

//   //#region API CALLS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const usersData = await userManagementApi.getAllNoPaging();
//       setUsers(usersData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reloadUsers = async () => {
//     try {
//       const data = await userManagementApi.getAllNoPaging();
//       setUsers(data);
//     } catch (error) {
//       console.error("Error reloading users:", error);
//     }
//   };
//   //#endregion

//   //#region FUNCTION HANDLE CHANGE
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     let newValue: string | number | boolean = value;

//     if (type === "checkbox") {
//       newValue = (e.target as HTMLInputElement).checked;
//     } else if (type === "number") {
//       newValue = parseFloat(value) || 0;
//     }

//     setFormData((prev) => ({ ...prev, [name]: newValue }));

//     // Clear error
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   // Validate form
//   const validate = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.username.trim()) {
//       newErrors.username = "Vui lòng nhập tên đăng nhập";
//     } else if (formData.username.length < 3) {
//       newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
//     } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
//       newErrors.username = "Tên đăng nhập chỉ chứa chữ cái, số và dấu gạch dưới";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Vui lòng nhập email";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Email không hợp lệ";
//     }

//     // Password required khi tạo mới
//     if (!isEditing && !formData.password?.trim()) {
//       newErrors.password = "Vui lòng nhập mật khẩu";
//     } else if (formData.password && formData.password.length < 6) {
//       newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
//     }

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Vui lòng nhập họ tên";
//     }

//     if (formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Số điện thoại không hợp lệ (10-11 số)";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Select row to edit
//   const handleSelectRow = (user: User) => {
//     setSelectedId(user.id);
//     setIsEditing(true);
//     setFormData({
//       username: user.username,
//       email: user.email,
//       password: "", // Không hiển thị password khi edit
//       fullName: user.fullName,
//       phoneNumber: user.phoneNumber || "",
//       avatar: user.avatar || "",
//       role: user.role,
//       isActive: user.isActive,
//       isEmailVerified: user.isEmailVerified,
//     });
//     setErrors({});

//     // Scroll to form
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Reset form
//   const handleReset = () => {
//     setSelectedId(null);
//     setIsEditing(false);
//     setFormData(initialFormData);
//     setErrors({});
//   };

//   // Submit form (Add/Update)
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       console.log("Form Data to submit:", formData);

//       if (isEditing && selectedId) {
//         const existingUser = users.find((u) => u.id === selectedId);
//         // Tạo full User object để update
//         const userToUpdate: User = {
//           id: selectedId,
//           username: formData.username,
//           email: formData.email,
//           passwordHash: existingUser?.passwordHash || "", // Giữ nguyên password hash
//           fullName: formData.fullName,
//           phoneNumber: formData.phoneNumber || null,
//           avatar: formData.avatar || null,
//           role: formData.role,
//           isActive: formData.isActive,
//           isEmailVerified: formData.isEmailVerified,
//           createdAt: existingUser?.createdAt || new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           lastLoginAt: existingUser?.lastLoginAt || null,
//           refreshToken: existingUser?.refreshToken || null,
//           refreshTokenExpiry: existingUser?.refreshTokenExpiry || null,
//         };
//         await userManagementApi.update(userToUpdate);
//       } else {
//         await userManagementApi.create(formData);
//       }

//       await reloadUsers();
//       handleReset();
//     } catch (error) {
//       console.error("Error saving user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete user
//   const handleDelete = async (id: number) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
//       try {
//         setLoading(true);
//         await userManagementApi.delete(id);
//         await reloadUsers();

//         if (selectedId === id) {
//           handleReset();
//         }
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Format date
//   const formatDate = (dateString: string | null | undefined) => {
//     if (!dateString) return "—";
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get role badge color
//   const getRoleBadgeClass = (role: string) => {
//     switch (role) {
//       case "Premium":
//         return "bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
//     }
//   };

//   // Filter users
//   const filteredUsers = users.filter((u) => {
//     const matchSearch =
//       u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.fullName.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchRole = filterRole === "" || u.role === filterRole;
//     const matchStatus =
//       filterStatus === "" ||
//       (filterStatus === "active" && u.isActive) ||
//       (filterStatus === "inactive" && !u.isActive);

//     return matchSearch && matchRole && matchStatus;
//   });
//   //#endregion

//   return (
//     <div className="space-y-6">
//       {/* ============ FORM SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         {/* Form Header */}
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             {isEditing ? "✏️ Cập nhật người dùng" : "➕ Thêm người dùng mới"}
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {isEditing
//               ? `Đang chỉnh sửa: ${formData.fullName} (@${formData.username})`
//               : "Điền thông tin để thêm người dùng mới"}
//           </p>
//         </div>

//         {/* Form Content */}
//         <form onSubmit={handleSubmit} className="p-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {/* Username */}
//             <div>
//               <Label>
//                 Tên đăng nhập <span className="text-error-500">*</span>
//               </Label>
//               <Input
//                 name="username"
//                 type="text"
//                 placeholder="vd: john_doe"
//                 value={formData.username}
//                 onChange={handleChange}
//                 error={!!errors.username}
//                 hint={errors.username || "Chỉ chứa chữ cái, số và dấu _"}
//                 disabled={isEditing} // Không cho sửa username
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <Label>
//                 Email <span className="text-error-500">*</span>
//               </Label>
//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="vd: john@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 hint={errors.email || "Email đăng nhập"}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <Label>
//                 Mật khẩu {!isEditing && <span className="text-error-500">*</span>}
//               </Label>
//               <Input
//                 name="password"
//                 type="password"
//                 placeholder={isEditing ? "Để trống nếu không đổi" : "Nhập mật khẩu"}
//                 value={formData.password || ""}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 hint={errors.password || (isEditing ? "Để trống nếu không thay đổi" : "Tối thiểu 6 ký tự")}
//               />
//             </div>

//             {/* Full Name */}
//             <div>
//               <Label>
//                 Họ và tên <span className="text-error-500">*</span>
//               </Label>
//               <Input
//                 name="fullName"
//                 type="text"
//                 placeholder="Nhập họ và tên"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 error={!!errors.fullName}
//                 hint={errors.fullName || "Tên hiển thị"}
//               />
//             </div>

//             {/* Phone Number */}
//             <div>
//               <Label>Số điện thoại</Label>
//               <Input
//                 name="phoneNumber"
//                 type="tel"
//                 placeholder="vd: 0912345678"
//                 value={formData.phoneNumber || ""}
//                 onChange={handleChange}
//                 error={!!errors.phoneNumber}
//                 hint={errors.phoneNumber || "Số điện thoại liên hệ (tùy chọn)"}
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <Label>
//                 Vai trò <span className="text-error-500">*</span>
//               </Label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
//               >
//                 <option value="User">User - Người dùng thường</option>
//                 <option value="Premium">Premium - Người dùng cao cấp</option>
//               </select>
//               <p className="mt-1.5 text-xs text-gray-500">Phân quyền người dùng</p>
//             </div>

//             {/* Avatar */}
//             <div className="lg:col-span-2">
//               <Label>Ảnh đại diện</Label>
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={async (e) => {
//                       const file = e.target.files?.[0];
//                       if (!file) return;

//                       // Validate
//                       if (file.size > 2 * 1024 * 1024) {
//                         alert("File quá lớn! Tối đa 2MB");
//                         return;
//                       }

//                       try {
//                         setUploading(true);

//                         // Upload với slug = "avatars"
//                         const response = await uploadApi.uploadImage(file, "avatars");

//                         if (response.success && response.url) {
//                           setFormData((prev) => ({
//                             ...prev,
//                             avatar: response.url as string,
//                           }));
//                         } else {
//                           alert(response.message || "Upload thất bại");
//                         }
//                       } catch (error) {
//                         console.error("Upload error:", error);
//                         alert("Không thể upload hình ảnh");
//                       } finally {
//                         setUploading(false);
//                       }
//                     }}
//                     disabled={uploading}
//                     className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${
//                       uploading ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                   />
//                   {uploading && (
//                     <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>
//                   )}
//                   {!uploading && (
//                     <p className="mt-1.5 text-xs text-gray-500">
//                       Chấp nhận: JPG, PNG, GIF, WEBP (Tối đa 2MB)
//                     </p>
//                   )}
//                 </div>
//                 {formData.avatar && (
//                   <div className="relative">
//                     <img
//                       src={formData.avatar}
//                       alt="Avatar Preview"
//                       className="w-16 h-16 object-cover rounded-full border border-gray-200 dark:border-gray-700"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setFormData((prev) => ({ ...prev, avatar: "" }))}
//                       className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Checkboxes */}
//             <div className="flex flex-col gap-3">
//               {/* isActive */}
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={formData.isActive}
//                   onChange={handleChange}
//                   className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Kích hoạt tài khoản
//                 </span>
//               </label>

//               {/* isEmailVerified */}
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="isEmailVerified"
//                   checked={formData.isEmailVerified}
//                   onChange={handleChange}
//                   className="w-5 h-5 rounded border-gray-300 text-success-500 focus:ring-success-500 dark:border-gray-600 dark:bg-gray-800"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Đã xác thực email
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isEditing ? (
//                 <>
//                   <PencilIcon className="w-4 h-4" />
//                   {loading ? "Đang cập nhật..." : "Cập nhật"}
//                 </>
//               ) : (
//                 <>
//                   <PlusIcon className="w-4 h-4" />
//                   {loading ? "Đang thêm..." : "Thêm mới"}
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={handleReset}
//               disabled={loading}
//               className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Làm mới
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ============ TABLE SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         {/* Table Header */}
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                 👥 Danh sách người dùng
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 Tổng: {filteredUsers.length} người dùng
//               </p>
//             </div>

//             {/* Filters */}
//             <div className="flex items-center gap-3 flex-wrap">
//               {/* Search */}
//               <div className="w-64">
//                 <Input
//                   type="text"
//                   placeholder="🔍 Tìm kiếm..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>

//               {/* Filter Role */}
//               <select
//                 value={filterRole}
//                 onChange={(e) => setFilterRole(e.target.value)}
//                 className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//               >
//                 <option value="">Tất cả vai trò</option>
//                 <option value="User">User</option>
//                 <option value="Premium">Premium</option>
//               </select>

//               {/* Filter Status */}
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//               >
//                 <option value="">Tất cả trạng thái</option>
//                 <option value="active">Đang hoạt động</option>
//                 <option value="inactive">Đã khóa</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table Content */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Chọn
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Người dùng
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Liên hệ
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Vai trò
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Trạng thái
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Email
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Đăng nhập cuối
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Ngày tạo
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Xóa
//                   </span>
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//               {loading && users.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="px-5 py-10 text-center">
//                     <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="px-5 py-10 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <span className="text-4xl">📭</span>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {searchTerm || filterRole || filterStatus
//                           ? "Không tìm thấy người dùng"
//                           : "Chưa có người dùng nào"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((user) => (
//                   <tr
//                     key={user.id}
//                     className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
//                       selectedId === user.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
//                     }`}
//                   >
//                     {/* Radio Select */}
//                     <td className="px-4 py-4">
//                       <input
//                         type="radio"
//                         name="selectedUser"
//                         checked={selectedId === user.id}
//                         onChange={() => handleSelectRow(user)}
//                         className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
//                       />
//                     </td>

//                     {/* User Info */}
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
//                           {user.avatar ? (
//                             <img
//                               src={user.avatar}
//                               alt={user.fullName}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-gray-400 text-sm font-medium">
//                               {user.fullName.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p className="font-medium text-gray-800 dark:text-white/90">
//                             {user.fullName}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             @{user.username}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Contact */}
//                     <td className="px-4 py-4">
//                       <div className="min-w-0">
//                         <p className="text-sm text-gray-800 dark:text-white/90 truncate max-w-[180px]">
//                           {user.email}
//                         </p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           {user.phoneNumber || "—"}
//                         </p>
//                       </div>
//                     </td>

//                     {/* Role */}
//                     <td className="px-4 py-4 text-center">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(
//                           user.role
//                         )}`}
//                       >
//                         {user.role === "Premium" ? "⭐ " : ""}
//                         {user.role}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-4 text-center">
//                       {user.isActive ? (
//                         <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
//                           <CheckCircleIcon className="w-4 h-4" />
//                           <span className="text-xs">Hoạt động</span>
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 text-error-500">
//                           <XIcon className="w-4 h-4" />
//                           <span className="text-xs">Đã khóa</span>
//                         </span>
//                       )}
//                     </td>

//                     {/* Email Verified */}
//                     <td className="px-4 py-4 text-center">
//                       {user.isEmailVerified ? (
//                         <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
//                           <CheckCircleIcon className="w-4 h-4" />
//                           <span className="text-xs">Đã xác thực</span>
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 text-warning-500">
//                           <span className="text-xs">⚠️ Chưa xác thực</span>
//                         </span>
//                       )}
//                     </td>

//                     {/* Last Login */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {formatDate(user.lastLoginAt)}
//                       </span>
//                     </td>

//                     {/* Created At */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {formatDate(user.createdAt)}
//                       </span>
//                     </td>

//                     {/* Delete Button */}
//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={() => handleDelete(user.id)}
//                         disabled={loading}
//                         className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
//                         title="Xóa người dùng"
//                       >
//                         <TrashBinIcon className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Hiển thị {filteredUsers.length} người dùng
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import { Contact } from "@/app/types";
import { TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { contactApi } from "@/app/lib/api/index";

// ============ COMPONENT ============
export default function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Filter states
  const [filterStatus, setFilterStatus] = useState<string>("");

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const contactsData = await contactApi.getAllNoPaging();
      setContacts(contactsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadContacts = async () => {
    try {
      const data = await contactApi.getAllNoPaging();
      setContacts(data);
    } catch (error) {
      console.error("Error reloading contacts:", error);
    }
  };
  //#endregion

  //#region HANDLERS
  // View detail
  const handleViewDetail = async (contact: Contact) => {
    setSelectedContact(contact);
    setShowDetail(true);

    // Auto mark as read when viewing
    if (!contact.isRead) {
      try {
        await contactApi.markAsRead(contact.id);
        await reloadContacts();
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  // Close detail modal
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedContact(null);
  };

  // Toggle read status
  const handleToggleRead = async (contact: Contact) => {
    try {
      setLoading(true);
      if (contact.isRead) {
        await contactApi.markAsUnread(contact.id);
      } else {
        await contactApi.markAsRead(contact.id);
      }
      await reloadContacts();
    } catch (error) {
      console.error("Error toggling read status:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    if (window.confirm("Đánh dấu tất cả là đã đọc?")) {
      try {
        setLoading(true);
        await contactApi.markAllAsRead();
        await reloadContacts();
      } catch (error) {
        console.error("Error marking all as read:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete contact
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      try {
        setLoading(true);
        await contactApi.delete(id);
        await reloadContacts();

        if (selectedContact?.id === id) {
          handleCloseDetail();
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get time ago
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return formatDate(dateString);
  };

  // Count unread
  const unreadCount = contacts.filter((c) => !c.isRead).length;

  // Filter contacts
  const filteredContacts = contacts
    .filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        filterStatus === "" ||
        (filterStatus === "read" && c.isRead) ||
        (filterStatus === "unread" && !c.isRead);

      return matchSearch && matchStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Newest first
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ STATS SECTION ============ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
              <span className="text-2xl">📬</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                {contacts.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tổng liên hệ</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-warning-50 dark:bg-warning-500/10 flex items-center justify-center">
              <span className="text-2xl">📩</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning-600 dark:text-warning-400">
                {unreadCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chưa đọc</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                {contacts.length - unreadCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Đã đọc</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ TABLE SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📧 Danh sách liên hệ
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredContacts.length} liên hệ
                {unreadCount > 0 && (
                  <span className="ml-2 text-warning-600 dark:text-warning-400">
                    ({unreadCount} chưa đọc)
                  </span>
                )}
              </p>
            </div>

            {/* Actions & Filters */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Mark all as read */}
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20 transition-colors disabled:opacity-50"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Đánh dấu tất cả đã đọc
                </button>
              )}

              {/* Search */}
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="🔍 Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
              >
                <option value="">Tất cả</option>
                <option value="unread">Chưa đọc</option>
                <option value="read">Đã đọc</option>
              </select>
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
                    Người gửi
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Chủ đề
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Nội dung
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Trạng thái
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Thời gian
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterStatus
                          ? "Không tìm thấy liên hệ"
                          : "Chưa có liên hệ nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => handleViewDetail(contact)}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer ${
                      !contact.isRead
                        ? "bg-warning-50/50 dark:bg-warning-500/5"
                        : ""
                    }`}
                  >
                    {/* Sender */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            !contact.isRead
                              ? "bg-warning-100 dark:bg-warning-500/20"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <span
                            className={`text-sm font-medium ${
                              !contact.isRead
                                ? "text-warning-700 dark:text-warning-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {contact.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`truncate max-w-[150px] ${
                              !contact.isRead
                                ? "font-semibold text-gray-900 dark:text-white"
                                : "font-medium text-gray-800 dark:text-white/90"
                            }`}
                          >
                            {contact.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                            {contact.email}
                          </p>
                          {contact.phone && (
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {contact.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-4">
                      <p
                        className={`truncate max-w-[180px] ${
                          !contact.isRead
                            ? "font-semibold text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {contact.subject || "(Không có chủ đề)"}
                      </p>
                    </td>

                    {/* Message Preview */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[250px]">
                        {contact.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRead(contact);
                        }}
                        disabled={loading}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          contact.isRead
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                            : "bg-warning-100 text-warning-700 hover:bg-warning-200 dark:bg-warning-500/20 dark:text-warning-400 dark:hover:bg-warning-500/30"
                        }`}
                        title={contact.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
                      >
                        {contact.isRead ? (
                          <>
                            <CheckCircleIcon className="w-3 h-3" />
                            Đã đọc
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-warning-500"></span>
                            Chưa đọc
                          </>
                        )}
                      </button>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getTimeAgo(contact.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(contact.id);
                        }}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa liên hệ"
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
            Hiển thị {filteredContacts.length} liên hệ
          </p>
        </div>
      </div>

      {/* ============ DETAIL MODAL ============ */}
      {showDetail && selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCloseDetail}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                📧 Chi tiết liên hệ
              </h3>
              <button
                onClick={handleCloseDetail}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                {/* Sender Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center">
                    <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                      {selectedContact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white/90">
                      {selectedContact.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedContact.email}
                    </p>
                    {selectedContact.phone && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        📞 {selectedContact.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                {selectedContact.subject && (
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                      Chủ đề
                    </label>
                    <p className="mt-1 text-gray-800 dark:text-white/90 font-medium">
                      {selectedContact.subject}
                    </p>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Nội dung
                  </label>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    📅 Gửi lúc: {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <button
                onClick={() => handleToggleRead(selectedContact)}
                disabled={loading}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedContact.isRead
                    ? "text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    : "text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20"
                }`}
              >
                {selectedContact.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${
                    selectedContact.subject || "Liên hệ từ website"
                  }`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  ✉️ Trả lời email
                </a>
                <button
                  onClick={() => {
                    handleDelete(selectedContact.id);
                  }}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-error-600 bg-error-50 rounded-lg hover:bg-error-100 dark:bg-error-500/10 dark:text-error-400 dark:hover:bg-error-500/20 transition-colors"
                >
                  <TrashBinIcon className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}