"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

// Type cho tên icon
export type IconName = keyof typeof LucideIcons;

interface DynamicIconProps extends LucideProps {
  name: string;
  fallback?: React.ReactNode;
}

/**
 * Component render Lucide icon từ tên string
 * Sử dụng: <DynamicIcon name="Megaphone" className="w-6 h-6" />
 */
export default function DynamicIcon({ 
  name, 
  fallback = null,
  ...props 
}: DynamicIconProps) {
  // Chuẩn hóa tên icon (hỗ trợ nhiều format)
  const normalizedName = normalizeIconName(name);
  
  // ✅ Cast qua unknown trước để tránh lỗi TypeScript
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;
  const IconComponent = icons[normalizedName];

  if (!IconComponent) {
    // Fallback nếu không tìm thấy icon
    return fallback ? <>{fallback}</> : null;
  }

  return <IconComponent {...props} />;
}

/**
 * Chuẩn hóa tên icon từ nhiều format khác nhau
 * - "megaphone" -> "Megaphone"
 * - "trending-up" -> "TrendingUp"
 * - "fa-megaphone" -> "Megaphone"
 * - "Megaphone" -> "Megaphone"
 */
function normalizeIconName(name: string): string {
  if (!name) return "";
  
  // Loại bỏ prefix (fa-, icon-, lucide-)
  let cleanName = name
    .replace(/^(fa-|icon-|lucide-)/i, "")
    .trim();
  
  // Convert kebab-case hoặc snake_case sang PascalCase
  // trending-up -> TrendingUp
  // trending_up -> TrendingUp
  cleanName = cleanName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
  
  // Đảm bảo chữ cái đầu viết hoa
  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
}

/**
 * Lấy danh sách tất cả icon names
 */
export function getAllIconNames(): string[] {
  // ✅ Cast qua unknown
  const icons = LucideIcons as unknown as Record<string, unknown>;
  
  return Object.keys(icons).filter(
    key => typeof icons[key] === "function" && 
           key !== "createLucideIcon" &&
           key !== "default" &&
           !key.startsWith("Lucide") &&
           !key.startsWith("create") &&
           key !== "icons"
  );
}