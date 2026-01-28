// ============ DASHBOARD TYPES ============

// Thống kê tổng quan
export interface DashboardStats {
  // Orders
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  todayOrders: number;
  thisWeekOrders: number;
  thisMonthOrders: number;

  // Revenue
  totalRevenue: number;
  todayRevenue: number;
  thisWeekRevenue: number;
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  revenueGrowth: number;

  // Products
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;

  // Users
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;

  // Contacts
  totalContacts: number;
  unreadContacts: number;

  // News
  totalNews: number;
  activeNews: number;
  totalNewsViews: number;

  // Categories
  totalProductCategories: number;
  totalNewsCategories: number;

  // Others
  totalBanners: number;
  activeBanners: number;
  totalMenus: number;
}

// Dữ liệu biểu đồ
export interface DashboardChartData {
  date: string;
  label: string;
  value: number;
  value2?: number;
}

// Đơn hàng gần đây
export interface RecentOrder {
  id: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  itemCount: number;
  createdAt: string;
}

// Liên hệ gần đây
export interface RecentContact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  isRead: boolean;
  createdAt: string;
}

// Sản phẩm bán chạy
export interface TopProduct {
  id: number;
  name: string;
  image?: string;
  price: number;
  salePrice?: number;
  soldCount: number;
  viewCount: number;
  revenue: number;
}

// Tin tức nổi bật
export interface TopNews {
  id: number;
  title: string;
  image?: string;
  viewCount: number;
  createdAt: string;
}
