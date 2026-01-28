'use client';

import { AuthProvider } from '@/app/contexts/AuthContext';
import { AdminProfileProvider, useAdminProfile } from '@/app/contexts/AdminProfileContext';

function AuthWithProfile({ children }: { children: React.ReactNode }) {
  const { fetchProfile, clearProfile } = useAdminProfile();

  return (
    <AuthProvider
      onLoginSuccess={fetchProfile}
      onLogout={clearProfile}
    >
      {children}
    </AuthProvider>
  );
}

export function CmsProviders({ children }: { children: React.ReactNode }) {
  return (
    <AdminProfileProvider>
      <AuthWithProfile>
        {children}
      </AuthWithProfile>
    </AdminProfileProvider>
  );
}