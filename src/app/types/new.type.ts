// ============ NEW (Bài viết/Tin tức) ============

import { CategoryNew } from "./categoryNew.type";

// New Entity (map từ DB)
export interface New {
  id: number;
  title: string;
  description?: string | null;
  url?: string | null; // NotMapped - computed from title
  view: number;
  image?: string | null;
  author?: string | null;
  content?: string | null;
  isActive: boolean;
  sortOrder: number;
  categoryNewId: number;
  createdAt: string;
  // Navigation property (optional)
  categoryNew?: CategoryNew | null;
}

// Form data để tạo/sửa tin tức
export interface NewFormData {
  title: string;
  description?: string;
  image?: string;
  author?: string;
  content?: string;
  isActive: boolean;
  sortOrder: number;
  categoryNewId: number;
}

// Filter params cho API
export interface NewFilterParamsPagination {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryNewId?: number;
  isActive?: boolean;
  author?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
