// ============ CONFIG SITE (Cấu hình website) ============

// ConfigSite Entity (map từ DB) - Singleton
export interface ConfigSite {
  id: number;
  // Thông tin chung
  title?: string | null;
  email?: string | null;
  hotline?: string | null;
  description?: string | null;
  infoContact?: string | null;
  infoFooter?: string | null;
  image?: string | null; // Logo
  favicon?: string | null;
  googleMap?: string | null;
  googleAnalytics?: string | null;
  place?: string | null; // Địa chỉ
  aboutImage?: string | null;
  aboutText?: string | null;
  aboutUrl?: string | null;
  // GTM (Google Tag Manager)
  gtmScript?: string | null;
  gtmBody?: string | null;
  // Mạng xã hội
  facebook?: string | null;
  zalo?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
  twitter?: string | null;
  x?: string | null;
  youtube?: string | null;
  pinterest?: string | null;
  liveChat?: string | null;
  // Metadata
  updatedAt?: string | null;
}

// Form data để cập nhật cấu hình
export interface ConfigSiteFormData {
  // Thông tin chung
  title?: string;
  email?: string;
  hotline?: string;
  description?: string;
  infoContact?: string;
  infoFooter?: string;
  image?: string;
  favicon?: string;
  googleMap?: string;
  googleAnalytics?: string;
  place?: string;
  aboutImage?: string;
  aboutText?: string;
  aboutUrl?: string;
  // GTM (Google Tag Manager)
  gtmScript?: string | null;
  gtmBody?: string | null;
  // Mạng xã hội
  facebook?: string;
  zalo?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  twitter?: string;
  x?: string;
  youtube?: string;
  pinterest?: string;
  liveChat?: string;
}