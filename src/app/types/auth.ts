// ============ REQUEST TYPES ============

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

// ============ RESPONSE TYPES ============

export interface AuthResponse {
  success: boolean;
  message: string;
  tokens?: TokenResponse;
  user?: UserInfo;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  userType: 'Admin' | 'User';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// ============ AUTH CONTEXT TYPES ============

export interface AuthState {
  user: UserInfo | null;
  tokens: TokenResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest, userType: 'Admin' | 'User') => Promise<AuthResponse>;
  register: (data: RegisterUserRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

// ============ JWT PAYLOAD TYPE ============

export interface JwtPayload {
  sub: string;
  unique_name: string;
  email: string;
  role: string;
  UserType: 'Admin' | 'User';
  jti: string;
  iat: number;
  exp: number;
}


