// ============ CATEGORY NEW TYPES ============

// CategoryNew Entity (map từ DB)
export interface CategoryNew {
  id: number;
  name: string;
  description?: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

// Form data để tạo/sửa danh mục tin tức
export interface CategoryNewFormData {
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
}

// Filter params cho API
export interface CategoryNewFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
