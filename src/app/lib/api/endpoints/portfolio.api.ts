import { apiClient } from "../client";
import {
  Portfolio,
  PortfolioFormData,
  ApiResponse,
  PaginatedResponse,
  PortfolioFilterParams,
} from "@/app/types";

const BASE_URL = "/api/portfolio";

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

export const portfolioApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách portfolio (có phân trang, filter)
   */
  getAll: async (params?: PortfolioFilterParams): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | PaginatedResponse<Portfolio>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as Portfolio[] | { data: Portfolio[] });
  },

  /**
   * Lấy tất cả portfolio (không phân trang)
   * GET /api/portfolio/get-all
   */
  getAllNoPaging: async (): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | ApiResponse<Portfolio[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết portfolio theo ID
   */
  getById: async (id: number): Promise<Portfolio | null> => {
    const response = await apiClient.get<Portfolio | ApiResponse<Portfolio>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  /**
   * Lấy chi tiết portfolio theo Slug
   */
  getBySlug: async (slug: string): Promise<Portfolio | null> => {
    const response = await apiClient.get<Portfolio | ApiResponse<Portfolio>>(`${BASE_URL}/slug/${slug}`);
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  /**
   * Tạo portfolio mới
   * POST /api/portfolio/insert
   */
  create: async (data: PortfolioFormData): Promise<Portfolio | null> => {
    const response = await apiClient.post<Portfolio | ApiResponse<Portfolio>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  /**
   * Cập nhật portfolio
   * PUT /api/portfolio/update
   */
  update: async (data: Portfolio): Promise<Portfolio | null> => {
    const response = await apiClient.put<Portfolio | ApiResponse<Portfolio>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  /**
   * Xóa portfolio
   * DELETE /api/portfolio/delete/{id}
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
   * Toggle trạng thái publish
   */
  togglePublish: async (id: number): Promise<Portfolio | null> => {
    const response = await apiClient.post<Portfolio | ApiResponse<Portfolio>>(
      `${BASE_URL}/toggle-publish/${id}`,
      {}
    );
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách portfolio đã publish (public)
   */
  getPublic: async (params?: PortfolioFilterParams): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | PaginatedResponse<Portfolio>>(
      `${BASE_URL}/public`,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as Portfolio[] | { data: Portfolio[] });
  },

  /**
   * Lấy chi tiết portfolio theo slug (public)
   */
  getPublicBySlug: async (slug: string): Promise<Portfolio | null> => {
    const response = await apiClient.get<Portfolio | ApiResponse<Portfolio>>(
      `${BASE_URL}/public/${slug}`,
      undefined,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<Portfolio>).data ?? null;
    }
    return response as Portfolio;
  },

  /**
   * Lấy portfolio theo năm (public)
   */
  getByYear: async (year: number): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | ApiResponse<Portfolio[]>>(
      `${BASE_URL}/public/year/${year}`,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy portfolio theo ngành (public)
   */
  getByIndustry: async (industry: string): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | ApiResponse<Portfolio[]>>(
      `${BASE_URL}/public/industry/${encodeURIComponent(industry)}`,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy portfolio nổi bật (public)
   */
  getFeatured: async (limit: number = 6): Promise<Portfolio[]> => {
    const response = await apiClient.get<Portfolio[] | ApiResponse<Portfolio[]>>(
      `${BASE_URL}/public/featured`,
      { limit },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },
};


