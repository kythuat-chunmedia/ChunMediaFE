// ============ CONTACT (Liên hệ) ============

// Contact Entity (map từ DB)
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Form data để gửi liên hệ (public form)
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Filter params cho API
export interface ContactFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isRead?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}