// ============ TEMPLATE CATEGORY TYPES ============

export interface TemplateCategory {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
  image: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  templateCount: number;
}


export interface TemplateCategoryFormData {
  name: string;
  description: string;
  image: string;
  sortOrder: number;
  isActive: boolean;
}
