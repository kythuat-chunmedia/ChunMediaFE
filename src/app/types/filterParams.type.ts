// ============================================================
// FILTER & SEARCH TYPES
// ============================================================

import { OrderStatus } from "./order.type";

// Common filter params
export interface FilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isActive?: boolean;
}

// Product filter
export interface ProductFilterParams extends FilterParams {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

// News filter
export interface NewFilterParams extends FilterParams {
  categoryId?: number;
  author?: string;
}

// Order filter
export interface OrderFilterParams extends FilterParams {
  status?: OrderStatus;
  userId?: number;
  fromDate?: string;
  toDate?: string;
}