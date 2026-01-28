// // 'use client';

// // import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
// // import { useRouter } from 'next/navigation';
// // import {
// //   AuthContextType,
// //   AuthState,
// //   LoginRequest,
// //   RegisterUserRequest,
// //   UserInfo,
// //   TokenResponse,
// // } from '@/app/types/auth';
// // import { authApi, tokenStorage } from '@/app/lib/api';
// // import { parseJwt, isTokenExpired } from '@/app/lib/utils';

// // // ============ INITIAL STATE ============

// // const initialState: AuthState = {
// //   user: null,
// //   tokens: null,
// //   isAuthenticated: false,
// //   isLoading: true,
// // };

// // // ============ CONTEXT ============

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // ============ PROVIDER ============

// // interface AuthProviderProps {
// //   children: React.ReactNode;
// // }

// // export function AuthProvider({ children }: AuthProviderProps) {
// //   const [state, setState] = useState<AuthState>(initialState);
// //   const router = useRouter();

// //   // ============ RESTORE SESSION ============
  
// //   useEffect(() => {
// //     const restoreSession = () => {
// //       const { accessToken, refreshToken } = tokenStorage.restoreTokens();

// //       if (accessToken && refreshToken && !isTokenExpired(accessToken)) {
// //         const payload = parseJwt(accessToken);
        
// //         if (payload) {
// //           const user: UserInfo = {
// //             id: parseInt(payload.sub),
// //             username: payload.unique_name,
// //             email: payload.email,
// //             fullName: payload.unique_name, // Will be updated from API
// //             role: payload.role,
// //             userType: payload.UserType,
// //           };

// //           setState({
// //             user,
// //             tokens: {
// //               accessToken,
// //               refreshToken,
// //               accessTokenExpiry: new Date(payload.exp * 1000).toISOString(),
// //               refreshTokenExpiry: '', // Unknown from token
// //             },
// //             isAuthenticated: true,
// //             isLoading: false,
// //           });
// //           return;
// //         }
// //       }

// //       // Clear invalid session
// //       tokenStorage.clearTokens();
// //       setState({ ...initialState, isLoading: false });
// //     };

// //     restoreSession();
// //   }, []);

// //   // ============ LOGIN ============
  
// //   const login = useCallback(
// //     async (credentials: LoginRequest, userType: 'Admin' | 'User') => {
// //       setState((prev) => ({ ...prev, isLoading: true }));

// //       try {
// //         const response = userType === 'Admin'
// //           ? await authApi.adminLogin(credentials)
// //           : await authApi.userLogin(credentials);

// //         if (response.success && response.tokens && response.user) {
// //           tokenStorage.setTokens(response.tokens);
          
// //           setState({
// //             user: response.user,
// //             tokens: response.tokens,
// //             isAuthenticated: true,
// //             isLoading: false,
// //           });
// //         } else {
// //           setState((prev) => ({ ...prev, isLoading: false }));
// //         }

// //         return response;
// //       } catch (error) {
// //         setState((prev) => ({ ...prev, isLoading: false }));
// //         return {
// //           success: false,
// //           message: error instanceof Error ? error.message : 'Đăng nhập thất bại',
// //         };
// //       }
// //     },
// //     []
// //   );

// //   // ============ REGISTER ============
  
// //   const register = useCallback(async (data: RegisterUserRequest) => {
// //     setState((prev) => ({ ...prev, isLoading: true }));

// //     try {
// //       const response = await authApi.userRegister(data);

// //       if (response.success && response.tokens && response.user) {
// //         tokenStorage.setTokens(response.tokens);
        
// //         setState({
// //           user: response.user,
// //           tokens: response.tokens,
// //           isAuthenticated: true,
// //           isLoading: false,
// //         });
// //       } else {
// //         setState((prev) => ({ ...prev, isLoading: false }));
// //       }

// //       return response;
// //     } catch (error) {
// //       setState((prev) => ({ ...prev, isLoading: false }));
// //       return {
// //         success: false,
// //         message: error instanceof Error ? error.message : 'Đăng ký thất bại',
// //       };
// //     }
// //   }, []);

// //   // ============ LOGOUT ============
  
// //   const logout = useCallback(async () => {
// //     try {
// //       if (state.user?.userType === 'Admin') {
// //         await authApi.adminLogout();
// //       } else {
// //         await authApi.userLogout();
// //       }
// //     } catch {
// //       // Ignore logout API errors
// //     } finally {
// //       tokenStorage.clearTokens();
// //       setState({ ...initialState, isLoading: false });
// //       router.push('/');
// //     }
// //   }, [state.user?.userType, router]);

// //   // ============ REFRESH TOKEN ============
  
// //   const refreshToken = useCallback(async (): Promise<boolean> => {
// //     const currentAccessToken = tokenStorage.getAccessToken();
// //     const currentRefreshToken = tokenStorage.getRefreshToken();

// //     if (!currentAccessToken || !currentRefreshToken) {
// //       return false;
// //     }

// //     try {
// //       const response = state.user?.userType === 'Admin'
// //         ? await authApi.adminRefresh({
// //             accessToken: currentAccessToken,
// //             refreshToken: currentRefreshToken,
// //           })
// //         : await authApi.userRefresh({
// //             accessToken: currentAccessToken,
// //             refreshToken: currentRefreshToken,
// //           });

// //       if (response.success && response.tokens) {
// //         tokenStorage.setTokens(response.tokens);
        
// //         setState((prev) => ({
// //           ...prev,
// //           tokens: response.tokens!,
// //         }));
        
// //         return true;
// //       }
// //       return false;
// //     } catch {
// //       return false;
// //     }
// //   }, [state.user?.userType]);

// //   // ============ AUTO REFRESH ============
  
// //   useEffect(() => {
// //     if (!state.tokens?.accessToken) return;

// //     const payload = parseJwt(state.tokens.accessToken);
// //     if (!payload) return;

// //     // Refresh 1 phút trước khi hết hạn
// //     const expiresIn = payload.exp * 1000 - Date.now() - 60000;
    
// //     if (expiresIn <= 0) {
// //       refreshToken();
// //       return;
// //     }

// //     const timer = setTimeout(() => {
// //       refreshToken();
// //     }, expiresIn);

// //     return () => clearTimeout(timer);
// //   }, [state.tokens?.accessToken, refreshToken]);

// //   // ============ CONTEXT VALUE ============
  
// //   const value: AuthContextType = {
// //     ...state,
// //     login,
// //     register,
// //     logout,
// //     refreshToken,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // }

// // // ============ HOOK ============

// // export function useAuth() {
// //   const context = useContext(AuthContext);
  
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
  
// //   return context;
// // }




// // src/app/context/AuthContext.tsx

// 'use client';

// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   AuthContextType,
//   AuthState,
//   LoginRequest,
//   RegisterUserRequest,
//   UserInfo,
// } from '@/app/types/auth';
// import { authApi, tokenStorage } from '@/app/lib/api';
// import { parseJwt, isTokenExpired } from '@/app/lib/utils';
// import { AdminProfileProvider } from './AdminProfileContext';

// // ============ INITIAL STATE ============

// const initialState: AuthState = {
//   user: null,
//   tokens: null,
//   isAuthenticated: false,
//   isLoading: true,
// };

// // ============ CONTEXT ============

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // ============ PROVIDER ============

// interface AuthProviderProps {
//   children: React.ReactNode;
//   onAdminLogin?: (admin: UserInfo) => void;  // Callback khi admin login
//   onLogout?: () => void;                      // Callback khi logout
// }

// export function AuthProvider({ children, onAdminLogin, onLogout }: AuthProviderProps) {
//   const [state, setState] = useState<AuthState>(initialState);
//   const router = useRouter();

//   // ============ RESTORE SESSION ============
  
//   useEffect(() => {
//     const restoreSession = () => {
//       const { accessToken, refreshToken } = tokenStorage.restoreTokens();

//       if (accessToken && refreshToken && !isTokenExpired(accessToken)) {
//         const payload = parseJwt(accessToken);
        
//         if (payload) {
//           console.log(payload);

//           const user: UserInfo = {
//             id: parseInt(payload.sub),
//             username: payload.unique_name,
//             email: payload.email,
//             fullName: payload.unique_name,
//             role: payload.role,
//             userType: payload.UserType,
//           };

//           setState({
//             user,
//             tokens: {
//               accessToken,
//               refreshToken,
//               accessTokenExpiry: new Date(payload.exp * 1000).toISOString(),
//               refreshTokenExpiry: '',
//             },
//             isAuthenticated: true,
//             isLoading: false,
//           });

//           // Sync với AdminProfile nếu là Admin
//           if (user.userType === 'Admin' && onAdminLogin) {
//             onAdminLogin(user);
//           }
//           return;
//         }
//       }

//       tokenStorage.clearTokens();
//       setState({ ...initialState, isLoading: false });
//     };

//     restoreSession();
//   }, [onAdminLogin]);

//   // ============ LOGIN ============
  
//   const login = useCallback(
//     async (credentials: LoginRequest, userType: 'Admin' | 'User') => {
//       setState((prev) => ({ ...prev, isLoading: true }));

//       try {
//         const response = userType === 'Admin'
//           ? await authApi.adminLogin(credentials)
//           : await authApi.userLogin(credentials);

//         if (response.success && response.tokens && response.user) {
//           tokenStorage.setTokens(response.tokens);
          
//           setState({
//             user: response.user,
//             tokens: response.tokens,
//             isAuthenticated: true,
//             isLoading: false,
//           });

//           // Sync với AdminProfile nếu là Admin
//           if (userType === 'Admin' && onAdminLogin) {
//             onAdminLogin(response.user);
//           }
//         } else {
//           setState((prev) => ({ ...prev, isLoading: false }));
//         }

//         return response;
//       } catch (error) {
//         setState((prev) => ({ ...prev, isLoading: false }));
//         return {
//           success: false,
//           message: error instanceof Error ? error.message : 'Đăng nhập thất bại',
//         };
//       }
//     },
//     [onAdminLogin]
//   );

//   // ============ REGISTER ============
  
//   const register = useCallback(async (data: RegisterUserRequest) => {
//     setState((prev) => ({ ...prev, isLoading: true }));

//     try {
//       const response = await authApi.userRegister(data);

//       if (response.success && response.tokens && response.user) {
//         tokenStorage.setTokens(response.tokens);
        
//         setState({
//           user: response.user,
//           tokens: response.tokens,
//           isAuthenticated: true,
//           isLoading: false,
//         });
//       } else {
//         setState((prev) => ({ ...prev, isLoading: false }));
//       }

//       return response;
//     } catch (error) {
//       setState((prev) => ({ ...prev, isLoading: false }));
//       return {
//         success: false,
//         message: error instanceof Error ? error.message : 'Đăng ký thất bại',
//       };
//     }
//   }, []);

//   // ============ LOGOUT ============
  
//   const logout = useCallback(async () => {
//     try {
//       if (state.user?.userType === 'Admin') {
//         await authApi.adminLogout();
//       } else {
//         await authApi.userLogout();
//       }
//     } catch {
//       // Ignore logout API errors
//     } finally {
//       tokenStorage.clearTokens();
//       setState({ ...initialState, isLoading: false });
      
//       // Clear AdminProfile
//       if (onLogout) {
//         onLogout();
//       }
      
//       router.push('/');
//     }
//   }, [state.user?.userType, router, onLogout]);

//   // ============ REFRESH TOKEN ============
  
//   const refreshToken = useCallback(async (): Promise<boolean> => {
//     const currentAccessToken = tokenStorage.getAccessToken();
//     const currentRefreshToken = tokenStorage.getRefreshToken();

//     if (!currentAccessToken || !currentRefreshToken) {
//       return false;
//     }

//     try {
//       const response = state.user?.userType === 'Admin'
//         ? await authApi.adminRefresh({
//             accessToken: currentAccessToken,
//             refreshToken: currentRefreshToken,
//           })
//         : await authApi.userRefresh({
//             accessToken: currentAccessToken,
//             refreshToken: currentRefreshToken,
//           });

//       if (response.success && response.tokens) {
//         tokenStorage.setTokens(response.tokens);
        
//         setState((prev) => ({
//           ...prev,
//           tokens: response.tokens!,
//         }));
        
//         return true;
//       }
//       return false;
//     } catch {
//       return false;
//     }
//   }, [state.user?.userType]);

//   // ============ AUTO REFRESH ============
  
//   useEffect(() => {
//     if (!state.tokens?.accessToken) return;

//     const payload = parseJwt(state.tokens.accessToken);
//     if (!payload) return;

//     const expiresIn = payload.exp * 1000 - Date.now() - 60000;
    
//     if (expiresIn <= 0) {
//       refreshToken();
//       return;
//     }

//     const timer = setTimeout(() => {
//       refreshToken();
//     }, expiresIn);

//     return () => clearTimeout(timer);
//   }, [state.tokens?.accessToken, refreshToken]);

//   // ============ CONTEXT VALUE ============
  
//   const value: AuthContextType = {
//     ...state,
//     login,
//     register,
//     logout,
//     refreshToken,
//   };

//   return (
//     // <AdminProfileProvider>

//       <AuthContext.Provider value={value}>
//         {children}
//       </AuthContext.Provider>
//     // </AdminProfileProvider>

//   );
// }

// // ============ HOOK ============

// export function useAuth() {
//   const context = useContext(AuthContext);
  
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
  
//   return context;
// }



















// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthContextType,
  AuthState,
  LoginRequest,
  RegisterUserRequest,
} from '@/app/types/auth';
import { authApi, tokenStorage } from '@/app/lib/api';
import { parseJwt, isTokenExpired } from '@/app/lib/utils';

// ============ INITIAL STATE ============

const initialState: AuthState = {
  user: null,        // Giữ basic info từ JWT (id, role) để check permission
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
};

// ============ CONTEXT ============

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============ PROVIDER ============

interface AuthProviderProps {
  children: React.ReactNode;
  onLoginSuccess?: () => void;   // Callback sau khi login thành công
  onLogout?: () => void;         // Callback khi logout
}

export function AuthProvider({ children, onLoginSuccess, onLogout }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  // ============ RESTORE SESSION ============

  useEffect(() => {
    const restoreSession = () => {
      const { accessToken, refreshToken } = tokenStorage.restoreTokens();

      if (accessToken && refreshToken && !isTokenExpired(accessToken)) {
        const payload = parseJwt(accessToken);

        if (payload) {
          // Chỉ lưu basic info từ JWT để check auth
          setState({
            user: {
              id: parseInt(payload.sub),
              username: payload.unique_name,
              email: payload.email,
              fullName: payload.unique_name,
              role: payload.role,
              userType: payload.UserType,
            },
            tokens: {
              accessToken,
              refreshToken,
              accessTokenExpiry: new Date(payload.exp * 1000).toISOString(),
              refreshTokenExpiry: '',
            },
            isAuthenticated: true,
            isLoading: false,
          });

          // Trigger fetch profile
          if (onLoginSuccess) {
            onLoginSuccess();
          }
          return;
        }
      }

      tokenStorage.clearTokens();
      setState({ ...initialState, isLoading: false });
    };

    restoreSession();
  }, [onLoginSuccess]);

  // ============ LOGIN ============

  const login = useCallback(
    async (credentials: LoginRequest, userType: 'Admin' | 'User') => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const response = userType === 'Admin'
          ? await authApi.adminLogin(credentials)
          : await authApi.userLogin(credentials);

        if (response.success && response.tokens) {
          tokenStorage.setTokens(response.tokens);

          // Parse basic info từ token
          const payload = parseJwt(response.tokens.accessToken);

          setState({
            user: payload ? {
              id: parseInt(payload.sub),
              username: payload.unique_name,
              email: payload.email,
              fullName: payload.unique_name,
              role: payload.role,
              userType: payload.UserType,
            } : null,
            tokens: response.tokens,
            isAuthenticated: true,
            isLoading: false,
          });

          // Trigger fetch profile sau khi login
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }

        return response;
      } catch (error) {
        setState(prev => ({ ...prev, isLoading: false }));
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Đăng nhập thất bại',
        };
      }
    },
    [onLoginSuccess]
  );

  // ============ REGISTER ============

  const register = useCallback(async (data: RegisterUserRequest) => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await authApi.userRegister(data);

      if (response.success && response.tokens) {
        tokenStorage.setTokens(response.tokens);

        const payload = parseJwt(response.tokens.accessToken);

        setState({
          user: payload ? {
            id: parseInt(payload.sub),
            username: payload.unique_name,
            email: payload.email,
            fullName: payload.unique_name,
            role: payload.role,
            userType: payload.UserType,
          } : null,
          tokens: response.tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }

      return response;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Đăng ký thất bại',
      };
    }
  }, []);

  // ============ LOGOUT ============

  const logout = useCallback(async () => {
    try {
      if (state.user?.userType === 'Admin') {
        await authApi.adminLogout();
      } else {
        await authApi.userLogout();
      }
    } catch {
      // Ignore logout API errors
    } finally {
      tokenStorage.clearTokens();
      setState({ ...initialState, isLoading: false });

      // Clear profile
      if (onLogout) {
        onLogout();
      }

      router.push('/');
    }
  }, [state.user?.userType, router, onLogout]);

  // ============ REFRESH TOKEN ============

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const currentAccessToken = tokenStorage.getAccessToken();
    const currentRefreshToken = tokenStorage.getRefreshToken();

    if (!currentAccessToken || !currentRefreshToken) {
      return false;
    }

    try {
      const response = state.user?.userType === 'Admin'
        ? await authApi.adminRefresh({
            accessToken: currentAccessToken,
            refreshToken: currentRefreshToken,
          })
        : await authApi.userRefresh({
            accessToken: currentAccessToken,
            refreshToken: currentRefreshToken,
          });

      if (response.success && response.tokens) {
        tokenStorage.setTokens(response.tokens);

        setState(prev => ({
          ...prev,
          tokens: response.tokens!,
        }));

        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [state.user?.userType]);

  // ============ AUTO REFRESH ============

  useEffect(() => {
    if (!state.tokens?.accessToken) return;

    const payload = parseJwt(state.tokens.accessToken);
    if (!payload) return;

    const expiresIn = payload.exp * 1000 - Date.now() - 60000;

    if (expiresIn <= 0) {
      refreshToken();
      return;
    }

    const timer = setTimeout(() => {
      refreshToken();
    }, expiresIn);

    return () => clearTimeout(timer);
  }, [state.tokens?.accessToken, refreshToken]);

  // ============ CONTEXT VALUE ============

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============ HOOK ============

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}