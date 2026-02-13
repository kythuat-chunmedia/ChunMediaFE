import type { Template, TemplateLocal, TemplateScreenshotLocal } from '@/app/types';

// ============ JSON FIELD PARSER ============

export function parseJsonField<T>(json: string | null | undefined): T[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ============ TEMPLATE TRANSFORM ============

export function apiTemplateToLocal(api: Template): TemplateLocal {
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    category: api.categoryName,
    categoryTemplateId: api.categoryTemplateId,
    description: api.description,
    longDescription: api.longDescription ?? '',
    image: api.image,
    tags: parseJsonField<string>(api.tags),
    pages: api.pages,
    responsive: api.isResponsive,
    popular: api.isPopular,
    features: parseJsonField<string>(api.features),
    techStack: parseJsonField<string>(api.techStack),
    screenshots: (api.screenshots ?? []).map(
      (s): TemplateScreenshotLocal => ({
        device: s.device as 'desktop' | 'tablet' | 'mobile',
        label: s.label ?? '',
        image: s.imageUrl,
        width: s.width,
        height: s.height,
      })
    ),
    demoUrl: api.demoUrl ?? '#',
    version: api.version ?? '1.0.0',
    lastUpdated: api.updatedAt ?? api.createdAt,
    viewCount: api.viewCount,
    metaTitle: api.metaTitle,
    metaDescription: api.metaDescription,
    ogImage: api.ogImage,
  };
}

// ============ CATEGORIES EXTRACTOR ============

export function extractCategories(templates: TemplateLocal[]): string[] {
  const cats = Array.from(new Set(templates.map((t) => t.category))).sort();
  return ['Tất cả', ...cats];
}
