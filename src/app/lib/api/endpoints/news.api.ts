import { apiClient } from "../client";
import {
  New,
  NewFormData,
  ApiResponse,
  PaginatedResponse,
  NewFilterParams,
} from "@/app/types";

const BASE_URL = "/api/new";
const PUBLIC_URL = "/api/public/news";

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

export const newApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách tin tức (có phân trang, filter)
   */
  getAll: async (params?: NewFilterParams): Promise<New[]> => {
    const response = await apiClient.get<New[] | PaginatedResponse<New>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as New[] | { data: New[] });
  },

  /**
   * Lấy tất cả tin tức (không phân trang)
   */
  getAllNoPaging: async (): Promise<New[]> => {
    const response = await apiClient.get<New[] | ApiResponse<New[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết tin tức theo ID
   */
  getById: async (id: number): Promise<New | null> => {
    const response = await apiClient.get<New | ApiResponse<New>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<New>).data ?? null;
    }
    return response as New;
  },

  /**
   * Tạo tin tức mới
   */
  create: async (data: NewFormData): Promise<New | null> => {
    const response = await apiClient.post<New | ApiResponse<New>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<New>).data ?? null;
    }
    return response as New;
  },

  /**
   * Cập nhật tin tức
   */
  update: async (data: New): Promise<New | null> => {
    const response = await apiClient.put<New | ApiResponse<New>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<New>).data ?? null;
    }
    return response as New;
  },

  /**
   * Xóa tin tức
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
   * Xóa nhiều tin tức
   */
  deleteMany: async (news: New[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      news
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   */
  toggleStatus: async (data: New): Promise<New | null> => {
    const response = await apiClient.post<New | ApiResponse<New>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<New>).data ?? null;
    }
    return response as New;
  },

  /**
   * Upload hình ảnh tin tức
   */
  uploadImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-image`, file, "image"),

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách tin tức (public)
   */
  getPublic: async (params?: NewFilterParams): Promise<New[]> => {
    const response = await apiClient.get<New[] | PaginatedResponse<New>>(
      PUBLIC_URL,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as New[] | { data: New[] });
  },

  /**
   * Lấy chi tiết tin tức (public) - tự động tăng view
   */
  getPublicById: async (id: number): Promise<New | null> => {
    const response = await apiClient.get<New | ApiResponse<New>>(
      `${PUBLIC_URL}/${id}`,
      undefined,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<New>).data ?? null;
    }
    return response as New;
  },

  /**
   * Lấy tin tức theo danh mục
   */
  getByCategory: async (categoryId: number, params?: NewFilterParams): Promise<New[]> => {
    const response = await apiClient.get<New[] | PaginatedResponse<New>>(
      `${PUBLIC_URL}/category/${categoryId}`,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as New[] | { data: New[] });
  },

  /**
   * Lấy tin tức nổi bật/mới nhất
   */
  getFeatured: async (limit: number = 10): Promise<New[]> => {
    const response = await apiClient.get<New[] | ApiResponse<New[]>>(
      `${PUBLIC_URL}/featured`,
      { limit },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy tin tức liên quan
   */
  getRelated: async (id: number, limit: number = 5): Promise<New[]> => {
    const response = await apiClient.get<New[] | ApiResponse<New[]>>(
      `${PUBLIC_URL}/${id}/related`,
      { limit },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Tìm kiếm tin tức
   */
  search: async (keyword: string, params?: NewFilterParams): Promise<New[]> => {
    const response = await apiClient.get<New[] | PaginatedResponse<New>>(
      `${PUBLIC_URL}/search`,
      { keyword, ...(params || {}) },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as New[] | { data: New[] });
  },
};