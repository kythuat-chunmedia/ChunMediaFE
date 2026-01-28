// ============ USER ============
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phoneNumber?: string | null;
  avatar?: string | null;
  role: 'User' | 'Premium';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt?: string | null;
  lastLoginAt?: string | null;
  refreshToken?: string | null;
  refreshTokenExpiry?: string | null;
}

// User DTO (không bao gồm password và token)
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  avatar?: string | null;
  role: 'User' | 'Premium';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt?: string | null;
  lastLoginAt?: string | null;
}

// Form data để tạo/sửa user
export interface UserFormData {
  username: string;
  email: string;
  password?: string; // Chỉ cần khi tạo mới, optional khi update
  fullName: string;
  phoneNumber?: string;
  avatar?: string;
  role: 'User' | 'Premium';
  isActive: boolean;
  isEmailVerified: boolean;
}

export interface UserFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: 'User' | 'Premium';
  isActive?: boolean;
  isEmailVerified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}