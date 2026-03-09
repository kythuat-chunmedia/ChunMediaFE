export interface ServiceFeature {
  id: number;
  serviceId?: number;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  image?: string; // ✅ Thêm mới
  isActive: boolean;
  displayOrder: number;
  slug?: string;
  features: ServiceFeature[];
}

export interface CreateServiceFeatureRequest {
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string; // ✅ Thêm mới
  isActive: boolean;
  displayOrder: number;
  features: CreateServiceFeatureRequest[];
}

export interface UpdateServiceFeatureRequest {
  id: number;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateServiceRequest {
  id: number;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string; // ✅ Thêm mới
  isActive: boolean;
  displayOrder: number;
  features: UpdateServiceFeatureRequest[];
}

export interface ServiceFilterParams {
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}