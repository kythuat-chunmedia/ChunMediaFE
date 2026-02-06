import { SeoMetadataPublic } from "@/app/types";

export const applyMetadata = (seo: SeoMetadataPublic) => {
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
  }

  setMeta("description", seo.metaDescription);
  setMeta("keywords", seo.metaKeywords);

  setProperty("og:title", seo.ogTitle);
  setProperty("og:description", seo.ogDescription);
  setProperty("og:image", seo.ogImage);
  setProperty("og:type", seo.ogType);

  setLink("canonical", seo.canonicalUrl);
  setMeta("robots", seo.robots);

  if (seo.schemaMarkup) {
    setSchema(seo.schemaMarkup);
  }
};

// ===== helper =====

const setMeta = (name: string, content: string | null) => {
  if (!content) return;

  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setProperty = (property: string, content: string | null) => {
  if (!content) return;

  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setLink = (rel: string, href: string | null) => {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const setSchema = (schema: string) => {
  let script = document.querySelector(
    `script[type="application/ld+json"]`
  );
  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = schema;
};
