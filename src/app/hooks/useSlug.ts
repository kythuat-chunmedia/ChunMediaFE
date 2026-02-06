"use client";

import { usePathname } from "next/navigation";

export const useSlug = () => {
  const pathname = usePathname(); 
  // VD: "/bai-viet/nextjs/slug-la-gi"

  const segments = pathname
    .split("/")
    .filter(Boolean); // bỏ rỗng

  return {
    pathname,                 // "/bai-viet/nextjs/slug-la-gi"
    segments,                 // ["bai-viet", "nextjs", "slug-la-gi"]
    slug: segments.at(-1),    // "slug-la-gi"
    parentSlug: segments.at(-2) // "nextjs"
  };
};
