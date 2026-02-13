// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import Header from "@/app/components/template/Header";
// import Footer from "@/app/components/template/Footer";
// import { clientApi } from "@/app/lib/api";
// import { apiTemplateToLocal } from "@/app/lib/transform";

// interface Props {
//   params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const apiTemplate = await clientApi.getTemplateDetail(params.slug).catch(() => null);
//   if (!apiTemplate) return { title: "Không tìm thấy" };

//   const t = apiTemplateToLocal(apiTemplate);
//   return {
//     title: t.metaTitle || `${t.name} | TemplateHub`,
//     description: t.metaDescription || t.description,
//     openGraph: {
//       title: t.metaTitle || t.name,
//       description: t.metaDescription || t.description,
//       images: [t.ogImage || t.image],
//     },
//   };
// }

// export default async function TemplateDetailPage({ params }: Props) {
//   const [apiTemplate, config, allApiTemplates] = await Promise.all([
//     clientApi.getTemplateDetail(params.slug).catch(() => null),
//     clientApi.getConfigSite().catch(() => null),
//     clientApi.getTemplatePublished().catch(() => []),
//   ]);

//   if (!apiTemplate) notFound();

//   const template = apiTemplateToLocal(apiTemplate);
//   const allTemplates = allApiTemplates.map(apiTemplateToLocal);
//   const related = allTemplates
//     .filter((t) => t.category === template.category && t.id !== template.id)
//     .slice(0, 3);

//   const devices = [...new Set(template.screenshots.map((s) => s.device))];

//   return (
//     <>
//       <Header config={config} />
//       <main className="pt-20">
//         {/* Breadcrumb */}
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <Link href="/" className="hover:text-mint transition-colors">Trang chủ</Link>
//             <span>/</span>
//             <Link href="/#templates" className="hover:text-mint transition-colors">Giao diện</Link>
//             <span>/</span>
//             <span className="text-gray-400">{template.name}</span>
//           </div>
//         </div>

//         {/* Hero */}
//         <section className="px-6 pb-12">
//           <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
//             {/* Cover */}
//             <div className="lg:col-span-3">
//               <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
//                 <Image src={template.image} alt={template.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 60vw" />
//                 <div className="absolute inset-0 bg-linear-to-t from-dark/40 via-transparent to-transparent" />
//                 {template.popular && (
//                   <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-linear-to-r from-mint to-cyan text-dark">⭐ Phổ biến</div>
//                 )}
//               </div>

//               {/* Preview thumbnails */}
//               <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
//                 {template.screenshots.slice(0, 5).map((shot, i) => (
//                   <div key={i} className="shrink-0 rounded-xl overflow-hidden border border-white/5 hover:border-mint/20 transition-colors" style={{ width: shot.device === "mobile" ? 60 : 120 }}>
//                     <div className={`relative ${shot.device === "mobile" ? "aspect-9/16" : "aspect-video"}`}>
//                       <Image src={shot.image} alt={shot.label} fill className="object-cover" sizes="120px" />
//                     </div>
//                   </div>
//                 ))}
//                 {template.screenshots.length > 5 && (
//                   <Link href={`/hub/${template.slug}/demo`} className="shrink-0 w-[120px] rounded-xl border border-mint/20 bg-mint/[0.05] flex items-center justify-center text-xs text-mint font-medium hover:bg-mint/[0.1] transition-colors">
//                     +{template.screenshots.length - 5} ảnh
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-2">
//               <div className="sticky top-24 space-y-6">
//                 <div>
//                   <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-mint/10 text-mint">{template.category}</span>
//                   <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-3 tracking-tight">{template.name}</h1>
//                   <p className="text-sm text-gray-400 leading-relaxed">{template.longDescription}</p>
//                 </div>

//                 {/* Info */}
//                 <div className="gradient-border rounded-2xl p-5 bg-dark2/60">
//                   <div className="grid grid-cols-2 gap-4">
//                     {[
//                       { label: "Số trang", value: `${template.pages} pages` },
//                       { label: "Responsive", value: template.responsive ? "✓ Có" : "✗ Không" },
//                       { label: "Framework", value: template.techStack[0] || "NextJS 14" },
//                       { label: "Phiên bản", value: `v${template.version}` },
//                     ].map((info) => (
//                       <div key={info.label} className="py-2">
//                         <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{info.label}</p>
//                         <p className="text-sm font-semibold text-mint">{info.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Devices supported */}
//                 <div className="flex gap-2">
//                   {devices.map((d) => (
//                     <div key={d} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark2/50 border border-white/5 text-xs text-gray-400">
//                       {d === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
//                       {d === "tablet" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
//                       {d === "mobile" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
//                       {d.charAt(0).toUpperCase() + d.slice(1)}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {template.tags.map((tag) => (
//                     <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-mint/[0.06] text-mint border border-mint/10">{tag}</span>
//                   ))}
//                 </div>

//                 {/* CTAs */}
//                 <div className="space-y-3">
//                   <Link href={`/portfolio/${template.slug}/demo`} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-gray-950 flex items-center gap-2 justify-center">
//                     <span className="flex items-center gap-2">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
//                       Xem demo trực tiếp
//                     </span>
//                   </Link>
//                   <button className="btn-ghost w-full py-3.5 rounded-xl text-sm font-medium text-gray-300 flex items-center gap-2 justify-center">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
//                     Sử dụng template
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features & Tech */}
//         <section className="px-6 py-16 border-t border-gray-800/30">
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
//             <div>
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-mint/[0.1] flex items-center justify-center text-mint">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
//                 </span>
//                 Tính năng nổi bật
//               </h2>
//               <div className="space-y-3">
//                 {template.features.map((feat, i) => (
//                   <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-dark2/50 border border-white/5">
//                     <div className="w-2 h-2 rounded-full bg-linear-to-r from-mint to-cyan shrink-0" />
//                     <span className="text-sm text-gray-300">{feat}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-cyan/[0.1] flex items-center justify-center text-cyan">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
//                 </span>
//                 Tech Stack
//               </h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {template.techStack.map((tech) => (
//                   <div key={tech} className="tag-chip px-4 py-3 rounded-xl text-sm font-medium text-mint text-center">{tech}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related */}
//         {related.length > 0 && (
//           <section className="px-6 py-16 border-t border-gray-800/30">
//             <div className="max-w-6xl mx-auto">
//               <h2 className="text-xl font-bold text-white mb-8">Template <span className="gradient-text">liên quan</span></h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {related.map((t) => (
//                   <Link key={t.id} href={`/portfolio/${t.slug}`}>
//                     <div className="glow-card rounded-2xl overflow-hidden bg-dark2/50 border border-white/5 group cursor-pointer">
//                       <div className="relative aspect-video overflow-hidden">
//                         <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" />
//                       </div>
//                       <div className="p-5">
//                         <h3 className="text-sm font-semibold text-white group-hover:text-mint transition-colors">{t.name}</h3>
//                         <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.description}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         <div className="max-w-6xl mx-auto px-6 pb-12">
//           <Link href="/#templates" className="inline-flex items-center gap-2 text-sm text-mint hover:underline">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//             Quay lại kho giao diện
//           </Link>
//         </div>
//       </main>
//       <Footer config={config} />
//     </>
//   );
// }








// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import Header from "@/app/components/template/Header";
// import Footer from "@/app/components/template/Footer";
// import { clientApi } from "@/app/lib/api";
// import { apiTemplateToLocal } from "@/app/lib/transform";
// import type { TemplateScreenshotLocal } from "@/app/types";

// interface Props {
//   params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const apiTemplate = await clientApi.getTemplateDetail(params.slug).catch(() => null);
//   if (!apiTemplate) return { title: "Không tìm thấy" };

//   const t = apiTemplateToLocal(apiTemplate);
//   return {
//     title: t.metaTitle || `${t.name} | TemplateHub`,
//     description: t.metaDescription || t.description,
//     openGraph: {
//       title: t.metaTitle || t.name,
//       description: t.metaDescription || t.description,
//       images: [t.ogImage || t.image],
//     },
//   };
// }

// export default async function TemplateDetailPage({ params }: Props) {
//   const [apiTemplate, config, allApiTemplates] = await Promise.all([
//     clientApi.getTemplateDetail(params.slug).catch(() => null),
//     clientApi.getConfigSite().catch(() => null),
//     clientApi.getTemplatePublished().catch(() => []),
//   ]);

//   console.log(1234567890);
  

//   if (!apiTemplate) notFound();

//   const template = apiTemplateToLocal(apiTemplate);
//   const allTemplates = allApiTemplates.map(apiTemplateToLocal);
//   const related = allTemplates
//     .filter((t) => t.category === template.category && t.id !== template.id)
//     .slice(0, 3);

//   const devices: string[] = [...new Set(template.screenshots.map((s: TemplateScreenshotLocal) => s.device))] as string[];

//   return (
//     <>
//       <Header config={config} />
//       <main className="pt-20">
//         {/* Breadcrumb */}
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <Link href="/" className="hover:text-mint transition-colors">Trang chủ</Link>
//             <span>/</span>
//             <Link href="/#templates" className="hover:text-mint transition-colors">Giao diện</Link>
//             <span>/</span>
//             <span className="text-gray-400">{template.name}</span>
//           </div>
//         </div>

//         {/* Hero */}
//         <section className="px-6 pb-12">
//           <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
//             {/* Cover */}
//             <div className="lg:col-span-3">
//               <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
//                 <Image src={template.image} alt={template.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 60vw" />
//                 <div className="absolute inset-0 bg-linear-to-t from-dark/40 via-transparent to-transparent" />
//                 {template.popular && (
//                   <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-linear-to-r from-mint to-cyan text-dark">⭐ Phổ biến</div>
//                 )}
//               </div>

//               {/* Preview thumbnails */}
//               <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
//                 {template.screenshots.slice(0, 5).map((shot: TemplateScreenshotLocal, i: number) => (
//                   <div key={i} className="shrink-0 rounded-xl overflow-hidden border border-white/5 hover:border-mint/20 transition-colors" style={{ width: shot.device === "mobile" ? 60 : 120 }}>
//                     <div className={`relative ${shot.device === "mobile" ? "aspect-9/16" : "aspect-video"}`}>
//                       <Image src={shot.image} alt={shot.label} fill className="object-cover" sizes="120px" />
//                     </div>
//                   </div>
//                 ))}
//                 {template.screenshots.length > 5 && (
//                   <Link href={`/portfolio/${template.slug}/demo`} className="shrink-0 w-[120px] rounded-xl border border-mint/20 bg-mint/[0.05] flex items-center justify-center text-xs text-mint font-medium hover:bg-mint/[0.1] transition-colors">
//                     +{template.screenshots.length - 5} ảnh
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-2">
//               <div className="sticky top-24 space-y-6">
//                 <div>
//                   <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-mint/10 text-mint">{template.category}</span>
//                   <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-3 tracking-tight">{template.name}</h1>
//                   <p className="text-sm text-gray-400 leading-relaxed">{template.longDescription}</p>
//                 </div>

//                 {/* Info */}
//                 <div className="gradient-border rounded-2xl p-5 bg-dark2/60">
//                   <div className="grid grid-cols-2 gap-4">
//                     {[
//                       { label: "Số trang", value: `${template.pages} pages` },
//                       { label: "Responsive", value: template.responsive ? "✓ Có" : "✗ Không" },
//                       { label: "Framework", value: template.techStack[0] || "NextJS 14" },
//                       { label: "Phiên bản", value: `v${template.version}` },
//                     ].map((info) => (
//                       <div key={info.label} className="py-2">
//                         <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{info.label}</p>
//                         <p className="text-sm font-semibold text-mint">{info.value}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Devices supported */}
//                 <div className="flex gap-2">
//                   {devices.map((d: string) => (
//                     <div key={d} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark2/50 border border-white/5 text-xs text-gray-400">
//                       {d === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
//                       {d === "tablet" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
//                       {d === "mobile" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
//                       {d.charAt(0).toUpperCase() + d.slice(1)}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2">
//                   {template.tags.map((tag: string) => (
//                     <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-mint/[0.06] text-mint border border-mint/10">{tag}</span>
//                   ))}
//                 </div>

//                 {/* CTAs */}
//                 <div className="space-y-3">
//                   <Link href={`/portfolio/${template.slug}/demo`} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-gray-950 flex items-center gap-2 justify-center">
//                     <span className="flex items-center gap-2">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
//                       Xem demo trực tiếp
//                     </span>
//                   </Link>
//                   <button className="btn-ghost w-full py-3.5 rounded-xl text-sm font-medium text-gray-300 flex items-center gap-2 justify-center">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
//                     Sử dụng template
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features & Tech */}
//         <section className="px-6 py-16 border-t border-gray-800/30">
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
//             <div>
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-mint/[0.1] flex items-center justify-center text-mint">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
//                 </span>
//                 Tính năng nổi bật
//               </h2>
//               <div className="space-y-3">
//                 {template.features.map((feat: string, i: number) => (
//                   <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-dark2/50 border border-white/5">
//                     <div className="w-2 h-2 rounded-full bg-linear-to-r from-mint to-cyan shrink-0" />
//                     <span className="text-sm text-gray-300">{feat}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//                 <span className="w-8 h-8 rounded-lg bg-cyan/[0.1] flex items-center justify-center text-cyan">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
//                 </span>
//                 Tech Stack
//               </h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {template.techStack.map((tech: string) => (
//                   <div key={tech} className="tag-chip px-4 py-3 rounded-xl text-sm font-medium text-mint text-center">{tech}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related */}
//         {related.length > 0 && (
//           <section className="px-6 py-16 border-t border-gray-800/30">
//             <div className="max-w-6xl mx-auto">
//               <h2 className="text-xl font-bold text-white mb-8">Template <span className="gradient-text">liên quan</span></h2>
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {related.map((t) => (
//                   <Link key={t.id} href={`/portfolio/${t.slug}`}>
//                     <div className="glow-card rounded-2xl overflow-hidden bg-dark2/50 border border-white/5 group cursor-pointer">
//                       <div className="relative aspect-video overflow-hidden">
//                         <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" />
//                       </div>
//                       <div className="p-5">
//                         <h3 className="text-sm font-semibold text-white group-hover:text-mint transition-colors">{t.name}</h3>
//                         <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.description}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         <div className="max-w-6xl mx-auto px-6 pb-12">
//           <Link href="/#templates" className="inline-flex items-center gap-2 text-sm text-mint hover:underline">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
//             Quay lại kho giao diện
//           </Link>
//         </div>
//       </main>
//       <Footer config={config} />
//     </>
//   );
// }








import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/template/Header";
import Footer from "@/app/components/template/Footer";
import { clientApi } from "@/app/lib/api";
import { apiTemplateToLocal } from "@/app/lib/transform";
import type { TemplateScreenshotLocal } from "@/app/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = await params;
  const apiTemplate = await clientApi.getTemplateDetail(slug).catch(() => null);
  if (!apiTemplate) return { title: "Không tìm thấy" };

  const t = apiTemplateToLocal(apiTemplate);
  return {
    title: t.metaTitle || `${t.name} | TemplateHub`,
    description: t.metaDescription || t.description,
    openGraph: {
      title: t.metaTitle || t.name,
      description: t.metaDescription || t.description,
      images: [t.ogImage || t.image],
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;

  const [apiTemplate, config, allApiTemplates] = await Promise.all([
    clientApi.getTemplateDetail(slug).catch(() => null),
    clientApi.getConfigSite().catch(() => null),
    clientApi.getTemplatePublished().catch(() => []),
  ]);
  console.log(apiTemplate);
  console.log(config);
  console.log(allApiTemplates);

  if (!apiTemplate) notFound();

  const template = apiTemplateToLocal(apiTemplate);
  const allTemplates = allApiTemplates.map(apiTemplateToLocal);
  const related = allTemplates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  const devices: string[] = [...new Set(template.screenshots.map((s: TemplateScreenshotLocal) => s.device))] as string[];

  return (
    <>
      <Header config={config} />
            <main className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Link href="/" className="hover:text-mint transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/#templates" className="hover:text-mint transition-colors">Giao diện</Link>
            <span>/</span>
            <span className="text-gray-400">{template.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
            {/* Cover */}
            <div className="lg:col-span-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <Image src={template.image} alt={template.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 60vw" />
                <div className="absolute inset-0 bg-linear-to-t from-dark/40 via-transparent to-transparent" />
                {template.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-linear-to-r from-mint to-cyan text-dark">⭐ Phổ biến</div>
                )}
              </div>

              {/* Preview thumbnails */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {template.screenshots.slice(0, 5).map((shot: TemplateScreenshotLocal, i: number) => (
                  <div key={i} className="shrink-0 rounded-xl overflow-hidden border border-white/5 hover:border-mint/20 transition-colors" style={{ width: shot.device === "mobile" ? 60 : 120 }}>
                    <div className={`relative ${shot.device === "mobile" ? "aspect-9/16" : "aspect-video"}`}>
                      <Image src={shot.image} alt={shot.label} fill className="object-cover" sizes="120px" />
                    </div>
                  </div>
                ))}
                {template.screenshots.length > 5 && (
                  <Link href={`/hub/${template.slug}/demo`} className="shrink-0 w-[120px] rounded-xl border border-mint/20 bg-mint/[0.05] flex items-center justify-center text-xs text-mint font-medium hover:bg-mint/[0.1] transition-colors">
                    +{template.screenshots.length - 5} ảnh
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-mint/10 text-mint">{template.category}</span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-3 tracking-tight">{template.name}</h1>
                  <p className="text-sm text-gray-400 leading-relaxed">{template.longDescription}</p>
                </div>

                {/* Info */}
                <div className="gradient-border rounded-2xl p-5 bg-dark2/60">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Số trang", value: `${template.pages} pages` },
                      { label: "Responsive", value: template.responsive ? "✓ Có" : "✗ Không" },
                      { label: "Framework", value: template.techStack[0] || "NextJS 14" },
                      { label: "Phiên bản", value: `v${template.version}` },
                    ].map((info) => (
                      <div key={info.label} className="py-2">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">{info.label}</p>
                        <p className="text-sm font-semibold text-mint">{info.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Devices supported */}
                <div className="flex gap-2">
                  {devices.map((d: string) => (
                    <div key={d} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark2/50 border border-white/5 text-xs text-gray-400">
                      {d === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                      {d === "tablet" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
                      {d === "mobile" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#57F5B2" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>}
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-mint/[0.06] text-mint border border-mint/10">{tag}</span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link href={`/hub/${template.slug}/demo`} className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold text-gray-950 flex items-center gap-2 justify-center">
                    <span className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                      Xem demo trực tiếp
                    </span>
                  </Link>
                  <button className="btn-ghost w-full py-3.5 rounded-xl text-sm font-medium text-gray-300 flex items-center gap-2 justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Sử dụng template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Tech */}
        <section className="px-6 py-16 border-t border-gray-800/30">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-mint/[0.1] flex items-center justify-center text-mint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                </span>
                Tính năng nổi bật
              </h2>
              <div className="space-y-3">
                {template.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-dark2/50 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-linear-to-r from-mint to-cyan shrink-0" />
                    <span className="text-sm text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan/[0.1] flex items-center justify-center text-cyan">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                </span>
                Tech Stack
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {template.techStack.map((tech: string) => (
                  <div key={tech} className="tag-chip px-4 py-3 rounded-xl text-sm font-medium text-mint text-center">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="px-6 py-16 border-t border-gray-800/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-8">Template <span className="gradient-text">liên quan</span></h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((t) => (
                  <Link key={t.id} href={`/hub/${t.slug}`}>
                    <div className="glow-card rounded-2xl overflow-hidden bg-dark2/50 border border-white/5 group cursor-pointer">
                      <div className="relative aspect-video overflow-hidden">
                        <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-semibold text-white group-hover:text-mint transition-colors">{t.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="max-w-6xl mx-auto px-6 pb-12">
          <Link href="/#templates" className="inline-flex items-center gap-2 text-sm text-mint hover:underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Quay lại kho giao diện
          </Link>
        </div>
      </main>
      <Footer config={config} />
    </>
  );
}