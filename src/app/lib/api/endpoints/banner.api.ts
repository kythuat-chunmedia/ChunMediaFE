import { apiClient } from "../client";
import {
  Banner,
  BannerFormData,
  ApiResponse,
  PaginatedResponse,
  BannerFilterParams,
} from "@/app/types";

const BASE_URL = "/api/banner";
const PUBLIC_URL = "/api/public/banners";

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

export const bannerApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách banner (có phân trang, filter)
   */
  getAll: async (params?: BannerFilterParams): Promise<Banner[]> => {
    const response = await apiClient.get<Banner[] | PaginatedResponse<Banner>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as Banner[] | { data: Banner[] });
  },

  /**
   * Lấy tất cả banner (không phân trang)
   */
  getAllNoPaging: async (): Promise<Banner[]> => {
    const response = await apiClient.get<Banner[] | ApiResponse<Banner[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết banner theo ID
   */
  getById: async (id: number): Promise<Banner | null> => {
    const response = await apiClient.get<Banner | ApiResponse<Banner>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Banner>).data ?? null;
    }
    return response as Banner;
  },

  /**
   * Tạo banner mới
   */
  create: async (data: BannerFormData): Promise<Banner | null> => {
    const response = await apiClient.post<Banner | ApiResponse<Banner>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Banner>).data ?? null;
    }
    return response as Banner;
  },

  /**
   * Cập nhật banner
   */
  update: async (data: Banner): Promise<Banner | null> => {
    const response = await apiClient.put<Banner | ApiResponse<Banner>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Banner>).data ?? null;
    }
    return response as Banner;
  },

  /**
   * Xóa banner
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
   * Xóa nhiều banner
   */
  deleteMany: async (banners: Banner[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      banners
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   */
  toggleStatus: async (data: Banner): Promise<Banner | null> => {
    const response = await apiClient.post<Banner | ApiResponse<Banner>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Banner>).data ?? null;
    }
    return response as Banner;
  },

  /**
   * Upload hình ảnh banner
   */
  uploadImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-image`, file, "image"),

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách banner active (public)
   */
  getPublic: async (): Promise<Banner[]> => {
    const response = await apiClient.get<Banner[] | ApiResponse<Banner[]>>(
      PUBLIC_URL,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },
};