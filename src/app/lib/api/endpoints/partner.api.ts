import { apiClient } from "../client";
import {
  Partner,
  PartnerFormData,
  PartnerFilterParams,
  ApiResponse,
  PaginatedResponse,
} from "@/app/types";

const BASE_URL = "/api/partner";
const PUBLIC_URL = "/api/public/partners";

// Helper để normalize response
const normalizeArrayResponse = <T>(
  response: T[] | ApiResponse<T[]> | { data: T[] }
): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if ("data" in response && response.data) {
    return response.data;
  }
  return [];
};

export const partnerApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách partner (có phân trang, filter)
   */
  getAll: async (params?: PartnerFilterParams): Promise<Partner[]> => {
    const response = await apiClient.get<
      Partner[] | PaginatedResponse<Partner>
    >(BASE_URL, params ? { ...params } : undefined);

    return normalizeArrayResponse(response as Partner[] | { data: Partner[] });
  },

  /**
   * Lấy tất cả partner (không phân trang)
   */
  getAllNoPaging: async (): Promise<Partner[]> => {
    const response = await apiClient.get<
      Partner[] | ApiResponse<Partner[]>
    >(`${BASE_URL}/get-all`);

    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết partner theo ID
   */
  getById: async (id: number): Promise<Partner | null> => {
    const response = await apiClient.get<
      Partner | ApiResponse<Partner>
    >(`${BASE_URL}/${id}`);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as Partner;
  },

  /**
   * Tạo partner mới
   */
  create: async (data: PartnerFormData): Promise<Partner | null> => {
    const response = await apiClient.post<
      Partner | ApiResponse<Partner>
    >(`${BASE_URL}/insert`, data);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as Partner;
  },

  /**
   * Cập nhật partner
   */
  update: async (data: Partner): Promise<Partner | null> => {
    const response = await apiClient.put<
      Partner | ApiResponse<Partner>
    >(`${BASE_URL}/update`, data);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as Partner;
  },

  /**
   * Xóa partner
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<
      boolean | ApiResponse<boolean>
    >(`${BASE_URL}/delete/${id}`);

    if (typeof response === "boolean") {
      return response;
    }
    return response.success ?? true;
  },

  /**
   * Xóa nhiều partner
   */
  deleteMany: async (partners: Partner[]): Promise<boolean> => {
    const response = await apiClient.post<
      boolean | ApiResponse<boolean>
    >(`${BASE_URL}/delete-many`, partners);

    if (typeof response === "boolean") {
      return response;
    }
    return response.success ?? false;
  },

  /**
   * Toggle trạng thái active
   */
  toggleStatus: async (data: Partner): Promise<Partner | null> => {
    const response = await apiClient.post<
      Partner | ApiResponse<Partner>
    >(`${BASE_URL}/toggle-status`, data);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as Partner;
  },

  /**
   * Upload hình ảnh partner
   */
  uploadImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(
      `${BASE_URL}/upload-image`,
      file,
      "image"
    ),

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách partner active (public)
   */
  getPublic: async (): Promise<Partner[]> => {
    const response = await apiClient.get<
      Partner[] | ApiResponse<Partner[]>
    >(PUBLIC_URL, undefined, { requireAuth: false });

    return normalizeArrayResponse(response);
  },
};
