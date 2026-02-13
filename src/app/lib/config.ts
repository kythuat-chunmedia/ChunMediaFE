// ============ SITE CONFIG ============
// Chỉ giữ lại config tĩnh không phụ thuộc API
// Toàn bộ thông tin dynamic (email, phone, social...) lấy từ ConfigSite API

export const siteConfig = {
  // Fallback values khi API chưa load
  name: "TemplateHub",
  description: "Kho giao diện website chuyên nghiệp — Hơn 50+ mẫu thiết kế sẵn sàng triển khai",
  url: "https://templatehub.vn",

  // Demo hosting
  demoBaseUrl: "/demos",

  // Navigation (anchor links — không cần dynamic)
  nav: [
    { label: "Trang chủ", href: "#hero" },
    { label: "Giao diện", href: "#templates" },
    { label: "Cấu trúc", href: "#structure" },
    { label: "Liên hệ", href: "#contact" },
  ],

  // Folder structure display
  folderStructure: `app/
├── favicon.ico
├── globals.css
├── layout.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx          ← Landing page (all-in-one)
└── portfolio/
    └── [slug]/
        └── page.tsx  ← Template detail`,
};
