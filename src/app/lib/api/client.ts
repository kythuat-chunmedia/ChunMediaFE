// ============================================================
// API CLIENT - Base client với JWT handling
// File: src/lib/api/client.ts
// ============================================================

import { TokenResponse, AuthResponse, RefreshTokenRequest } from "@/app/types";



// ============ CONFIGURATION ============
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://be.chunmedia.vn";

// ============ TOKEN STORAGE ============
class TokenStorage {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  getAccessToken(): string | null {
    if (this.accessToken) return this.accessToken;
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("accessToken");
    }
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    if (this.refreshToken) return this.refreshToken;
    if (typeof window !== "undefined") {
      this.refreshToken = localStorage.getItem("refreshToken");
    }
    return this.refreshToken;
  }

  setTokens(tokens: TokenResponse): void {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("accessTokenExpiry", tokens.accessTokenExpiry);
      localStorage.setItem("refreshTokenExpiry", tokens.refreshTokenExpiry);
    }
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExpiry");
      localStorage.removeItem("refreshTokenExpiry");
    }
  }

  isTokenExpired(): boolean {
    if (typeof window === "undefined") return true;
    const expiry = localStorage.getItem("accessTokenExpiry");
    if (!expiry) return true;
    return new Date(expiry) < new Date();
  }
}

export const tokenStorage = new TokenStorage();


// Sau (đã sửa)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryParams = Record<string, any>;

// ============ API CLIENT ============
interface RequestConfig extends RequestInit {
  requireAuth?: boolean;
  params?: QueryParams;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Subscribe để chờ token mới khi đang refresh
  private subscribeTokenRefresh(callback: (token: string) => void): void {
    this.refreshSubscribers.push(callback);
  }

  // Notify tất cả subscribers khi có token mới
  private onTokenRefreshed(newToken: string): void {
    this.refreshSubscribers.forEach((callback) => callback(newToken));
    this.refreshSubscribers = [];
  }

  // Refresh token
  private async doRefreshToken(): Promise<boolean> {
    const currentAccessToken = tokenStorage.getAccessToken();
    const currentRefreshToken = tokenStorage.getRefreshToken();

    if (!currentAccessToken || !currentRefreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/admin/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Build URL with query params
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  // Main request method
  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { requireAuth = true, params, ...fetchConfig } = config;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchConfig.headers,
    };

    // Thêm Authorization header nếu cần auth
    if (requireAuth) {
      const token = tokenStorage.getAccessToken();
      if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }

    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      ...fetchConfig,
      headers,
    });

    // Handle 401 - Token expired
    if (response.status === 401 && requireAuth) {
      const tokenExpired = response.headers.get("Token-Expired") === "true";

      console.log("API Client: Token expired:", tokenExpired);
      console.log("isRefreshing:", this.isRefreshing);

      if (tokenExpired && !this.isRefreshing) {
        this.isRefreshing = true;
        const refreshSuccess = await this.doRefreshToken();
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



      // Refresh failed - redirect to login
      tokenStorage.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/cms/signin";
        // console.warn("Redirect to /cms/signin");
      }
      throw new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
    }

    // Handle other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Lỗi ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // HTTP Methods
  get<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: "GET", params });
  }

  post<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(endpoint: string, body?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, fieldName: string = "file"): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const token = tokenStorage.getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    // Không set Content-Type, để browser tự set với boundary

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Upload failed");
    }

    return response.json();
  }

  // Upload multiple files
  async uploadMultiple<T>(endpoint: string, files: File[], fieldName: string = "files"): Promise<T> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(fieldName, file);
    });

    const token = tokenStorage.getAccessToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Upload failed");
    }

    return response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
