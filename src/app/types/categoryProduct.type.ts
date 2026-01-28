// ============ CATEGORY PRODUCT (Danh mục sản phẩm) ============
export interface CategoryProduct {
  id: number;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryProductFormData {
  name: string;
  description?: string;
  isActive: boolean;
}