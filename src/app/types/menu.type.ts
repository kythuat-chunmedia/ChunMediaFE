// ============ MENU TYPES ============

// Menu Entity (map từ DB)
export interface Menu {
  id: number;
  title: string;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  // Quan hệ đệ quy
  parent?: Menu | null;
  children?: Menu[] | null;
}

// Form data để tạo/sửa menu
export interface MenuFormData {
  title: string;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
}

// Menu dạng tree cho UI (flatten với level)
export interface MenuTreeItem extends Menu {
  level: number;
  hasChildren: boolean;
}

// Filter params cho API
export interface MenuFilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  parentId?: number | null;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
