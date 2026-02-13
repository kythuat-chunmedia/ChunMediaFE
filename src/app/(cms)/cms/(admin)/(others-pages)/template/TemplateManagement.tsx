// "use client";
// import React, { useState, useEffect } from "react";
// import Label from "@/app/components/cms/form/Label";
// import Input from "@/app/components/cms/form/input/InputField";
// import {
//     TemplateListItem,
//     TemplateFormData,
//     TemplateScreenshotFormData,
//     TemplateCategory,
// } from "@/app/types";
// import {
//     PlusIcon,
//     PencilIcon,
//     TrashBinIcon,
//     CheckCircleIcon,
//     XIcon,
// } from "../../../icons";
// import { templateApi, categoryTemplateApi } from "@/app/lib/api/index";
// import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// const DEVICE_OPTIONS = [
//     { value: "desktop", label: "Desktop", width: 1440, height: 900 },
//     { value: "tablet", label: "Tablet", width: 768, height: 1024 },
//     { value: "mobile", label: "Mobile", width: 375, height: 812 },
// ];

// const EMPTY_SCREENSHOT: TemplateScreenshotFormData = {
//     id: 0, imageUrl: "", label: "", device: "desktop", width: 1440, height: 900, sortOrder: 0,
// };

// const initialFormData: TemplateFormData = {
//     name: "", categoryTemplateId: 0, categoryName: "", description: "", longDescription: "", image: "",
//     pages: 1, isResponsive: true, isPopular: false, tags: "", features: "", techStack: "",
//     demoUrl: "", version: "1.0.0", metaTitle: "", metaDescription: "", ogImage: "",
//     sortOrder: 0, isActive: true, screenshots: [],
// };

// const toJsonString = (text: string): string => {
//     if (!text.trim()) return "";
//     return JSON.stringify(text.split(",").map((s) => s.trim()).filter(Boolean));
// };
// const fromJsonString = (jsonStr: string | null | undefined): string => {
//     if (!jsonStr) return "";
//     try { const p = JSON.parse(jsonStr); return Array.isArray(p) ? p.join(", ") : ""; }
//     catch { return jsonStr.split(",").map((s) => s.trim()).filter(Boolean).join(", "); }
// };

// export default function TemplateManagement() {
//     const [isEditing, setIsEditing] = useState(false);
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterCategoryId, setFilterCategoryId] = useState<string>("");
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState<TemplateFormData>(initialFormData);
//     const [selectedId, setSelectedId] = useState<number | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [uploadingSS, setUploadingSS] = useState<number | null>(null);
//     const [templates, setTemplates] = useState<TemplateListItem[]>([]);
//     const [categories, setCategories] = useState<TemplateCategory[]>([]);
//     const [activeTab, setActiveTab] = useState<"basic" | "content" | "screenshots" | "seo">("basic");
//     const [tagsDisplay, setTagsDisplay] = useState("");
//     const [featuresDisplay, setFeaturesDisplay] = useState("");
//     const [techStackDisplay, setTechStackDisplay] = useState("");

//     useEffect(() => { fetchData(); }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const [td, cd] = await Promise.all([templateApi.getAllNoPaging(), categoryTemplateApi.getAllNoPaging()]);
//             setTemplates(td); setCategories(cd);
//         } catch (e) { console.error("Error fetching:", e); } finally { setLoading(false); }
//     };
//     const reloadData = async () => {
//         try { setTemplates(await templateApi.getAllNoPaging()); } catch (e) { console.error(e); }
//     };

//     const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.name ?? "";
//     const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

//     const filteredTemplates = templates
//         .filter((t) => {
//             const ms = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
//             const mc = !filterCategoryId || t.categoryTemplateId === parseInt(filterCategoryId);
//             return ms && mc;
//         }).sort((a, b) => a.sortOrder - b.sortOrder);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         let v: string | number | boolean = value;
//         if (type === "checkbox") v = (e.target as HTMLInputElement).checked;
//         else if (type === "number" || name === "categoryTemplateId") v = parseInt(value) || 0;
//         setFormData((p) => ({ ...p, [name]: v }));
//         if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
//     };

//     const validate = (): boolean => {
//         const ne: Record<string, string> = {};
//         if (!formData.name.trim()) ne.name = "Vui lòng nhập tên template";
//         if (!formData.categoryTemplateId || formData.categoryTemplateId <= 0) ne.categoryTemplateId = "Vui lòng chọn danh mục";
//         if (!formData.description.trim()) ne.description = "Vui lòng nhập mô tả ngắn";
//         if (!formData.image.trim()) ne.image = "Vui lòng chọn hình ảnh cover";
//         if (formData.pages < 1) ne.pages = "Số trang phải >= 1";
//         if (formData.sortOrder < 0) ne.sortOrder = "Thứ tự phải >= 0";
//         setErrors(ne); return Object.keys(ne).length === 0;
//     };

//     const handleSelectRow = async (item: TemplateListItem) => {
//         try {
//             const d = await templateApi.getById(item.id);
//             if (!d) return;
//             setSelectedId(d.id); setIsEditing(true);
//             setTagsDisplay(fromJsonString(d.tags)); setFeaturesDisplay(fromJsonString(d.features)); setTechStackDisplay(fromJsonString(d.techStack));
//             setFormData({
//                 name: d.name, categoryTemplateId: d.categoryTemplateId, categoryName: d.categoryName, description: d.description,
//                 longDescription: d.longDescription || "", image: d.image, pages: d.pages,
//                 isResponsive: d.isResponsive, isPopular: d.isPopular, tags: d.tags || "",
//                 features: d.features || "", techStack: d.techStack || "", demoUrl: d.demoUrl || "",
//                 version: d.version || "1.0.0", metaTitle: d.metaTitle || "", metaDescription: d.metaDescription || "",
//                 ogImage: d.ogImage || "", sortOrder: d.sortOrder, isActive: d.isActive,
//                 screenshots: d.screenshots?.map((s) => ({ id: s.id, imageUrl: s.imageUrl, label: s.label || "", device: s.device, width: s.width, height: s.height, sortOrder: s.sortOrder })) || [],
//             });
//             setErrors({}); setActiveTab("basic"); window.scrollTo({ top: 0, behavior: "smooth" });
//         } catch (e) { console.error("Error loading:", e); }
//     };

//     const handleReset = () => {
//         setSelectedId(null); setIsEditing(false); setFormData(initialFormData);
//         setTagsDisplay(""); setFeaturesDisplay(""); setTechStackDisplay("");
//         setErrors({}); setActiveTab("basic");
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!validate()) { setActiveTab("basic"); return; }
//         try {
//             setLoading(true);
//             const sd: TemplateFormData = { ...formData, tags: toJsonString(tagsDisplay), features: toJsonString(featuresDisplay), techStack: toJsonString(techStackDisplay) };
//             if (isEditing && selectedId) await templateApi.update({
//                 id: selectedId, ...sd,
//                 slug: "",
//                 viewCount: 0,
//                 createdAt: ""
//             });
//             else await templateApi.create(sd);
//             await reloadData(); handleReset();
//         } catch (e) { console.error("Error saving:", e); } finally { setLoading(false); }
//     };

//     const handleDelete = async (id: number) => {
//         if (!window.confirm("Bạn có chắc chắn muốn xóa template này?")) return;
//         try { 
//             setLoading(true); 
//             await templateApi.delete(id); 
//             await reloadData(); 
//             if (selectedId === id) 
//                 handleReset(); 
//         }
//         catch (e) { 
//             console.error(e); 
//         } finally { 
//             setLoading(false); 
//         }
//     };

//     const addScreenshot = () => setFormData((p) => ({ ...p, screenshots: [...p.screenshots, { ...EMPTY_SCREENSHOT, sortOrder: p.screenshots.length }] }));
//     const removeScreenshot = (i: number) => setFormData((p) => ({ ...p, screenshots: p.screenshots.filter((_, idx) => idx !== i) }));
//     const updateScreenshot = (i: number, field: string, value: string | number) => {
//         setFormData((p) => ({
//             ...p, screenshots: p.screenshots.map((s, idx) => {
//                 if (idx !== i) return s;
//                 if (field === "device") { const dv = DEVICE_OPTIONS.find((d) => d.value === value); return { ...s, device: value as string, width: dv?.width || s.width, height: dv?.height || s.height }; }
//                 return { ...s, [field]: value };
//             })
//         }));
//     };
//     const handleUploadScreenshot = async (index: number, file: File) => {
//         if (file.size > 5 * 1024 * 1024) { alert("File quá lớn! Tối đa 5MB"); return; }
//         try { setUploadingSS(index); const r = await uploadApi.uploadImage(file, "templates/screenshots"); if (r.success && r.url) updateScreenshot(index, "imageUrl", r.url as string); else alert(r.message || "Upload thất bại"); }
//         catch (e) { console.error(e); alert("Không thể upload hình ảnh"); } finally { setUploadingSS(null); }
//     };

//     return (
//         <div className="space-y-6">
//             {/* ============ FORM SECTION ============ */}
//             <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//                 <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//                         {isEditing ? "✏️ Cập nhật template" : "➕ Thêm template mới"}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                         {isEditing ? `Đang chỉnh sửa: ${formData.name}` : "Điền thông tin để thêm template mới"}
//                     </p>
//                 </div>

//                 <div className="px-5 pt-4 flex gap-1 border-b border-gray-200 dark:border-gray-800">
//                     {[
//                         { key: "basic", label: "📋 Thông tin cơ bản" },
//                         { key: "content", label: "📝 Nội dung & Tags" },
//                         { key: "screenshots", label: "🖼️ Screenshots" },
//                         { key: "seo", label: "🔍 SEO" },
//                     ].map((tab) => (
//                         <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key as typeof activeTab)}
//                             className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.key ? "bg-brand-50 text-brand-600 border-b-2 border-brand-500 dark:bg-brand-500/10 dark:text-brand-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}>
//                             {tab.label}
//                         </button>
//                     ))}
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-5">
//                     {/* ── TAB: Basic ── */}
//                     {activeTab === "basic" && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                             <div className="lg:col-span-2">
//                                 <Label>Tên template <span className="text-error-500">*</span></Label>
//                                 <Input name="name" type="text" placeholder="VD: Minh Khang Agency" value={formData.name} onChange={handleChange} error={!!errors.name} hint={errors.name || "Tên hiển thị của template"} />
//                             </div>

//                             {/* Danh mục — từ API */}
//                             <div>
//                                 <Label>Danh mục <span className="text-error-500">*</span></Label>
//                                 <select name="categoryTemplateId" value={formData.categoryTemplateId} onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.categoryTemplateId ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`}>
//                                     <option value="0">-- Chọn danh mục --</option>
//                                     {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
//                                 </select>
//                                 {errors.categoryTemplateId && <p className="mt-1.5 text-xs text-error-500">{errors.categoryTemplateId}</p>}
//                             </div>

//                             <div className="lg:col-span-3">
//                                 <Label>Mô tả ngắn <span className="text-error-500">*</span></Label>
//                                 <textarea name="description" rows={2} placeholder="Mô tả ngắn gọn về template..." value={formData.description} onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.description ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`} />
//                                 {errors.description && <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>}
//                             </div>

//                             <div>
//                                 <Label>Số trang</Label>
//                                 <Input name="pages" type="number" placeholder="1" min="1" value={formData.pages} onChange={handleChange} error={!!errors.pages} hint={errors.pages || "Số trang của template"} />
//                             </div>
//                             <div>
//                                 <Label>Phiên bản</Label>
//                                 <Input name="version" type="text" placeholder="1.0.0" value={formData.version} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <Label>Thứ tự hiển thị</Label>
//                                 <Input name="sortOrder" type="number" placeholder="0" min="0" value={formData.sortOrder} onChange={handleChange} error={!!errors.sortOrder} hint={errors.sortOrder || "Số nhỏ hiển thị trước"} />
//                             </div>
//                             <div className="lg:col-span-2">
//                                 <Label>Demo URL</Label>
//                                 <Input name="demoUrl" type="text" placeholder="/demos/minh-khang-agency/ hoặc https://..." value={formData.demoUrl} onChange={handleChange} hint="Đường dẫn đến trang demo iframe" />
//                             </div>

//                             <div className="flex items-center gap-6">
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800" />
//                                     <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị</span>
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800" />
//                                     <span className="text-sm text-gray-700 dark:text-gray-300">⭐ Nổi bật</span>
//                                 </label>
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input type="checkbox" name="isResponsive" checked={formData.isResponsive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800" />
//                                     <span className="text-sm text-gray-700 dark:text-gray-300">📱 Responsive</span>
//                                 </label>
//                             </div>

//                             {/* Hình ảnh Cover */}
//                             <div className="lg:col-span-3">
//                                 <Label>Hình ảnh cover <span className="text-error-500">*</span></Label>
//                                 <div className="flex items-start gap-4">
//                                     <div className="flex-1">
//                                         <input type="file" accept="image/*" disabled={uploading}
//                                             onChange={async (e) => {
//                                                 const file = e.target.files?.[0]; if (!file) return;
//                                                 if (file.size > 5 * 1024 * 1024) { alert("File quá lớn! Tối đa 5MB"); return; }
//                                                 try { setUploading(true); const r = await uploadApi.uploadImage(file, "templates"); if (r.success && r.url) setFormData((p) => ({ ...p, image: r.url as string })); else alert(r.message || "Upload thất bại"); }
//                                                 catch { alert("Không thể upload hình ảnh"); } finally { setUploading(false); }
//                                             }}
//                                             className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${errors.image ? "border border-error-500 rounded-lg" : ""} ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} />
//                                         {uploading && <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>}
//                                         {errors.image && <p className="mt-1.5 text-xs text-error-500">{errors.image}</p>}
//                                         {!errors.image && !uploading && <p className="mt-1.5 text-xs text-gray-500">JPG, PNG, WEBP (Tối đa 5MB) — Khuyến nghị: 800×500px</p>}
//                                     </div>
//                                     {formData.image && (
//                                         <div className="relative">
//                                             <img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
//                                             <button type="button" onClick={() => setFormData((p) => ({ ...p, image: "" }))} className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600">×</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* ── TAB: Content ── */}
//                     {activeTab === "content" && (
//                         <div className="grid grid-cols-1 gap-5">
//                             <div>
//                                 <Label>Mô tả chi tiết</Label>
//                                 <textarea name="longDescription" rows={4} placeholder="Mô tả đầy đủ về template..." value={formData.longDescription} onChange={handleChange}
//                                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
//                             </div>
//                             <div>
//                                 <Label>Tags</Label>
//                                 <Input type="text" placeholder="Agency, Marketing, Sáng tạo" value={tagsDisplay} onChange={(e) => setTagsDisplay(e.target.value)} hint="Nhập các tag cách nhau bởi dấu phẩy" />
//                                 {tagsDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{tagsDisplay.split(",").map((tag, i) => tag.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">{tag.trim()}</span> : null)}</div>}
//                             </div>
//                             <div>
//                                 <Label>Tính năng</Label>
//                                 <textarea rows={3} placeholder="Parallax scrolling, Portfolio gallery, Contact form" value={featuresDisplay} onChange={(e) => setFeaturesDisplay(e.target.value)}
//                                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
//                                 <p className="mt-1.5 text-xs text-gray-500">Liệt kê tính năng cách nhau bởi dấu phẩy</p>
//                             </div>
//                             <div>
//                                 <Label>Tech Stack</Label>
//                                 <Input type="text" placeholder="NextJS 14, TailwindCSS, TypeScript" value={techStackDisplay} onChange={(e) => setTechStackDisplay(e.target.value)} hint="Công nghệ sử dụng, cách nhau bởi dấu phẩy" />
//                                 {techStackDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{techStackDisplay.split(",").map((t, i) => t.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t.trim()}</span> : null)}</div>}
//                             </div>
//                         </div>
//                     )}

//                     {/* ── TAB: Screenshots ── */}
//                     {activeTab === "screenshots" && (
//                         <div className="space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">{formData.screenshots.length} screenshot(s)</p>
//                                 <button type="button" onClick={addScreenshot} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20">
//                                     <PlusIcon className="w-4 h-4" /> Thêm screenshot
//                                 </button>
//                             </div>
//                             {formData.screenshots.length === 0 && (
//                                 <div className="py-10 text-center">
//                                     <span className="text-4xl">📷</span>
//                                     <p className="text-gray-500 dark:text-gray-400 mt-2">Chưa có screenshot nào.</p>
//                                 </div>
//                             )}
//                             {formData.screenshots.map((ss, index) => (
//                                 <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Screenshot #{index + 1}</span>
//                                         <button type="button" onClick={() => removeScreenshot(index)} className="p-1.5 text-error-500 hover:bg-error-50 rounded-lg dark:hover:bg-error-500/10"><TrashBinIcon className="w-4 h-4" /></button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//                                         <div>
//                                             <Label>Device</Label>
//                                             <select value={ss.device} onChange={(e) => updateScreenshot(index, "device", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">
//                                                 {DEVICE_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label} ({d.width}×{d.height})</option>)}
//                                             </select>
//                                         </div>
//                                         <div>
//                                             <Label>Label</Label>
//                                             <input type="text" placeholder="Trang chủ — Desktop" value={ss.label} onChange={(e) => updateScreenshot(index, "label", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" />
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <div className="flex-1"><Label>Width</Label><input type="number" value={ss.width} onChange={(e) => updateScreenshot(index, "width", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
//                                             <div className="flex-1"><Label>Height</Label><input type="number" value={ss.height} onChange={(e) => updateScreenshot(index, "height", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
//                                         </div>
//                                         <div><Label>Thứ tự</Label><input type="number" min="0" value={ss.sortOrder} onChange={(e) => updateScreenshot(index, "sortOrder", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
//                                     </div>
//                                     <div className="flex items-start gap-3">
//                                         <div className="flex-1">
//                                             <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadScreenshot(index, f); }} disabled={uploadingSS === index}
//                                                 className={`block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-brand-50 file:text-brand-700 ${uploadingSS === index ? "opacity-50" : ""}`} />
//                                             {uploadingSS === index && <p className="mt-1 text-xs text-brand-500">Đang upload...</p>}
//                                         </div>
//                                         {ss.imageUrl && <img src={ss.imageUrl} alt={ss.label || `SS ${index + 1}`} className="w-20 h-12 object-cover rounded border border-gray-200 dark:border-gray-700" />}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* ── TAB: SEO ── */}
//                     {activeTab === "seo" && (
//                         <div className="grid grid-cols-1 gap-5">
//                             <div><Label>Meta Title</Label><Input name="metaTitle" type="text" placeholder="Tiêu đề SEO" value={formData.metaTitle} onChange={handleChange} hint={`${formData.metaTitle.length}/70 ký tự`} /></div>
//                             <div>
//                                 <Label>Meta Description</Label>
//                                 <textarea name="metaDescription" rows={3} placeholder="Mô tả SEO" value={formData.metaDescription} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
//                                 <p className="mt-1.5 text-xs text-gray-500">{formData.metaDescription.length}/160 ký tự</p>
//                             </div>
//                             <div><Label>OG Image URL</Label><Input name="ogImage" type="text" placeholder="URL ảnh khi chia sẻ social" value={formData.ogImage} onChange={handleChange} /></div>
//                             <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
//                                 <p className="text-xs text-gray-500 mb-2">🔍 Google Preview:</p>
//                                 <div className="space-y-1">
//                                     <p className="text-[#1a0dab] text-lg leading-tight truncate">{formData.metaTitle || formData.name || "Tên template"}</p>
//                                     <p className="text-green-700 text-sm truncate dark:text-green-400">templatehub.vn/portfolio/{formData.name ? formData.name.toLowerCase().replace(/\s+/g, "-") : "slug"}</p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{formData.metaDescription || formData.description || "Mô tả template..."}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Form Actions */}
//                     <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
//                         <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
//                             {isEditing ? <><PencilIcon className="w-4 h-4" />{loading ? "Đang cập nhật..." : "Cập nhật"}</> : <><PlusIcon className="w-4 h-4" />{loading ? "Đang thêm..." : "Thêm mới"}</>}
//                         </button>
//                         <button type="button" onClick={handleReset} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Làm mới</button>
//                     </div>
//                 </form>
//             </div>

//             {/* ============ TABLE SECTION ============ */}
//             <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//                 <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">🎨 Danh sách template</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tổng: {filteredTemplates.length} template</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <select value={filterCategoryId} onChange={(e) => setFilterCategoryId(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">
//                             <option value="">Tất cả danh mục</option>
//                             {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
//                         </select>
//                         <div className="w-64"><Input type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                                 {["Chọn", "Ảnh", "Tên / Slug", "Danh mục", "Trang", "Lượt xem", "Trạng thái", "Ngày tạo", "Xóa"].map((h, i) => (
//                                     <th key={i} className={`px-4 py-3 ${["Trang", "Lượt xem", "Trạng thái", "Xóa"].includes(h) ? "text-center" : "text-left"}`}>
//                                         <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{h}</span>
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                             {loading && templates.length === 0 ? (
//                                 <tr><td colSpan={9} className="px-5 py-10 text-center"><p className="text-gray-500 dark:text-gray-400">Đang tải...</p></td></tr>
//                             ) : filteredTemplates.length === 0 ? (
//                                 <tr><td colSpan={9} className="px-5 py-10 text-center">
//                                     <div className="flex flex-col items-center gap-2">
//                                         <span className="text-4xl">📭</span>
//                                         <p className="text-gray-500 dark:text-gray-400">{searchTerm || filterCategoryId ? "Không tìm thấy template" : "Chưa có template nào"}</p>
//                                     </div>
//                                 </td></tr>
//                             ) : (
//                                 filteredTemplates.map((t) => (
//                                     <tr key={t.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === t.id ? "bg-brand-50 dark:bg-brand-500/10" : ""}`}>
//                                         <td className="px-4 py-4">
//                                             <input type="radio" name="selectedTemplate" checked={selectedId === t.id} onChange={() => handleSelectRow(t)} className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer" />
//                                         </td>
//                                         <td className="px-4 py-4">
//                                             <div className="w-20 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
//                                                 {t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">IMG</span>}
//                                             </div>
//                                         </td>
//                                         <td className="px-4 py-4">
//                                             <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">{t.name}</p>
//                                             <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">/{t.slug}</p>
//                                             {t.isPopular && <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400 mt-1">⭐ Nổi bật</span>}
//                                         </td>
//                                         <td className="px-4 py-4">
//                                             <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
//                                                 {t.categoryName || getCategoryName(t.categoryTemplateId)}
//                                             </span>
//                                         </td>
//                                         <td className="px-4 py-4 text-center"><span className="text-sm text-gray-700 dark:text-gray-300">{t.pages}</span></td>
//                                         <td className="px-4 py-4 text-center"><span className="text-sm text-gray-600 dark:text-gray-400">{t.viewCount.toLocaleString("vi-VN")}</span></td>
//                                         <td className="px-4 py-4 text-center">
//                                             {t.isActive
//                                                 ? <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400"><CheckCircleIcon className="w-6 h-6" /><span className="text-xs">Hiện</span></span>
//                                                 : <span className="inline-flex items-center gap-1 text-gray-400"><XIcon className="w-6 h-6" /><span className="text-xs">Ẩn</span></span>}
//                                         </td>
//                                         <td className="px-4 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(t.createdAt)}</span></td>
//                                         <td className="px-4 py-4 text-center">
//                                             <button onClick={() => handleDelete(t.id)} disabled={loading} className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50" title="Xóa template"><TrashBinIcon className="w-5 h-5" /></button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị {filteredTemplates.length} template</p>
//                 </div>
//             </div>
//         </div>
//     );
// }











// "use client";
// import React, { useState, useEffect } from "react";
// import Label from "@/app/components/cms/form/Label";
// import Input from "@/app/components/cms/form/input/InputField";
// import {
//     TemplateListItem,
//     TemplateFormData,
//     TemplateScreenshotFormData,
//     TemplateCategory,
// } from "@/app/types";
// import {
//     PlusIcon,
//     PencilIcon,
//     TrashBinIcon,
//     CheckCircleIcon,
//     XIcon,
// } from "../../../icons";
// import { templateApi, categoryTemplateApi } from "@/app/lib/api/index";
// import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

// const DEVICE_OPTIONS = [
//     { value: "desktop", label: "Desktop", width: 1440, height: 900 },
//     { value: "tablet", label: "Tablet", width: 768, height: 1024 },
//     { value: "mobile", label: "Mobile", width: 375, height: 812 },
// ];

// const EMPTY_SCREENSHOT: TemplateScreenshotFormData = {
//     id: 0, imageUrl: "", label: "", device: "desktop", width: 1440, height: 900, sortOrder: 0,
// };

// const initialFormData: TemplateFormData = {
//     name: "", categoryTemplateId: 0, categoryName: "", description: "", longDescription: "", image: "",
//     pages: 1, isResponsive: true, isPopular: false, tags: "", features: "", techStack: "",
//     demoUrl: "", version: "1.0.0", metaTitle: "", metaDescription: "", ogImage: "",
//     sortOrder: 0, isActive: true, screenshots: [],
// };

// const toJsonString = (text: string): string => {
//     if (!text.trim()) return "";
//     return JSON.stringify(text.split(",").map((s) => s.trim()).filter(Boolean));
// };
// const fromJsonString = (jsonStr: string | null | undefined): string => {
//     if (!jsonStr) return "";
//     try { const p = JSON.parse(jsonStr); return Array.isArray(p) ? p.join(", ") : ""; }
//     catch { return jsonStr.split(",").map((s) => s.trim()).filter(Boolean).join(", "); }
// };

// export default function TemplateManagement() {
//     const [isEditing, setIsEditing] = useState(false);
//     const [errors, setErrors] = useState<Record<string, string>>({});
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterCategoryId, setFilterCategoryId] = useState<string>("");
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState<TemplateFormData>(initialFormData);
//     const [selectedId, setSelectedId] = useState<number | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [uploadingSS, setUploadingSS] = useState<number | null>(null);
//     const [uploadingDemo, setUploadingDemo] = useState(false);
//     const [demoInfo, setDemoInfo] = useState<{ fileCount: number; totalSizeKB: number } | null>(null);
//     const [templates, setTemplates] = useState<TemplateListItem[]>([]);
//     const [categories, setCategories] = useState<TemplateCategory[]>([]);
//     const [activeTab, setActiveTab] = useState<"basic" | "content" | "screenshots" | "seo">("basic");
//     const [tagsDisplay, setTagsDisplay] = useState("");
//     const [featuresDisplay, setFeaturesDisplay] = useState("");
//     const [techStackDisplay, setTechStackDisplay] = useState("");

//     useEffect(() => { fetchData(); }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const [td, cd] = await Promise.all([templateApi.getAllNoPaging(), categoryTemplateApi.getAllNoPaging()]);
//             setTemplates(td); setCategories(cd);
//         } catch (e) { console.error("Error fetching:", e); } finally { setLoading(false); }
//     };
//     const reloadData = async () => {
//         try { setTemplates(await templateApi.getAllNoPaging()); } catch (e) { console.error(e); }
//     };

//     const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.name ?? "";
//     const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

//     const filteredTemplates = templates
//         .filter((t) => {
//             const ms = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
//             const mc = !filterCategoryId || t.categoryTemplateId === parseInt(filterCategoryId);
//             return ms && mc;
//         }).sort((a, b) => a.sortOrder - b.sortOrder);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         let v: string | number | boolean = value;
//         if (type === "checkbox") v = (e.target as HTMLInputElement).checked;
//         else if (type === "number" || name === "categoryTemplateId") v = parseInt(value) || 0;
//         setFormData((p) => ({ ...p, [name]: v }));
//         if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
//     };

//     const validate = (): boolean => {
//         const ne: Record<string, string> = {};
//         if (!formData.name.trim()) ne.name = "Vui lòng nhập tên template";
//         if (!formData.categoryTemplateId || formData.categoryTemplateId <= 0) ne.categoryTemplateId = "Vui lòng chọn danh mục";
//         if (!formData.description.trim()) ne.description = "Vui lòng nhập mô tả ngắn";
//         if (!formData.image.trim()) ne.image = "Vui lòng chọn hình ảnh cover";
//         if (formData.pages < 1) ne.pages = "Số trang phải >= 1";
//         if (formData.sortOrder < 0) ne.sortOrder = "Thứ tự phải >= 0";
//         setErrors(ne); return Object.keys(ne).length === 0;
//     };

//     const handleSelectRow = async (item: TemplateListItem) => {
//         try {
//             const d = await templateApi.getById(item.id);
//             if (!d) return;
//             setSelectedId(d.id); setIsEditing(true); setDemoInfo(null);
//             setTagsDisplay(fromJsonString(d.tags)); setFeaturesDisplay(fromJsonString(d.features)); setTechStackDisplay(fromJsonString(d.techStack));
//             setFormData({
//                 name: d.name, categoryTemplateId: d.categoryTemplateId, categoryName: d.categoryName, description: d.description,
//                 longDescription: d.longDescription || "", image: d.image, pages: d.pages,
//                 isResponsive: d.isResponsive, isPopular: d.isPopular, tags: d.tags || "",
//                 features: d.features || "", techStack: d.techStack || "", demoUrl: d.demoUrl || "",
//                 version: d.version || "1.0.0", metaTitle: d.metaTitle || "", metaDescription: d.metaDescription || "",
//                 ogImage: d.ogImage || "", sortOrder: d.sortOrder, isActive: d.isActive,
//                 screenshots: d.screenshots?.map((s) => ({ id: s.id, imageUrl: s.imageUrl, label: s.label || "", device: s.device, width: s.width, height: s.height, sortOrder: s.sortOrder })) || [],
//             });
//             setErrors({}); setActiveTab("basic"); window.scrollTo({ top: 0, behavior: "smooth" });
//         } catch (e) { console.error("Error loading:", e); }
//     };

//     const handleReset = () => {
//         setSelectedId(null); setIsEditing(false); setFormData(initialFormData);
//         setTagsDisplay(""); setFeaturesDisplay(""); setTechStackDisplay(""); setDemoInfo(null);
//         setErrors({}); setActiveTab("basic");
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!validate()) { setActiveTab("basic"); return; }
//         try {
//             setLoading(true);
//             const sd: TemplateFormData = { ...formData, tags: toJsonString(tagsDisplay), features: toJsonString(featuresDisplay), techStack: toJsonString(techStackDisplay) };
//             if (isEditing && selectedId) await templateApi.update({ id: selectedId, ...sd, slug: "", viewCount: 0, createdAt: "" });
//             else await templateApi.create(sd);
//             await reloadData(); handleReset();
//         } catch (e) { console.error("Error saving:", e); } finally { setLoading(false); }
//     };

//     const handleDelete = async (id: number) => {
//         if (!window.confirm("Bạn có chắc chắn muốn xóa template này?")) return;
//         try { setLoading(true); await templateApi.delete(id); await reloadData(); if (selectedId === id) handleReset(); }
//         catch (e) { console.error(e); } finally { setLoading(false); }
//     };

//     const handleUploadDemo = async (file: File) => {
//         if (!selectedId) return;
//         if (file.size > 100 * 1024 * 1024) { alert("File quá lớn! Tối đa 100MB"); return; }
//         if (!file.name.toLowerCase().endsWith(".zip")) { alert("Chỉ chấp nhận file .zip"); return; }
//         try {
//             setUploadingDemo(true);
//             const result = await templateApi.uploadDemo(selectedId, file);
//             setFormData((p) => ({ ...p, demoUrl: result.demoUrl }));
//             setDemoInfo({ fileCount: result.fileCount, totalSizeKB: result.totalSizeKB });
//             if (!result.hasIndex) alert("⚠️ Upload thành công nhưng không tìm thấy index.html ở thư mục gốc.");
//         } catch (error: any) { console.error("Upload demo error:", error); alert(error.message || "Upload demo thất bại"); }
//         finally { setUploadingDemo(false); }
//     };

//     const handleDeleteDemo = async () => {
//         if (!selectedId) return;
//         if (!window.confirm("Bạn có chắc chắn muốn xóa folder demo?")) return;
//         try { setUploadingDemo(true); await templateApi.deleteDemo(selectedId); setFormData((p) => ({ ...p, demoUrl: "" })); setDemoInfo(null); }
//         catch (error: any) { console.error("Delete demo error:", error); alert(error.message || "Xóa demo thất bại"); }
//         finally { setUploadingDemo(false); }
//     };

//     const addScreenshot = () => setFormData((p) => ({ ...p, screenshots: [...p.screenshots, { ...EMPTY_SCREENSHOT, sortOrder: p.screenshots.length }] }));
//     const removeScreenshot = (i: number) => setFormData((p) => ({ ...p, screenshots: p.screenshots.filter((_, idx) => idx !== i) }));
//     const updateScreenshot = (i: number, field: string, value: string | number) => {
//         setFormData((p) => ({ ...p, screenshots: p.screenshots.map((s, idx) => {
//             if (idx !== i) return s;
//             if (field === "device") { const dv = DEVICE_OPTIONS.find((d) => d.value === value); return { ...s, device: value as string, width: dv?.width || s.width, height: dv?.height || s.height }; }
//             return { ...s, [field]: value };
//         }) }));
//     };
//     const handleUploadScreenshot = async (index: number, file: File) => {
//         if (file.size > 5 * 1024 * 1024) { alert("File quá lớn! Tối đa 5MB"); return; }
//         try { setUploadingSS(index); const r = await uploadApi.uploadImage(file, "templates/screenshots"); if (r.success && r.url) updateScreenshot(index, "imageUrl", r.url as string); else alert(r.message || "Upload thất bại"); }
//         catch (e) { console.error(e); alert("Không thể upload hình ảnh"); } finally { setUploadingSS(null); }
//     };

//     const getDemoFullUrl = (demoUrl: string) => {
//         if (!demoUrl) return "";
//         if (demoUrl.startsWith("http")) return demoUrl;
//         return `${process.env.NEXT_PUBLIC_API_URL || ""}${demoUrl}`;
//     };

//     return (
//         <div className="space-y-6">
//             {/* ============ FORM SECTION ============ */}
//             <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//                 <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
//                     <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{isEditing ? "✏️ Cập nhật template" : "➕ Thêm template mới"}</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{isEditing ? `Đang chỉnh sửa: ${formData.name}` : "Điền thông tin để thêm template mới"}</p>
//                 </div>

//                 <div className="px-5 pt-4 flex gap-1 border-b border-gray-200 dark:border-gray-800">
//                     {[{ key: "basic", label: "📋 Thông tin cơ bản" }, { key: "content", label: "📝 Nội dung & Tags" }, { key: "screenshots", label: "🖼️ Screenshots" }, { key: "seo", label: "🔍 SEO" }].map((tab) => (
//                         <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key as typeof activeTab)}
//                             className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.key ? "bg-brand-50 text-brand-600 border-b-2 border-brand-500 dark:bg-brand-500/10 dark:text-brand-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}>
//                             {tab.label}
//                         </button>
//                     ))}
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-5">
//                     {/* ── TAB: Basic ── */}
//                     {activeTab === "basic" && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                             <div className="lg:col-span-2">
//                                 <Label>Tên template <span className="text-error-500">*</span></Label>
//                                 <Input name="name" type="text" placeholder="VD: Minh Khang Agency" value={formData.name} onChange={handleChange} error={!!errors.name} hint={errors.name || "Tên hiển thị của template"} />
//                             </div>
//                             <div>
//                                 <Label>Danh mục <span className="text-error-500">*</span></Label>
//                                 <select name="categoryTemplateId" value={formData.categoryTemplateId} onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.categoryTemplateId ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`}>
//                                     <option value="0">-- Chọn danh mục --</option>
//                                     {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
//                                 </select>
//                                 {errors.categoryTemplateId && <p className="mt-1.5 text-xs text-error-500">{errors.categoryTemplateId}</p>}
//                             </div>
//                             <div className="lg:col-span-3">
//                                 <Label>Mô tả ngắn <span className="text-error-500">*</span></Label>
//                                 <textarea name="description" rows={2} placeholder="Mô tả ngắn gọn về template..." value={formData.description} onChange={handleChange}
//                                     className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.description ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`} />
//                                 {errors.description && <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>}
//                             </div>
//                             <div><Label>Số trang</Label><Input name="pages" type="number" placeholder="1" min="1" value={formData.pages} onChange={handleChange} error={!!errors.pages} hint={errors.pages || "Số trang của template"} /></div>
//                             <div><Label>Phiên bản</Label><Input name="version" type="text" placeholder="1.0.0" value={formData.version} onChange={handleChange} /></div>
//                             <div><Label>Thứ tự hiển thị</Label><Input name="sortOrder" type="number" placeholder="0" min="0" value={formData.sortOrder} onChange={handleChange} error={!!errors.sortOrder} hint={errors.sortOrder || "Số nhỏ hiển thị trước"} /></div>

//                             {/* Demo URL */}
//                             <div className="lg:col-span-2">
//                                 <Label>Demo URL</Label>
//                                 <div className="flex items-center gap-2">
//                                     <div className="flex-1"><Input name="demoUrl" type="text" placeholder="Tự động khi upload ZIP hoặc nhập thủ công" value={formData.demoUrl} onChange={handleChange} hint="Đường dẫn đến trang demo iframe" /></div>
//                                     {formData.demoUrl && (<a href={getDemoFullUrl(formData.demoUrl)} target="_blank" rel="noopener noreferrer" className="shrink-0 px-3 py-2.5 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400">🔗 Xem demo</a>)}
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-6">
//                                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị</span></label>
//                                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">⭐ Nổi bật</span></label>
//                                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isResponsive" checked={formData.isResponsive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">📱 Responsive</span></label>
//                             </div>

//                             {/* Cover Image */}
//                             <div className="lg:col-span-3">
//                                 <Label>Hình ảnh cover <span className="text-error-500">*</span></Label>
//                                 <div className="flex items-start gap-4">
//                                     <div className="flex-1">
//                                         <input type="file" accept="image/*" disabled={uploading}
//                                             onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 5*1024*1024) { alert("File quá lớn! Tối đa 5MB"); return; } try { setUploading(true); const r = await uploadApi.uploadImage(file, "templates"); if (r.success && r.url) setFormData((p) => ({ ...p, image: r.url as string })); else alert(r.message || "Upload thất bại"); } catch { alert("Không thể upload hình ảnh"); } finally { setUploading(false); } }}
//                                             className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${errors.image ? "border border-error-500 rounded-lg" : ""} ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} />
//                                         {uploading && <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>}
//                                         {errors.image && <p className="mt-1.5 text-xs text-error-500">{errors.image}</p>}
//                                         {!errors.image && !uploading && <p className="mt-1.5 text-xs text-gray-500">JPG, PNG, WEBP (Tối đa 5MB) — Khuyến nghị: 800×500px</p>}
//                                     </div>
//                                     {formData.image && (<div className="relative"><img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700" /><button type="button" onClick={() => setFormData((p) => ({ ...p, image: "" }))} className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600">×</button></div>)}
//                                 </div>
//                             </div>

//                             {/* ── Upload Demo ZIP ── */}
//                             <div className="lg:col-span-3">
//                                 <Label>📦 Upload Demo (ZIP)</Label>
//                                 <div className="p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30">
//                                     {isEditing && selectedId ? (
//                                         <div className="space-y-3">
//                                             <div className="flex items-start gap-4">
//                                                 <div className="flex-1">
//                                                     <input type="file" accept=".zip" disabled={uploadingDemo} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUploadDemo(file); }}
//                                                         className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${uploadingDemo ? "opacity-50 cursor-not-allowed" : ""}`} />
//                                                     {uploadingDemo && (<div className="mt-2 flex items-center gap-2"><div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div><p className="text-xs text-brand-500">Đang upload và giải nén...</p></div>)}
//                                                     {demoInfo && (<p className="mt-2 text-xs text-green-600 dark:text-green-400">✅ Upload thành công: {demoInfo.fileCount} files ({(demoInfo.totalSizeKB / 1024).toFixed(1)} MB)</p>)}
//                                                     {!uploadingDemo && !demoInfo && (<p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Upload file ZIP chứa demo (HTML/CSS/JS). Tối đa 100MB. ZIP phải chứa index.html.</p>)}
//                                                 </div>
//                                                 {formData.demoUrl && formData.demoUrl.startsWith("/demos/") && (<button type="button" onClick={handleDeleteDemo} disabled={uploadingDemo} className="shrink-0 px-3 py-2 text-sm font-medium text-error-500 bg-error-50 rounded-lg hover:bg-error-100 dark:bg-error-500/10 dark:hover:bg-error-500/20 disabled:opacity-50">🗑️ Xóa demo</button>)}
//                                             </div>
//                                             {formData.demoUrl && formData.demoUrl.startsWith("/demos/") && (
//                                                 <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
//                                                     <span className="text-green-600 dark:text-green-400">✅</span>
//                                                     <span className="text-xs text-green-700 dark:text-green-300">Demo đã upload: <code className="font-mono bg-green-100 dark:bg-green-500/20 px-1.5 py-0.5 rounded">{formData.demoUrl}</code></span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <div className="text-center py-4"><span className="text-3xl">📦</span><p className="text-sm text-gray-500 dark:text-gray-400 mt-2">💡 Lưu template trước, sau đó chọn template trong bảng để upload demo ZIP.</p></div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* ── TAB: Content ── */}
//                     {activeTab === "content" && (
//                         <div className="grid grid-cols-1 gap-5">
//                             <div><Label>Mô tả chi tiết</Label><textarea name="longDescription" rows={4} placeholder="Mô tả đầy đủ về template..." value={formData.longDescription} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" /></div>
//                             <div>
//                                 <Label>Tags</Label>
//                                 <Input type="text" placeholder="Agency, Marketing, Sáng tạo" value={tagsDisplay} onChange={(e) => setTagsDisplay(e.target.value)} hint="Nhập các tag cách nhau bởi dấu phẩy" />
//                                 {tagsDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{tagsDisplay.split(",").map((tag, i) => tag.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">{tag.trim()}</span> : null)}</div>}
//                             </div>
//                             <div>
//                                 <Label>Tính năng</Label>
//                                 <textarea rows={3} placeholder="Parallax scrolling, Portfolio gallery, Contact form" value={featuresDisplay} onChange={(e) => setFeaturesDisplay(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
//                                 <p className="mt-1.5 text-xs text-gray-500">Liệt kê tính năng cách nhau bởi dấu phẩy</p>
//                             </div>
//                             <div>
//                                 <Label>Tech Stack</Label>
//                                 <Input type="text" placeholder="NextJS 14, TailwindCSS, TypeScript" value={techStackDisplay} onChange={(e) => setTechStackDisplay(e.target.value)} hint="Công nghệ sử dụng, cách nhau bởi dấu phẩy" />
//                                 {techStackDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{techStackDisplay.split(",").map((t, i) => t.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t.trim()}</span> : null)}</div>}
//                             </div>
//                         </div>
//                     )}

//                     {/* ── TAB: Screenshots ── */}
//                     {activeTab === "screenshots" && (
//                         <div className="space-y-4">
//                             <div className="flex items-center justify-between">
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">{formData.screenshots.length} screenshot(s)</p>
//                                 <button type="button" onClick={addScreenshot} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20"><PlusIcon className="w-4 h-4" /> Thêm screenshot</button>
//                             </div>
//                             {formData.screenshots.length === 0 && (<div className="py-10 text-center"><span className="text-4xl">📷</span><p className="text-gray-500 dark:text-gray-400 mt-2">Chưa có screenshot nào.</p></div>)}
//                             {formData.screenshots.map((ss, index) => (
//                                 <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Screenshot #{index + 1}</span>
//                                         <button type="button" onClick={() => removeScreenshot(index)} className="p-1.5 text-error-500 hover:bg-error-50 rounded-lg dark:hover:bg-error-500/10"><TrashBinIcon className="w-4 h-4" /></button>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//                                         <div><Label>Device</Label><select value={ss.device} onChange={(e) => updateScreenshot(index, "device", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">{DEVICE_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label} ({d.width}×{d.height})</option>)}</select></div>
//                                         <div><Label>Label</Label><input type="text" placeholder="Trang chủ — Desktop" value={ss.label} onChange={(e) => updateScreenshot(index, "label", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
//                                         <div className="flex gap-2"><div className="flex-1"><Label>Width</Label><input type="number" value={ss.width} onChange={(e) => updateScreenshot(index, "width", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div><div className="flex-1"><Label>Height</Label><input type="number" value={ss.height} onChange={(e) => updateScreenshot(index, "height", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div></div>
//                                         <div><Label>Thứ tự</Label><input type="number" min="0" value={ss.sortOrder} onChange={(e) => updateScreenshot(index, "sortOrder", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
//                                     </div>
//                                     <div className="flex items-start gap-3">
//                                         <div className="flex-1"><input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadScreenshot(index, f); }} disabled={uploadingSS === index} className={`block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-brand-50 file:text-brand-700 ${uploadingSS === index ? "opacity-50" : ""}`} />{uploadingSS === index && <p className="mt-1 text-xs text-brand-500">Đang upload...</p>}</div>
//                                         {ss.imageUrl && <img src={ss.imageUrl} alt={ss.label || `SS ${index + 1}`} className="w-20 h-12 object-cover rounded border border-gray-200 dark:border-gray-700" />}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     {/* ── TAB: SEO ── */}
//                     {activeTab === "seo" && (
//                         <div className="grid grid-cols-1 gap-5">
//                             <div><Label>Meta Title</Label><Input name="metaTitle" type="text" placeholder="Tiêu đề SEO" value={formData.metaTitle} onChange={handleChange} hint={`${formData.metaTitle.length}/70 ký tự`} /></div>
//                             <div><Label>Meta Description</Label><textarea name="metaDescription" rows={3} placeholder="Mô tả SEO" value={formData.metaDescription} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" /><p className="mt-1.5 text-xs text-gray-500">{formData.metaDescription.length}/160 ký tự</p></div>
//                             <div><Label>OG Image URL</Label><Input name="ogImage" type="text" placeholder="URL ảnh khi chia sẻ social" value={formData.ogImage} onChange={handleChange} /></div>
//                             <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
//                                 <p className="text-xs text-gray-500 mb-2">🔍 Google Preview:</p>
//                                 <div className="space-y-1">
//                                     <p className="text-[#1a0dab] text-lg leading-tight truncate">{formData.metaTitle || formData.name || "Tên template"}</p>
//                                     <p className="text-green-700 text-sm truncate dark:text-green-400">templatehub.vn/portfolio/{formData.name ? formData.name.toLowerCase().replace(/\s+/g, "-") : "slug"}</p>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{formData.metaDescription || formData.description || "Mô tả template..."}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Form Actions */}
//                     <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
//                         <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
//                             {isEditing ? <><PencilIcon className="w-4 h-4" />{loading ? "Đang cập nhật..." : "Cập nhật"}</> : <><PlusIcon className="w-4 h-4" />{loading ? "Đang thêm..." : "Thêm mới"}</>}
//                         </button>
//                         <button type="button" onClick={handleReset} disabled={loading} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Làm mới</button>
//                     </div>
//                 </form>
//             </div>

//             {/* ============ TABLE SECTION ============ */}
//             <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
//                 <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
//                     <div>
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">🎨 Danh sách template</h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tổng: {filteredTemplates.length} template</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <select value={filterCategoryId} onChange={(e) => setFilterCategoryId(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">
//                             <option value="">Tất cả danh mục</option>
//                             {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
//                         </select>
//                         <div className="w-64"><Input type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
//                                 {["Chọn", "Ảnh", "Tên / Slug", "Danh mục", "Trang", "Lượt xem", "Trạng thái", "Ngày tạo", "Xóa"].map((h, i) => (
//                                     <th key={i} className={`px-4 py-3 ${["Trang", "Lượt xem", "Trạng thái", "Xóa"].includes(h) ? "text-center" : "text-left"}`}>
//                                         <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{h}</span>
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                             {loading && templates.length === 0 ? (
//                                 <tr><td colSpan={9} className="px-5 py-10 text-center"><p className="text-gray-500 dark:text-gray-400">Đang tải...</p></td></tr>
//                             ) : filteredTemplates.length === 0 ? (
//                                 <tr><td colSpan={9} className="px-5 py-10 text-center"><div className="flex flex-col items-center gap-2"><span className="text-4xl">📭</span><p className="text-gray-500 dark:text-gray-400">{searchTerm || filterCategoryId ? "Không tìm thấy template" : "Chưa có template nào"}</p></div></td></tr>
//                             ) : (
//                                 filteredTemplates.map((t) => (
//                                     <tr key={t.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === t.id ? "bg-brand-50 dark:bg-brand-500/10" : ""}`}>
//                                         <td className="px-4 py-4"><input type="radio" name="selectedTemplate" checked={selectedId === t.id} onChange={() => handleSelectRow(t)} className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer" /></td>
//                                         <td className="px-4 py-4"><div className="w-20 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">{t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">IMG</span>}</div></td>
//                                         <td className="px-4 py-4">
//                                             <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">{t.name}</p>
//                                             <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">/{t.slug}</p>
//                                             {t.isPopular && <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400 mt-1">⭐ Nổi bật</span>}
//                                         </td>
//                                         <td className="px-4 py-4"><span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t.categoryName || getCategoryName(t.categoryTemplateId)}</span></td>
//                                         <td className="px-4 py-4 text-center"><span className="text-sm text-gray-700 dark:text-gray-300">{t.pages}</span></td>
//                                         <td className="px-4 py-4 text-center"><span className="text-sm text-gray-600 dark:text-gray-400">{t.viewCount.toLocaleString("vi-VN")}</span></td>
//                                         <td className="px-4 py-4 text-center">{t.isActive ? <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400"><CheckCircleIcon className="w-6 h-6" /><span className="text-xs">Hiện</span></span> : <span className="inline-flex items-center gap-1 text-gray-400"><XIcon className="w-6 h-6" /><span className="text-xs">Ẩn</span></span>}</td>
//                                         <td className="px-4 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(t.createdAt)}</span></td>
//                                         <td className="px-4 py-4 text-center"><button onClick={() => handleDelete(t.id)} disabled={loading} className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50" title="Xóa template"><TrashBinIcon className="w-5 h-5" /></button></td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800"><p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị {filteredTemplates.length} template</p></div>
//             </div>
//         </div>
//     );
// }









"use client";
import React, { useState, useEffect, useRef } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import {
    TemplateListItem,
    TemplateFormData,
    TemplateScreenshotFormData,
    TemplateCategory,
} from "@/app/types";
import {
    PlusIcon,
    PencilIcon,
    TrashBinIcon,
    CheckCircleIcon,
    XIcon,
} from "../../../icons";
import { templateApi, categoryTemplateApi } from "@/app/lib/api/index";
import { uploadApi } from "@/app/lib/api/endpoints/upload.api";

const DEVICE_OPTIONS = [
    { value: "desktop", label: "Desktop", width: 1440, height: 900 },
    { value: "tablet", label: "Tablet", width: 768, height: 1024 },
    { value: "mobile", label: "Mobile", width: 375, height: 812 },
];

const EMPTY_SCREENSHOT: TemplateScreenshotFormData = {
    id: 0, imageUrl: "", label: "", device: "desktop", width: 1440, height: 900, sortOrder: 0,
};

const initialFormData: TemplateFormData = {
    name: "", categoryTemplateId: 0, categoryName: "", description: "", longDescription: "", image: "",
    pages: 1, isResponsive: true, isPopular: false, tags: "", features: "", techStack: "",
    demoUrl: "", version: "1.0.0", metaTitle: "", metaDescription: "", ogImage: "",
    sortOrder: 0, isActive: true, screenshots: [],
};

const toJsonString = (text: string): string => {
    if (!text.trim()) return "";
    return JSON.stringify(text.split(",").map((s) => s.trim()).filter(Boolean));
};
const fromJsonString = (jsonStr: string | null | undefined): string => {
    if (!jsonStr) return "";
    try { const p = JSON.parse(jsonStr); return Array.isArray(p) ? p.join(", ") : ""; }
    catch { return jsonStr.split(",").map((s) => s.trim()).filter(Boolean).join(", "); }
};

export default function TemplateManagement() {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<TemplateFormData>(initialFormData);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadingSS, setUploadingSS] = useState<number | null>(null);
    const [uploadingDemo, setUploadingDemo] = useState(false);
    const [demoInfo, setDemoInfo] = useState<{ fileCount: number; totalSizeKB: number } | null>(null);
    const [templates, setTemplates] = useState<TemplateListItem[]>([]);
    const [categories, setCategories] = useState<TemplateCategory[]>([]);
    const [activeTab, setActiveTab] = useState<"basic" | "content" | "screenshots" | "seo">("basic");
    const [tagsDisplay, setTagsDisplay] = useState("");
    const [featuresDisplay, setFeaturesDisplay] = useState("");
    const [techStackDisplay, setTechStackDisplay] = useState("");
    
    // ✅ NEW: State để lưu file ZIP tạm khi tạo mới
    const [pendingDemoFile, setPendingDemoFile] = useState<File | null>(null);
    const demoFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [td, cd] = await Promise.all([templateApi.getAllNoPaging(), categoryTemplateApi.getAllNoPaging()]);
            setTemplates(td); setCategories(cd);
        } catch (e) { console.error("Error fetching:", e); } finally { setLoading(false); }
    };
    const reloadData = async () => {
        try { setTemplates(await templateApi.getAllNoPaging()); } catch (e) { console.error(e); }
    };

    const getCategoryName = (id: number) => categories.find((c) => c.id === id)?.name ?? "";
    const formatDate = (d: string) => new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

    const filteredTemplates = templates
        .filter((t) => {
            const ms = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const mc = !filterCategoryId || t.categoryTemplateId === parseInt(filterCategoryId);
            return ms && mc;
        }).sort((a, b) => a.sortOrder - b.sortOrder);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let v: string | number | boolean = value;
        if (type === "checkbox") v = (e.target as HTMLInputElement).checked;
        else if (type === "number" || name === "categoryTemplateId") v = parseInt(value) || 0;
        setFormData((p) => ({ ...p, [name]: v }));
        if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    };

    const validate = (): boolean => {
        const ne: Record<string, string> = {};
        if (!formData.name.trim()) ne.name = "Vui lòng nhập tên template";
        if (!formData.categoryTemplateId || formData.categoryTemplateId <= 0) ne.categoryTemplateId = "Vui lòng chọn danh mục";
        if (!formData.description.trim()) ne.description = "Vui lòng nhập mô tả ngắn";
        if (!formData.image.trim()) ne.image = "Vui lòng chọn hình ảnh cover";
        if (formData.pages < 1) ne.pages = "Số trang phải >= 1";
        if (formData.sortOrder < 0) ne.sortOrder = "Thứ tự phải >= 0";
        setErrors(ne); return Object.keys(ne).length === 0;
    };

    const handleSelectRow = async (item: TemplateListItem) => {
        try {
            const d = await templateApi.getById(item.id);
            if (!d) return;
            setSelectedId(d.id); setIsEditing(true); setDemoInfo(null); setPendingDemoFile(null);
            setTagsDisplay(fromJsonString(d.tags)); setFeaturesDisplay(fromJsonString(d.features)); setTechStackDisplay(fromJsonString(d.techStack));
            setFormData({
                name: d.name, categoryTemplateId: d.categoryTemplateId, categoryName: d.categoryName, description: d.description,
                longDescription: d.longDescription || "", image: d.image, pages: d.pages,
                isResponsive: d.isResponsive, isPopular: d.isPopular, tags: d.tags || "",
                features: d.features || "", techStack: d.techStack || "", demoUrl: d.demoUrl || "",
                version: d.version || "1.0.0", metaTitle: d.metaTitle || "", metaDescription: d.metaDescription || "",
                ogImage: d.ogImage || "", sortOrder: d.sortOrder, isActive: d.isActive,
                screenshots: d.screenshots?.map((s) => ({ id: s.id, imageUrl: s.imageUrl, label: s.label || "", device: s.device, width: s.width, height: s.height, sortOrder: s.sortOrder })) || [],
            });
            setErrors({}); setActiveTab("basic"); window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e) { console.error("Error loading:", e); }
    };

    const handleReset = () => {
        setSelectedId(null); setIsEditing(false); setFormData(initialFormData);
        setTagsDisplay(""); setFeaturesDisplay(""); setTechStackDisplay(""); setDemoInfo(null);
        setPendingDemoFile(null); // ✅ Reset pending file
        if (demoFileInputRef.current) demoFileInputRef.current.value = "";
        setErrors({}); setActiveTab("basic");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) { setActiveTab("basic"); return; }
        try {
            setLoading(true);
            const sd: TemplateFormData = { ...formData, tags: toJsonString(tagsDisplay), features: toJsonString(featuresDisplay), techStack: toJsonString(techStackDisplay) };
            
            let templateId: number;
            
            if (isEditing && selectedId) {
                await templateApi.update({ id: selectedId, ...sd, slug: "", viewCount: 0, createdAt: "" });
                templateId = selectedId;
            } else {
                // ✅ Tạo mới và lấy ID
                const created = await templateApi.create(sd);
                templateId = created.id;
            }
            
            // ✅ Upload demo ZIP nếu có pending file
            if (pendingDemoFile && templateId) {
                try {
                    setUploadingDemo(true);
                    const result = await templateApi.uploadDemo(templateId, pendingDemoFile);
                    setDemoInfo({ fileCount: result.fileCount, totalSizeKB: result.totalSizeKB });
                    if (!result.hasIndex) {
                        alert("⚠️ Template đã lưu. Upload demo thành công nhưng không tìm thấy index.html ở thư mục gốc.");
                    }
                } catch (uploadError: any) {
                    console.error("Upload demo error:", uploadError);
                    alert(`Template đã lưu, nhưng upload demo thất bại: ${uploadError.message || "Lỗi không xác định"}`);
                } finally {
                    setUploadingDemo(false);
                }
            }
            
            await reloadData(); 
            handleReset();
        } catch (e) { console.error("Error saving:", e); } finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa template này?")) return;
        try { setLoading(true); await templateApi.delete(id); await reloadData(); if (selectedId === id) handleReset(); }
        catch (e) { console.error(e); } finally { setLoading(false); }
    };

    // ✅ Xử lý chọn file ZIP (cho cả tạo mới và edit)
    const handleDemoFileSelect = (file: File) => {
        if (file.size > 100 * 1024 * 1024) { 
            alert("File quá lớn! Tối đa 100MB"); 
            return; 
        }
        if (!file.name.toLowerCase().endsWith(".zip")) { 
            alert("Chỉ chấp nhận file .zip"); 
            return; 
        }
        
        if (isEditing && selectedId) {
            // Đang edit → upload ngay
            handleUploadDemo(file);
        } else {
            // Đang tạo mới → lưu pending
            setPendingDemoFile(file);
        }
    };

    const handleUploadDemo = async (file: File) => {
        if (!selectedId) return;
        try {
            setUploadingDemo(true);
            const result = await templateApi.uploadDemo(selectedId, file);
            setFormData((p) => ({ ...p, demoUrl: result.demoUrl }));
            setDemoInfo({ fileCount: result.fileCount, totalSizeKB: result.totalSizeKB });
            if (!result.hasIndex) alert("⚠️ Upload thành công nhưng không tìm thấy index.html ở thư mục gốc.");
        } catch (error: any) { console.error("Upload demo error:", error); alert(error.message || "Upload demo thất bại"); }
        finally { setUploadingDemo(false); }
    };

    const handleDeleteDemo = async () => {
        if (!selectedId) return;
        if (!window.confirm("Bạn có chắc chắn muốn xóa folder demo?")) return;
        try { setUploadingDemo(true); await templateApi.deleteDemo(selectedId); setFormData((p) => ({ ...p, demoUrl: "" })); setDemoInfo(null); }
        catch (error: any) { console.error("Delete demo error:", error); alert(error.message || "Xóa demo thất bại"); }
        finally { setUploadingDemo(false); }
    };

    // ✅ Xóa pending file
    const handleRemovePendingFile = () => {
        setPendingDemoFile(null);
        if (demoFileInputRef.current) demoFileInputRef.current.value = "";
    };

    const addScreenshot = () => setFormData((p) => ({ ...p, screenshots: [...p.screenshots, { ...EMPTY_SCREENSHOT, sortOrder: p.screenshots.length }] }));
    const removeScreenshot = (i: number) => setFormData((p) => ({ ...p, screenshots: p.screenshots.filter((_, idx) => idx !== i) }));
    const updateScreenshot = (i: number, field: string, value: string | number) => {
        setFormData((p) => ({ ...p, screenshots: p.screenshots.map((s, idx) => {
            if (idx !== i) return s;
            if (field === "device") { const dv = DEVICE_OPTIONS.find((d) => d.value === value); return { ...s, device: value as string, width: dv?.width || s.width, height: dv?.height || s.height }; }
            return { ...s, [field]: value };
        }) }));
    };
    const handleUploadScreenshot = async (index: number, file: File) => {
        if (file.size > 5 * 1024 * 1024) { alert("File quá lớn! Tối đa 5MB"); return; }
        try { setUploadingSS(index); const r = await uploadApi.uploadImage(file, "templates/screenshots"); if (r.success && r.url) updateScreenshot(index, "imageUrl", r.url as string); else alert(r.message || "Upload thất bại"); }
        catch (e) { console.error(e); alert("Không thể upload hình ảnh"); } finally { setUploadingSS(null); }
    };

    const getDemoFullUrl = (demoUrl: string) => {
        if (!demoUrl) return "";
        if (demoUrl.startsWith("http")) return demoUrl;
        return `${process.env.NEXT_PUBLIC_API_URL || ""}${demoUrl}`;
    };

    return (
        <div className="space-y-6">
            {/* ============ FORM SECTION ============ */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{isEditing ? "✏️ Cập nhật template" : "➕ Thêm template mới"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{isEditing ? `Đang chỉnh sửa: ${formData.name}` : "Điền thông tin để thêm template mới"}</p>
                </div>

                <div className="px-5 pt-4 flex gap-1 border-b border-gray-200 dark:border-gray-800">
                    {[{ key: "basic", label: "📋 Thông tin cơ bản" }, { key: "content", label: "📝 Nội dung & Tags" }, { key: "screenshots", label: "🖼️ Screenshots" }, { key: "seo", label: "🔍 SEO" }].map((tab) => (
                        <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key as typeof activeTab)}
                            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.key ? "bg-brand-50 text-brand-600 border-b-2 border-brand-500 dark:bg-brand-500/10 dark:text-brand-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="p-5">
                    {/* ── TAB: Basic ── */}
                    {activeTab === "basic" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="lg:col-span-2">
                                <Label>Tên template <span className="text-error-500">*</span></Label>
                                <Input name="name" type="text" placeholder="VD: Minh Khang Agency" value={formData.name} onChange={handleChange} error={!!errors.name} hint={errors.name || "Tên hiển thị của template"} />
                            </div>
                            <div>
                                <Label>Danh mục <span className="text-error-500">*</span></Label>
                                <select name="categoryTemplateId" value={formData.categoryTemplateId} onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.categoryTemplateId ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`}>
                                    <option value="0">-- Chọn danh mục --</option>
                                    {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                                </select>
                                {errors.categoryTemplateId && <p className="mt-1.5 text-xs text-error-500">{errors.categoryTemplateId}</p>}
                            </div>
                            <div className="lg:col-span-3">
                                <Label>Mô tả ngắn <span className="text-error-500">*</span></Label>
                                <textarea name="description" rows={2} placeholder="Mô tả ngắn gọn về template..." value={formData.description} onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-gray-800 dark:text-white ${errors.description ? "border-error-500" : "border-gray-300 dark:border-gray-600"} focus:ring-2 focus:ring-brand-500 focus:border-brand-500`} />
                                {errors.description && <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>}
                            </div>
                            <div><Label>Số trang</Label><Input name="pages" type="number" placeholder="1" min="1" value={formData.pages} onChange={handleChange} error={!!errors.pages} hint={errors.pages || "Số trang của template"} /></div>
                            <div><Label>Phiên bản</Label><Input name="version" type="text" placeholder="1.0.0" value={formData.version} onChange={handleChange} /></div>
                            <div><Label>Thứ tự hiển thị</Label><Input name="sortOrder" type="number" placeholder="0" min="0" value={formData.sortOrder} onChange={handleChange} error={!!errors.sortOrder} hint={errors.sortOrder || "Số nhỏ hiển thị trước"} /></div>

                            {/* Demo URL */}
                            <div className="lg:col-span-2">
                                <Label>Demo URL</Label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <Input name="demoUrl"
                                            type="text"
                                            placeholder="Tự động khi upload ZIP hoặc nhập thủ công"
                                            value={formData.demoUrl}
                                            onChange={handleChange}
                                            hint="Đường dẫn đến trang demo iframe" />
                                    </div>
                                    {formData.demoUrl && (

                                        <a href={getDemoFullUrl(formData.demoUrl)} target="_blank" rel="noopener noreferrer" className="shrink-0 px-3 py-2.5 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400">
                                            🔗 Xem demo
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị</span></label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">⭐ Nổi bật</span></label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isResponsive" checked={formData.isResponsive} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800" /><span className="text-sm text-gray-700 dark:text-gray-300">📱 Responsive</span></label>
                            </div>

                            {/* Cover Image */}
                            <div className="lg:col-span-3">
                                <Label>Hình ảnh cover <span className="text-error-500">*</span></Label>
                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <input type="file" accept="image/*" disabled={uploading}
                                            onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 5*1024*1024) { alert("File quá lớn! Tối đa 5MB"); return; } try { setUploading(true); const r = await uploadApi.uploadImage(file, "templates"); if (r.success && r.url) setFormData((p) => ({ ...p, image: r.url as string })); else alert(r.message || "Upload thất bại"); } catch { alert("Không thể upload hình ảnh"); } finally { setUploading(false); } }}
                                            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${errors.image ? "border border-error-500 rounded-lg" : ""} ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} />
                                        {uploading && <p className="mt-1.5 text-xs text-brand-500">Đang upload...</p>}
                                        {errors.image && <p className="mt-1.5 text-xs text-error-500">{errors.image}</p>}
                                        {!errors.image && !uploading && <p className="mt-1.5 text-xs text-gray-500">JPG, PNG, WEBP (Tối đa 5MB) — Khuyến nghị: 800×500px</p>}
                                    </div>
                                    {formData.image && (<div className="relative"><img src={formData.image} alt="Preview" className="w-32 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700" /><button type="button" onClick={() => setFormData((p) => ({ ...p, image: "" }))} className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-error-600">×</button></div>)}
                                </div>
                            </div>

                            {/* ✅ Upload Demo ZIP - LUÔN HIỂN THỊ */}
                            <div className="lg:col-span-3">
                                <Label>📦 Upload Demo (ZIP)</Label>
                                <div className="p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30">
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <input 
                                                    ref={demoFileInputRef}
                                                    type="file" 
                                                    accept=".zip" 
                                                    disabled={uploadingDemo} 
                                                    onChange={(e) => { 
                                                        const file = e.target.files?.[0]; 
                                                        if (file) handleDemoFileSelect(file); 
                                                    }}
                                                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${uploadingDemo ? "opacity-50 cursor-not-allowed" : ""}`} 
                                                />
                                                
                                                {uploadingDemo && (
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                                                        <p className="text-xs text-brand-500">Đang upload và giải nén...</p>
                                                    </div>
                                                )}
                                                
                                                {demoInfo && (
                                                    <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                                                        ✅ Upload thành công: {demoInfo.fileCount} files ({(demoInfo.totalSizeKB / 1024).toFixed(1)} MB)
                                                    </p>
                                                )}
                                                
                                                {/* ✅ Hiển thị pending file khi tạo mới */}
                                                {!isEditing && pendingDemoFile && (
                                                    <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                                                        <span className="text-amber-600 dark:text-amber-400">📦</span>
                                                        <span className="text-xs text-amber-700 dark:text-amber-300 flex-1">
                                                            File đã chọn: <code className="font-mono bg-amber-100 dark:bg-amber-500/20 px-1.5 py-0.5 rounded">{pendingDemoFile.name}</code> 
                                                            <span className="text-amber-500 ml-1">({(pendingDemoFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                        </span>
                                                        <button 
                                                            type="button" 
                                                            onClick={handleRemovePendingFile}
                                                            className="shrink-0 p-1 text-amber-600 hover:bg-amber-100 rounded dark:hover:bg-amber-500/20"
                                                            title="Xóa file"
                                                        >
                                                            <XIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                
                                                {!isEditing && !pendingDemoFile && !uploadingDemo && (
                                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                        💡 Chọn file ZIP chứa demo (HTML/CSS/JS). Tối đa 100MB. File sẽ được upload sau khi lưu template.
                                                    </p>
                                                )}
                                                
                                                {isEditing && !uploadingDemo && !demoInfo && (
                                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                        Upload file ZIP chứa demo (HTML/CSS/JS). Tối đa 100MB. ZIP phải chứa index.html.
                                                    </p>
                                                )}
                                            </div>
                                            
                                            {/* Nút xóa demo (chỉ hiện khi đang edit và có demo) */}
                                            {isEditing && formData.demoUrl && formData.demoUrl.startsWith("/demos/") && (
                                                <button 
                                                    type="button" 
                                                    onClick={handleDeleteDemo} 
                                                    disabled={uploadingDemo} 
                                                    className="shrink-0 px-3 py-2 text-sm font-medium text-error-500 bg-error-50 rounded-lg hover:bg-error-100 dark:bg-error-500/10 dark:hover:bg-error-500/20 disabled:opacity-50"
                                                >
                                                    🗑️ Xóa demo
                                                </button>
                                            )}
                                        </div>
                                        
                                        {/* Hiển thị demo đã upload (chỉ khi edit) */}
                                        {isEditing && formData.demoUrl && formData.demoUrl.startsWith("/demos/") && (
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                                                <span className="text-green-600 dark:text-green-400">✅</span>
                                                <span className="text-xs text-green-700 dark:text-green-300">
                                                    Demo đã upload: <code className="font-mono bg-green-100 dark:bg-green-500/20 px-1.5 py-0.5 rounded">{formData.demoUrl}</code>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── TAB: Content ── */}
                    {activeTab === "content" && (
                        <div className="grid grid-cols-1 gap-5">
                            <div><Label>Mô tả chi tiết</Label><textarea name="longDescription" rows={4} placeholder="Mô tả đầy đủ về template..." value={formData.longDescription} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" /></div>
                            <div>
                                <Label>Tags</Label>
                                <Input type="text" placeholder="Agency, Marketing, Sáng tạo" value={tagsDisplay} onChange={(e) => setTagsDisplay(e.target.value)} hint="Nhập các tag cách nhau bởi dấu phẩy" />
                                {tagsDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{tagsDisplay.split(",").map((tag, i) => tag.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">{tag.trim()}</span> : null)}</div>}
                            </div>
                            <div>
                                <Label>Tính năng</Label>
                                <textarea rows={3} placeholder="Parallax scrolling, Portfolio gallery, Contact form" value={featuresDisplay} onChange={(e) => setFeaturesDisplay(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" />
                                <p className="mt-1.5 text-xs text-gray-500">Liệt kê tính năng cách nhau bởi dấu phẩy</p>
                            </div>
                            <div>
                                <Label>Tech Stack</Label>
                                <Input type="text" placeholder="NextJS 14, TailwindCSS, TypeScript" value={techStackDisplay} onChange={(e) => setTechStackDisplay(e.target.value)} hint="Công nghệ sử dụng, cách nhau bởi dấu phẩy" />
                                {techStackDisplay && <div className="flex flex-wrap gap-1.5 mt-2">{techStackDisplay.split(",").map((t, i) => t.trim() ? <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t.trim()}</span> : null)}</div>}
                            </div>
                        </div>
                    )}

                    {/* ── TAB: Screenshots ── */}
                    {activeTab === "screenshots" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-400">{formData.screenshots.length} screenshot(s)</p>
                                <button type="button" onClick={addScreenshot} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20"><PlusIcon className="w-4 h-4" /> Thêm screenshot</button>
                            </div>
                            {formData.screenshots.length === 0 && (<div className="py-10 text-center"><span className="text-4xl">📷</span><p className="text-gray-500 dark:text-gray-400 mt-2">Chưa có screenshot nào.</p></div>)}
                            {formData.screenshots.map((ss, index) => (
                                <div key={index} className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Screenshot #{index + 1}</span>
                                        <button type="button" onClick={() => removeScreenshot(index)} className="p-1.5 text-error-500 hover:bg-error-50 rounded-lg dark:hover:bg-error-500/10"><TrashBinIcon className="w-4 h-4" /></button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <div><Label>Device</Label><select value={ss.device} onChange={(e) => updateScreenshot(index, "device", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">{DEVICE_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label} ({d.width}×{d.height})</option>)}</select></div>
                                        <div><Label>Label</Label><input type="text" placeholder="Trang chủ — Desktop" value={ss.label} onChange={(e) => updateScreenshot(index, "label", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
                                        <div className="flex gap-2"><div className="flex-1"><Label>Width</Label><input type="number" value={ss.width} onChange={(e) => updateScreenshot(index, "width", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div><div className="flex-1"><Label>Height</Label><input type="number" value={ss.height} onChange={(e) => updateScreenshot(index, "height", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div></div>
                                        <div><Label>Thứ tự</Label><input type="number" min="0" value={ss.sortOrder} onChange={(e) => updateScreenshot(index, "sortOrder", parseInt(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600" /></div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1"><input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadScreenshot(index, f); }} disabled={uploadingSS === index} className={`block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-brand-50 file:text-brand-700 ${uploadingSS === index ? "opacity-50" : ""}`} />{uploadingSS === index && <p className="mt-1 text-xs text-brand-500">Đang upload...</p>}</div>
                                        {ss.imageUrl && <img src={ss.imageUrl} alt={ss.label || `SS ${index + 1}`} className="w-20 h-12 object-cover rounded border border-gray-200 dark:border-gray-700" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── TAB: SEO ── */}
                    {activeTab === "seo" && (
                        <div className="grid grid-cols-1 gap-5">
                            <div><Label>Meta Title</Label><Input name="metaTitle" type="text" placeholder="Tiêu đề SEO" value={formData.metaTitle} onChange={handleChange} hint={`${formData.metaTitle.length}/70 ký tự`} /></div>
                            <div><Label>Meta Description</Label><textarea name="metaDescription" rows={3} placeholder="Mô tả SEO" value={formData.metaDescription} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500" /><p className="mt-1.5 text-xs text-gray-500">{formData.metaDescription.length}/160 ký tự</p></div>
                            <div><Label>OG Image URL</Label><Input name="ogImage" type="text" placeholder="URL ảnh khi chia sẻ social" value={formData.ogImage} onChange={handleChange} /></div>
                            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <p className="text-xs text-gray-500 mb-2">🔍 Google Preview:</p>
                                <div className="space-y-1">
                                    <p className="text-[#1a0dab] text-lg leading-tight truncate">{formData.metaTitle || formData.name || "Tên template"}</p>
                                    <p className="text-green-700 text-sm truncate dark:text-green-400">templatehub.vn/portfolio/{formData.name ? formData.name.toLowerCase().replace(/\s+/g, "-") : "slug"}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{formData.metaDescription || formData.description || "Mô tả template..."}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
                        <button type="submit" disabled={loading || uploadingDemo} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isEditing ? (
                                <><PencilIcon className="w-4 h-4" />{loading ? "Đang cập nhật..." : "Cập nhật"}</>
                            ) : (
                                <><PlusIcon className="w-4 h-4" />{loading ? (pendingDemoFile ? "Đang lưu & upload demo..." : "Đang thêm...") : (pendingDemoFile ? "Thêm mới & Upload Demo" : "Thêm mới")}</>
                            )}
                        </button>
                        <button type="button" onClick={handleReset} disabled={loading || uploadingDemo} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Làm mới</button>
                    </div>
                </form>
            </div>

            {/* ============ TABLE SECTION ============ */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">🎨 Danh sách template</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tổng: {filteredTemplates.length} template</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select value={filterCategoryId} onChange={(e) => setFilterCategoryId(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600">
                            <option value="">Tất cả danh mục</option>
                            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <div className="w-64"><Input type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                {["Chọn", "Ảnh", "Tên / Slug", "Danh mục", "Trang", "Lượt xem", "Trạng thái", "Ngày tạo", "Xóa"].map((h, i) => (
                                    <th key={i} className={`px-4 py-3 ${["Trang", "Lượt xem", "Trạng thái", "Xóa"].includes(h) ? "text-center" : "text-left"}`}>
                                        <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{h}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {loading && templates.length === 0 ? (
                                <tr><td colSpan={9} className="px-5 py-10 text-center"><p className="text-gray-500 dark:text-gray-400">Đang tải...</p></td></tr>
                            ) : filteredTemplates.length === 0 ? (
                                <tr><td colSpan={9} className="px-5 py-10 text-center"><div className="flex flex-col items-center gap-2"><span className="text-4xl">📭</span><p className="text-gray-500 dark:text-gray-400">{searchTerm || filterCategoryId ? "Không tìm thấy template" : "Chưa có template nào"}</p></div></td></tr>
                            ) : (
                                filteredTemplates.map((t) => (
                                    <tr key={t.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === t.id ? "bg-brand-50 dark:bg-brand-500/10" : ""}`}>
                                        <td className="px-4 py-4"><input type="radio" name="selectedTemplate" checked={selectedId === t.id} onChange={() => handleSelectRow(t)} className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer" /></td>
                                        <td className="px-4 py-4"><div className="w-20 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">{t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-xs">IMG</span>}</div></td>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-gray-800 dark:text-white/90 truncate max-w-[200px]">{t.name}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[200px] mt-0.5">/{t.slug}</p>
                                            {t.isPopular && <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400 mt-1">⭐ Nổi bật</span>}
                                        </td>
                                        <td className="px-4 py-4"><span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">{t.categoryName || getCategoryName(t.categoryTemplateId)}</span></td>
                                        <td className="px-4 py-4 text-center"><span className="text-sm text-gray-700 dark:text-gray-300">{t.pages}</span></td>
                                        <td className="px-4 py-4 text-center"><span className="text-sm text-gray-600 dark:text-gray-400">{t.viewCount.toLocaleString("vi-VN")}</span></td>
                                        <td className="px-4 py-4 text-center">{t.isActive ? <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400"><CheckCircleIcon className="w-6 h-6" /><span className="text-xs">Hiện</span></span> : <span className="inline-flex items-center gap-1 text-gray-400"><XIcon className="w-6 h-6" /><span className="text-xs">Ẩn</span></span>}</td>
                                        <td className="px-4 py-4"><span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(t.createdAt)}</span></td>
                                        <td className="px-4 py-4 text-center"><button onClick={() => handleDelete(t.id)} disabled={loading} className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50" title="Xóa template"><TrashBinIcon className="w-5 h-5" /></button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800"><p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị {filteredTemplates.length} template</p></div>
            </div>
        </div>
    );
}