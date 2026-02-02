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
  isActive: boolean;
  displayOrder: number;
  features: ServiceFeature[];
}

// Request types
export interface CreateServiceFeatureRequest {
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  icon?: string;
  isActive: boolean;
  displayOrder: number;
  features: CreateServiceFeatureRequest[];
}

export interface UpdateServiceFeatureRequest {
  id: number;  // 0 = new feature
  content: string;
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateServiceRequest {
  id: number;
  title: string;
  description: string;
  icon?: string;
  isActive: boolean;
  displayOrder: number;
  features: UpdateServiceFeatureRequest[];
}

// Filter params
export interface ServiceFilterParams {
  isActive?: boolean;
  page?: number;
  pageSize?: number;
}