import { CategoryProduct } from "./categoryProduct.type";

// ============ PRODUCT (Sản phẩm) ============
export interface Product {
  id: number;
  image: string;
  name: string;
  price: number; // decimal -> number
  salePrice: number;
  url?: string | null;
  createdAt: string;
  description: string;
  content: string;
  isActive: boolean;
  categoryProductId: number;
  // Navigation property (optional)
  categoryProduct?: CategoryProduct | null;
}

export interface ProductFormData {
  image: string;
  name: string;
  price: number;
  salePrice: number;
  description: string;
  content: string;
  isActive: boolean;
  categoryProductId: number;
}