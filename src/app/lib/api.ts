import {
  AuthResponse,
  LoginRequest,
  RegisterUserRequest,
  RefreshTokenRequest,
  ApiResponse,
  TokenResponse,
} from '@/app/types/auth';

import type {
  Banner,
  CategoryNew,
  CategoryProduct,
  ConfigSite,
  ContactFormData,
  CreateContactRequestPayload,
  Feature,
  LandingFormData,
  MemberTeam,
  Menu,
  New,
  NewFilterParamsPagination,
  NewsQueryParams,
  PaginatedResponse,
  Partner,
  Portfolio,
  Product,
  SeoMetadata,
  Service,
  ServicePageData,
  Template,
  TemplateCategory,
  TemplateFilterParams,
} from '@/app/types';

// ─────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://be.chunmedia.vn';

// ─────────────────────────────────────────────────────────────
// BASE FETCH HELPER (public / no-auth)
// ─────────────────────────────────────────────────────────────

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─────────────────────────────────────────────────────────────
// TOKEN STORAGE
// ─────────────────────────────────────────────────────────────

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  setTokens: (tokens: TokenResponse) => {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('accessToken', tokens.accessToken);
      sessionStorage.setItem('refreshToken', tokens.refreshToken);
    }
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    }
  },

  /** Khôi phục tokens từ sessionStorage khi app load */
  restoreTokens: () => {
    if (typeof window !== 'undefined') {
      accessToken = sessionStorage.getItem('accessToken');
      refreshToken = sessionStorage.getItem('refreshToken');
    }
    return { accessToken, refreshToken };
  },
};

// ─────────────────────────────────────────────────────────────
// API CLIENT (auth-aware, auto token refresh)
// ─────────────────────────────────────────────────────────────

interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private onTokenRefreshed(newToken: string) {
    this.refreshSubscribers.forEach((cb) => cb(newToken));
    this.refreshSubscribers = [];
  }

  private async doRefreshToken(userType: 'Admin' | 'User'): Promise<boolean> {
    const curAccess = tokenStorage.getAccessToken();
    const curRefresh = tokenStorage.getRefreshToken();
    if (!curAccess || !curRefresh) return false;

    const endpoint =
      userType === 'Admin'
        ? '/api/admin/auth/refresh-token'
        : '/api/client/auth/refresh-token';

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: curAccess,
          refreshToken: curRefresh,
        } as RefreshTokenRequest),
      });
      const data: AuthResponse = await res.json();
      if (data.success && data.tokens) {
        tokenStorage.setTokens(data.tokens);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { requireAuth = true, ...fetchConfig } = config;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchConfig.headers as Record<string, string>),
    };

    if (requireAuth) {
      const token = tokenStorage.getAccessToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchConfig,
      headers,
    });

    if (res.status === 401 && requireAuth) {
      const tokenExpired = res.headers.get('Token-Expired') === 'true';

      if (tokenExpired && !this.isRefreshing) {
        this.isRefreshing = true;
        const ok = await this.doRefreshToken(this.getUserTypeFromToken());
        this.isRefreshing = false;

        if (ok) {
          const newToken = tokenStorage.getAccessToken();
          if (newToken) {
            this.onTokenRefreshed(newToken);
            return this.request<T>(endpoint, config);
          }
        }
      } else if (this.isRefreshing) {
        return new Promise((resolve) => {
          this.subscribeTokenRefresh(async () => {
            resolve(await this.request<T>(endpoint, config));
          });
        });
      }

      tokenStorage.clearTokens();
      throw new Error('Unauthorized - Please login again');
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  private getUserTypeFromToken(): 'Admin' | 'User' {
    const token = tokenStorage.getAccessToken();
    if (!token) return 'User';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.UserType || 'User';
    } catch {
      return 'User';
    }
  }

  get<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }
  post<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  put<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  patch<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  delete<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// ─────────────────────────────────────────────────────────────
// AUTH API
// ─────────────────────────────────────────────────────────────

export const authApi = {
  // Admin
  adminLogin: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/api/admin/auth/login', data, { requireAuth: false }),
  adminLogout: () =>
    apiClient.post<ApiResponse<boolean>>('/api/admin/auth/logout'),
  adminRefresh: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>('/api/admin/auth/refresh-token', data, { requireAuth: false }),
  getAdminMe: () =>
    apiClient.get<ApiResponse<unknown>>('/api/admin/auth/me'),

  // User
  userLogin: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/api/client/auth/login', data, { requireAuth: false }),
  userRegister: (data: RegisterUserRequest) =>
    apiClient.post<AuthResponse>('/api/client/auth/register', data, { requireAuth: false }),
  userLogout: () =>
    apiClient.post<ApiResponse<boolean>>('/api/client/auth/logout'),
  userRefresh: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>('/api/client/auth/refresh-token', data, { requireAuth: false }),
  getUserMe: () =>
    apiClient.get<ApiResponse<unknown>>('/api/client/auth/me'),
};

// ─────────────────────────────────────────────────────────────
// ADMIN API
// ─────────────────────────────────────────────────────────────

export const adminApi = {
  getDashboard: () =>
    apiClient.get<ApiResponse<unknown>>('/api/admin/dashboard'),
  getUsers: () =>
    apiClient.get<ApiResponse<unknown>>('/api/admin/users'),
  getAdmins: () =>
    apiClient.get<ApiResponse<unknown>>('/api/admin/admins'),
  toggleUserStatus: (userId: number) =>
    apiClient.patch<ApiResponse<unknown>>(`/api/admin/users/${userId}/toggle-status`),
};

// ─────────────────────────────────────────────────────────────
// CLIENT API (public — no auth required)
// ─────────────────────────────────────────────────────────────

export const clientApi = {

  // ── Site config ────────────────────────────────────────────
  getConfigSite: () =>
    fetchApi<ConfigSite>('api/config-site/get'),

  getSeoMetadata: (slug: string) =>
    fetchApi<SeoMetadata>(`api/public/seo/by-slug?slug=${encodeURIComponent(slug)}`),

  // ── Navigation ─────────────────────────────────────────────
  getMenusHeader: () =>
    fetchApi<Menu[]>('api/menu/get-root'),
  getMenusRoot: () =>
    fetchApi<Menu[]>('api/menu/get-root'),

  // ── Banners ────────────────────────────────────────────────
  getBanners: () =>
    fetchApi<Banner[]>('api/banner/get-all'),

  // ── Features (hero stats) ───────────────────────────────────
  getFeatures: () =>
    fetchApi<Feature[]>('api/feature/get-all'),

  // ── Partners ───────────────────────────────────────────────
  getPartnerPublic: () =>
    fetchApi<Partner[]>('api/partner/get-all'),

  // ── Team ───────────────────────────────────────────────────
  getMemberTeamsPublic: () =>
    fetchApi<MemberTeam[]>('api/member-team/get-all'),

  // ── Products ───────────────────────────────────────────────
  getProducts: () =>
    fetchApi<Product[]>('api/product/get-all'),
  getCategoryProducts: () =>
    fetchApi<CategoryProduct[]>('api/category-product/get-all'),

  // ── Templates ──────────────────────────────────────────────
  getTemplates: () =>
    fetchApi<Template[]>('api/template/get-all'),
  getTemplatePublished: () =>
    fetchApi<Template[]>('api/template/get-all'),
  getCategoryTemplatePublished: () =>
    fetchApi<TemplateCategory[]>('api/category-template/get-all'),
  getTemplateDetail: (slug: string) =>
    fetchApi<Template | null>(`api/public/template/${encodeURIComponent(slug)}`),
  getPaginated: (params?: TemplateFilterParams): Promise<PaginatedResponse<Template>> => {
    const sp = new URLSearchParams();
    if (params?.page) sp.set('pageNumber', params.page.toString());
    if (params?.pageSize) sp.set('pageSize', params.pageSize.toString());
    if (params?.categoryTemplateId) sp.set('category', params.categoryTemplateId.toString());
    if (params?.search) sp.set('searchTerm', params.search);
    if (params?.isPopular !== undefined) sp.set('isPopular', params.isPopular.toString());
    if (params?.isActive !== undefined) sp.set('isActive', params.isActive.toString());
    if (params?.sortBy) sp.set('sortBy', params.sortBy);
    if (params?.sortDesc !== undefined) sp.set('sortDesc', params.sortDesc.toString());
    const q = sp.toString();
    return fetchApi<PaginatedResponse<Template>>(`api/template/pagination${q ? `?${q}` : ''}`);
  },

  // ── Services ───────────────────────────────────────────────
  /** Danh sách tất cả service — dùng cho menu, footer, trang /dich-vu */
  getServicesPublic: () =>
    fetchApi<Service[]>('api/service/get-all'),
  getServicesFooter: () =>
    fetchApi<Service[]>('api/service/get-all'),

  /** Chi tiết service theo slug — dùng cho trang /dich-vu/[slug]
   *  Trả về ServicePageData với đầy đủ sections (hero, highlights, pricing…)
   *  Gọi: clientApi.getServicePage(slug)
   */
  // getServicePage: (slug: string) =>
  //   fetchApi<ServicePageData>(`api/service/get-by-slug/${encodeURIComponent(slug)}`),

  getServiceById: (id: number) =>
    fetchApi<Service>(`api/service/get-by-id?id=${id}`),


  // THÊM MỚI — gọi khi select row để load full landing page data
  getServicePage: (slug: string) =>
    fetchApi<ServicePageData>(`api/service/get-by-slug/${slug}`),


//   getServicePage: async (slug: string) => {
//     const url = `/api/service/get-by-slug/${slug}`;
//     console.log("getServicePage calling URL:", url);
//     const result = await fetchApi<ServicePageData>(url);
//     console.log("getServicePage result:", result);
//     return result;
// },

  // ── Portfolios ─────────────────────────────────────────────
  getPortfolios: () =>
    fetchApi<Portfolio[]>('api/portfolio/get-all'),
  getPortfoliosPublished: () =>
    fetchApi<Portfolio[]>('api/portfolio/get-all'),
  getPortfolioFooter: () =>
    fetchApi<Portfolio[]>('api/portfolio/get-all'),
  getPortfolioDetail: (slug: string) =>
    fetchApi<Portfolio | null>(`api/portfolio/get-by-url/${slug}`),

  // ── News ───────────────────────────────────────────────────
  getNewsForNewPage: (params?: NewsQueryParams): Promise<PaginatedResponse<New>> => {
    const sp = new URLSearchParams();
    if (params?.pageNumber) sp.set('pageNumber', params.pageNumber.toString());
    if (params?.pageSize) sp.set('pageSize', params.pageSize.toString());
    if (params?.categoryId) sp.set('categoryId', params.categoryId.toString());
    if (params?.searchTerm) sp.set('searchTerm', params.searchTerm);
    if (params?.isActive !== undefined) sp.set('isActive', params.isActive.toString());
    const q = sp.toString();
    return fetchApi<PaginatedResponse<New>>(`api/new/pagination${q ? `?${q}` : ''}`);
  },
  getCategoryNewsForNewPage: () =>
    fetchApi<CategoryNew[]>('api/category-new/get-all'),
  getNewsDetail: (slug: string) =>
    fetchApi<New | null>(`api/new/get-by-url/${slug}`),
  getPortfolio: (slug: string) =>
    fetchApi<New | null>(`api/new/get-by-url/${slug}`),

  // ── Contacts (POST) ────────────────────────────────────────
  /** Form liên hệ đơn giản (header / footer / trang liên hệ) */
  insertContact: async (data: ContactFormData): Promise<unknown> => {
    const res = await fetch(`${API_BASE_URL}/api/contact/insert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Gửi liên hệ thất bại');
    return res.json();
  },

  /** Form báo giá chi tiết (landing page multi-step) */
  insertContactRequest: async (formData: LandingFormData): Promise<unknown> => {
    const res = await fetch(`${API_BASE_URL}/api/contact-request/insert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapFormDataToPayload(formData)),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || `Gửi yêu cầu thất bại (${res.status})`);
    }
    return res.json();
  },
};

// ─────────────────────────────────────────────────────────────
// MAPPER: LandingFormData → BE Payload
// ─────────────────────────────────────────────────────────────

function mapFormDataToPayload(fd: LandingFormData): CreateContactRequestPayload {
  return {
    fullName: fd.fullName,
    phone: fd.phone,
    email: fd.email,
    company: fd.company || null,
    position: fd.position || null,
    city: fd.city || null,
    source: fd.source || null,
    websiteType: fd.websiteType!,
    otherTypeDescription: fd.otherTypeDescription || null,
    industry: fd.industry,
    hasWebsite: fd.hasWebsite!,
    currentUrl: fd.currentUrl || null,
    currentIssue: fd.currentIssue || null,
    features: fd.features,
    pageCount: fd.pageCount || null,
    language: fd.language,
    specialRequirements: fd.specialRequirements || null,
    hasLogo: fd.hasLogo!,
    brandColor: fd.brandColor || null,
    designStyles: fd.designStyles,
    referenceWebsites: fd.referenceWebsites.filter((r) => r.url.trim() !== ''),
    contentReady: fd.contentReady!,
    hasDomain: fd.hasDomain,
    budget: fd.budget!,
    timeline: fd.timeline!,
    paymentMethod: fd.paymentMethod || null,
    addons: fd.addons,
    notes: fd.notes || null,
  };
}