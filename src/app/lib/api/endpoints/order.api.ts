// import { apiClient } from "../client";
// import {
//   Order,
//   OrderFormData,
//   OrderStatus,
//   ApiResponse,
//   PaginatedResponse,
//   OrderFilterParams,
// } from "@/app/types";

// const BASE_URL = "/api/order";
// const PUBLIC_URL = "/api/order";

// // Helper để normalize response
// const normalizeArrayResponse = <T>(response: T[] | ApiResponse<T[]> | { data: T[] }): T[] => {
//   if (Array.isArray(response)) {
//     return response;
//   }
//   if ('data' in response && response.data) {
//     return response.data;
//   }
//   return [];
// };

// export const orderApi = {
//   // ============ ADMIN ENDPOINTS ============

//   /**
//    * Lấy danh sách đơn hàng (có phân trang, filter)
//    */
//   getAll: async (params?: OrderFilterParams): Promise<Order[]> => {
//     const response = await apiClient.get<Order[] | PaginatedResponse<Order>>(
//       BASE_URL,
//       params ? { ...params } : undefined
//     );
//     return normalizeArrayResponse(response as Order[] | { data: Order[] });
//   },

//   /**
//    * Lấy tất cả đơn hàng (không phân trang)
//    */
//   getAllNoPaging: async (): Promise<Order[]> => {
//     const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(`${BASE_URL}/get-all`);
//     return normalizeArrayResponse(response);
//   },

//   /**
//    * Lấy chi tiết đơn hàng theo ID
//    */
//   getById: async (id: number): Promise<Order | null> => {
//     const response = await apiClient.get<Order | ApiResponse<Order>>(`${BASE_URL}/${id}`);
//     if ('data' in response) {
//       return (response as ApiResponse<Order>).data ?? null;
//     }
//     return response as Order;
//   },

//   /**
//    * Tạo đơn hàng mới
//    */
//   create: async (data: OrderFormData): Promise<Order | null> => {
//     const response = await apiClient.post<Order | ApiResponse<Order>>(
//       `${BASE_URL}/insert`,
//       data
//     );
//     console.log('response data', response);
//     if ('data' in response) {
//       return (response as ApiResponse<Order>).data ?? null;
//     }
//     return response as Order;
//   },

//   /**
//    * Cập nhật đơn hàng
//    */
//   update: async (data: Order): Promise<Order | null> => {
//     const response = await apiClient.put<Order | ApiResponse<Order>>(
//       `${BASE_URL}/update`,
//       data
//     );
//     if ('data' in response) {
//       return (response as ApiResponse<Order>).data ?? null;
//     }
//     return response as Order;
//   },

//   /**
//    * Xóa đơn hàng
//    */
//   delete: async (id: number): Promise<boolean> => {
//     const response = await apiClient.delete<boolean | ApiResponse<boolean>>(
//       `${BASE_URL}/delete/${id}`
//     );
//     if (typeof response === 'boolean') {
//       return response;
//     }
//     return (response as ApiResponse<boolean>).success ?? true;
//   },

//   /**
//    * Cập nhật trạng thái đơn hàng
//    */
//   updateStatus: async (id: number, status: OrderStatus): Promise<Order | null> => {
//     const response = await apiClient.post<Order | ApiResponse<Order>>(
//       `${BASE_URL}/update-status`,
//       { id, status }
//     );
//     if ('data' in response) {
//       return (response as ApiResponse<Order>).data ?? null;
//     }
//     return response as Order;
//   },

//   /**
//    * Xác nhận đơn hàng
//    */
//   confirm: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Confirmed');
//   },

//   /**
//    * Bắt đầu xử lý đơn hàng
//    */
//   process: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Processing');
//   },

//   /**
//    * Bắt đầu giao hàng
//    */
//   ship: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Shipping');
//   },

//   /**
//    * Hoàn thành giao hàng
//    */
//   deliver: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Delivered');
//   },

//   /**
//    * Hủy đơn hàng
//    */
//   cancel: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Cancelled');
//   },

//   /**
//    * Hoàn tiền
//    */
//   refund: async (id: number): Promise<Order | null> => {
//     return orderApi.updateStatus(id, 'Refunded');
//   },

//   /**
//    * Lấy đơn hàng theo user
//    */
//   getByUserId: async (userId: number): Promise<Order[]> => {
//     const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(
//       `${BASE_URL}/user/${userId}`
//     );
//     return normalizeArrayResponse(response);
//   },

//   /**
//    * Thống kê đơn hàng
//    */
//   getStats: async (): Promise<OrderStats> => {
//     const response = await apiClient.get<OrderStats | ApiResponse<OrderStats>>(
//       `${BASE_URL}/stats`
//     );
//     if ('data' in response) {
//       return (response as ApiResponse<OrderStats>).data!;
//     }
//     return response as OrderStats;
//   },

//   // ============ PUBLIC/USER ENDPOINTS ============

//   /**
//    * Tạo đơn hàng (User)
//    */
//   createOrder: async (data: OrderFormData): Promise<Order | null> => {
//     const response = await apiClient.post<Order | ApiResponse<Order>>(
//       PUBLIC_URL,
//       data,
//       { requireAuth: true }
//     );
//     if ('data' in response) {
//       return (response as ApiResponse<Order>).data ?? null;
//     }
//     return response as Order;
//   },

//   /**
//    * Lấy đơn hàng của user hiện tại
//    */
//   getMyOrders: async (): Promise<Order[]> => {
//     const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(
//       `${PUBLIC_URL}/my-orders`,
//       undefined,
//       { requireAuth: true }
//     );
//     return normalizeArrayResponse(response);
//   },
// };

// // Stats interface
// export interface OrderStats {
//   totalOrders: number;
//   pendingOrders: number;
//   processingOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   totalRevenue: number;
//   todayOrders: number;
//   todayRevenue: number;
// }







import { apiClient } from "../client";
import {
  Order,
  OrderFormData,
  ApiResponse,
  PaginatedResponse,
  OrderFilterParams,
} from "@/app/types";

const BASE_URL = "/api/order";
const PUBLIC_URL = "/api/public/orders";

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

export const orderApi = {
  // ============ ADMIN ENDPOINTS ============

  /**
   * Lấy danh sách đơn hàng (có phân trang, filter)
   */
  getAll: async (params?: OrderFilterParams): Promise<Order[]> => {
    const response = await apiClient.get<Order[] | PaginatedResponse<Order>>(
      BASE_URL,
      params ? { ...params } : undefined
    );
    return normalizeArrayResponse(response as Order[] | { data: Order[] });
  },

  /**
   * Lấy tất cả đơn hàng (không phân trang)
   */
  getAllNoPaging: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(`${BASE_URL}/get-all`);
    return normalizeArrayResponse(response);
  },

  /**
   * Lấy chi tiết đơn hàng theo ID
   */
  getById: async (id: number): Promise<Order | null> => {
    const response = await apiClient.get<Order | ApiResponse<Order>>(`${BASE_URL}/get/${id}`);
    if ('data' in response) {
      return (response as ApiResponse<Order>).data ?? null;
    }
    return response as Order;
  },

  /**
   * Tạo đơn hàng mới
   */
  create: async (data: Order): Promise<Order | null> => {
    const response = await apiClient.post<Order | ApiResponse<Order>>(
      `${BASE_URL}/insert`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Order>).data ?? null;
    }
    return response as Order;
  },

  /**
   * Cập nhật đơn hàng
   */
  update: async (data: Order): Promise<Order | null> => {
    const response = await apiClient.put<Order | ApiResponse<Order>>(
      `${BASE_URL}/update`,
      data
    );
    if ('data' in response) {
      return (response as ApiResponse<Order>).data ?? null;
    }
    return response as Order;
  },

  /**
   * Xóa đơn hàng
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
   * Cập nhật trạng thái đơn hàng
   */
  updateStatus: async (id: number, status: string): Promise<Order | null> => {
    const response = await apiClient.post<Order | ApiResponse<Order>>(
      `${BASE_URL}/update-status`,
      { Id: id, Status: status }
    );
    if ('data' in response) {
      return (response as ApiResponse<Order>).data ?? null;
    }
    return response as Order;
  },

  /**
   * Lấy đơn hàng theo user
   */
  getByUserId: async (userId: number): Promise<Order[]> => {
    const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(
      `${BASE_URL}/user/${userId}`
    );
    return normalizeArrayResponse(response);
  },

  // ============ PUBLIC ENDPOINTS ============

  /**
   * Đặt hàng (public)
   */
  placeOrder: async (data: Order): Promise<Order | null> => {
    const response = await apiClient.post<Order | ApiResponse<Order>>(
      `${PUBLIC_URL}/place`,
      data,
      { requireAuth: false }
    );
    if ('data' in response) {
      return (response as ApiResponse<Order>).data ?? null;
    }
    return response as Order;
  },

  /**
   * Lấy đơn hàng của user đang đăng nhập
   */
  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[] | ApiResponse<Order[]>>(
      `${PUBLIC_URL}/my-orders`
    );
    return normalizeArrayResponse(response);
  },
};