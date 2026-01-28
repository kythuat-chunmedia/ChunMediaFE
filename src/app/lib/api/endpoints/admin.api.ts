import { apiClient } from "../client";
import {
    Admin,
    AdminInfo,
    AdminFormData,
    AdminCreateData,
    ApiResponse,
    PaginatedResponse,
    AdminFilterParams,
} from "@/app/types";

const BASE_URL = "/api/admin";

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

export const adminManagementApi = {
    // ============ ADMIN ENDPOINTS ============

    /**
     * Lấy danh sách admin (có phân trang, filter)
     */
    getAll: async (params?: AdminFilterParams): Promise<AdminInfo[]> => {
        const response = await apiClient.get<AdminInfo[] | PaginatedResponse<AdminInfo>>(
            BASE_URL,
            params ? { ...params } : undefined
        );
        return normalizeArrayResponse(response as AdminInfo[] | { data: AdminInfo[] });
    },

    /**
     * Lấy tất cả admin (không phân trang)
     */
    getAllNoPaging: async (): Promise<AdminInfo[]> => {
        const response = await apiClient.get<AdminInfo[] | ApiResponse<AdminInfo[]>>(`${BASE_URL}/get-all`);
        return normalizeArrayResponse(response);
    },

    /**
     * Lấy tất cả admin bằng hoặc dưới role user admin hiện tại (không phân trang)
     */
    getByRole: async (role?: string): Promise<AdminInfo[]> => {
        const response = await apiClient.post<
            AdminInfo[] | ApiResponse<AdminInfo[]>
        >(
            `${BASE_URL}/get-by-role`,
            {
                role, // JSON body
            }
        );

        return normalizeArrayResponse(response);
    },

    /**
     * Lấy chi tiết admin theo ID
     */
    getById: async (id: number): Promise<AdminInfo | null> => {
        const response = await apiClient.get<AdminInfo | ApiResponse<AdminInfo>>(`${BASE_URL}/${id}`);
        if ('data' in response) {
            return (response as ApiResponse<AdminInfo>).data ?? null;
        }
        return response as AdminInfo;
    },

    /**
     * Tạo admin mới
     * POST /api/admin/insert + body AdminCreateData (có password)
     */
    create: async (data: AdminCreateData): Promise<AdminInfo | null> => {
        const response = await apiClient.post<AdminInfo | ApiResponse<AdminInfo>>(
            `${BASE_URL}/insert`,
            data
        );
        if ('data' in response) {
            return (response as ApiResponse<AdminInfo>).data ?? null;
        }
        return response as AdminInfo;
    },

    /**
     * Cập nhật admin
     * PUT /api/admin/update + body AdminFormData
     */
    update: async (id: number, data: AdminFormData): Promise<AdminInfo | null> => {
        const response = await apiClient.put<AdminInfo | ApiResponse<AdminInfo>>(
            `${BASE_URL}/update`,
            { id, ...data }
        );
        if ('data' in response) {
            return (response as ApiResponse<AdminInfo>).data ?? null;
        }
        return response as AdminInfo;
    },

    /**
     * Đổi mật khẩu admin
     * POST /api/admin/change-password
     */
    changePassword: async (id: number, newPassword: string): Promise<boolean> => {
        const response = await apiClient.post<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/change-password`,
            { id, newPassword }
        );
        if (typeof response === 'boolean') {
            return response;
        }
        return (response as ApiResponse<boolean>).success ?? false;
    },

    /**
     * Xóa admin
     * DELETE /api/admin/delete/{id}
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
     * Xóa nhiều admin
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
     * Toggle trạng thái active
     * POST /api/admin/toggle-status
     */
    toggleStatus: async (id: number): Promise<AdminInfo | null> => {
        const response = await apiClient.post<AdminInfo | ApiResponse<AdminInfo>>(
            `${BASE_URL}/toggle-status`,
            { id }
        );
        if ('data' in response) {
            return (response as ApiResponse<AdminInfo>).data ?? null;
        }
        return response as AdminInfo;
    },

    /**
     * Kiểm tra username tồn tại
     */
    checkUsername: async (username: string, excludeId?: number): Promise<boolean> => {
        const response = await apiClient.get<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/check-username`,
            { username, excludeId }
        );
        if (typeof response === 'boolean') {
            return response;
        }
        return (response as ApiResponse<boolean>).data ?? false;
    },

    /**
     * Kiểm tra email tồn tại
     */
    checkEmail: async (email: string, excludeId?: number): Promise<boolean> => {
        const response = await apiClient.get<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/check-email`,
            { email, excludeId }
        );
        if (typeof response === 'boolean') {
            return response;
        }
        return (response as ApiResponse<boolean>).data ?? false;
    },
};