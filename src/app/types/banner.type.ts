// ============ BANNER ============
export interface Banner {
  id: number;
  title: string;
  image: string;
  link?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

// Form data để tạo/sửa banner
export interface BannerFormData {
  title: string;
  image: string;
  link?: string;
  sortOrder: number;
  isActive: boolean;
}

// Filter params cho API
export interface BannerFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}