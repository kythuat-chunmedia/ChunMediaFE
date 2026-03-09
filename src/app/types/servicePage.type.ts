// ============================================================
// app/types/service-page.ts — 14 sections (v4)
// ============================================================

// ── Shared primitives ─────────────────────────────────────────
export interface StatItem    { value: string; label: string; icon?: string; }
export interface ClientLogo  { name: string; logoUrl: string; }
export interface Award       { name: string; organization: string; year: string; logoUrl?: string; }
export interface TeamExpert  { name: string; role: string; avatarUrl?: string; experience?: string; specialties?: string[]; }

// ── 1. Hero ───────────────────────────────────────────────────
export interface ServiceHero {
  badge?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  heroImageUrl?: string;
  stats?: { value: string; label: string }[];
}

// ── 2. About Service ──────────────────────────────────────────
export interface ServiceAbout {
  sectionTitle?: string;
  sectionSubtitle?: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  stats?: StatItem[];
}

// ── 3. Highlights ─────────────────────────────────────────────
export interface ServiceHighlight {
  icon: string;
  title: string;
  description: string;
}

// ── 4. Pricing ────────────────────────────────────────────────
export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface ServicePricing {
  title?: string;
  subtitle?: string;
  packages: PricingPackage[];
}

// ── 5. About Company ──────────────────────────────────────────
export interface ServiceAboutCompany {
  sectionTitle?: string;
  sectionSubtitle?: string;
  content?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  stats?: StatItem[];
}

// ── 6. Client Stats + Logos ───────────────────────────────────
export interface ServiceClientStats {
  sectionTitle?: string;
  totalClients: string;
  description?: string;
  logos?: ClientLogo[];
}

// ── 7. Solutions ──────────────────────────────────────────────
export interface SolutionItem {
  icon?: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface ServiceSolutions {
  title?: string;
  subtitle?: string;
  items: SolutionItem[];
}

// ── 8. Projects ───────────────────────────────────────────────
export interface ProjectItem {
  title: string;
  client?: string;
  description?: string;
  thumbnailUrl?: string;
  resultText?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface ServiceProjects {
  sectionTitle?: string;
  sectionSubtitle?: string;
  items: ProjectItem[];
}

// ── 9. Testimonials ───────────────────────────────────────────
export interface TestimonialItem {
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorAvatarUrl?: string;
  content: string;
  rating: number;
}

export interface ServiceTestimonials {
  title?: string;
  subtitle?: string;
  items: TestimonialItem[];
}

// ── 10. Awards ────────────────────────────────────────────────
export interface ServiceAwardsSection {
  title?: string;
  subtitle?: string;
  items: Award[];
}

// ── 11. Process ───────────────────────────────────────────────
export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  icon?: string;
  duration?: string;
}

export interface ServiceProcess {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
}

// ── 12. Team ──────────────────────────────────────────────────
export interface ServiceTeam {
  title?: string;
  subtitle?: string;
  experts: TeamExpert[];
}

// ── 13. CTA ───────────────────────────────────────────────────
export interface ServiceCta {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaUrl: string;
  formEnabled?: boolean;
}

// ── 14. Q&A ───────────────────────────────────────────────────
export interface QnAItem {
  question: string;
  answer: string;
}

export interface ServiceQnA {
  title?: string;
  subtitle?: string;
  items: QnAItem[];
}

// ── ROOT ──────────────────────────────────────────────────────
export interface ServicePageData {
  id: number;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;

  hero?: ServiceHero;             // 1
  about?: ServiceAbout;           // 2
  highlights?: ServiceHighlight[]; // 3
  pricing?: ServicePricing;       // 4
  aboutCompany?: ServiceAboutCompany; // 5
  clientStats?: ServiceClientStats;   // 6
  solutions?: ServiceSolutions;   // 7
  projects?: ServiceProjects;     // 8
  testimonials?: ServiceTestimonials; // 9
  awards?: ServiceAwardsSection;  // 10
  process?: ServiceProcess;       // 11
  team?: ServiceTeam;             // 12
  ctaSection?: ServiceCta;        // 13
  qnA?: ServiceQnA;               // 14
}