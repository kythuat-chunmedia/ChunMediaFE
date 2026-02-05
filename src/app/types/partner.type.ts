// ============ PARTNER ============
export interface Partner {
  id: number;
  name: string;
  image: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

// Form data để tạo / sửa partner
export interface PartnerFormData {
  name: string;
  image: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
}

// Filter params cho API
export interface PartnerFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;      // tìm theo name / phone / email
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
