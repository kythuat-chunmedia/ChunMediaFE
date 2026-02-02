import { JwtPayload } from '@/app/types/auth';

// ============ JWT UTILITIES ============

export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token);
  if (!payload) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now();
}

export function getTokenExpiryDate(token: string): Date | null {
  const payload = parseJwt(token);
  if (!payload) return null;
  return new Date(payload.exp * 1000);
}

export function getUserTypeFromToken(token: string): 'Admin' | 'User' | null {
  const payload = parseJwt(token);
  return payload?.UserType || null;
}

// ============ CLASS NAME UTILITIES ============

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============ FORMAT UTILITIES ============

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  }).format(new Date(date));
}
