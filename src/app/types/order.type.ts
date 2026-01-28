// ============ ORDER (Đơn hàng) ============
// Order Status (string in backend)
export type OrderStatus = 
  | 'Pending'      // Chờ xử lý
  | 'Confirmed'    // Đã xác nhận
  | 'Processing'   // Đang xử lý
  | 'Shipping'     // Đang giao hàng
  | 'Delivered'    // Đã giao hàng
  | 'Cancelled'    // Đã hủy
  | 'Refunded';    // Đã hoàn tiền

// Order Entity (match C# model)
export interface Order {
  Id: number;
  UserId: number;
  CustomerName: string;
  CustomerPhone: string;
  CustomerEmail: string;
  ShippingAddress: string;
  TotalAmount: number; // decimal -> number
  Status: string;
  Note?: string | null;
  CreatedAt: string; // DateTime -> string (ISO format)
  Items: OrderDetail[];
}

// OrderDetail Entity (match C# model)
export interface OrderDetail {
  Id: number;
  ProductId: number;
  OrderId: number;
  ProductName: string;
  Price: number; // decimal -> number
  Quantity: number;
  Amount: number; // decimal -> number
}

// Form data để tạo đơn hàng (frontend use)
export interface OrderFormData {
  UserId: number;
  CustomerName: string;
  CustomerPhone: string;
  CustomerEmail: string;
  ShippingAddress: string;
  Note?: string;
  Items: OrderDetailFormData[];
}

// Form data cho chi tiết đơn hàng
export interface OrderDetailFormData {
  ProductId: number;
  ProductName: string;
  Price: number;
  Quantity: number;
}

// Filter params cho API
export interface OrderFilterParamsPagination {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: OrderStatus;
  userId?: number;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}





// ============ STATUS HELPERS ============

export const ORDER_STATUS_CONFIG: Record<string, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  Pending: {
    label: 'Chờ xử lý',
    color: 'text-warning-700 dark:text-warning-400',
    bgColor: 'bg-warning-100 dark:bg-warning-500/20',
    icon: '⏳',
  },
  Confirmed: {
    label: 'Đã xác nhận',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-500/20',
    icon: '✅',
  },
  Processing: {
    label: 'Đang xử lý',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-500/20',
    icon: '⚙️',
  },
  Shipping: {
    label: 'Đang giao',
    color: 'text-cyan-700 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-500/20',
    icon: '🚚',
  },
  Delivered: {
    label: 'Đã giao',
    color: 'text-success-700 dark:text-success-400',
    bgColor: 'bg-success-100 dark:bg-success-500/20',
    icon: '📦',
  },
  Cancelled: {
    label: 'Đã hủy',
    color: 'text-error-700 dark:text-error-400',
    bgColor: 'bg-error-100 dark:bg-error-500/20',
    icon: '❌',
  },
  Refunded: {
    label: 'Hoàn tiền',
    color: 'text-gray-700 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-500/20',
    icon: '💰',
  },
};

// Next valid statuses for workflow
export const ORDER_STATUS_TRANSITIONS: Record<string, string[]> = {
  Pending: ['Confirmed', 'Cancelled'],
  Confirmed: ['Processing', 'Cancelled'],
  Processing: ['Shipping', 'Cancelled'],
  Shipping: ['Delivered', 'Cancelled'],
  Delivered: ['Refunded'],
  Cancelled: [],
  Refunded: [],
};