// ============================================================
// API RESPONSE TYPES
// ============================================================

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Paginated Response
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  items: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}