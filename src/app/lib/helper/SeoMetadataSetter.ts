"use client";

import { useEffect } from "react";
import { useSlug } from "@/app/hooks/useSlug";
import { SeoMetadataPublic } from "@/app/types";
import { clientApi } from "../api";
import { applyMetadata } from "./applySeoMetadata";

export default function SeoMetadataSetter() {
  const { slug } = useSlug();

  useEffect(() => {
    if (!slug) return;

    const fetchSeo = async () => {
      try {
        const seo: SeoMetadataPublic | null =
          await clientApi.getSeoMetadata(slug);

        // ❌ Không có bản ghi → không chỉnh metadata
        if (!seo) return;

        console.log(slug);
        console.log(seo);

        applyMetadata(seo);
      } catch (error) {
        // ❌ lỗi API → bỏ qua, không phá metadata
        console.warn("SEO metadata fetch failed", error);
      }
    };

    fetchSeo();
  }, [slug]);

  return null; // component logic-only
}
