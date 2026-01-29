// API Response Types based on backend models

export interface Admin {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface Banner {
  id: number;
  title: string;
  image: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryNew {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryProduct {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface ConfigSite {
  id: number;
  title: string;
  email: string;
  hotline: string;
  description: string;
  infoContact: string;
  infoFooter: string;
  image: string;
  favicon: string;
  googleMap: string;
  googleAnalytics: string;
  place: string;
  aboutImage: string;
  aboutText: string;
  aboutUrl: string;
  facebook: string;
  zalo: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  twitter: string;
  x: string;
  youtube: string;
  pinterest: string;
  liveChat: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Menu {
  id: number;
  title: string;
  parentId?: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  children?: Menu[];
}

export interface New {
  id: number;
  title: string;
  description: string;
  url: string;
  view: number;
  image: string;
  author: string;
  content: string;
  isActive: boolean;
  sortOrder: number;
  categoryNewId: number;
  createdAt: string;
  categoryNew?: CategoryNew;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  salePrice: number;
  url?: string;
  createdAt: string;
  description: string;
  content: string;
  isActive: boolean;
  categoryProductId: number;
}

export interface Portfolio {
  id: number;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  shortDescription?: string;
  content: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  clientName: string;
  industry?: string;
  year: number;
  reach: number;
  engagement: number;
  conversionRate: number;
  orderQuantity: number;
  revenue: number;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Service item for Services page
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// Team member for About page
export interface TeamMember {
  name: string;
  position: string;
  image: string;
}

// Award for About page
export interface Award {
  year: number;
  title: string;
  organization: string;
}

// Process step for Services page
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}
