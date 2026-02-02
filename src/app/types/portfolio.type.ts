// ============ PORTFOLIO TYPES ============

/**
 * Portfolio entity - matching C# model
 */
export interface Portfolio {
  id: number;
  // SEO + routing
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  // Nội dung hiển thị
  shortDescription: string | null;
  content: string; // HTML / Markdown
  thumbnailUrl: string;
  bannerUrl: string | null;
  // Meta
  clientName: string;
  industry: string | null;
  year: number;
  // KPIs
  reach: number;
  engagement: number;
  conversionRate: number;
  orderQuantity: number;
  revenue: number;
  // Status
  isPublished: boolean;
  publishedAt: string; // ISO date string
  // Audit
  createdAt: string;
  updatedAt: string;
}

/**
 * Form data for creating/updating portfolio
 */
export interface PortfolioFormData {
  // SEO + routing
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  // Nội dung hiển thị
  shortDescription: string;
  content: string;
  thumbnailUrl: string;
  bannerUrl: string;
  // Meta
  clientName: string;
  industry: string;
  year: number;
  // KPIs
  reach: number;
  engagement: number;
  conversionRate: number;
  orderQuantity: number;
  revenue: number;
  // Status
  isPublished: boolean;
}

/**
 * Filter params for portfolio list
 */
export interface PortfolioFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  year?: number;
  industry?: string;
  isPublished?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * KPI summary for portfolio
 */
export interface PortfolioKpiSummary {
  totalReach: number;
  totalEngagement: number;
  avgConversionRate: number;
  totalOrderQuantity: number;
  totalRevenue: number;
  projectCount: number;
}