// ============ ADMIN ============
export interface Admin {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'Content' | 'Admin' | 'SuperAdmin';
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
}

// DTO hiển thị (không có password và token)
export interface AdminInfo {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'Content' | 'Admin' | 'SuperAdmin';
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
}

// Form data cho UPDATE (không có password)
export interface AdminFormData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: 'Content' | 'Admin' | 'SuperAdmin';
  isActive: boolean;
}

// Form data cho CREATE (có password)
export interface AdminCreateData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: 'Content' | 'Admin' | 'SuperAdmin';
  isActive: boolean;
}

// Filter params
export interface AdminFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: 'Content' | 'Admin' | 'SuperAdmin';
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
