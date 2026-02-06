export interface SeoMetadata {
  id: number;
  pageType: "page" | "news";       // "page" = trang tĩnh (Menu), "news" = bài viết
  menuId: number | null;
  newsId: number | null;
  slug: string;

  // SEO
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;

  // Open Graph
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string | null;            // "website" | "article"

  // Extra
  canonicalUrl: string | null;
  robots: string | null;            // "index,follow" | "noindex,nofollow"
  schemaMarkup: string | null;      // JSON-LD string

  createdAt: string;
  updatedAt: string | null;

  // Navigation display (from Include)
  menuName: string | null;
  newsTitle: string | null;
}

// ── Create DTO ──
export interface SeoMetadataFormData {
  pageType: "page" | "news";
  menuId: number | null;
  newsId: number | null;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  canonicalUrl: string;
  robots: string;
  schemaMarkup: string;
}

// ── Public DTO (FE fetch cho generateMetadata) ──
export interface SeoMetadataPublic {
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string | null;
  canonicalUrl: string | null;
  robots: string | null;
  schemaMarkup: string | null;
}