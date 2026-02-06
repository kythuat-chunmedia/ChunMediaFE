// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Label from "@/app/components/cms/form/Label";
// import Input from "@/app/components/cms/form/input/InputField";
// import { New, NewFormData, CategoryNew } from "@/app/types";
// import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
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
//   const editorRef = useRef<TiptapEditorRef>(null);

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

//   // ✅ Handler riêng cho TiptapEditor
//   const handleContentChange = (html: string) => {
//     setFormData((prev) => ({ ...prev, content: html }));

//     // Xóa error khi user bắt đầu nhập
//     if (errors.content) {
//       setErrors((prev) => ({ ...prev, content: "" }));
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

//     // ✅ Validate content từ editor
//     const isEditorEmpty = editorRef.current?.isEmpty ?? true;
//     if (isEditorEmpty || !formData.content?.trim() || formData.content === "<p></p>") {
//       newErrors.content = "Vui lòng nhập nội dung bài viết";
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

//     // ✅ Set content cho TiptapEditor qua ref
//     editorRef.current?.setContent(item.content || "");

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleReset = () => {
//     setSelectedId(null);
//     setIsEditing(false);
//     setFormData(initialFormData);
//     setErrors({});

//     // ✅ Clear TiptapEditor
//     editorRef.current?.clearContent();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // ✅ Lấy content mới nhất từ editor trước khi validate
//     const latestHtml = editorRef.current?.getHtml() || "";
//     setFormData((prev) => ({ ...prev, content: latestHtml }));

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       // ✅ Dùng content từ editor ref (đảm bảo mới nhất)
//       const submitData = {
//         ...formData,
//         content: latestHtml,
//       };

//       console.log("Form Data to submit:", submitData);

//       if (isEditing && selectedId) {
//         const existingNew = news.find((n) => n.id === selectedId);
//         const newToUpdate: New = {
//           id: selectedId,
//           title: submitData.title,
//           description: submitData.description || null,
//           url: existingNew?.url || null,
//           view: existingNew?.view || 0,
//           image: submitData.image || null,
//           author: submitData.author || null,
//           content: submitData.content || null,
//           isActive: submitData.isActive,
//           sortOrder: submitData.sortOrder,
//           categoryNewId: submitData.categoryNewId,
//           createdAt: existingNew?.createdAt || new Date().toISOString(),
//         };
//         await newApi.update(newToUpdate);
//       } else {
//         await newApi.create(submitData);
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

//   // ✅ Image upload handler cho TiptapEditor
//   const handleEditorImageUpload = async (file: File): Promise<string> => {
//     try {
//       const response = await uploadApi.uploadImage(file, "news");
//       if (response.success && response.url) {
//         return `${response.url}`;
//       }
//       throw new Error(response.message || "Upload thất bại");
//     } catch (error) {
//       console.error("Editor image upload error:", error);
//       alert("Không thể upload hình ảnh vào bài viết");
//       throw error;
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
//     if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
//     if (views >= 1000) return (views / 1000).toFixed(1) + "K";
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

//   return (
//     <div className="space-y-6">
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

//             {/* ✅ Nội dung chi tiết - TiptapEditor */}
//             <div className="lg:col-span-3">
//               <Label>
//                 Nội dung chi tiết <span className="text-error-500">*</span>
//               </Label>
//               <div
//                 className={`rounded-lg ${
//                   errors.content ? "ring-2 ring-error-500/30 border-error-500" : ""
//                 }`}
//               >
//                 <TiptapEditor
//                   ref={editorRef}
//                   content={formData.content || ""}
//                   onChange={handleContentChange}
//                   placeholder="Nhập nội dung chi tiết của tin tức..."
//                   showWordCount
//                   maxCharacters={50000}
//                   minHeight="300px"
//                   maxHeight="600px"
//                   onImageUpload={handleEditorImageUpload}
//                 />
//               </div>
//               {errors.content ? (
//                 <p className="mt-1.5 text-xs text-error-500">{errors.content}</p>
//               ) : (
//                 <p className="mt-1.5 text-xs text-gray-500">
//                   Nội dung HTML chi tiết của bài viết (hỗ trợ kéo thả hình ảnh)
//                 </p>
//               )}
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
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Chọn</span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tin tức</span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Danh mục</span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tác giả</span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Lượt xem</span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Trạng thái</span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ngày tạo</span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Xóa</span>
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
//                     <td className="px-4 py-4">
//                       <input
//                         type="radio"
//                         name="selectedNew"
//                         checked={selectedId === item.id}
//                         onChange={() => handleSelectRow(item)}
//                         className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
//                       />
//                     </td>

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

//                     <td className="px-4 py-4">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
//                         {getCategoryName(item.categoryNewId)}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {item.author || "—"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
//                         👁️ {formatViews(item.view)}
//                       </span>
//                     </td>

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

//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {formatDate(item.createdAt)}
//                       </span>
//                     </td>

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
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { New, NewFormData, CategoryNew, SeoMetadata, SeoMetadataFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { newApi, categoryNewApi, seoMetadataApi } from "@/app/lib/api/index";
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

const initialSeoData: SeoMetadataFormData = {
  pageType: "news",
  menuId: null,
  newsId: null,
  slug: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "article",
  canonicalUrl: "",
  robots: "index,follow",
  schemaMarkup: "",
};

// ============ HELPER: Tạo slug từ tiêu đề tiếng Việt ============
function generateSlug(text: string): string {
  const vietnameseMap: Record<string, string> = {
    à: "a", á: "a", ả: "a", ã: "a", ạ: "a",
    ă: "a", ằ: "a", ắ: "a", ẳ: "a", ẵ: "a", ặ: "a",
    â: "a", ầ: "a", ấ: "a", ẩ: "a", ẫ: "a", ậ: "a",
    è: "e", é: "e", ẻ: "e", ẽ: "e", ẹ: "e",
    ê: "e", ề: "e", ế: "e", ể: "e", ễ: "e", ệ: "e",
    ì: "i", í: "i", ỉ: "i", ĩ: "i", ị: "i",
    ò: "o", ó: "o", ỏ: "o", õ: "o", ọ: "o",
    ô: "o", ồ: "o", ố: "o", ổ: "o", ỗ: "o", ộ: "o",
    ơ: "o", ờ: "o", ớ: "o", ở: "o", ỡ: "o", ợ: "o",
    ù: "u", ú: "u", ủ: "u", ũ: "u", ụ: "u",
    ư: "u", ừ: "u", ứ: "u", ử: "u", ữ: "u", ự: "u",
    ỳ: "y", ý: "y", ỷ: "y", ỹ: "y", ỵ: "y",
    đ: "d",
    À: "a", Á: "a", Ả: "a", Ã: "a", Ạ: "a",
    Ă: "a", Ằ: "a", Ắ: "a", Ẳ: "a", Ẵ: "a", Ặ: "a",
    Â: "a", Ầ: "a", Ấ: "a", Ẩ: "a", Ẫ: "a", Ậ: "a",
    È: "e", É: "e", Ẻ: "e", Ẽ: "e", Ẹ: "e",
    Ê: "e", Ề: "e", Ế: "e", Ể: "e", Ễ: "e", Ệ: "e",
    Ì: "i", Í: "i", Ỉ: "i", Ĩ: "i", Ị: "i",
    Ò: "o", Ó: "o", Ỏ: "o", Õ: "o", Ọ: "o",
    Ô: "o", Ồ: "o", Ố: "o", Ổ: "o", Ỗ: "o", Ộ: "o",
    Ơ: "o", Ờ: "o", Ớ: "o", Ở: "o", Ỡ: "o", Ợ: "o",
    Ù: "u", Ú: "u", Ủ: "u", Ũ: "u", Ụ: "u",
    Ư: "u", Ừ: "u", Ứ: "u", Ử: "u", Ữ: "u", Ự: "u",
    Ỳ: "y", Ý: "y", Ỷ: "y", Ỹ: "y", Ỵ: "y",
    Đ: "d",
  };

  return text
    .split("")
    .map((char) => vietnameseMap[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ============ COMPONENT ============
export default function NewManagement() {
  const editorRef = useRef<TiptapEditorRef>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<NewFormData>(initialFormData);
  const [seoData, setSeoData] = useState<SeoMetadataFormData>(initialSeoData);
  const [existingSeoId, setExistingSeoId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<CategoryNew[]>([]);
  const [news, setNews] = useState<New[]>([]);

  // SEO section toggle
  const [showSeo, setShowSeo] = useState(false);
  const [seoAutoFill, setSeoAutoFill] = useState(true);

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

    // Auto-fill SEO khi thay đổi title hoặc description
    if (seoAutoFill) {
      if (name === "title") {
        setSeoData((prev) => ({
          ...prev,
          metaTitle: String(newValue),
          ogTitle: String(newValue),
          slug: generateSlug(String(newValue)),
        }));
      }
      if (name === "description") {
        setSeoData((prev) => ({
          ...prev,
          metaDescription: String(newValue),
          ogDescription: String(newValue),
        }));
      }
    }
  };

  // Handler cho SEO fields
  const handleSeoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({ ...prev, [name]: value }));

    // Nếu user tự sửa SEO → tắt auto-fill
    if (["metaTitle", "metaDescription", "slug"].includes(name)) {
      setSeoAutoFill(false);
    }

    if (errors[`seo_${name}`]) {
      setErrors((prev) => ({ ...prev, [`seo_${name}`]: "" }));
    }
  };

  const handleContentChange = (html: string) => {
    setFormData((prev) => ({ ...prev, content: html }));

    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

    console.log(seoData.metaDescription.length);
    console.log(seoData.metaTitle.length);

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

    const isEditorEmpty = editorRef.current?.isEmpty ?? true;
    if (isEditorEmpty || !formData.content?.trim() || formData.content === "<p></p>") {
      newErrors.content = "Vui lòng nhập nội dung bài viết";
    }



    // Validate SEO nếu đang mở
    if (showSeo) {
      if (!seoData.slug.trim()) {
        newErrors.seo_slug = "Vui lòng nhập slug URL";
      } else if (!/^[a-z0-9-]+$/.test(seoData.slug)) {
        newErrors.seo_slug = "Slug chỉ chứa chữ thường, số và dấu gạch ngang";
      }

      if (seoData.metaTitle && seoData.metaTitle.length > 70) {
        newErrors.seo_metaTitle = "Meta Title nên dưới 70 ký tự";
      }

      if (seoData.metaDescription && seoData.metaDescription.length > 160) {
        newErrors.seo_metaDescription = "Meta Description nên dưới 160 ký tự";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectRow = async (item: New) => {
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

    editorRef.current?.setContent(item.content || "");

    // Load SEO data cho bài viết này
    try {
      const seo = await seoMetadataApi.getByNewsId(item.id);
      if (seo) {
        // Tìm SEO ID từ admin API
        const allSeo = await seoMetadataApi.getAll();
        const existingSeo = allSeo.find((s) => s.newsId === item.id);

        setExistingSeoId(existingSeo?.id || null);
        setSeoData({
          pageType: "news",
          menuId: null,
          newsId: item.id,
          slug: seo.slug || "",
          metaTitle: seo.metaTitle || "",
          metaDescription: seo.metaDescription || "",
          metaKeywords: seo.metaKeywords || "",
          ogTitle: seo.ogTitle || "",
          ogDescription: seo.ogDescription || "",
          ogImage: seo.ogImage || "",
          ogType: seo.ogType || "article",
          canonicalUrl: seo.canonicalUrl || "",
          robots: seo.robots || "index,follow",
          schemaMarkup: seo.schemaMarkup || "",
        });
        setShowSeo(true);
        setSeoAutoFill(false);
      } else {
        setExistingSeoId(null);
        setSeoData({
          ...initialSeoData,
          slug: item.url || generateSlug(item.title),
          metaTitle: item.title,
          metaDescription: item.description || "",
          ogTitle: item.title,
          ogDescription: item.description || "",
          ogImage: item.image || "",
          newsId: item.id,
        });
        setSeoAutoFill(true);
      }
    } catch (error) {
      console.error("Error loading SEO data:", error);
      setExistingSeoId(null);
      setSeoData({
        ...initialSeoData,
        slug: generateSlug(item.title),
        metaTitle: item.title,
        metaDescription: item.description || "",
        ogTitle: item.title,
        ogDescription: item.description || "",
        newsId: item.id,
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedId(null);
    setIsEditing(false);
    setFormData(initialFormData);
    setSeoData(initialSeoData);
    setExistingSeoId(null);
    setShowSeo(false);
    setSeoAutoFill(true);
    setErrors({});

    editorRef.current?.clearContent();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const latestHtml = editorRef.current?.getHtml() || "";
    setFormData((prev) => ({ ...prev, content: latestHtml }));

    if (!validate()) return;

    try {
      setLoading(true);

      const submitData = {
        ...formData,
        content: latestHtml,
      };

      let savedNewsId: number | null = null;

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
        savedNewsId = selectedId;
      } else {
        const created = await newApi.create(submitData);
        savedNewsId = created?.id || null;
      }

      // Lưu SEO metadata nếu đang mở và có slug
      if (showSeo && seoData.slug.trim() && savedNewsId) {
        try {
          const seoPayload: SeoMetadataFormData = {
            ...seoData,
            pageType: "news",
            newsId: savedNewsId,
            ogImage: seoData.ogImage || formData.image || "",
          };

          if (existingSeoId) {
            // Update SEO
            const seoToUpdate: SeoMetadata = {
              id: existingSeoId,
              ...seoPayload,
              createdAt: new Date().toISOString(),
              updatedAt: null,
              menuName: null,
              newsTitle: null,
            };
            await seoMetadataApi.update(seoToUpdate);
          } else {
            // Create SEO
            await seoMetadataApi.create(seoPayload);
          }
        } catch (seoError) {
          console.error("Error saving SEO metadata:", seoError);
          // Không block submit chính, chỉ log warning
        }
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
        // SEO sẽ tự xóa qua Cascade Delete ở BE
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

  // Auto-fill OG Image khi upload ảnh đại diện
  const handleImageUploaded = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
    if (seoAutoFill && !seoData.ogImage) {
      setSeoData((prev) => ({ ...prev, ogImage: imageUrl }));
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

            {/* Nội dung chi tiết - TiptapEditor */}
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
                          handleImageUploaded(response.url as string);
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
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image: "" }));
                        if (seoAutoFill) {
                          setSeoData((prev) => ({ ...prev, ogImage: "" }));
                        }
                      }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============ SEO METADATA SECTION ============ */}
          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showSeo ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              🔍 Cài đặt SEO
              {showSeo && seoData.slug && (
                <span className="text-xs text-green-600 dark:text-green-400 ml-2">
                  /{seoData.slug}
                </span>
              )}
              {!showSeo && existingSeoId && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 ml-2">
                  Đã cấu hình
                </span>
              )}
            </button>

            {showSeo && (
              <div className="mt-4 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-5">
                {/* Auto-fill toggle */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Thông tin SEO cho bài viết
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seoAutoFill}
                      onChange={(e) => setSeoAutoFill(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tự động điền từ tiêu đề & mô tả
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Slug URL */}
                  <div>
                    <Label>
                      Slug URL <span className="text-error-500">*</span>
                    </Label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">/</span>
                      <input
                        name="slug"
                        type="text"
                        placeholder="url-bai-viet"
                        value={seoData.slug}
                        onChange={handleSeoChange}
                        className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 ${
                          errors.seo_slug
                            ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                            : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                        }`}
                      />
                    </div>
                    {errors.seo_slug ? (
                      <p className="mt-1.5 text-xs text-error-500">{errors.seo_slug}</p>
                    ) : (
                      <p className="mt-1.5 text-xs text-gray-500">Đường dẫn SEO-friendly</p>
                    )}
                  </div>

                  {/* Meta Title */}
                  <div className="lg:col-span-2">
                    <Label>Meta Title</Label>
                    <input
                      name="metaTitle"
                      type="text"
                      placeholder="Tiêu đề hiển thị trên Google"
                      value={seoData.metaTitle}
                      onChange={handleSeoChange}
                      maxLength={200}
                      className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 ${
                        errors.seo_metaTitle
                          ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                          : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                      }`}
                    />
                    <p className={`mt-1.5 text-xs ${
                      (seoData.metaTitle?.length || 0) > 70 ? "text-amber-500" : "text-gray-500"
                    }`}>
                      {seoData.metaTitle?.length || 0}/70 ký tự
                      {(seoData.metaTitle?.length || 0) > 70 && " — nên rút ngắn"}
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="lg:col-span-3">
                    <Label>Meta Description</Label>
                    <textarea
                      name="metaDescription"
                      rows={2}
                      placeholder="Mô tả hiển thị trên kết quả tìm kiếm Google"
                      value={seoData.metaDescription}
                      onChange={handleSeoChange}
                      maxLength={500}
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 ${
                        errors.seo_metaDescription
                          ? "border-error-500 focus:border-error-300 focus:ring-error-500/10"
                          : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                      }`}
                    />
                    <p className={`mt-1.5 text-xs ${
                      (seoData.metaDescription?.length || 0) > 160 ? "text-amber-500" : "text-gray-500"
                    }`}>
                      {seoData.metaDescription?.length || 0}/160 ký tự
                      {(seoData.metaDescription?.length || 0) > 160 && " — nên rút ngắn"}
                    </p>
                  </div>

                  {/* Meta Keywords */}
                  <div className="lg:col-span-3">
                    <Label>Meta Keywords</Label>
                    <input
                      name="metaKeywords"
                      type="text"
                      placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
                      value={seoData.metaKeywords}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      Phân cách bằng dấu phẩy
                    </p>
                  </div>

                  {/* OG Title */}
                  <div className="lg:col-span-2">
                    <Label>OG Title</Label>
                    <input
                      name="ogTitle"
                      type="text"
                      placeholder="Tiêu đề khi chia sẻ mạng xã hội"
                      value={seoData.ogTitle}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      Để trống sẽ dùng Meta Title
                    </p>
                  </div>

                  {/* OG Image */}
                  <div>
                    <Label>OG Image URL</Label>
                    <input
                      name="ogImage"
                      type="text"
                      placeholder="URL hình ảnh khi share"
                      value={seoData.ogImage}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      {formData.image ? "Mặc định dùng ảnh đại diện" : "Ảnh hiển thị khi share Facebook/Zalo"}
                    </p>
                  </div>

                  {/* OG Description */}
                  <div className="lg:col-span-3">
                    <Label>OG Description</Label>
                    <textarea
                      name="ogDescription"
                      rows={2}
                      placeholder="Mô tả khi chia sẻ mạng xã hội"
                      value={seoData.ogDescription}
                      onChange={handleSeoChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      Để trống sẽ dùng Meta Description
                    </p>
                  </div>

                  {/* Canonical URL */}
                  <div className="lg:col-span-2">
                    <Label>Canonical URL</Label>
                    <input
                      name="canonicalUrl"
                      type="text"
                      placeholder="https://yourdomain.com/bai-viet/slug"
                      value={seoData.canonicalUrl}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      URL chính thức (tránh trùng lặp nội dung)
                    </p>
                  </div>

                  {/* Robots */}
                  <div>
                    <Label>Robots</Label>
                    <select
                      name="robots"
                      value={seoData.robots}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 cursor-pointer"
                    >
                      <option value="index,follow">index, follow (Mặc định)</option>
                      <option value="noindex,follow">noindex, follow</option>
                      <option value="index,nofollow">index, nofollow</option>
                      <option value="noindex,nofollow">noindex, nofollow</option>
                    </select>
                    <p className="mt-1.5 text-xs text-gray-500">
                      Hướng dẫn Google crawl trang
                    </p>
                  </div>
                </div>

                {/* SEO Preview */}
                {(seoData.metaTitle || seoData.metaDescription) && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      Xem trước trên Google
                    </p>
                    <div className="space-y-1">
                      <p className="text-blue-700 dark:text-blue-400 text-lg leading-tight truncate">
                        {seoData.metaTitle || formData.title || "Tiêu đề bài viết"}
                      </p>
                      <p className="text-green-700 dark:text-green-500 text-sm truncate">
                        yourdomain.com/{seoData.slug || "slug-bai-viet"}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {seoData.metaDescription || formData.description || "Mô tả bài viết sẽ hiển thị ở đây..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
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
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">SEO</span>
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
                  <td colSpan={9} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center">
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

                    {/* SEO status column */}
                    <td className="px-4 py-4 text-center">
                      <SeoStatusBadge newsId={item.id} />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        👁️ {formatViews(item.view)}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      {item.isActive ? (
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

// ============ SEO STATUS BADGE COMPONENT ============
// Hiển thị trạng thái SEO trong bảng
function SeoStatusBadge({ newsId }: { newsId: number }) {
  const [hasSeo, setHasSeo] = useState<boolean | null>(null);

  // useEffect(() => {
  //   let mounted = true;
  //   const check = async () => {
  //     try {
  //       const seo = await seoMetadataApi.getByNewsId(newsId);
  //       if (mounted) setHasSeo(!!seo);
  //     } catch {
  //       if (mounted) setHasSeo(false);
  //     }
  //   };
  //   check();
  //   return () => { mounted = false; };
  // }, [newsId]);

  if (hasSeo === null) {
    return <span className="text-xs text-gray-400">...</span>;
  }

  return hasSeo ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">
      ✓ SEO
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
      Chưa có
    </span>
  );
}