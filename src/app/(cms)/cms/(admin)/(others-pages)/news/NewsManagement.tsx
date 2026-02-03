// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Label from "@/app/(cms)/cms/components/form/Label";
// import Input from "@/app/(cms)/cms/components/form/input/InputField";
// import { New, NewFormData, CategoryNew } from "@/app/types";
// import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
// import { newApi, categoryNewApi } from "@/app/lib/api/index";
// import { uploadApi } from "@/app/lib/api/endpoints/upload.api";
// import { TiptapEditor, TiptapEditorRef } from "@/app/components/tiptap-editor";

// // ============ INITIAL FORM DATA ============
// const initialFormData: NewFormData = {
//   title: "",
//   description: "",
//   image: "",
//   author: "",
//   content: "",
//   isActive: true,
//   sortOrder: 0,
//   categoryNewId: 0,
// };

// // ============ COMPONENT ============
// export default function NewManagement() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<NewFormData>(initialFormData);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [categories, setCategories] = useState<CategoryNew[]>([]);
//   const [news, setNews] = useState<New[]>([]);

//   // Filter states
//   const [filterCategory, setFilterCategory] = useState<string>("");

//   //#region API CALLS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [newsData, categoriesData] = await Promise.all([
//         newApi.getAllNoPaging(),
//         categoryNewApi.getAllNoPaging(),
//       ]);

//       setNews(newsData);
//       setCategories(categoriesData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reloadNews = async () => {
//     try {
//       const data = await newApi.getAllNoPaging();
//       setNews(data);
//     } catch (error) {
//       console.error("Error reloading news:", error);
//     }
//   };
//   //#endregion

//   //#region HANDLERS
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     let newValue: string | number | boolean = value;

//     if (type === "checkbox") {
//       newValue = (e.target as HTMLInputElement).checked;
//     } else if (type === "number") {
//       newValue = parseInt(value) || 0;
//     }

//     setFormData((prev) => ({ ...prev, [name]: newValue }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validate = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.title.trim()) {
//       newErrors.title = "Vui lòng nhập tiêu đề";
//     }

//     if (formData.categoryNewId === 0) {
//       newErrors.categoryNewId = "Vui lòng chọn danh mục";
//     }

//     if (!formData.description?.trim()) {
//       newErrors.description = "Vui lòng nhập mô tả ngắn";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSelectRow = (item: New) => {
//     setSelectedId(item.id);
//     setIsEditing(true);
//     setFormData({
//       title: item.title,
//       description: item.description || "",
//       image: item.image || "",
//       author: item.author || "",
//       content: item.content || "",
//       isActive: item.isActive,
//       sortOrder: item.sortOrder,
//       categoryNewId: item.categoryNewId,
//     });
//     setErrors({});

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleReset = () => {
//     setSelectedId(null);
//     setIsEditing(false);
//     setFormData(initialFormData);
//     setErrors({});
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       console.log("Form Data to submit:", formData);

//       if (isEditing && selectedId) {
//         const existingNew = news.find((n) => n.id === selectedId);
//         const newToUpdate: New = {
//           id: selectedId,
//           title: formData.title,
//           description: formData.description || null,
//           url: existingNew?.url || null,
//           view: existingNew?.view || 0,
//           image: formData.image || null,
//           author: formData.author || null,
//           content: formData.content || null,
//           isActive: formData.isActive,
//           sortOrder: formData.sortOrder,
//           categoryNewId: formData.categoryNewId,
//           createdAt: existingNew?.createdAt || new Date().toISOString(),
//         };
//         await newApi.update(newToUpdate);
//       } else {
//         await newApi.create(formData);
//       }

//       await reloadNews();
//       handleReset();
//     } catch (error) {
//       console.error("Error saving news:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa tin tức này?")) {
//       try {
//         setLoading(true);
//         await newApi.delete(id);
//         await reloadNews();

//         if (selectedId === id) {
//           handleReset();
//         }
//       } catch (error) {
//         console.error("Error deleting news:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   const formatViews = (views: number) => {
//     if (views >= 1000000) {
//       return (views / 1000000).toFixed(1) + "M";
//     }
//     if (views >= 1000) {
//       return (views / 1000).toFixed(1) + "K";
//     }
//     return views.toString();
//   };

//   const getCategoryName = (categoryId: number) => {
//     return categories.find((c) => c.id === categoryId)?.name || "N/A";
//   };

//   // Filter news
//   const filteredNews = news
//     .filter((n) => {
//       const matchSearch =
//         n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         n.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         n.author?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchCategory =
//         filterCategory === "" || n.categoryNewId === parseInt(filterCategory);

//       return matchSearch && matchCategory;
//     })
//     .sort((a, b) => a.sortOrder - b.sortOrder);
//   //#endregion

// const editorRef = useRef<TiptapEditorRef>(null)

//   return (
//     <div className="space-y-6">
//       {/* <TiptapEditor
//         ref={editorRef}
//         content="<p>Hello!</p>"
//         onChange={(html) => console.log(html)}
//         showWordCount
//         maxCharacters={10000}
//         // Optional: upload ảnh lên server
//         onImageUpload={async (file) => {
//           const formData = new FormData()
//           formData.append('file', file)
//           const res = await fetch('/api/upload', { method: 'POST', body: formData })
//           const { url } = await res.json()
//           return url
//         }}
//       /> */}


//       {/* ============ FORM SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             {isEditing ? "✏️ Cập nhật tin tức" : "➕ Thêm tin tức mới"}
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {isEditing
//               ? `Đang chỉnh sửa: ${formData.title}`
//               : "Điền thông tin để thêm tin tức mới"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {/* Tiêu đề */}
//             <div className="lg:col-span-2">
//               <Label>
//                 Tiêu đề <span className="text-error-500">*</span>
//               </Label>
//               <Input
//                 name="title"
//                 type="text"
//                 placeholder="Nhập tiêu đề tin tức"
//                 value={formData.title}
//                 onChange={handleChange}
//                 error={!!errors.title}
//                 hint={errors.title || "Tiêu đề hiển thị của tin tức"}
//               />
//             </div>

//             {/* Danh mục */}
//             <div>
//               <Label>
//                 Danh mục <span className="text-error-500">*</span>
//               </Label>
//               <select
//                 name="categoryNewId"
//                 value={formData.categoryNewId}
//                 onChange={handleChange}
//                 className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer ${
//                   errors.categoryNewId
//                     ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
//                     : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
//                 }`}
//               >
//                 <option value={0}>-- Chọn danh mục --</option>
//                 {categories
//                   .filter((c) => c.isActive)
//                   .map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//               </select>
//               {errors.categoryNewId && (
//                 <p className="mt-1.5 text-xs text-error-500">{errors.categoryNewId}</p>
//               )}
//               {!errors.categoryNewId && (
//                 <p className="mt-1.5 text-xs text-gray-500">Phân loại tin tức</p>
//               )}
//             </div>

//             {/* Tác giả */}
//             <div>
//               <Label>Tác giả</Label>
//               <Input
//                 name="author"
//                 type="text"
//                 placeholder="Nhập tên tác giả"
//                 value={formData.author || ""}
//                 onChange={handleChange}
//                 hint="Người viết bài (tùy chọn)"
//               />
//             </div>

//             {/* Thứ tự */}
//             <div>
//               <Label>Thứ tự hiển thị</Label>
//               <Input
//                 name="sortOrder"
//                 type="number"
//                 placeholder="0"
//                 min="0"
//                 value={formData.sortOrder}
//                 onChange={handleChange}
//                 error={!!errors.sortOrder}
//                 hint={errors.sortOrder || "Số nhỏ hiển thị trước"}
//               />
//             </div>

//             {/* Trạng thái */}
//             <div className="flex items-center">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={formData.isActive}
//                   onChange={handleChange}
//                   className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Hiển thị tin tức
//                 </span>
//               </label>
//             </div>

//             {/* Mô tả ngắn */}
//             <div className="lg:col-span-3">
//               <Label>
//                 Mô tả ngắn <span className="text-error-500">*</span>
//               </Label>
//               <textarea
//                 name="description"
//                 rows={2}
//                 placeholder="Nhập mô tả ngắn về tin tức..."
//                 value={formData.description || ""}
//                 onChange={handleChange}
//                 className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
//                   errors.description
//                     ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
//                     : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
//                 }`}
//               />
//               {errors.description ? (
//                 <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>
//               ) : (
//                 <p className="mt-1.5 text-xs text-gray-500">
//                   Tóm tắt nội dung hiển thị trong danh sách
//                 </p>
//               )}
//             </div>

//             {/* Nội dung chi tiết */}
//             <div className="lg:col-span-3">
//               <Label>Nội dung chi tiết</Label>
//               {/* <textarea
//                 name="content"
//                 rows={6}
//                 placeholder="Nhập nội dung chi tiết của tin tức..."
//                 value={formData.content || ""}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700"
//               />

//                     <TiptapEditor
//         ref={editorRef}
//         content="<p>Nội dung chi tiết...</p>"
//         onChange={(html) => console.log(html)}
//         showWordCount
//         maxCharacters={10000}
//         // Optional: upload ảnh lên server
//         onImageUpload={async (file) => {
//           const formData = new FormData()
//           formData.append('file', file)
//           const res = await fetch('/api/upload', { method: 'POST', body: formData })
//           const { url } = await res.json()
//           return url
//         }}
//       /> */}


//       <TiptapEditor
//   ref={editorRef}
//   content={formData.content || "<p>Nội dung chi tiết...</p>"}
//   onChange={(html) => {
//     handleChange({
//       target: { name: 'content', value: html }
//     } as React.ChangeEvent<HTMLTextAreaElement>)
//   }}
//   showWordCount
//   maxCharacters={10000}
//   onImageUpload={async (file) => {
//     const uploadData = new FormData()
//     uploadData.append('file', file)
//     const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
//     const { url } = await res.json()
//     return url
//   }}
// />
//               <p className="mt-1.5 text-xs text-gray-500">
//                 Nội dung HTML chi tiết của bài viết
//               </p>
//             </div>

//             {/* Hình ảnh */}
//             <div className="lg:col-span-2">
//               <Label>Hình ảnh đại diện</Label>
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={async (e) => {
//                       const file = e.target.files?.[0];
//                       if (!file) return;

//                       if (file.size > 2 * 1024 * 1024) {
//                         alert("File quá lớn! Tối đa 2MB");
//                         return;
//                       }

//                       try {
//                         setUploading(true);
//                         const response = await uploadApi.uploadImage(file, "news");

//                         if (response.success && response.url) {
//                           setFormData((prev) => ({
//                             ...prev,
//                             image: response.url as string,
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
//                 {formData.image && (
//                   <div className="relative">
//                     <img
//                       src={`/news/${formData.image}`}
//                       alt="Preview"
//                       className="w-20 h-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
//                       className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 )}
//               </div>
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
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//               📰 Danh sách tin tức
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Tổng: {filteredNews.length} tin tức
//             </p>
//           </div>

//           <div className="flex items-center gap-3 flex-wrap">
//             {/* Filter Category */}
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
//             >
//               <option value="">Tất cả danh mục</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>

//             {/* Search */}
//             <div className="w-72">
//               <Input
//                 type="text"
//                 placeholder="🔍 Tìm kiếm tin tức..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

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
//                     Tin tức
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Danh mục
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Tác giả
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Lượt xem
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Trạng thái
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
//               {loading && news.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="px-5 py-10 text-center">
//                     <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
//                   </td>
//                 </tr>
//               ) : filteredNews.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="px-5 py-10 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <span className="text-4xl">📭</span>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {searchTerm || filterCategory
//                           ? "Không tìm thấy tin tức"
//                           : "Chưa có tin tức nào"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredNews.map((item) => (
//                   <tr
//                     key={item.id}
//                     className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
//                       selectedId === item.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
//                     }`}
//                   >
//                     {/* Radio Select */}
//                     <td className="px-4 py-4">
//                       <input
//                         type="radio"
//                         name="selectedNew"
//                         checked={selectedId === item.id}
//                         onChange={() => handleSelectRow(item)}
//                         className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
//                       />
//                     </td>

//                     {/* News Info */}
//                     <td className="px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-16 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
//                           {item.image ? (
//                             <img
//                               src={`/news/${item.image}`}
//                               alt={item.title}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-gray-400 text-xs">IMG</span>
//                           )}
//                         </div>
//                         <div className="min-w-0">
//                           <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[250px]">
//                             {item.title}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
//                             {item.description}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Category */}
//                     <td className="px-4 py-4">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
//                         {getCategoryName(item.categoryNewId)}
//                       </span>
//                     </td>

//                     {/* Author */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {item.author || "—"}
//                       </span>
//                     </td>

//                     {/* Views */}
//                     <td className="px-4 py-4 text-center">
//                       <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
//                         👁️ {formatViews(item.view)}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-4 text-center">
//                       {item.isActive ? (
//                         <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
//                           <CheckCircleIcon className="w-4 h-4" />
//                           <span className="text-xs">Hiện</span>
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 text-gray-400">
//                           <XIcon className="w-4 h-4" />
//                           <span className="text-xs">Ẩn</span>
//                         </span>
//                       )}
//                     </td>

//                     {/* Created At */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {formatDate(item.createdAt)}
//                       </span>
//                     </td>

//                     {/* Delete Button */}
//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         disabled={loading}
//                         className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50"
//                         title="Xóa tin tức"
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

//         <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Hiển thị {filteredNews.length} tin tức
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }










"use client";

import React, { useState, useEffect, useRef } from "react";
import Label from "@/app/(cms)/cms/components/form/Label";
import Input from "@/app/(cms)/cms/components/form/input/InputField";
import { New, NewFormData, CategoryNew } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "./icons";
import { newApi, categoryNewApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";
import { TiptapEditor, TiptapEditorRef } from "@/app/components/tiptap-editor";

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
  const editorRef = useRef<TiptapEditorRef>(null);

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

  // ✅ Handler riêng cho TiptapEditor
  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));

    // Xóa error khi user bắt đầu nhập
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
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

    // ✅ Validate content từ editor
    const isEditorEmpty = editorRef.current?.isEmpty ?? true;
    if (isEditorEmpty || !formData.content?.trim() || formData.content === "<p></p>") {
      newErrors.content = "Vui lòng nhập nội dung bài viết";
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

    // ✅ Set content cho TiptapEditor qua ref
    editorRef.current?.setContent(item.content || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});

    // ✅ Clear TiptapEditor
    editorRef.current?.clearContent();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Lấy content mới nhất từ editor trước khi validate
    const latestHtml = editorRef.current?.getHtml() || "";
    setFormData((prev) => ({ ...prev, content: latestHtml }));

    if (!validate()) return;

    try {
      setLoading(true);

      // ✅ Dùng content từ editor ref (đảm bảo mới nhất)
      const submitData = {
        ...formData,
        content: latestHtml,
      };

      console.log("Form Data to submit:", submitData);

      if (isEditing && selectedId) {
        const existingNew = news.find((n) => n.id === selectedId);
        const newToUpdate: New = {
          id: selectedId,
          title: submitData.title,
          description: submitData.description || null,
          url: existingNew?.url || null,
          view: existingNew?.view || 0,
          image: submitData.image || null,
          author: submitData.author || null,
          content: submitData.content || null,
          isActive: submitData.isActive,
          sortOrder: submitData.sortOrder,
          categoryNewId: submitData.categoryNewId,
          createdAt: existingNew?.createdAt || new Date().toISOString(),
        };
        await newApi.update(newToUpdate);
      } else {
        await newApi.create(submitData);
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

  // ✅ Image upload handler cho TiptapEditor
  const handleEditorImageUpload = async (file: File): Promise<string> => {
    try {
      const response = await uploadApi.uploadImage(file, "news");
      if (response.success && response.url) {
        return `${response.url}`;
      }
      throw new Error(response.message || "Upload thất bại");
    } catch (error) {
      console.error("Editor image upload error:", error);
      alert("Không thể upload hình ảnh vào bài viết");
      throw error;
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
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K";
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

            {/* ✅ Nội dung chi tiết - TiptapEditor */}
            <div className="lg:col-span-3">
              <Label>
                Nội dung chi tiết <span className="text-error-500">*</span>
              </Label>
              <div
                className={`rounded-lg ${
                  errors.content ? "ring-2 ring-error-500/30 border-error-500" : ""
                }`}
              >
                <TiptapEditor
                  ref={editorRef}
                  content={formData.content || ""}
                  onChange={handleContentChange}
                  placeholder="Nhập nội dung chi tiết của tin tức..."
                  showWordCount
                  maxCharacters={50000}
                  minHeight="300px"
                  maxHeight="600px"
                  onImageUpload={handleEditorImageUpload}
                />
              </div>
              {errors.content ? (
                <p className="mt-1.5 text-xs text-error-500">{errors.content}</p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-500">
                  Nội dung HTML chi tiết của bài viết (hỗ trợ kéo thả hình ảnh)
                </p>
              )}
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
                      src={`/news/${formData.image}`}
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
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Chọn</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tin tức</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Danh mục</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tác giả</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Lượt xem</span>
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
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedNew"
                        checked={selectedId === item.id}
                        onChange={() => handleSelectRow(item)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? (
                            <img
                              src={`/news/${item.image}`}
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

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
                        {getCategoryName(item.categoryNewId)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.author || "—"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        👁️ {formatViews(item.view)}
                      </span>
                    </td>

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

                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>
                    </td>

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