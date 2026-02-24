// ============================================================
// API SERVICES - EXPORT ALL
// File: src/lib/api/index.ts
// ============================================================

// ============ CLIENT ============
export { apiClient, tokenStorage } from "./client";

// ============ AUTH ============
// export { adminAuthApi, userAuthApi, authHelpers } from "/endpoints/auth.api";

// ============ ADMIN MANAGEMENT ============
export { adminManagementApi } from "./endpoints/admin.api";
export type { AdminFormData } from "@/app/types";

// ============ USER MANAGEMENT ============
export { userManagementApi } from "./endpoints/user.api";
export type { UserFormData } from "@/app/types";

// ============ PRODUCT ============
export { productApi } from "./endpoints/product.api";

// ============ PRODUCT ============
export { portfolioApi } from "./endpoints/portfolio.api";

// ============ CATEGORY ============
export { categoryProductApi, categoryNewApi, categoryTemplateApi } from "./endpoints/category.api";

// ============ BANNER ============
export { bannerApi } from "./endpoints/banner.api";

// ============ MENU ============
export { menuApi } from "./endpoints/menu.api";

// ============ NEWS ============
export { newApi } from "./endpoints/news.api";

// ============ CONTACT ============
export { contactApi } from "./endpoints/contact.api";

// ============ ORDER ============
export { orderApi } from "./endpoints/order.api";

// ============ CONFIG SITE ============
export { configSiteApi } from "./endpoints/config.api";

// ============ SERVICE ============
export { serviceApi } from "./endpoints/service.api";

// ============ SERVICE ============
export { partnerApi } from "./endpoints/partner.api";

// ============ SERVICE ============
export { memberTeamApi } from "./endpoints/memberTeam.api";

// ============ SEO METADATA ============
export { seoMetadataApi } from "./endpoints/seoMetadata.api";

// ============ SITEMAP ============
export { sitemapApi } from "./endpoints/sitemap.api";

// ============ TEMPLATE ============
export { templateApi } from "./endpoints/template.api";

// ============ CONTACT REQUEST ============
export { contactRequestApi } from "./endpoints/contactRequest.api";

// ============ FEATURE ============
export { featureApi } from "./endpoints/feature.api";

// ============ UPLOAD ============
export { uploadApi } from "./endpoints/upload.api";
