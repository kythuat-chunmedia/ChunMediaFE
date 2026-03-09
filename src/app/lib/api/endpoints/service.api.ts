import { apiClient } from "../client";
import {
    Service,
    CreateServiceRequest,
    UpdateServiceRequest,
    ApiResponse,
    PaginatedResponse,
} from "@/app/types";
import type { ServicePageData } from "@/app/types";

const BASE_URL = "/api/service";
const PUBLIC_URL = "/api/services";

const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
    if (Array.isArray(response)) return response;
    if ('data' in response && response.data) return response.data;
    return [];
};

export const serviceApi = {
    // ============ ADMIN ENDPOINTS ============

    /** Lấy tất cả services kèm features */
    getAll: async (): Promise<Service[]> => {
        const response = await apiClient.get<Service[] | ApiResponse<Service[]>>(
            `${BASE_URL}/get-all`
        );
        return normalizeArrayResponse(response);
    },

    /** Lấy service theo ID kèm features */
    getById: async (id: number): Promise<Service | null> => {
        const response = await apiClient.get<Service | ApiResponse<Service>>(
            `${BASE_URL}/get-by-id`,
            { id }
        );
        if ('data' in response) return (response as ApiResponse<Service>).data ?? null;
        return response as Service;
    },

    /**
     * Tạo service mới kèm features và 14 landing page sections
     * Các sections là optional — chỉ gửi sections có dữ liệu
     */
    create: async (data: CreateServiceRequest): Promise<Service | null> => {
        const response = await apiClient.post<Service | ApiResponse<Service>>(
            `${BASE_URL}/insert`,
            data
        );
        if ('data' in response) return (response as ApiResponse<Service>).data ?? null;
        return response as Service;
    },

    /**
     * Cập nhật service, features và 14 landing page sections
     * - Feature id > 0: update | id = 0: insert | không có trong request: xóa
     * - Section null/undefined = giữ nguyên, object = upsert
     */
    update: async (data: UpdateServiceRequest): Promise<Service | null> => {
        const response = await apiClient.put<Service | ApiResponse<Service>>(
            `${BASE_URL}/update`,
            data
        );
        if ('data' in response) return (response as ApiResponse<Service>).data ?? null;
        return response as Service;
    },

    /** Xóa service và tất cả features + landing page sections (cascade) */
    delete: async (id: number): Promise<boolean> => {
        const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/delete`,
            { params: { id } }
        );
        if (typeof response === 'boolean') return response;
        return (response as ApiResponse<boolean>).success ?? true;
    },

    /** Xóa nhiều services */
    deleteMany: async (ids: number[]): Promise<boolean> => {
        const response = await apiClient.post<boolean | ApiResponse<boolean>>(
            `${BASE_URL}/delete-many`,
            { ids }
        );
        if (typeof response === 'boolean') return response;
        return (response as ApiResponse<boolean>).success ?? false;
    },

    /** Toggle trạng thái hiển thị */
    toggleStatus: async (id: number): Promise<Service | null> => {
        const response = await apiClient.post<Service | ApiResponse<Service>>(
            `${BASE_URL}/toggle-status`,
            { id }
        );
        if ('data' in response) return (response as ApiResponse<Service>).data ?? null;
        return response as Service;
    },

    /** Upload icon cho service */
    uploadIcon: (file: File) =>
        apiClient.upload<ApiResponse<{ url: string }>>(`${BASE_URL}/upload-icon`, file, "icon"),

    // ============ LANDING PAGE ============

    /**
     * Lấy full landing page data theo slug (admin — có auth)
     * Dùng khi select row trong CMS để populate form Landing Page tab
     * GET /api/service/get-by-slug/{slug}
     * Trả null nếu slug không tồn tại (404)
     */
    
    getBySlug: async (slug: string): Promise<ServicePageData | null> => {
        try {
            const response = await apiClient.get<ServicePageData | ApiResponse<ServicePageData>>(
                `${BASE_URL}/get-by-slug/${slug}`,
                undefined,
                { cache: "no-store" }  // ← disable Next.js Data Cache
            );
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://be.chunmedia.vn";
console.log(API_BASE_URL);
            console.log(response);
            console.log(`${BASE_URL}/get-by-slug/${slug}`);
            // ServicePageData có field "slug" (bắt buộc), ApiResponse thì không
            // → dùng slug làm sentinel để phân biệt 2 shape
            const raw = response as any;
            if (raw?.slug !== undefined) return raw as ServicePageData;
            if (raw?.data?.slug !== undefined) return raw.data as ServicePageData;
            return null;
        } catch (error: any) {
            if (error?.response?.status === 404 || error?.status === 404) return null;
            throw error;
        }
    },

    // ============ PUBLIC ENDPOINTS ============

    /** Lấy danh sách services active (public) */
    getPublic: async (): Promise<Service[]> => {
        const response = await apiClient.get<Service[] | ApiResponse<Service[]>>(
            PUBLIC_URL,
            undefined,
            { requireAuth: false }
        );
        return normalizeArrayResponse(response);
    },

    /** Lấy service active theo ID (public) */
    getPublicById: async (id: number): Promise<Service | null> => {
        const response = await apiClient.get<Service | ApiResponse<Service>>(
            `${PUBLIC_URL}/${id}`,
            undefined,
            { requireAuth: false }
        );
        if ('data' in response) return (response as ApiResponse<Service>).data ?? null;
        return response as Service;
    },

    /**
     * Lấy full landing page data theo slug (public — Next.js SSR/SSG)
     * Dùng cho trang /dich-vu/[slug] phía người dùng
     * Trả null nếu không tìm thấy (404)
     */
    getPublicBySlug: async (slug: string): Promise<ServicePageData | null> => {
        try {
            const response = await apiClient.get<ServicePageData | ApiResponse<ServicePageData>>(
                `${BASE_URL}/get-by-slug/${slug}`,
                undefined,
                { requireAuth: false }
            );
            if ('data' in response) return (response as ApiResponse<ServicePageData>).data ?? null;
            return response as ServicePageData;
        } catch (error: any) {
            if (error?.response?.status === 404 || error?.status === 404) return null;
            throw error;
        }
    },
};