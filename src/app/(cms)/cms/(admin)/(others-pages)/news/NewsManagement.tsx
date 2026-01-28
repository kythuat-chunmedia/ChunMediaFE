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
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { New, NewFormData, CategoryNew } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { newApi, categoryNewApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// ============ INITIAL FORM DATA ============
const initialFormData: NewFormData = {
  title: "",
  description: "",
  image: "",
  author: "",
  content: "",
  isActive: true,
  sortOrder: 0,
  categoryNewId: 0,
};

// ============ COMPONENT ============
export default function NewManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<NewFormData>(initialFormData);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryNew[]>([]);
  const [news, setNews] = useState<New[]>([]);

  // Filter states
  const [filterCategory, setFilterCategory] = useState<string>("");

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newsData, categoriesData] = await Promise.all([
        newApi.getAllNoPaging(),
        categoryNewApi.getAllNoPaging(),
      ]);

      setNews(newsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadNews = async () => {
    try {
      const data = await newApi.getAllNoPaging();
      setNews(data);
    } catch (error) {
      console.error("Error reloading news:", error);
    }
  };
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
      newValue = parseInt(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    }

    if (formData.categoryNewId === 0) {
      newErrors.categoryNewId = "Vui lòng chọn danh mục";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Vui lòng nhập mô tả ngắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectRow = (item: New) => {
    setSelectedId(item.id);
    setIsEditing(true);
    setFormData({
      title: item.title,
      description: item.description || "",
      image: item.image || "",
      author: item.author || "",
      content: item.content || "",
      isActive: item.isActive,
      sortOrder: item.sortOrder,
      categoryNewId: item.categoryNewId,
    });
    setErrors({});

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      console.log("Form Data to submit:", formData);

      if (isEditing && selectedId) {
        const existingNew = news.find((n) => n.id === selectedId);
        const newToUpdate: New = {
          id: selectedId,
          title: formData.title,
          description: formData.description || null,
          url: existingNew?.url || null,
          view: existingNew?.view || 0,
          image: formData.image || null,
          author: formData.author || null,
          content: formData.content || null,
          isActive: formData.isActive,
          sortOrder: formData.sortOrder,
          categoryNewId: formData.categoryNewId,
          createdAt: existingNew?.createdAt || new Date().toISOString(),
        };
        await newApi.update(newToUpdate);
      } else {
        await newApi.create(formData);
      }

      await reloadNews();
      handleReset();
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
      try {
        setLoading(true);
        await newApi.delete(id);
        await reloadNews();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    }
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views.toString();
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.name || "N/A";
  };

  // Filter news
  const filteredNews = news
    .filter((n) => {
      const matchSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        filterCategory === "" || n.categoryNewId === parseInt(filterCategory);

      return matchSearch && matchCategory;
    })
    .sort((a, b) => a.sortOrder - b.sortOrder);
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật tin tức" : "➕ Thêm tin tức mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.title}`
              : "Điền thông tin để thêm tin tức mới"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tiêu đề */}
            <div className="lg:col-span-2">
              <Label>
                Tiêu đề <span className="text-error-500">*</span>
              </Label>
              <Input
                name="title"
                type="text"
                placeholder="Nhập tiêu đề tin tức"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                hint={errors.title || "Tiêu đề hiển thị của tin tức"}
              />
            </div>

            {/* Danh mục */}
            <div>
              <Label>
                Danh mục <span className="text-error-500">*</span>
              </Label>
              <select
                name="categoryNewId"
                value={formData.categoryNewId}
                onChange={handleChange}
                className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${
                  errors.categoryNewId
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              >
                <option value={0}>-- Chọn danh mục --</option>
                {categories
                  .filter((c) => c.isActive)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              {errors.categoryNewId && (
                <p className="mt-1.5 text-xs text-error-500">{errors.categoryNewId}</p>
              )}
              {!errors.categoryNewId && (
                <p className="mt-1.5 text-xs text-gray-500">Phân loại tin tức</p>
              )}
            </div>

            {/* Tác giả */}
            <div>
              <Label>Tác giả</Label>
              <Input
                name="author"
                type="text"
                placeholder="Nhập tên tác giả"
                value={formData.author || ""}
                onChange={handleChange}
                hint="Người viết bài (tùy chọn)"
              />
            </div>

            {/* Thứ tự */}
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
                  Hiển thị tin tức
                </span>
              </label>
            </div>

            {/* Mô tả ngắn */}
            <div className="lg:col-span-3">
              <Label>
                Mô tả ngắn <span className="text-error-500">*</span>
              </Label>
              <textarea
                name="description"
                rows={2}
                placeholder="Nhập mô tả ngắn về tin tức..."
                value={formData.description || ""}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                  errors.description
                    ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                    : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                }`}
              />
              {errors.description ? (
                <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-500">
                  Tóm tắt nội dung hiển thị trong danh sách
                </p>
              )}
            </div>

            {/* Nội dung chi tiết */}
            <div className="lg:col-span-3">
              <Label>Nội dung chi tiết</Label>
              <textarea
                name="content"
                rows={6}
                placeholder="Nhập nội dung chi tiết của tin tức..."
                value={formData.content || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                Nội dung HTML chi tiết của bài viết
              </p>
            </div>

            {/* Hình ảnh */}
            <div className="lg:col-span-2">
              <Label>Hình ảnh đại diện</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (file.size > 2 * 1024 * 1024) {
                        alert("File quá lớn! Tối đa 2MB");
                        return;
                      }

                      try {
                        setUploading(true);
                        const response = await uploadApi.uploadImage(file, "news");

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
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                  {uploading && (
                    <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>
                  )}
                  {!uploading && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      Chấp nhận: JPG, PNG, GIF, WEBP (Tối đa 2MB)
                    </p>
                  )}
                </div>
                {formData.image && (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-20 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
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
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              📰 Danh sách tin tức
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {filteredNews.length} tin tức
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Category */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="w-72">
              <Input
                type="text"
                placeholder="🔍 Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

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
                    Tin tức
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Danh mục
                  </span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Tác giả
                  </span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Lượt xem
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
              {loading && news.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm || filterCategory
                          ? "Không tìm thấy tin tức"
                          : "Chưa có tin tức nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === item.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    {/* Radio Select */}
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedNew"
                        checked={selectedId === item.id}
                        onChange={() => handleSelectRow(item)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    {/* News Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">IMG</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[250px]">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
                        {getCategoryName(item.categoryNewId)}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.author || "—"}
                      </span>
                    </td>

                    {/* Views */}
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        👁️ {formatViews(item.view)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      {item.isActive ? (
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
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

                    {/* Delete Button */}
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                        className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
                        title="Xóa tin tức"
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

        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {filteredNews.length} tin tức
          </p>
        </div>
      </div>
    </div>
  );
}