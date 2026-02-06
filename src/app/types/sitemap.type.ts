// ============ SITEMAP ENTRY ============
export interface SitemapEntry {
  id: number;
  url: string;
  pageType: string; // "page" | "news" | "custom"
  menuId: number | null;
  newsId: number | null;
  lastModified: string | null;
  changeFrequency: string; // "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number; // 0.0 - 1.0
  isActive: boolean;
  sortOrder: number;
  note: string | null;
  createdAt: string;
  updatedAt: string | null;

  // Navigation display
  menuTitle: string | null;
  newsTitle: string | null;
}

// Form data để tạo/sửa sitemap entry
export interface SitemapEntryFormData {
  url: string;
  pageType: string;
  menuId?: number | null;
  newsId?: number | null;
  lastModified?: string | null;
  changeFrequency: string;
  priority: number;
  isActive: boolean;
  sortOrder: number;
  note?: string | null;
}

// DTO cho sitemap.xml
export interface SitemapXmlEntry {
  loc: string;
  lastMod: string | null;
  changeFreq: string;
  priority: string;
}

// Kết quả sync
export interface SitemapSyncResult {
  added: number;
  updated: number;
  skipped: number;
  message: string;
}

// Filter params cho API
export interface SitemapFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  pageType?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Change Frequency options
export const CHANGE_FREQUENCY_OPTIONS = [
  { value: "always", label: "Always" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "never", label: "Never" },
] as const;

// Page Type options
export const PAGE_TYPE_OPTIONS = [
  { value: "page", label: "Trang (Menu)" },
  { value: "news", label: "Bài viết (News)" },
  { value: "custom", label: "Tùy chỉnh" },
] as const;

// Priority presets
export const PRIORITY_PRESETS = [
  { value: 1.0, label: "1.0 - Trang chủ" },
  { value: 0.9, label: "0.9 - Rất quan trọng" },
  { value: 0.8, label: "0.8 - Menu chính" },
  { value: 0.7, label: "0.7 - Bài viết" },
  { value: 0.6, label: "0.6 - Menu con" },
  { value: 0.5, label: "0.5 - Mặc định" },
  { value: 0.3, label: "0.3 - Ít quan trọng" },
  { value: 0.1, label: "0.1 - Rất ít quan trọng" },
] as const;