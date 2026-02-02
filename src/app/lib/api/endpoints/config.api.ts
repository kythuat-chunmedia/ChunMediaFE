import { apiClient } from "../client";
import {
  ConfigSite,
  ConfigSiteFormData,
  ApiResponse,
} from "@/app/types";

const BASE_URL = "/api/config-site";
const PUBLIC_URL = "/api/public/config-site";

export const configSiteApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy cấu hình website (singleton)
   */
  get: async (): Promise<ConfigSite | null> => {
    const response = await apiClient.get<ConfigSite | ApiResponse<ConfigSite>>(`${BASE_URL}/get`);
    if ('data' in response) {
      return (response as ApiResponse<ConfigSite>).data ?? null;
    }
    return response as ConfigSite;
  },

  /**
   * Cập nhật cấu hình website
   */
  update: async (data: ConfigSiteFormData): Promise<ConfigSite | null> => {
    const response = await apiClient.put<ConfigSite | ApiResponse<ConfigSite>>(
      `${BASE_URL}/update`,
      data
    );

    console.log(`${BASE_URL}/update`);
    if ('data' in response) {
      return (response as ApiResponse<ConfigSite>).data ?? null;
    }
    return response as ConfigSite;
  },

  /**
   * Upload logo
   */
  uploadLogo: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-logo`, file, "image"),

  /**
   * Upload favicon
   */
  uploadFavicon: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-favicon`, file, "favicon"),

  /**
   * Upload about image
   */
  uploadAboutImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-about-image`, file, "image"),

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy cấu hình website (public)
   */
  getPublic: async (): Promise<ConfigSite | null> => {
    const response = await apiClient.get<ConfigSite | ApiResponse<ConfigSite>>(
      PUBLIC_URL,
      undefined,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<ConfigSite>).data ?? null;
    }
    return response as ConfigSite;
  },
};