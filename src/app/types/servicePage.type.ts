// ============================================================
// types.ts — Service Slug Page Types
// Đặt tại: app/types/service-page.ts
// ============================================================

export interface ServiceHero {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  heroImageUrl?: string;
  stats?: { value: string; label: string }[];
}

export interface ServiceHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface ClientLogo {
  name: string;
  logoUrl: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
}

export interface Award {
  name: string;
  organization: string;
  year: string;
  logoUrl?: string;
}

export interface TeamExpert {
  name: string;
  role: string;
  avatarUrl: string;
  experience?: string;
  specialties?: string[];
}

export interface ServicePageData {
  id: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;

  hero: ServiceHero;                          // luôn bắt buộc

  highlights?: ServiceHighlight[];            // null → ẩn section
  clientStats?: {
    totalClients: string;
    description?: string;
    logos?: ClientLogo[];
  };
  pricing?: {
    title?: string;
    subtitle?: string;
    packages: PricingPackage[];
  };
  process?: {
    title?: string;
    subtitle?: string;
    steps: ProcessStep[];
  };
  awards?: {
    title?: string;
    items: Award[];
  };
  team?: {
    title?: string;
    subtitle?: string;
    experts: TeamExpert[];
  };
  ctaSection?: {
    title: string;
    subtitle?: string;
    ctaText: string;
    ctaUrl: string;
    formEnabled?: boolean;
  };
}