import { apiClient } from "../client";
import {
    CategoryProduct,
    CategoryProductFormData,
    CategoryNew,
    CategoryNewFormData,
    ApiResponse,
    PaginatedResponse,
    FilterParams,
    CategoryNewFilterParams,
} from "@/app/types";

// ============ CATEGORY PRODUCT (Danh mục sản phẩm) ============
const BASE_URL = "/api/category-product";
const PUBLIC_URL = "/api/category-product";

// Helper để normalize response (hỗ trợ cả mảng trực tiếp và wrapper)
const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
    if (Array.isArray(response)) {
        return response;
    }
    if ('data' in response && response.data) {
        return response.data;
    }
    return [];
};


export const categoryProductApi = {
  /**
   * Lấy danh sách (có phân trang)
   */
  getAll: async (params?: FilterParams): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | PaginatedResponse<CategoryProduct>>(
      `${BASE_URL}/get-all`,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as CategoryProduct[] | { data: CategoryProduct[] });
  },

  /**
   * Lấy tất cả (không phân trang)
   */
  getAllNoPaging: async (): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | ApiResponse<CategoryProduct[]>>(
      `${BASE_URL}/get-all`
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết theo ID
   */
  getById: async (id: number): Promise<CategoryProduct | null> => {
    const response = await apiClient.get<CategoryProduct | ApiResponse<CategoryProduct>>(
      `${BASE_URL}/${id}`
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryProduct>).data ?? null;
    }
    return response as CategoryProduct;
  },

  /**
   * Tạo mới
   * POST /api/category-product/insert
   */
  create: async (data: CategoryProductFormData): Promise<CategoryProduct | null> => {
    const response = await apiClient.post<CategoryProduct | ApiResponse<CategoryProduct>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryProduct>).data ?? null;
    }
    return response as CategoryProduct;
  },

  /**
   * Cập nhật
   * PUT /api/category-product/update + body CategoryProduct (full object)
   */
  update: async (data: CategoryProduct): Promise<CategoryProduct | null> => {
    const response = await apiClient.put<CategoryProduct | ApiResponse<CategoryProduct>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryProduct>).data ?? null;
    }
    return response as CategoryProduct;
  },

  /**
   * Xóa
   * DELETE /api/category-product/delete/{id}
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
   * Toggle trạng thái
   */
  toggleStatus: async (data: CategoryProduct): Promise<CategoryProduct | null> => {
    const response = await apiClient.post<CategoryProduct | ApiResponse<CategoryProduct>>(
      `${BASE_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryProduct>).data ?? null;
    }
    return response as CategoryProduct;
  },

  /**
   * Upload hình ảnh sản phẩm
   */
  uploadImage: (file: File) =>
    apiClient.upload<ApiResponse<{ url: string }>>(
        `${BASE_URL}/upload-image`,
        file,
        "image"),

  // ============ PUBLIC ENDPOINTS ============

  getPublic: async (params?: FilterParams): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | PaginatedResponse<CategoryProduct>>(
      PUBLIC_URL,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as CategoryProduct[] | { data: CategoryProduct[] });
  },

  getPublicById: async (id: number): Promise<CategoryProduct | null> => {
    const response = await apiClient.get<CategoryProduct | ApiResponse<CategoryProduct>>(
      `${PUBLIC_URL}/${id}`,
      undefined,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryProduct>).data ?? null;
    }
    return response as CategoryProduct;
  },

  getByCategory: async (categoryId: number, params?: FilterParams): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | PaginatedResponse<CategoryProduct>>(
      `${PUBLIC_URL}/category/${categoryId}`,
      params ? { ...params } : undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as CategoryProduct[] | { data: CategoryProduct[] });
  },

  getFeatured: async (limit: number = 10): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | ApiResponse<CategoryProduct[]>>(
      `${PUBLIC_URL}/featured`,
      { limit },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  search: async (keyword: string, params?: FilterParams): Promise<CategoryProduct[]> => {
    const response = await apiClient.get<CategoryProduct[] | PaginatedResponse<CategoryProduct>>(
      `${PUBLIC_URL}/search`,
      { keyword, ...(params || {}) },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response as CategoryProduct[] | { data: CategoryProduct[] });
  },
};










// ============ CATEGORY NEW (Danh mục bài viết) ============
const NEWS_CAT_URL = "/api/category-new";
const NEWS_CAT_PUBLIC = "/api/public/category-new";


export const categoryNewApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách danh mục tin tức (có phân trang, filter)
   */
  getAll: async (params?: CategoryNewFilterParams): Promise<CategoryNew[]> => {
    const response = await apiClient.get<CategoryNew[] | PaginatedResponse<CategoryNew>>(
      NEWS_CAT_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as CategoryNew[] | { data: CategoryNew[] });
  },

  /**
   * Lấy tất cả danh mục tin tức (không phân trang)
   */
  getAllNoPaging: async (): Promise<CategoryNew[]> => {
    const response = await apiClient.get<CategoryNew[] | ApiResponse<CategoryNew[]>>(`${NEWS_CAT_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết danh mục theo ID
   */
  getById: async (id: number): Promise<CategoryNew | null> => {
    const response = await apiClient.get<CategoryNew | ApiResponse<CategoryNew>>(`${NEWS_CAT_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<CategoryNew>).data ?? null;
    }
    return response as CategoryNew;
  },

  /**
   * Tạo danh mục mới
   */
  create: async (data: CategoryNewFormData): Promise<CategoryNew | null> => {
    const response = await apiClient.post<CategoryNew | ApiResponse<CategoryNew>>(
      `${NEWS_CAT_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryNew>).data ?? null;
    }
    return response as CategoryNew;
  },

  /**
   * Cập nhật danh mục
   */
  update: async (data: CategoryNew): Promise<CategoryNew | null> => {
    const response = await apiClient.put<CategoryNew | ApiResponse<CategoryNew>>(
      `${NEWS_CAT_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryNew>).data ?? null;
    }
    return response as CategoryNew;
  },

  /**
   * Xóa danh mục
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${NEWS_CAT_URL}/delete/${id}`
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },

  /**
   * Xóa nhiều danh mục
   */
  deleteMany: async (categories: CategoryNew[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${NEWS_CAT_URL}/delete-many`,
      categories
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Toggle trạng thái hiển thị
   */
  toggleStatus: async (data: CategoryNew): Promise<CategoryNew | null> => {
    const response = await apiClient.post<CategoryNew | ApiResponse<CategoryNew>>(
      `${NEWS_CAT_URL}/toggle-status`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<CategoryNew>).data ?? null;
    }
    return response as CategoryNew;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách danh mục active (public)
   */
  getPublic: async (): Promise<CategoryNew[]> => {
    const response = await apiClient.get<CategoryNew[] | ApiResponse<CategoryNew[]>>(
      NEWS_CAT_PUBLIC,
      undefined,
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },
};