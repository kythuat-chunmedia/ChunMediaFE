import { apiClient } from "../client";
import {
  MemberTeam,
  MemberTeamFormData,
  MemberTeamFilterParams,
  ApiResponse,
  PaginatedResponse,
} from "@/app/types";

const BASE_URL = "/api/member-team";
const PUBLIC_URL = "/api/public/member-teams";

// Helper để normalize response
const normalizeArrayResponse = <T>(
  response: T[] | ApiResponse<T[]> | { data: T[] }
): T[] => {
  if (Array.isArray(response)) {
    return response;
  }
  if ("data" in response && response.data) {
    return response.data;
  }
  return [];
};

export const memberTeamApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách member team (có phân trang, filter)
   */
  getAll: async (params?: MemberTeamFilterParams): Promise<MemberTeam[]> => {
    const response = await apiClient.get<
      MemberTeam[] | PaginatedResponse<MemberTeam>
    >(BASE_URL, params ? { ...params } : undefined);

    return normalizeArrayResponse(response as MemberTeam[] | { data: MemberTeam[] });
  },

  /**
   * Lấy tất cả member team (không phân trang)
   */
  getAllNoPaging: async (): Promise<MemberTeam[]> => {
    const response = await apiClient.get<
      MemberTeam[] | ApiResponse<MemberTeam[]>
    >(`${BASE_URL}/get-all`);

    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết member team theo ID
   */
  getById: async (id: number): Promise<MemberTeam | null> => {
    const response = await apiClient.get<
      MemberTeam | ApiResponse<MemberTeam>
    >(`${BASE_URL}/${id}`);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as MemberTeam;
  },

  /**
   * Tạo member team mới
   */
  create: async (data: MemberTeamFormData): Promise<MemberTeam | null> => {
    const response = await apiClient.post<
      MemberTeam | ApiResponse<MemberTeam>
    >(`${BASE_URL}/insert`, data);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as MemberTeam;
  },

  /**
   * Cập nhật member team
   */
  update: async (data: MemberTeam): Promise<MemberTeam | null> => {
    const response = await apiClient.put<
      MemberTeam | ApiResponse<MemberTeam>
    >(`${BASE_URL}/update`, data);

    if ("data" in response) {
      return response.data ?? null;
    }
    return response as MemberTeam;
  },

  /**
   * Xóa member team
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<
      boolean | ApiResponse<boolean>
    >(`${BASE_URL}/delete/${id}`);

    if (typeof response === "boolean") {
      return response;
    }
    return response.success ?? true;
  },

  /**
   * Xóa nhiều member team
   */
  deleteMany: async (members: MemberTeam[]): Promise<boolean> => {
    const response = await apiClient.post<
      boolean | ApiResponse<boolean>
    >(`${BASE_URL}/delete-many`, members);

    if (typeof response === "boolean") {
      return response;
    }
    return response.success ?? false;
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Lấy danh sách member team public
   */
  getPublic: async (): Promise<MemberTeam[]> => {
    const response = await apiClient.get<
      MemberTeam[] | ApiResponse<MemberTeam[]>
    >(PUBLIC_URL, undefined, { requireAuth: false });

    return normalizeArrayResponse(response);
  },
};
