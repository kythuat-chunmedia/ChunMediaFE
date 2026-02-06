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
export { categoryProductApi, categoryNewApi } from "./endpoints/category.api";

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

// ============ UPLOAD ============
export { uploadApi } from "./endpoints/upload.api";
// export { uploadApi, uploadHelpers } from "./endpoints/upload.api";

// ============================================================
// QUICK REFERENCE - Cách sử dụng
// ============================================================
/*

// 1. Import API service
import { productApi, bannerApi, authHelpers } from "@/lib/api";

// 2. Sử dụng trong component
const fetchProducts = async () => {
  try {
    const response = await productApi.getAll({ page: 1, pageSize: 10 });
    if (response.success) {
      setProducts(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

// 3. CRUD operations
await productApi.create(formData);
await productApi.update(id, formData);
await productApi.delete(id);

// 4. Auth
await adminAuthApi.login({ usernameOrEmail, password });
authHelpers.isAuthenticated();
authHelpers.clearSession();

// 5. Upload
await uploadApi.uploadImage(file);

*/
