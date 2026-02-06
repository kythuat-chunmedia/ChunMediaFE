import { apiClient } from "../client";
import {
  SitemapEntry,
  SitemapEntryFormData,
  SitemapXmlEntry,
  SitemapSyncResult,
  SitemapFilterParams,
  ApiResponse,
  PaginatedResponse,
} from "@/app/types";

const BASE_URL = "/api/sitemap";
const PUBLIC_URL = "/api/public/sitemap";

// Helper để normalize response
const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if ("data" in response && response.data) {
    return response.data;
  }
  return [];
};

export const sitemapApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy tất cả sitemap entries
   */
  getAll: async (params?: SitemapFilterParams): Promise<SitemapEntry[]> => {
    const response = await apiClient.get<SitemapEntry[] | PaginatedResponse<SitemapEntry>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as SitemapEntry[] | { data: SitemapEntry[] });
  },

  /**
   * Lấy sitemap entries theo loại trang
   */
  getByPageType: async (pageType: string): Promise<SitemapEntry[]> => {
    const response = await apiClient.get<SitemapEntry[] | ApiResponse<SitemapEntry[]>>(
      `${BASE_URL}/by-type/${pageType}`
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết sitemap entry theo ID
   */
  getById: async (id: number): Promise<SitemapEntry | null> => {
    const response = await apiClient.get<SitemapEntry | ApiResponse<SitemapEntry>>(
      `${BASE_URL}/${id}`
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapEntry>).data ?? null;
    }
    return response as SitemapEntry;
  },

  /**
   * Tạo sitemap entry mới
   */
  create: async (data: SitemapEntryFormData): Promise<SitemapEntry | null> => {
    const response = await apiClient.post<SitemapEntry | ApiResponse<SitemapEntry>>(
      BASE_URL,
      data
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapEntry>).data ?? null;
    }
    return response as SitemapEntry;
  },

  /**
   * Cập nhật sitemap entry
   */
  update: async (data: SitemapEntry): Promise<SitemapEntry | null> => {
    const response = await apiClient.put<SitemapEntry | ApiResponse<SitemapEntry>>(
      BASE_URL,
      data
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapEntry>).data ?? null;
    }
    return response as SitemapEntry;
  },

  /**
   * Xóa sitemap entry
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/${id}`
    );
    if (typeof response === "boolean") {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },

  /**
   * Xóa nhiều sitemap entries
   */
  deleteMany: async (entries: SitemapEntry[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      entries
    );
    if (typeof response === "boolean") {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   */
  toggleStatus: async (data: SitemapEntry): Promise<SitemapEntry | null> => {
    const response = await apiClient.post<SitemapEntry | ApiResponse<SitemapEntry>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapEntry>).data ?? null;
    }
    return response as SitemapEntry;
  },

  // ============ SYNC ENDPOINTS ============

  /**
   * Đồng bộ từ Menu (thêm các menu chưa có vào sitemap)
   */
  syncFromMenus: async (): Promise<SitemapSyncResult> => {
    const response = await apiClient.post<SitemapSyncResult | ApiResponse<SitemapSyncResult>>(
      `${BASE_URL}/sync/menus`,
      {}
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapSyncResult>).data!;
    }
    return response as SitemapSyncResult;
  },

  /**
   * Đồng bộ từ News (thêm các bài viết chưa có vào sitemap)
   */
  syncFromNews: async (): Promise<SitemapSyncResult> => {
    const response = await apiClient.post<SitemapSyncResult | ApiResponse<SitemapSyncResult>>(
      `${BASE_URL}/sync/news`,
      {}
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapSyncResult>).data!;
    }
    return response as SitemapSyncResult;
  },

  /**
   * Đồng bộ tất cả (Menu + News)
   */
  syncAll: async (): Promise<SitemapSyncResult> => {
    const response = await apiClient.post<SitemapSyncResult | ApiResponse<SitemapSyncResult>>(
      `${BASE_URL}/sync/all`,
      {}
    );
    if ("data" in response) {
      return (response as ApiResponse<SitemapSyncResult>).data!;
    }
    return response as SitemapSyncResult;
  },

  // ============ PREVIEW ============

  /**
   * Preview sitemap.xml (cho admin xem trước)
   */
  preview: async (baseUrl?: string): Promise<string> => {
    const params = baseUrl ? { baseUrl } : undefined;
    const response = await apiClient.get<string>(`${BASE_URL}/preview`, params);
    return response;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy sitemap entries dạng JSON (public)
   */
  getPublic: async (): Promise<SitemapXmlEntry[]> => {
    const response = await apiClient.get<SitemapXmlEntry[] | ApiResponse<SitemapXmlEntry[]>>(
      PUBLIC_URL,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy URL sitemap.xml
   */
  getSitemapXmlUrl: (baseUrl: string): string => {
    return `${baseUrl.replace(/\/$/, "")}/sitemap.xml`;
  },
};