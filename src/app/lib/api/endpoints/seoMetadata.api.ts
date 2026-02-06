import { apiClient } from "../client";
import {
  SeoMetadata,
  SeoMetadataFormData,
  SeoMetadataPublic,
  ApiResponse,
} from "@/app/types";

const BASE_URL = "/api/seo-metadata";
const PUBLIC_URL = "/api/public/seo";

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

export const seoMetadataApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy tất cả SEO metadata
   */
  getAll: async (): Promise<SeoMetadata[]> => {
    const response = await apiClient.get<SeoMetadata[] | ApiResponse<SeoMetadata[]>>(BASE_URL);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy theo loại trang: "page" hoặc "news"
   */
  getByPageType: async (pageType: "page" | "news"): Promise<SeoMetadata[]> => {
    const response = await apiClient.get<SeoMetadata[] | ApiResponse<SeoMetadata[]>>(
      `${BASE_URL}/by-type/${pageType}`
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết theo ID
   */
  getById: async (id: number): Promise<SeoMetadata | null> => {
    const response = await apiClient.get<SeoMetadata | ApiResponse<SeoMetadata>>(
      `${BASE_URL}/${id}`
    );
    if ('data' in response) {
      return (response as ApiResponse<SeoMetadata>).data ?? null;
    }
    return response as SeoMetadata;
  },

  /**
   * Tạo mới
   */
  create: async (data: SeoMetadataFormData): Promise<SeoMetadata | null> => {
    const response = await apiClient.post<SeoMetadata | ApiResponse<SeoMetadata>>(
      BASE_URL,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<SeoMetadata>).data ?? null;
    }
    return response as SeoMetadata;
  },

  /**
   * Cập nhật
   */
  update: async (data: SeoMetadata): Promise<SeoMetadata | null> => {
    const response = await apiClient.put<SeoMetadata | ApiResponse<SeoMetadata>>(
      BASE_URL,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<SeoMetadata>).data ?? null;
    }
    return response as SeoMetadata;
  },

  /**
   * Xóa
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/${id}`
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy SEO metadata theo slug (public)
   * VD: getBySlug("dich-vu") → metadata cho trang /dich-vu
   */
  getBySlug: async (slug: string): Promise<SeoMetadataPublic | null> => {
    try {
      const response = await apiClient.get<SeoMetadataPublic | ApiResponse<SeoMetadataPublic>>(
        `${PUBLIC_URL}/by-slug`,
        { slug },
        { requireAuth: false }
      );
      if ('data' in response) {
        return (response as ApiResponse<SeoMetadataPublic>).data ?? null;
      }
      return response as SeoMetadataPublic;
    } catch {
      return null;
    }
  },

  /**
   * Lấy SEO metadata theo Menu ID (public)
   */
  getByMenuId: async (menuId: number): Promise<SeoMetadataPublic | null> => {
    try {
      const response = await apiClient.get<SeoMetadataPublic | ApiResponse<SeoMetadataPublic>>(
        `${PUBLIC_URL}/by-menu/${menuId}`,
        undefined,
        { requireAuth: false }
      );
      if ('data' in response) {
        return (response as ApiResponse<SeoMetadataPublic>).data ?? null;
      }
      return response as SeoMetadataPublic;
    } catch {
      return null;
    }
  },

  /**
   * Lấy SEO metadata theo News ID (public)
   */
  getByNewsId: async (newsId: number): Promise<SeoMetadataPublic | null> => {
    try {
      const response = await apiClient.get<SeoMetadataPublic | ApiResponse<SeoMetadataPublic>>(
        `${PUBLIC_URL}/by-news/${newsId}`,
        undefined,
        { requireAuth: false }
      );
      if ('data' in response) {
        return (response as ApiResponse<SeoMetadataPublic>).data ?? null;
      }
      return response as SeoMetadataPublic;
    } catch {
      return null;
    }
  },
};