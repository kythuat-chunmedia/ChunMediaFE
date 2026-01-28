import { apiClient } from "../client";
import {
  Menu,
  MenuFormData,
  ApiResponse,
  PaginatedResponse,
  MenuFilterParams,
} from "@/app/types";

const BASE_URL = "/api/menu";
const PUBLIC_URL = "/api/public/menus";

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

export const menuApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách menu (có phân trang, filter)
   */
  // getAll: async (params?: MenuFilterParams): Promise<Menu[]> => {
  //   const response = await apiClient.get<Menu[] | PaginatedResponse<Menu>>(
  //     BASE_URL,
  //     params ? { ...params } : undefined
  //   );
  //   return normalizeArrayResponse(response as Menu[] | { data: Menu[] });
  // },

  /**
   * Lấy tất cả menu (không phân trang)
   */
  getAllNoPaging: async (): Promise<Menu[]> => {
    const response = await apiClient.get<Menu[] | ApiResponse<Menu[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy menu dạng tree (đã build sẵn hierarchy)
   */
  getTree: async (): Promise<Menu[]> => {
    const response = await apiClient.get<Menu[] | ApiResponse<Menu[]>>(`${BASE_URL}/tree`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết menu theo ID
   */
  getById: async (id: number): Promise<Menu | null> => {
    const response = await apiClient.get<Menu | ApiResponse<Menu>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Menu>).data ?? null;
    }
    return response as Menu;
  },

  /**
   * Tạo menu mới
   */
  create: async (data: MenuFormData): Promise<Menu | null> => {
    const response = await apiClient.post<Menu | ApiResponse<Menu>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Menu>).data ?? null;
    }
    return response as Menu;
  },

  /**
   * Cập nhật menu
   */
  update: async (data: Menu): Promise<Menu | null> => {
    const response = await apiClient.put<Menu | ApiResponse<Menu>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Menu>).data ?? null;
    }
    return response as Menu;
  },

  /**
   * Xóa menu
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
   * Xóa nhiều menu
   */
  deleteMany: async (menus: Menu[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      menus
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   */
  toggleStatus: async (data: Menu): Promise<Menu | null> => {
    const response = await apiClient.post<Menu | ApiResponse<Menu>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Menu>).data ?? null;
    }
    return response as Menu;
  },

  /**
   * Cập nhật thứ tự menu
   */
  updateOrder: async (items: { id: number; sortOrder: number }[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/update-order`,
      items
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy menu tree active (public)
   */
  getPublicTree: async (): Promise<Menu[]> => {
    const response = await apiClient.get<Menu[] | ApiResponse<Menu[]>>(
      PUBLIC_URL,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },
};