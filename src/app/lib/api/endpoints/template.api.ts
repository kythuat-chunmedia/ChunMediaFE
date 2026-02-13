// import { apiClient } from "../client";
// import {
//   Template,
//   TemplateListItem,
//   TemplateFormData,
//   TemplateFilterParams,
//   ApiResponse,
//   PaginatedResponse,
// } from "@/app/types";

// const BASE_URL = "/api/template";
// const PUBLIC_URL = "/api/public/templates";

// // Helper để normalize response
// const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
//   if (Array.isArray(response)) {
//     return response;
//   }
//   if ("data" in response && response.data) {
//     return response.data;
//   }
//   return [];
// };

// export const templateApi = {
//   // ============ ADMIN ENDPOINTS ============

//   /**
//    * Lấy tất cả template (không phân trang)
//    */
//   getAllNoPaging: async (): Promise<TemplateListItem[]> => {
//     const response = await apiClient.get<TemplateListItem[]>(`${BASE_URL}/get-all`);
//     return normalizeArrayResponse(response);
//   },

//   /**
//    * Lấy danh sách có phân trang + filter
//    */
//   getPaged: async (
//     params?: TemplateFilterParams
//   ): Promise<PaginatedResponse<TemplateListItem>> => {
//     const response = await apiClient.get<PaginatedResponse<TemplateListItem>>(
//       `${BASE_URL}/get-paged`,
//       params ? { ...params } : undefined
//     );
//     return response as PaginatedResponse<TemplateListItem>;
//   },

//   /**
//    * Lấy chi tiết theo ID (kèm screenshots)
//    */
//   getById: async (id: number): Promise<Template | null> => {
//     const response = await apiClient.get<Template | ApiResponse<Template>>(
//       `${BASE_URL}/${id}`
//     );
//     if ("data" in response) {
//       return (response as ApiResponse<Template>).data ?? null;
//     }
//     return response as Template;
//   },

//   /**
//    * Thêm mới template (kèm screenshots)
//    */
//   create: async (data: TemplateFormData): Promise<Template> => {
//     const response = await apiClient.post<Template>(`${BASE_URL}/insert`, data);
//     return response as Template;
//   },

//   /**
//    * Cập nhật template (cascade screenshots)
//    */
//   update: async (data: Template): Promise<Template> => {
//     const response = await apiClient.put<Template>(`${BASE_URL}/update`, data);
//     return response as Template;
//   },

//   /**
//    * Xóa template (kèm xóa screenshots)
//    */
// //   delete: async (id: number): Promise<void> => {
// //     await apiClient.delete(`${BASE_URL}/delete/${id}`);
// //   },
//     delete: async (id: number): Promise<boolean> => {
//       const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
//         `${BASE_URL}/delete/${id}`
//       );
//       if (typeof response === "boolean") {
//         return response;
//       }
//       return (response as ApiResponse<boolean>).success ?? true;
//     },

//   // ============ PUBLIC ENDPOINTS ============

//   /**
//    * Danh sách public (chỉ active)
//    */
// //   getPublic: async (params?: TemplateFilterParams): Promise<TemplateListItem[]> => {
// //     const response = await apiClient.get<PaginatedResponse<TemplateListItem>>(
// //       PUBLIC_URL,
// //       params ? { ...params } : undefined,
// //       { requireAuth: false }
// //     );
// //     if ("data" in response) {
// //       return (response as PaginatedResponse<TemplateListItem>).data ?? [];
// //     }
// //     return normalizeArrayResponse(response as TemplateListItem[] | { data: TemplateListItem[] });
// //   },

//   /**
//    * Chi tiết theo slug (public, tự tăng view)
//    */
//   getBySlug: async (slug: string): Promise<Template | null> => {
//     const response = await apiClient.get<Template | ApiResponse<Template>>(
//       `${PUBLIC_URL}/${slug}`,
//       undefined,
//       { requireAuth: false }
//     );
//     if ("data" in response) {
//       return (response as ApiResponse<Template>).data ?? null;
//     }
//     return response as Template;
//   },

//   /**
//    * Template phổ biến
//    */
//   getPopular: async (count: number = 6): Promise<TemplateListItem[]> => {
//     const response = await apiClient.get<TemplateListItem[]>(
//       `${PUBLIC_URL}/popular`,
//       { count },
//       { requireAuth: false }
//     );
//     return normalizeArrayResponse(response);
//   },

//   /**
//    * Template theo danh mục
//    */
//   getByCategory: async (category: string, count: number = 10): Promise<TemplateListItem[]> => {
//     const response = await apiClient.get<TemplateListItem[]>(
//       `${PUBLIC_URL}/category/${encodeURIComponent(category)}`,
//       { count },
//       { requireAuth: false }
//     );
//     return normalizeArrayResponse(response);
//   },
// };









import { apiClient } from "../client";
import {
  Template,
  TemplateListItem,
  TemplateFormData,
  TemplateFilterParams,
  UploadDemoResponse,
  ApiResponse,
  PaginatedResponse,
} from "@/app/types";

const BASE_URL = "/api/template";
const PUBLIC_URL = "/api/public/templates";

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

export const templateApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy tất cả template (không phân trang)
   */
  getAllNoPaging: async (): Promise<TemplateListItem[]> => {
    const response = await apiClient.get<TemplateListItem[]>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy danh sách có phân trang + filter
   */
  getPaged: async (
    params?: TemplateFilterParams
  ): Promise<PaginatedResponse<TemplateListItem>> => {
    const response = await apiClient.get<PaginatedResponse<TemplateListItem>>(
      `${BASE_URL}/get-paged`,
      params ? { ...params } : undefined
    );
    return response as PaginatedResponse<TemplateListItem>;
  },

  /**
   * Lấy chi tiết theo ID (kèm screenshots)
   */
  getById: async (id: number): Promise<Template | null> => {
    const response = await apiClient.get<Template | ApiResponse<Template>>(
      `${BASE_URL}/${id}`
    );
    if ("data" in response) {
      return (response as ApiResponse<Template>).data ?? null;
    }
    return response as Template;
  },

  /**
   * Thêm mới template (kèm screenshots)
   */
  create: async (data: TemplateFormData): Promise<Template> => {
    const response = await apiClient.post<Template>(`${BASE_URL}/insert`, data);
    return response as Template;
  },

  /**
   * Cập nhật template (cascade screenshots)
   */
  update: async (data: Template): Promise<Template> => {
    const response = await apiClient.put<Template>(`${BASE_URL}/update`, data);
    return response as Template;
  },

  /**
   * Xóa template (kèm xóa screenshots + folder demo)
   */
  delete: async (id: number): Promise<boolean> => {
    const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
      `${BASE_URL}/delete/${id}`
    );
    if (typeof response === "boolean") {
      return response;
    }
    return (response as ApiResponse<boolean>).success ?? true;
  },

  // ============ DEMO UPLOAD ENDPOINTS ============     ← MỚI

  /**
   * Upload file ZIP demo cho template
   * Template phải tồn tại trước (insert trước, upload demo sau)
   */
  uploadDemo: async (templateId: number, zipFile: File): Promise<UploadDemoResponse> => {
    const formData = new FormData();
    formData.append("zipFile", zipFile);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "";

    const res = await fetch(`${apiBase}${BASE_URL}/upload-demo/${templateId}`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // Không set Content-Type — browser tự thêm boundary cho FormData
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Upload thất bại" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  },

  /**
   * Xóa folder demo của template
   */
  deleteDemo: async (templateId: number): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/delete-demo/${templateId}`);
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Chi tiết theo slug (public, tự tăng view)
   */
  getBySlug: async (slug: string): Promise<Template | null> => {
    const response = await apiClient.get<Template | ApiResponse<Template>>(
      `${PUBLIC_URL}/${slug}`,
      undefined,
      { requireAuth: false }
    );
    if ("data" in response) {
      return (response as ApiResponse<Template>).data ?? null;
    }
    return response as Template;
  },

  /**
   * Template phổ biến
   */
  getPopular: async (count: number = 6): Promise<TemplateListItem[]> => {
    const response = await apiClient.get<TemplateListItem[]>(
      `${PUBLIC_URL}/popular`,
      { count },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },

  /**
   * Template theo danh mục
   */
  getByCategory: async (category: string, count: number = 10): Promise<TemplateListItem[]> => {
    const response = await apiClient.get<TemplateListItem[]>(
      `${PUBLIC_URL}/category/${encodeURIComponent(category)}`,
      { count },
      { requireAuth: false }
    );
    return normalizeArrayResponse(response);
  },
};