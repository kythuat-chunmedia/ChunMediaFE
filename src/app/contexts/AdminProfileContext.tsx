// contexts/AdminProfileContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { apiClient } from '@/app/lib/api';

// ============ TYPES ============

export interface AdminProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  avatar?: string;
  phoneNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface AdminProfileState {
  profile: AdminProfile | null;
  isLoading: boolean;
  error: string | null;
}

interface AdminProfileContextType extends AdminProfileState {
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<AdminProfile>) => Promise<boolean>;
  clearProfile: () => void;
}

// ============ CONTEXT ============

const AdminProfileContext = createContext<AdminProfileContextType | undefined>(undefined);

// ============ PROVIDER ============

export function AdminProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminProfileState>({
    profile: null,
    isLoading: false,
    error: null,
  });

  // Fetch profile từ /api/admin/auth/me
  const fetchProfile = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiClient.get<{
        success: boolean;
        data: AdminProfile;
        message: string;
      }>('/api/admin/auth/me');

      if (response.success && response.data) {
        setState({
          profile: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Không thể lấy thông tin profile',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      }));
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<AdminProfile>): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await apiClient.put<{
        success: boolean;
        data: AdminProfile;
        message: string;
      }>('/api/admin/auth/profile', data);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          profile: response.data,
          isLoading: false,
        }));
        return true;
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

        // console.log('Update profile response:', state.profile);

  // Clear profile (khi logout)
  const clearProfile = useCallback(() => {
    setState({
      profile: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const value: AdminProfileContextType = {
    ...state,
    fetchProfile,
    updateProfile,
    clearProfile,
  };

  return (
    <AdminProfileContext.Provider value={value}>
      {children}
    </AdminProfileContext.Provider>
  );
}

// ============ HOOK ============

export function useAdminProfile() {
  const context = useContext(AdminProfileContext);

  if (context === undefined) {
    throw new Error('useAdminProfile must be used within an AdminProfileProvider');
  }

  return context;
}