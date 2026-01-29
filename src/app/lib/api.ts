import {
  AuthResponse,
  LoginRequest,
  RegisterUserRequest,
  RefreshTokenRequest,
  ApiResponse,
  TokenResponse,
} from '@/app/types/auth';

// ============ CONFIGURATION ============

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://be.chunmedia.vn';

// ============ TOKEN STORAGE ============
// Lưu trong memory để bảo mật hơn localStorage
// Kết hợp với httpOnly cookie cho refresh token trong production

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,
  
  setTokens: (tokens: TokenResponse) => {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    
    // Lưu vào sessionStorage để persist khi refresh page
    // Trong production, nên dùng httpOnly cookie cho refreshToken
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
  
  // Khôi phục tokens từ sessionStorage khi app load
  restoreTokens: () => {
    if (typeof window !== 'undefined') {
      accessToken = sessionStorage.getItem('accessToken');
      refreshToken = sessionStorage.getItem('refreshToken');
    }
    return { accessToken, refreshToken };
  },
};

// ============ API CLIENT ============

interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Subscribe để chờ token mới khi đang refresh
  private subscribeTokenRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  // Notify tất cả subscribers khi có token mới
  private onTokenRefreshed(newToken: string) {
    this.refreshSubscribers.forEach((callback) => callback(newToken));
    this.refreshSubscribers = [];
  }

  // Refresh token
  private async doRefreshToken(userType: 'Admin' | 'User'): Promise<boolean> {
    const currentAccessToken = tokenStorage.getAccessToken();
    const currentRefreshToken = tokenStorage.getRefreshToken();

    if (!currentAccessToken || !currentRefreshToken) {
      return false;
    }

    const endpoint = userType === 'Admin' 
      ? '/api/admin/auth/refresh-token' 
      : '/api/client/auth/refresh-token';

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
        } as RefreshTokenRequest),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.tokens) {
        tokenStorage.setTokens(data.tokens);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Main request method
  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { requireAuth = true, ...fetchConfig } = config;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchConfig.headers,
    };

    // Thêm Authorization header nếu cần auth
    if (requireAuth) {
      const token = tokenStorage.getAccessToken();
      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchConfig,
      headers,
    });

    // Handle 401 - Token expired
    if (response.status === 401 && requireAuth) {
      // Kiểm tra header Token-Expired
      const tokenExpired = response.headers.get('Token-Expired') === 'true';
      
      if (tokenExpired && !this.isRefreshing) {
        this.isRefreshing = true;
        
        // Lấy userType từ token hiện tại
        const userType = this.getUserTypeFromToken();
        const refreshSuccess = await this.doRefreshToken(userType);
        
        this.isRefreshing = false;

        if (refreshSuccess) {
          const newToken = tokenStorage.getAccessToken();
          if (newToken) {
            this.onTokenRefreshed(newToken);
            // Retry request với token mới
            return this.request<T>(endpoint, config);
          }
        }
      } else if (this.isRefreshing) {
        // Chờ token mới
        return new Promise((resolve) => {
          this.subscribeTokenRefresh(async () => {
            resolve(await this.request<T>(endpoint, config));
          });
        });
      }
      
      // Refresh failed - clear tokens và throw error
      tokenStorage.clearTokens();
      throw new Error('Unauthorized - Please login again');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // Helper để lấy userType từ JWT token
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

  // Shorthand methods
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

// ============ AUTH API ============

export const authApi = {
  // Admin Auth
  adminLogin: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/api/admin/auth/login', data, { requireAuth: false }),

  adminLogout: () =>
    apiClient.post<ApiResponse<boolean>>('/api/admin/auth/logout'),

  adminRefresh: (data: RefreshTokenRequest) =>
    apiClient.post<AuthResponse>('/api/admin/auth/refresh-token', data, { requireAuth: false }),

  getAdminMe: () =>
    apiClient.get<ApiResponse<unknown>>('/api/admin/auth/me'),

  // User Auth
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

// ============ ADMIN API (Protected) ============

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

// ============ CLIENT API (Protected) ============

export const clientApi = {
  getHome: () =>
    apiClient.get<ApiResponse<unknown>>('/api/client/home'),

  getProfile: () =>
    apiClient.get<ApiResponse<unknown>>('/api/client/profile'),

  updateProfile: (data: { fullName?: string; phoneNumber?: string }) =>
    apiClient.put<ApiResponse<unknown>>('/api/client/profile', data),
};
