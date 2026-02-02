import { apiClient } from "../client";
import {
    Service,
    CreateServiceRequest,
    UpdateServiceRequest,
    ServiceFilterParams,
    ApiResponse,
    PaginatedResponse,
} from "@/app/types";

const BASE_URL = "/api/service";
const PUBLIC_URL = "/api/services";

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

export const serviceApi = {
    // ============ ADMIN ENDPOINTS ============

    /**
     * Lấy tất cả services kèm features
     */
    getAll: async (): Promise<Service[]> => {
        const response = await apiClient.get<Service[] | ApiResponse<Service[]>>(
            `${BASE_URL}/get-all`
        );
        return normalizeArrayResponse(response);
    },

    /**
     * Lấy service theo ID kèm features
     */
    getById: async (id: number): Promise<Service | null> => {
        const response = await apiClient.get<Service | ApiResponse<Service>>(
            `${BASE_URL}/get-by-id`,
            { id }
        );
        if ('data' in response) {
            return (response as ApiResponse<Service>).data ?? null;
        }
        return response as Service;
    },

    /**
     * Tạo service mới kèm features
     * - Tất cả features trong request sẽ được tạo mới
     */
    create: async (data: CreateServiceRequest): Promise<Service | null> => {
        const response = await apiClient.post<Service | ApiResponse<Service>>(
            `${BASE_URL}/insert`,
            data
        );
        if ('data' in response) {
            return (response as ApiResponse<Service>).data ?? null;
        }
        return response as Service;
    },

    /**
     * Cập nhật service và features
     * - Feature có id > 0: update
     * - Feature có id = 0: insert mới
     * - Feature không có trong request: xóa
     */
    update: async (data: UpdateServiceRequest): Promise<Service | null> => {
        const response = await apiClient.put<Service | ApiResponse<Service>>(
            `${BASE_URL}/update`,
            data
        );
        if ('data' in response) {
            return (response as ApiResponse<Service>).data ?? null;
        }
        return response as Service;
    },

    /**
     * Xóa service và tất cả features
     */
    // Nếu apiClient.delete có signature như này:
    // delete<T>(url: string, params?: Record<string, any>, config?: RequestConfig): Promise<T>

    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/delete`,
            { params: { id } }  // ✅ Truyền qua params
        );
        if (typeof response === 'boolean') {
            return response;
        }
        return (response as ApiResponse<boolean>).success ?? true;
    },


    /**
     * Xóa nhiều services
     */
    deleteMany: async (ids: number[]): Promise<boolean> => {
        const response = await apiClient.post<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/delete-many`,
            { ids }
        );
        if (typeof response === 'boolean') {
            return response;
        }
        return (response as ApiResponse<boolean>).success ?? false;
    },

    /**
     * Toggle trạng thái hiển thị
     */
    toggleStatus: async (id: number): Promise<Service | null> => {
        const response = await apiClient.post<Service | ApiResponse<Service>>(
            `${BASE_URL}/toggle-status`,
            { id }
        );
        if ('data' in response) {
            return (response as ApiResponse<Service>).data ?? null;
        }
        return response as Service;
    },

    /**
     * Upload icon cho service
     */
    uploadIcon: (file: File) =>
        apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-icon`, file, "icon"),

    // ============ PUBLIC ENDPOINTS ============

    /**
     * Lấy danh sách services active (public)
     */
    getPublic: async (): Promise<Service[]> => {
        const response = await apiClient.get<Service[] | ApiResponse<Service[]>>(
            PUBLIC_URL,
            undefined,
            { requireAuth: false }
        );
        return normalizeArrayResponse(response);
    },

    /**
     * Lấy service active theo ID (public)
     */
    getPublicById: async (id: number): Promise<Service | null> => {
        const response = await apiClient.get<Service | ApiResponse<Service>>(
            `${PUBLIC_URL}/${id}`,
            undefined,
            { requireAuth: false }
        );
        if ('data' in response) {
            return (response as ApiResponse<Service>).data ?? null;
        }
        return response as Service;
    },
};