// // ============ TEMPLATE TYPES ============

// // Template Entity (response từ API)
// export interface Template {
//     id: number;
//     name: string;
//     slug: string;
//     // category: string;
//     categoryTemplateId: number;
//     categoryName: string;
//     description: string;
//     longDescription?: string | null;
//     image: string;
//     pages: number;
//     isResponsive: boolean;
//     isPopular: boolean;
//     tags?: string | null;           // JSON string: '["Agency","Marketing"]'
//     features?: string | null;       // JSON string
//     techStack?: string | null;      // JSON string
//     demoUrl?: string | null;
//     version?: string | null;
//     metaTitle?: string | null;
//     metaDescription?: string | null;
//     ogImage?: string | null;
//     sortOrder: number;
//     viewCount: number;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt?: string | null;
//     screenshots?: TemplateScreenshot[];
// }

// // Screenshot Entity
// export interface TemplateScreenshot {
//     id: number;
//     imageUrl: string;
//     label?: string | null;
//     device: string;           // "desktop" | "tablet" | "mobile"
//     width: number;
//     height: number;
//     sortOrder: number;
// }

// // List DTO (nhẹ, dùng cho bảng danh sách)
// export interface TemplateListItem {
//     id: number;
//     name: string;
//     slug: string;
//     // category: string;
//     categoryTemplateId: number;
//     categoryName: string;
//     description: string;
//     image: string;
//     pages: number;
//     isResponsive: boolean;
//     isPopular: boolean;
//     tags?: string | null;
//     version?: string | null;
//     viewCount: number;
//     isActive: boolean;
//     createdAt: string;
//     screenshotCount: number;
//     sortOrder: number;
// }

// // Form Data (Create / Update)
// export interface TemplateFormData {
//     name: string;
//     // category: string;
//     description: string;
//     longDescription: string;
//     image: string;
//     pages: number;
//     isResponsive: boolean;
//     isPopular: boolean;
//     tags: string;               // JSON string
//     features: string;           // JSON string
//     techStack: string;          // JSON string
//     demoUrl: string;
//     version: string;
//     metaTitle: string;
//     metaDescription: string;
//     ogImage: string;
//     sortOrder: number;
//     isActive: boolean;
//     categoryTemplateId: number;
//     categoryName: string;
//     screenshots: TemplateScreenshotFormData[];
// }

// // Screenshot Form Data
// export interface TemplateScreenshotFormData {
//     id: number;                 // 0 = thêm mới, > 0 = update
//     imageUrl: string;
//     label: string;
//     device: string;
//     width: number;
//     height: number;
//     sortOrder: number;
// }




// // Upload Demo Response                         ← MỚI
// export interface UploadDemoResponse {
//     message: string;
//     demoUrl: string;
//     fileCount: number;
//     totalSizeKB: number;
//     hasIndex: boolean;
// }

// // Filter Params
// export interface TemplateFilterParams {
//     search?: string;
//     categoryTemplateId?: number;                // ← sửa: category → categoryTemplateId (khớp BE)
//     isPopular?: boolean;
//     isActive?: boolean;
//     page?: number;
//     pageSize?: number;
//     sortBy?: string;
//     sortDesc?: boolean;
// }




// ============ TEMPLATE TYPES ============

// --- API Response Types (match backend exactly) ---

export interface TemplateScreenshot {
  id: number;
  imageUrl: string;
  label?: string | null;
  device: string; // "desktop" | "tablet" | "mobile"
  width: number;
  height: number;
  sortOrder: number;
}

export interface Template {
  id: number;
  name: string;
  slug: string;
  // category: string;
  categoryTemplateId: number;
  categoryName: string;
  description: string;
  longDescription?: string | null;
  image: string;
  pages: number;
  isResponsive: boolean;
  isPopular: boolean;
  tags?: string | null; // JSON string: '["Agency","Marketing"]'
  features?: string | null; // JSON string
  techStack?: string | null; // JSON string
  demoUrl?: string | null;
  version?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  sortOrder: number;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  screenshots?: TemplateScreenshot[];
}

// List DTO (nhẹ, dùng cho bảng danh sách)
export interface TemplateListItem {
  id: number;
  name: string;
  slug: string;
  // category: string;
  categoryTemplateId: number;
  categoryName: string;
  description: string;
  image: string;
  pages: number;
  isResponsive: boolean;
  isPopular: boolean;
  tags?: string | null;
  version?: string | null;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  screenshotCount: number;
  sortOrder: number;
}

// Form Data (Create / Update)
export interface TemplateFormData {
  name: string;
  // category: string;
  description: string;
  longDescription: string;
  image: string;
  pages: number;
  isResponsive: boolean;
  isPopular: boolean;
  tags: string; // JSON string
  features: string; // JSON string
  techStack: string; // JSON string
  demoUrl: string;
  version: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  sortOrder: number;
  isActive: boolean;
  categoryTemplateId: number;
  categoryName: string;
  screenshots: TemplateScreenshotFormData[];
}

// Screenshot Form Data
export interface TemplateScreenshotFormData {
  id: number; // 0 = thêm mới, > 0 = update
  imageUrl: string;
  label: string;
  device: string;
  width: number;
  height: number;
  sortOrder: number;
}

// Upload Demo Response
export interface UploadDemoResponse {
  message: string;
  demoUrl: string;
  fileCount: number;
  totalSizeKB: number;
  hasIndex: boolean;
}

// --- Local Transformed Types (used by components) ---

export interface TemplateScreenshotLocal {
  device: "desktop" | "tablet" | "mobile";
  label: string;
  image: string;
  width: number;
  height: number;
}

export interface TemplateLocal {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryTemplateId: number;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  pages: number;
  responsive: boolean;
  popular: boolean;
  features: string[];
  techStack: string[];
  screenshots: TemplateScreenshotLocal[];
  demoUrl: string;
  version: string;
  lastUpdated: string;
  viewCount: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
}

// --- Filter Params ---

export interface TemplateFilterParams {
  search?: string;
  categoryTemplateId?: number; // ← sửa: category → categoryTemplateId (khớp BE)
  isPopular?: boolean;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDesc?: boolean;
}

