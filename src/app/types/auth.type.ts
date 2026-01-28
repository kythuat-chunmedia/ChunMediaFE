// ============================================================
// AUTH TYPES
// ============================================================

import { AdminInfo } from "./admin.type";
import { UserInfo } from "./user.type";

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  tokens?: TokenResponse;
  user?: AdminInfo | UserInfo;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}
