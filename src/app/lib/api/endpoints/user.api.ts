import { apiClient } from "../client";
import {
  User,
  UserFormData,
  ApiResponse,
  PaginatedResponse,
  UserFilterParams,
} from "@/app/types";

const BASE_URL = "/api/user";

// Helper để normalize response
const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if ('data' in response && response.data) {
    return response.data;
  }
  return [];
};

export const userManagementApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách user (có phân trang, filter)
   */
  getAll: async (params?: UserFilterParams): Promise<User[]> => {
    const response = await apiClient.get<User[] | PaginatedResponse<User>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as User[] | { data: User[] });
  },

  /**
   * Lấy tất cả user (không phân trang)
   */
  getAllNoPaging: async (): Promise<User[]> => {
    const response = await apiClient.get<User[] | ApiResponse<User[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết user theo ID
   */
  getById: async (id: number): Promise<User | null> => {
    const response = await apiClient.get<User | ApiResponse<User>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<User>).data ?? null;
    }
    return response as User;
  },

  /**
   * Tạo user mới
   * POST /api/user/insert + body UserFormData
   */
  create: async (data: UserFormData): Promise<User | null> => {
    const response = await apiClient.post<User | ApiResponse<User>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<User>).data ?? null;
    }
    return response as User;
  },

  /**
   * Cập nhật user
   * PUT /api/user/update + body User (full object)
   */
  update: async (data: User): Promise<User | null> => {
    const response = await apiClient.put<User | ApiResponse<User>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<User>).data ?? null;
    }
    return response as User;
  },

  /**
   * Xóa user
   * DELETE /api/user/delete/{id}
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete/${id}`
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },

  /**
   * Xóa nhiều user
   */
  deleteMany: async (users: User[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      users
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái active
   * POST /api/user/toggle-status + body User
   */
  toggleStatus: async (data: User): Promise<User | null> => {
    const response = await apiClient.post<User | ApiResponse<User>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<User>).data ?? null;
    }
    return response as User;
  },

  /**
   * Upload avatar
   */
  uploadAvatar: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-avatar`, file, "avatar"),

  /**
   * Reset password (Admin)
   */
  resetPassword: async (id: number, newPassword: string): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/reset-password`,
      { id, newPassword }
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Verify email (Admin)
   */
  verifyEmail: async (id: number): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/verify-email/${id}`,
      {}
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },
};