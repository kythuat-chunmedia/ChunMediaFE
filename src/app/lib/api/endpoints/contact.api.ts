import { apiClient } from "../client";
import {
  Contact,
  ContactFormData,
  ApiResponse,
  PaginatedResponse,
  ContactFilterParams,
} from "@/app/types";

const BASE_URL = "/api/contact";
const PUBLIC_URL = "/api/public/contact";

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

export const contactApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách liên hệ (có phân trang, filter)
   */
  getAll: async (params?: ContactFilterParams): Promise<Contact[]> => {
    const response = await apiClient.get<Contact[] | PaginatedResponse<Contact>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as Contact[] | { data: Contact[] });
  },

  /**
   * Lấy tất cả liên hệ (không phân trang)
   */
  getAllNoPaging: async (): Promise<Contact[]> => {
    const response = await apiClient.get<Contact[] | ApiResponse<Contact[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết liên hệ theo ID
   */
  getById: async (id: number): Promise<Contact | null> => {
    const response = await apiClient.get<Contact | ApiResponse<Contact>>(`${BASE_URL}/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Contact>).data ?? null;
    }
    return response as Contact;
  },

  /**
   * Xóa liên hệ
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
   * Xóa nhiều liên hệ
   */
  deleteMany: async (contacts: Contact[]): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete-many`,
      contacts
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Đánh dấu đã đọc
   */
  // markAsRead: async (id: number): Promise<Contact | null> => {
  //   const response = await apiClient.post<Contact | ApiResponse<Contact>>(
  //     `${BASE_URL}/mark-as-read/${id}`,
  //     {}
  //   );
  //   if ('data' in response) {
  //     return (response as ApiResponse<Contact>).data ?? null;
  //   }
  //   return response as Contact;
  // },

markAsRead: async (id: number): Promise<boolean> => {
    const response = await apiClient.put<boolean | Contact | ApiResponse<Contact>>(
      `${BASE_URL}/mark-as-read/${id}`,
      {}
    );
    if (typeof response === 'boolean') {
      return response;
    }
    if (response && typeof response === 'object' && 'data' in response) {
      return true;
    }
    return true;
  },
  /**
   * Đánh dấu chưa đọc
   */
  markAsUnread: async (id: number): Promise<Contact | null> => {
    const response = await apiClient.post<Contact | ApiResponse<Contact>>(
      `${BASE_URL}/mark-unread/${id}`,
      {}
    );
    if ('data' in response) {
      return (response as ApiResponse<Contact>).data ?? null;
    }
    return response as Contact;
  },

  /**
   * Toggle trạng thái đọc
   */
  toggleRead: async (data: Contact): Promise<Contact | null> => {
    const response = await apiClient.post<Contact | ApiResponse<Contact>>(
      `${BASE_URL}/toggle-read`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Contact>).data ?? null;
    }
    return response as Contact;
  },

  /**
   * Đánh dấu tất cả đã đọc
   */
  markAllAsRead: async (): Promise<boolean> => {
    const response = await apiClient.post<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/mark-all-read`,
      {}
    );
    if (typeof response === 'boolean') {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? false;
  },

  /**
   * Đếm số liên hệ chưa đọc
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<number | ApiResponse<number>>(
      `${BASE_URL}/unread-count`
    );
    if (typeof response === 'number') {
      return response;
    }
    return (response as ApiResponse<number>).data ?? 0;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Gửi form liên hệ (public)
   */
  submit: async (data: ContactFormData): Promise<Contact | null> => {
    const response = await apiClient.post<Contact | ApiResponse<Contact>>(
      PUBLIC_URL,
      data,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<Contact>).data ?? null;
    }
    return response as Contact;
  },
};