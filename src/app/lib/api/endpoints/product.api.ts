import { apiClient } from "../client";
import {
  Product,
  ProductFormData,
  ApiResponse,
  PaginatedResponse,
  ProductFilterParams,
} from "@/app/types";

const BASE_URL = "/api/product";
const PUBLIC_URL = "/api/public/products";

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

export const productApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách sản phẩm (có phân trang, filter)
   */
  getAll: async (params?: ProductFilterParams): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | PaginatedResponse<Product>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as Product[] | { data: Product[] });
  },

  /**
   * Lấy tất cả sản phẩm (không phân trang)
   */
  getAllNoPaging: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | ApiResponse<Product[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết sản phẩm theo ID
   */
  getById: async (id: number): Promise<Product | null> => {
    const response = await apiClient.get<Product | ApiResponse<Product>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Product>).data ?? null;
    }
    return response as Product;
  },

  /**
   * Tạo sản phẩm mới
   * POST /api/product + body ProductFormData
   */
  create: async (data: ProductFormData): Promise<Product | null> => {
    const response = await apiClient.post<Product | ApiResponse<Product>>(
      `${BASE_URL}/insert`,
      data);
    if ('data' in response) {
      return (response as ApiResponse<Product>).data ?? null;
    }
    return response as Product;
  },

  /**
   * Cập nhật sản phẩm
   * PUT /api/product/update + body Product (full object)
   */
  update: async (data: Product): Promise<Product | null> => {
    const response = await apiClient.put<Product | ApiResponse<Product>>(
      `${BASE_URL}/update`,
      data);
    if ('data' in response) {
      return (response as ApiResponse<Product>).data ?? null;
    }
    return response as Product;
  },

  /**
   * Xóa sản phẩm
   * POST /api/product/delete + body Product (full object)
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete/${id}`);
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },


  /**
   * Xóa nhiều sản phẩm
   */
  deleteMany: async (products: Product[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(`${BASE_URL}/delete-many`, products);
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   * POST /api/product/toggle-status + body Product
   */
  toggleStatus: async (data: Product): Promise<Product | null> => {
    const response = await apiClient.post<Product | ApiResponse<Product>>(`${BASE_URL}/toggle-status`, data);
    if ('data' in response) {
      return (response as ApiResponse<Product>).data ?? null;
    }
    return response as Product;
  },

  /**
   * Upload hình ảnh sản phẩm
   */
  uploadImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-image`, file, "image"),

  // ============ PUBLIC ENDPOINTS ============

  getPublic: async (params?: ProductFilterParams): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | PaginatedResponse<Product>>(
      PUBLIC_URL,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as Product[] | { data: Product[] });
  },

  getPublicById: async (id: number): Promise<Product | null> => {
    const response = await apiClient.get<Product | ApiResponse<Product>>(
      `${PUBLIC_URL}/${id}`,
      undefined,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<Product>).data ?? null;
    }
    return response as Product;
  },

  getByCategory: async (categoryId: number, params?: ProductFilterParams): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | PaginatedResponse<Product>>(
      `${PUBLIC_URL}/category/${categoryId}`,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as Product[] | { data: Product[] });
  },

  getFeatured: async (limit: number = 10): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | ApiResponse<Product[]>>(
      `${PUBLIC_URL}/featured`,
      { limit },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  search: async (keyword: string, params?: ProductFilterParams): Promise<Product[]> => {
    const response = await apiClient.get<Product[] | PaginatedResponse<Product>>(
      `${PUBLIC_URL}/search`,
      { keyword, ...(params || {}) },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as Product[] | { data: Product[] });
  },
};