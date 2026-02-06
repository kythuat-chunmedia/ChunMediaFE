// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import Label from "@/app/components/cms/form/Label";
// import Input from "@/app/components/cms/form/input/InputField";
// import { Menu, MenuFormData, MenuTreeItem } from "@/app/types";
// import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
// import { menuApi } from "@/app/lib/api/index";

// // ============ INITIAL FORM DATA ============
// const initialFormData: MenuFormData = {
//   title: "",
//   parentId: null,
//   sortOrder: 0,
//   isActive: true,
// };

// // ============ HELPER FUNCTIONS ============

// /**
//  * Build tree từ flat list
//  */
// const buildTree = (items: Menu[], parentId: number | null = null): Menu[] => {
//   return items
//     .filter((item) => item.parentId === parentId)
//     .sort((a, b) => a.sortOrder - b.sortOrder)
//     .map((item) => ({
//       ...item,
//       children: buildTree(items, item.id),
//     }));
// };

// /**
//  * Flatten tree với level để hiển thị dạng list có indent
//  */
// const flattenTree = (items: Menu[], level: number = 0): MenuTreeItem[] => {
//   const result: MenuTreeItem[] = [];

//   items.forEach((item) => {
//     const hasChildren = item.children && item.children.length > 0;
//     result.push({
//       ...item,
//       level,
//       hasChildren: hasChildren || false,
//     });

//     if (item.children && item.children.length > 0) {
//       result.push(...flattenTree(item.children, level + 1));
//     }
//   });

//   return result;
// };

// /**
//  * Lấy tất cả descendant IDs của một menu
//  */
// const getDescendantIds = (items: Menu[], parentId: number): number[] => {
//   const ids: number[] = [];
//   const children = items.filter((item) => item.parentId === parentId);

//   children.forEach((child) => {
//     ids.push(child.id);
//     ids.push(...getDescendantIds(items, child.id));
//   });

//   return ids;
// };

// // ============ COMPONENT ============
// export default function MenuManagement() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState<MenuFormData>(initialFormData);
//   const [selectedId, setSelectedId] = useState<number | null>(null);
//   const [menus, setMenus] = useState<Menu[]>([]);
//   const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

//   //#region COMPUTED VALUES
//   // Build tree và flatten
//   const menuTree = useMemo(() => buildTree(menus), [menus]);
//   const flattenedMenus = useMemo(() => flattenTree(menuTree), [menuTree]);

//   // Filter by search
//   const filteredMenus = useMemo(() => {
//     if (!searchTerm) return flattenedMenus;

//     // Khi search, hiển thị flat list không theo tree
//     return menus
//       .filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
//       .map((m) => ({
//         ...m,
//         level: 0,
//         hasChildren: menus.some((child) => child.parentId === m.id),
//       }));
//   }, [flattenedMenus, menus, searchTerm]);

//   // Danh sách parent có thể chọn (loại trừ chính nó và descendants)
//   const availableParents = useMemo(() => {
//     if (!selectedId) return flattenedMenus;

//     const excludeIds = new Set([selectedId, ...getDescendantIds(menus, selectedId)]);
//     return flattenedMenus.filter((m) => !excludeIds.has(m.id));
//   }, [flattenedMenus, menus, selectedId]);
//   //#endregion

//   //#region API CALLS
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const menusData = await menuApi.getAllNoPaging();
//       setMenus(menusData);

//       // Expand all by default
//       const allIds = new Set(menusData.filter((m) => !m.parentId).map((m) => m.id));
//       setExpandedIds(allIds);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reloadMenus = async () => {
//     try {
//       const data = await menuApi.getAllNoPaging();
//       setMenus(data);
//     } catch (error) {
//       console.error("Error reloading menus:", error);
//     }
//   };
//   //#endregion

//   //#region HANDLERS
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     let newValue: string | number | boolean | null = value;

//     if (type === "checkbox") {
//       newValue = (e.target as HTMLInputElement).checked;
//     } else if (type === "number") {
//       newValue = parseInt(value) || 0;
//     } else if (name === "parentId") {
//       newValue = value === "" || value === "0" ? null : parseInt(value);
//     }

//     setFormData((prev) => ({ ...prev, [name]: newValue }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validate = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.title.trim()) {
//       newErrors.title = "Vui lòng nhập tiêu đề menu";
//     }

//     if (formData.sortOrder < 0) {
//       newErrors.sortOrder = "Thứ tự phải >= 0";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSelectRow = (menu: Menu) => {
//     setSelectedId(menu.id);
//     setIsEditing(true);
//     setFormData({
//       title: menu.title,
//       parentId: menu.parentId || null,
//       sortOrder: menu.sortOrder,
//       isActive: menu.isActive,
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
//         const existingMenu = menus.find((m) => m.id === selectedId);
//         const menuToUpdate: Menu = {
//           id: selectedId,
//           title: formData.title,
//           parentId: formData.parentId || null,
//           sortOrder: formData.sortOrder,
//           isActive: formData.isActive,
//           createdAt: existingMenu?.createdAt || new Date().toISOString(),
//         };
//         await menuApi.update(menuToUpdate);
//       } else {
//         await menuApi.create(formData);
//       }

//       await reloadMenus();
//       handleReset();
//     } catch (error) {
//       console.error("Error saving menu:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     const hasChildren = menus.some((m) => m.parentId === id);

//     if (hasChildren) {
//       alert("Không thể xóa menu có menu con. Vui lòng xóa menu con trước.");
//       return;
//     }

//     if (window.confirm("Bạn có chắc chắn muốn xóa menu này?")) {
//       try {
//         setLoading(true);
//         await menuApi.delete(id);
//         await reloadMenus();

//         if (selectedId === id) {
//           handleReset();
//         }
//       } catch (error) {
//         console.error("Error deleting menu:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const toggleExpand = (id: number) => {
//     setExpandedIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         next.add(id);
//       }
//       return next;
//     });
//   };

//   const expandAll = () => {
//     const allParentIds = menus.filter((m) => menus.some((c) => c.parentId === m.id)).map((m) => m.id);
//     setExpandedIds(new Set(allParentIds));
//   };

//   const collapseAll = () => {
//     setExpandedIds(new Set());
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN");
//   };

//   const getParentTitle = (parentId: number | null | undefined) => {
//     if (!parentId) return "—";
//     return menus.find((m) => m.id === parentId)?.title || "—";
//   };

//   // Check if menu should be visible (parent is expanded)
//   const isVisible = (menu: MenuTreeItem): boolean => {
//     if (menu.level === 0) return true;

//     // Find parent
//     const parent = menus.find((m) => m.id === menu.parentId);
//     if (!parent) return true;

//     // Check if all ancestors are expanded
//     let currentParentId = menu.parentId;
//     while (currentParentId) {
//       if (!expandedIds.has(currentParentId)) return false;
//       const currentParent = menus.find((m) => m.id === currentParentId);
//       currentParentId = currentParent?.parentId || null;
//     }

//     return true;
//   };

//   const visibleMenus = filteredMenus.filter(isVisible);
//   //#endregion

//   return (
//     <div className="space-y-6">
//       {/* ============ FORM SECTION ============ */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//           <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//             {isEditing ? "✏️ Cập nhật menu" : "➕ Thêm menu mới"}
//           </h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             {isEditing
//               ? `Đang chỉnh sửa: ${formData.title}`
//               : "Điền thông tin để thêm menu mới"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//             {/* Tiêu đề */}
//             <div className="lg:col-span-2">
//               <Label>
//                 Tiêu đề <span className="text-error-500">*</span>
//               </Label>
//               <Input
//                 name="title"
//                 type="text"
//                 placeholder="Nhập tiêu đề menu"
//                 value={formData.title}
//                 onChange={handleChange}
//                 error={!!errors.title}
//                 hint={errors.title || "Tên hiển thị của menu"}
//               />
//             </div>

//             {/* Menu cha */}
//             <div>
//               <Label>Menu cha</Label>
//               <select
//                 name="parentId"
//                 value={formData.parentId || ""}
//                 onChange={handleChange}
//                 className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
//               >
//                 <option value="">-- Không có (Menu gốc) --</option>
//                 {availableParents
//                   .filter((m) => m.isActive)
//                   .map((menu) => (
//                     <option key={menu.id} value={menu.id}>
//                       {"—".repeat(menu.level)} {menu.title}
//                     </option>
//                   ))}
//               </select>
//               <p className="mt-1.5 text-xs text-gray-500">
//                 Để trống nếu là menu cấp cao nhất
//               </p>
//             </div>

//             {/* Thứ tự */}
//             <div>
//               <Label>Thứ tự</Label>
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
//                   Hiển thị menu
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
//         <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//               📋 Cấu trúc menu
//             </h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Tổng: {menus.length} menu
//             </p>
//           </div>

//           <div className="flex items-center gap-3 flex-wrap">
//             {/* Expand/Collapse */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={expandAll}
//                 className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Mở rộng
//               </button>
//               <button
//                 onClick={collapseAll}
//                 className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Thu gọn
//               </button>
//             </div>

//             {/* Search */}
//             <div className="w-64">
//               <Input
//                 type="text"
//                 placeholder="🔍 Tìm kiếm menu..."
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
//                     Tiêu đề
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-left">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Menu cha
//                   </span>
//                 </th>
//                 <th className="px-4 py-3 text-center">
//                   <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
//                     Thứ tự
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
//               {loading && menus.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-10 text-center">
//                     <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
//                   </td>
//                 </tr>
//               ) : visibleMenus.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="px-5 py-10 text-center">
//                     <div className="flex flex-col items-center gap-2">
//                       <span className="text-4xl">📭</span>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {searchTerm ? "Không tìm thấy menu" : "Chưa có menu nào"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 visibleMenus.map((menu) => (
//                   <tr
//                     key={menu.id}
//                     className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
//                       selectedId === menu.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
//                     }`}
//                   >
//                     {/* Radio Select */}
//                     <td className="px-4 py-4">
//                       <input
//                         type="radio"
//                         name="selectedMenu"
//                         checked={selectedId === menu.id}
//                         onChange={() => handleSelectRow(menu)}
//                         className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
//                       />
//                     </td>

//                     {/* Title with indent */}
//                     <td className="px-4 py-4">
//                       <div
//                         className="flex items-center gap-2"
//                         style={{ paddingLeft: `${menu.level * 24}px` }}
//                       >
//                         {/* Expand/Collapse button */}
//                         {menu.hasChildren ? (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleExpand(menu.id);
//                             }}
//                             className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
//                           >
//                             {expandedIds.has(menu.id) ? (
//                               <span className="text-sm">▼</span>
//                             ) : (
//                               <span className="text-sm">▶</span>
//                             )}
//                           </button>
//                         ) : (
//                           <span className="w-6 h-6 flex items-center justify-center text-gray-300 dark:text-gray-600">
//                             •
//                           </span>
//                         )}

//                         {/* Icon based on level */}
//                         <span className="text-lg">
//                           {menu.level === 0 ? "📁" : menu.level === 1 ? "📄" : "📎"}
//                         </span>

//                         <span className="font-medium text-gray-800 dark:text-white/90">
//                           {menu.title}
//                         </span>

//                         {menu.hasChildren && (
//                           <span className="text-xs text-gray-400 dark:text-gray-500">
//                             ({menus.filter((m) => m.parentId === menu.id).length})
//                           </span>
//                         )}
//                       </div>
//                     </td>

//                     {/* Parent */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {getParentTitle(menu.parentId)}
//                       </span>
//                     </td>

//                     {/* Sort Order */}
//                     <td className="px-4 py-4 text-center">
//                       <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 text-sm font-medium dark:bg-gray-800 dark:text-gray-300">
//                         {menu.sortOrder}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-4 text-center">
//                       {menu.isActive ? (
//                         <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
//                           <CheckCircleIcon className="w-6 h-6" />
//                           <span className="text-xs">Hiện</span>
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 text-gray-400">
//                           <XIcon className="w-6 h-6" />
//                           <span className="text-xs">Ẩn</span>
//                         </span>
//                       )}
//                     </td>

//                     {/* Created At */}
//                     <td className="px-4 py-4">
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {formatDate(menu.createdAt)}
//                       </span>
//                     </td>

//                     {/* Delete Button */}
//                     <td className="px-4 py-4 text-center">
//                       <button
//                         onClick={() => handleDelete(menu.id)}
//                         disabled={loading || menu.hasChildren}
//                         className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
//                           menu.hasChildren
//                             ? "text-gray-300 cursor-not-allowed dark:text-gray-600"
//                             : "text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10"
//                         }`}
//                         title={
//                           menu.hasChildren
//                             ? "Không thể xóa menu có menu con"
//                             : "Xóa menu"
//                         }
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
//             Hiển thị {visibleMenus.length} / {menus.length} menu
//           </p>
//           <p className="text-xs text-gray-400 dark:text-gray-500">
//             💡 Click vào ▶ để mở rộng menu con
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }











"use client";

import React, { useState, useEffect, useMemo } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { Menu, MenuFormData, MenuTreeItem, SeoMetadata, SeoMetadataFormData } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { menuApi, seoMetadataApi } from "@/app/lib/api/index";

// ============ INITIAL FORM DATA ============
const initialFormData: MenuFormData = {
  title: "",
  parentId: null,
  sortOrder: 0,
  isActive: true,
};

const initialSeoData: SeoMetadataFormData = {
  pageType: "page",
  menuId: null,
  newsId: null,
  slug: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogType: "website",
  canonicalUrl: "",
  robots: "index,follow",
  schemaMarkup: "",
};

// ============ HELPER: Tạo slug từ tiếng Việt ============
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

// ============ TREE HELPERS ============
const buildTree = (items: Menu[], parentId: number | null = null): Menu[] => {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      ...item,
      children: buildTree(items, item.id),
    }));
};

const flattenTree = (items: Menu[], level: number = 0): MenuTreeItem[] => {
  const result: MenuTreeItem[] = [];
  items.forEach((item) => {
    const hasChildren = item.children && item.children.length > 0;
    result.push({ ...item, level, hasChildren: hasChildren || false });
    if (item.children && item.children.length > 0) {
      result.push(...flattenTree(item.children, level + 1));
    }
  });
  return result;
};

const getDescendantIds = (items: Menu[], parentId: number): number[] => {
  const ids: number[] = [];
  const children = items.filter((item) => item.parentId === parentId);
  children.forEach((child) => {
    ids.push(child.id);
    ids.push(...getDescendantIds(items, child.id));
  });
  return ids;
};

// ============ COMPONENT ============
export default function MenuManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<MenuFormData>(initialFormData);
  const [seoData, setSeoData] = useState<SeoMetadataFormData>(initialSeoData);
  const [existingSeoId, setExistingSeoId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  // SEO section
  const [showSeo, setShowSeo] = useState(false);
  const [seoAutoFill, setSeoAutoFill] = useState(true);

  //#region COMPUTED VALUES
  const menuTree = useMemo(() => buildTree(menus), [menus]);
  const flattenedMenus = useMemo(() => flattenTree(menuTree), [menuTree]);

  const filteredMenus = useMemo(() => {
    if (!searchTerm) return flattenedMenus;
    return menus
      .filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((m) => ({
        ...m,
        level: 0,
        hasChildren: menus.some((child) => child.parentId === m.id),
      }));
  }, [flattenedMenus, menus, searchTerm]);

  const availableParents = useMemo(() => {
    if (!selectedId) return flattenedMenus;
    const excludeIds = new Set([selectedId, ...getDescendantIds(menus, selectedId)]);
    return flattenedMenus.filter((m) => !excludeIds.has(m.id));
  }, [flattenedMenus, menus, selectedId]);
  //#endregion

  //#region API CALLS
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const menusData = await menuApi.getAllNoPaging();
      setMenus(menusData);
      const allIds = new Set(menusData.filter((m) => !m.parentId).map((m) => m.id));
      setExpandedIds(allIds);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadMenus = async () => {
    try {
      const data = await menuApi.getAllNoPaging();
      setMenus(data);
    } catch (error) {
      console.error("Error reloading menus:", error);
    }
  };
  //#endregion

  //#region HANDLERS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean | null = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = parseInt(value) || 0;
    } else if (name === "parentId") {
      newValue = value === "" || value === "0" ? null : parseInt(value);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Auto-fill SEO khi thay đổi title
    if (seoAutoFill && name === "title") {
      setSeoData((prev) => ({
        ...prev,
        metaTitle: String(newValue),
        ogTitle: String(newValue),
        slug: generateSlug(String(newValue)),
      }));
    }
  };

  // Handler cho SEO fields
  const handleSeoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({ ...prev, [name]: value }));

    // Nếu user tự sửa → tắt auto-fill
    if (["metaTitle", "slug"].includes(name)) {
      setSeoAutoFill(false);
    }

    if (errors[`seo_${name}`]) {
      setErrors((prev) => ({ ...prev, [`seo_${name}`]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề menu";
    }

    if (formData.sortOrder < 0) {
      newErrors.sortOrder = "Thứ tự phải >= 0";
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

  const handleSelectRow = async (menu: Menu) => {
    setSelectedId(menu.id);
    setIsEditing(true);
    setFormData({
      title: menu.title,
      parentId: menu.parentId || null,
      sortOrder: menu.sortOrder,
      isActive: menu.isActive,
    });
    setErrors({});

    // Load SEO data cho menu này
    try {
      const seo = await seoMetadataApi.getByMenuId(menu.id);
      if (seo) {
        const allSeo = await seoMetadataApi.getAll();
        const existingSeo = allSeo.find((s) => s.menuId === menu.id);

        setExistingSeoId(existingSeo?.id || null);
        setSeoData({
          pageType: "page",
          menuId: menu.id,
          newsId: null,
          slug: seo.slug || "",
          metaTitle: seo.metaTitle || "",
          metaDescription: seo.metaDescription || "",
          metaKeywords: seo.metaKeywords || "",
          ogTitle: seo.ogTitle || "",
          ogDescription: seo.ogDescription || "",
          ogImage: seo.ogImage || "",
          ogType: seo.ogType || "website",
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
          slug: generateSlug(menu.title),
          metaTitle: menu.title,
          ogTitle: menu.title,
          menuId: menu.id,
        });
        setSeoAutoFill(true);
      }
    } catch (error) {
      console.error("Error loading SEO data:", error);
      setExistingSeoId(null);
      setSeoData({
        ...initialSeoData,
        slug: generateSlug(menu.title),
        metaTitle: menu.title,
        ogTitle: menu.title,
        menuId: menu.id,
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      let savedMenuId: number | null = null;

      if (isEditing && selectedId) {
        const existingMenu = menus.find((m) => m.id === selectedId);
        const menuToUpdate: Menu = {
          id: selectedId,
          title: formData.title,
          parentId: formData.parentId || null,
          sortOrder: formData.sortOrder,
          isActive: formData.isActive,
          createdAt: existingMenu?.createdAt || new Date().toISOString(),
        };
        await menuApi.update(menuToUpdate);
        savedMenuId = selectedId;
      } else {
        const created = await menuApi.create(formData);
        savedMenuId = created?.id || null;
      }

      // Lưu SEO metadata nếu đang mở và có slug
      if (showSeo && seoData.slug.trim() && savedMenuId) {
        try {
          const seoPayload: SeoMetadataFormData = {
            ...seoData,
            pageType: "page",
            menuId: savedMenuId,
            newsId: null,
          };

          if (existingSeoId) {
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
            await seoMetadataApi.create(seoPayload);
          }
        } catch (seoError) {
          console.error("Error saving SEO metadata:", seoError);
        }
      }

      await reloadMenus();
      handleReset();
    } catch (error) {
      console.error("Error saving menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const hasChildren = menus.some((m) => m.parentId === id);

    if (hasChildren) {
      alert("Không thể xóa menu có menu con. Vui lòng xóa menu con trước.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa menu này?")) {
      try {
        setLoading(true);
        await menuApi.delete(id);
        // SEO cascade delete từ BE
        await reloadMenus();

        if (selectedId === id) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting menu:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const allParentIds = menus.filter((m) => menus.some((c) => c.parentId === m.id)).map((m) => m.id);
    setExpandedIds(new Set(allParentIds));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getParentTitle = (parentId: number | null | undefined) => {
    if (!parentId) return "—";
    return menus.find((m) => m.id === parentId)?.title || "—";
  };

  const isVisible = (menu: MenuTreeItem): boolean => {
    if (menu.level === 0) return true;
    let currentParentId = menu.parentId;
    while (currentParentId) {
      if (!expandedIds.has(currentParentId)) return false;
      const currentParent = menus.find((m) => m.id === currentParentId);
      currentParentId = currentParent?.parentId || null;
    }
    return true;
  };

  const visibleMenus = filteredMenus.filter(isVisible);
  //#endregion

  return (
    <div className="space-y-6">
      {/* ============ FORM SECTION ============ */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật menu" : "➕ Thêm menu mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing
              ? `Đang chỉnh sửa: ${formData.title}`
              : "Điền thông tin để thêm menu mới"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Tiêu đề */}
            <div className="lg:col-span-2">
              <Label>
                Tiêu đề <span className="text-error-500">*</span>
              </Label>
              <Input
                name="title"
                type="text"
                placeholder="Nhập tiêu đề menu"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                hint={errors.title || "Tên hiển thị của menu"}
              />
            </div>

            {/* Menu cha */}
            <div>
              <Label>Menu cha</Label>
              <select
                name="parentId"
                value={formData.parentId || ""}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 bg-transparent cursor-pointer border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
              >
                <option value="">-- Không có (Menu gốc) --</option>
                {availableParents
                  .filter((m) => m.isActive)
                  .map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {"—".repeat(menu.level)} {menu.title}
                    </option>
                  ))}
              </select>
              <p className="mt-1.5 text-xs text-gray-500">
                Để trống nếu là menu cấp cao nhất
              </p>
            </div>

            {/* Thứ tự */}
            <div>
              <Label>Thứ tự</Label>
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
                  Hiển thị menu
                </span>
              </label>
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
                    Thông tin SEO cho trang
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={seoAutoFill}
                      onChange={(e) => setSeoAutoFill(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tự động điền từ tiêu đề menu
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
                        placeholder="duong-dan-trang"
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
                      <p className="mt-1.5 text-xs text-gray-500">
                        VD: dich-vu, gioi-thieu, lien-he
                      </p>
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
                      (seoData.metaTitle?.length || 0) > 60 ? "text-amber-500" : "text-gray-500"
                    }`}>
                      {seoData.metaTitle?.length || 0}/70 ký tự
                      {(seoData.metaTitle?.length || 0) > 60 && " — nên rút ngắn"}
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
                      (seoData.metaDescription?.length || 0) > 155 ? "text-amber-500" : "text-gray-500"
                    }`}>
                      {seoData.metaDescription?.length || 0}/160 ký tự
                      {(seoData.metaDescription?.length || 0) > 155 && " — nên rút ngắn"}
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
                    <p className="mt-1.5 text-xs text-gray-500">Phân cách bằng dấu phẩy</p>
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
                    <p className="mt-1.5 text-xs text-gray-500">Để trống sẽ dùng Meta Title</p>
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
                    <p className="mt-1.5 text-xs text-gray-500">Ảnh hiển thị khi share Facebook/Zalo</p>
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
                    <p className="mt-1.5 text-xs text-gray-500">Để trống sẽ dùng Meta Description</p>
                  </div>

                  {/* Canonical URL */}
                  <div className="lg:col-span-2">
                    <Label>Canonical URL</Label>
                    <input
                      name="canonicalUrl"
                      type="text"
                      placeholder="https://yourdomain.com/trang"
                      value={seoData.canonicalUrl}
                      onChange={handleSeoChange}
                      className="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">URL chính thức (tránh trùng lặp nội dung)</p>
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
                    <p className="mt-1.5 text-xs text-gray-500">Hướng dẫn Google crawl trang</p>
                  </div>
                </div>

                {/* SEO Preview */}
                {(seoData.metaTitle || formData.title) && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
                      Xem trước trên Google
                    </p>
                    <div className="space-y-1">
                      <p className="text-blue-700 dark:text-blue-400 text-lg leading-tight truncate">
                        {seoData.metaTitle || formData.title || "Tiêu đề trang"}
                      </p>
                      <p className="text-green-700 dark:text-green-500 text-sm truncate">
                        yourdomain.com/{seoData.slug || "slug-trang"}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {seoData.metaDescription || "Mô tả trang sẽ hiển thị ở đây..."}
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
              📋 Cấu trúc menu
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tổng: {menus.length} menu
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              >
                Mở rộng
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              >
                Thu gọn
              </button>
            </div>

            <div className="w-64">
              <Input
                type="text"
                placeholder="🔍 Tìm kiếm menu..."
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
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Tiêu đề</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Menu cha</span>
                </th>
                <th className="px-4 py-3 text-center">
                  <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">SEO</span>
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
              {loading && menus.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </td>
                </tr>
              ) : visibleMenus.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">📭</span>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchTerm ? "Không tìm thấy menu" : "Chưa có menu nào"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleMenus.map((menu) => (
                  <tr
                    key={menu.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${
                      selectedId === menu.id ? "bg-brand-50 dark:bg-brand-500/10" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="radio"
                        name="selectedMenu"
                        checked={selectedId === menu.id}
                        onChange={() => handleSelectRow(menu)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${menu.level * 24}px` }}
                      >
                        {menu.hasChildren ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(menu.id);
                            }}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            {expandedIds.has(menu.id) ? (
                              <span className="text-sm">▼</span>
                            ) : (
                              <span className="text-sm">▶</span>
                            )}
                          </button>
                        ) : (
                          <span className="w-6 h-6 flex items-center justify-center text-gray-300 dark:text-gray-600">
                            •
                          </span>
                        )}

                        <span className="text-lg">
                          {menu.level === 0 ? "📁" : menu.level === 1 ? "📄" : "📎"}
                        </span>

                        <span className="font-medium text-gray-800 dark:text-white/90">
                          {menu.title}
                        </span>

                        {menu.hasChildren && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            ({menus.filter((m) => m.parentId === menu.id).length})
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getParentTitle(menu.parentId)}
                      </span>
                    </td>

                    {/* SEO status */}
                    <td className="px-4 py-4 text-center">
                      <SeoStatusBadge menuId={menu.id} />
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800 text-sm font-medium dark:bg-gray-800 dark:text-gray-300">
                        {menu.sortOrder}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      {menu.isActive ? (
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
                        {formatDate(menu.createdAt)}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(menu.id)}
                        disabled={loading || menu.hasChildren}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                          menu.hasChildren
                            ? "text-gray-300 cursor-not-allowed dark:text-gray-600"
                            : "text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10"
                        }`}
                        title={
                          menu.hasChildren
                            ? "Không thể xóa menu có menu con"
                            : "Xóa menu"
                        }
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
            Hiển thị {visibleMenus.length} / {menus.length} menu
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            💡 Click vào ▶ để mở rộng menu con
          </p>
        </div>
      </div>
    </div>
  );
}

// ============ SEO STATUS BADGE COMPONENT ============
function SeoStatusBadge({ menuId }: { menuId: number }) {
  const [hasSeo, setHasSeo] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const seo = await seoMetadataApi.getByMenuId(menuId);
        if (mounted) setHasSeo(!!seo);
      } catch {
        if (mounted) setHasSeo(false);
      }
    };
    check();
    return () => { mounted = false; };
  }, [menuId]);

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