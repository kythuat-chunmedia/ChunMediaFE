"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { CreateServiceRequest, UpdateServiceRequest } from "@/app/types";

// Extend Service type locally để có slug (BE trả về nhưng @/app/types chưa có)
interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  isActive: boolean;
  displayOrder: number;
  slug?: string;
  features: { id: number; content: string; displayOrder: number; isActive: boolean }[];
}
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { serviceApi, uploadApi } from "@/app/lib/api/index";
import { X, Plus, ChevronUp, ChevronDown, ImageIcon, Users, Trophy, Zap, Settings, LayoutTemplate, Loader2, BookOpen, Building2, Lightbulb, FolderOpen, MessageSquare, HelpCircle } from "lucide-react";
import IconPicker from "@/app/components/shared/IconPicker";
import DynamicIcon from "@/app/components/shared/DynamicIcon";
import type { ServicePageData } from "@/app/types";

// ============================================================
// TYPES — Form state (14 sections)
// ============================================================

interface ServiceFeatureFormData {
  id: number; content: string; displayOrder: number; isActive: boolean;
}

// 1. Hero
interface HeroStatForm { value: string; label: string; }
interface HeroForm {
  badge: string; title: string; highlightText: string; subtitle: string;
  ctaText: string; ctaUrl: string; ctaSecondaryText: string; ctaSecondaryUrl: string;
  heroImageUrl: string; stats: HeroStatForm[];
}

// 2. About
interface AboutStatForm { value: string; label: string; icon: string; }
interface AboutForm {
  sectionTitle: string; sectionSubtitle: string; content: string;
  imageUrl: string; videoUrl: string; ctaText: string; ctaUrl: string;
  stats: AboutStatForm[];
}

// 3. Highlights
interface HighlightForm { icon: string; title: string; description: string; displayOrder: number; isActive: boolean; }

// 4. Pricing
interface PricingPackageForm {
  name: string; price: string; priceNote: string; isPopular: boolean;
  ctaText: string; ctaUrl: string; displayOrder: number; features: string[]; isActive: boolean;
}
interface PricingForm { title: string; subtitle: string; packages: PricingPackageForm[]; }

// 5. AboutCompany
interface CompanyStatForm { value: string; label: string; icon: string; }
interface AboutCompanyForm {
  sectionTitle: string; sectionSubtitle: string; content: string;
  imageUrl: string; ctaText: string; ctaUrl: string; stats: CompanyStatForm[];
}

// 6. ClientStats
interface ClientStatsForm {
  sectionTitle: string; totalClients: string; description: string;
  logos: { name: string; logoUrl: string }[];
}

// 7. Solutions
interface SolutionItemForm { icon: string; title: string; description: string; imageUrl: string; ctaText: string; ctaUrl: string; displayOrder: number; isActive: boolean; }
interface SolutionsForm { title: string; subtitle: string; items: SolutionItemForm[]; }

// 8. Projects
interface ProjectItemForm { title: string; client: string; description: string; thumbnailUrl: string; resultText: string; ctaText: string; ctaUrl: string; displayOrder: number; isActive: boolean; }
interface ProjectsForm { sectionTitle: string; sectionSubtitle: string; items: ProjectItemForm[]; }

// 9. Testimonials
interface TestimonialItemForm { authorName: string; authorRole: string; authorCompany: string; authorAvatarUrl: string; content: string; rating: number; displayOrder: number; isActive: boolean; }
interface TestimonialsForm { title: string; subtitle: string; items: TestimonialItemForm[]; }

// 10. Awards
interface AwardItemForm { name: string; organization: string; year: string; logoUrl: string; displayOrder: number; isActive: boolean; }
interface AwardsForm { title: string; subtitle: string; items: AwardItemForm[]; }

// 11. Process
interface ProcessStepForm { stepNumber: number; title: string; description: string; icon: string; duration: string; displayOrder: number; isActive: boolean; }
interface ProcessForm { title: string; subtitle: string; steps: ProcessStepForm[]; }

// 12. Team
interface TeamForm { title: string; subtitle: string; memberTeamIds: number[]; }

// 13. CTA
interface CtaForm { title: string; subtitle: string; ctaText: string; ctaUrl: string; formEnabled: boolean; }

// 14. QnA
interface QnAItemForm { question: string; answer: string; displayOrder: number; isActive: boolean; }
interface QnAForm { title: string; subtitle: string; items: QnAItemForm[]; }

interface LandingPageForm {
  slug: string; metaTitle: string; metaDescription: string;
  hero: HeroForm;
  about: AboutForm;
  highlights: HighlightForm[];
  pricing: PricingForm;
  aboutCompany: AboutCompanyForm;
  clientStats: ClientStatsForm;
  solutions: SolutionsForm;
  projects: ProjectsForm;
  testimonials: TestimonialsForm;
  awards: AwardsForm;
  process: ProcessForm;
  team: TeamForm;
  ctaSection: CtaForm;
  qnA: QnAForm;
}

interface ServiceFormData {
  id?: number; title: string; description: string; icon: string;
  isActive: boolean; displayOrder: number; features: ServiceFeatureFormData[];
}

// ============================================================
// INITIAL STATES
// ============================================================

const initialFormData: ServiceFormData = {
  title: "", description: "", icon: "", isActive: true, displayOrder: 1, features: [],
};

const initialLandingPage: LandingPageForm = {
  slug: "", metaTitle: "", metaDescription: "",
  hero: { badge: "", title: "", highlightText: "", subtitle: "", ctaText: "", ctaUrl: "", ctaSecondaryText: "", ctaSecondaryUrl: "", heroImageUrl: "", stats: [] },
  about: { sectionTitle: "", sectionSubtitle: "", content: "", imageUrl: "", videoUrl: "", ctaText: "", ctaUrl: "", stats: [] },
  highlights: [],
  pricing: { title: "", subtitle: "", packages: [] },
  aboutCompany: { sectionTitle: "", sectionSubtitle: "", content: "", imageUrl: "", ctaText: "", ctaUrl: "", stats: [] },
  clientStats: { sectionTitle: "", totalClients: "", description: "", logos: [] },
  solutions: { title: "", subtitle: "", items: [] },
  projects: { sectionTitle: "", sectionSubtitle: "", items: [] },
  testimonials: { title: "", subtitle: "", items: [] },
  awards: { title: "", subtitle: "", items: [] },
  process: { title: "", subtitle: "", steps: [] },
  team: { title: "", subtitle: "", memberTeamIds: [] },
  ctaSection: { title: "", subtitle: "", ctaText: "", ctaUrl: "", formEnabled: true },
  qnA: { title: "", subtitle: "", items: [] },
};

// ============================================================
// MAP ServicePageData → LandingPageForm
// ============================================================
function mapPageDTOtoLanding(page: ServicePageData): LandingPageForm {
  const s = (v?: string | null) => v ?? "";
  const b = (v?: boolean | null, def = true) => v ?? def;
  const n = (v?: number | null, def = 0) => v ?? def;

  return {
    slug: s(page.slug),
    metaTitle: s(page.metaTitle),
    metaDescription: s(page.metaDescription),

    hero: page.hero ? {
      badge: s(page.hero.badge),
      title: s(page.hero.title),
      highlightText: s(page.hero.highlightText),
      subtitle: s(page.hero.subtitle),
      ctaText: s(page.hero.ctaText),
      ctaUrl: s(page.hero.ctaUrl),
      ctaSecondaryText: s(page.hero.ctaSecondaryText),
      ctaSecondaryUrl: s(page.hero.ctaSecondaryUrl),
      heroImageUrl: s(page.hero.heroImageUrl),
      stats: (page.hero.stats ?? []).map(st => ({ value: s(st.value), label: s(st.label) })),
    } : initialLandingPage.hero,

    about: page.about ? {
      sectionTitle: s(page.about.sectionTitle),
      sectionSubtitle: s(page.about.sectionSubtitle),
      content: s(page.about.content),
      imageUrl: s(page.about.imageUrl),
      videoUrl: s(page.about.videoUrl),
      ctaText: s(page.about.ctaText),
      ctaUrl: s(page.about.ctaUrl),
      stats: (page.about.stats ?? []).map(st => ({ value: s(st.value), label: s(st.label), icon: s(st.icon) })),
    } : initialLandingPage.about,

    highlights: (page.highlights ?? []).map((h, i) => ({
      icon: s(h.icon), title: s(h.title), description: s(h.description), displayOrder: i + 1, isActive: true,
    })),

    pricing: page.pricing ? {
      title: s(page.pricing.title),
      subtitle: s(page.pricing.subtitle),
      packages: (page.pricing.packages ?? []).map((p, i) => ({
        name: s(p.name), price: s(p.price), priceNote: s(p.priceNote),
        isPopular: p.isPopular ?? false, ctaText: s(p.ctaText), ctaUrl: s(p.ctaUrl),
        displayOrder: i + 1, features: Array.isArray(p.features) ? p.features.map(f => String(f ?? "")) : [], isActive: true,
      })),
    } : initialLandingPage.pricing,

    aboutCompany: page.aboutCompany ? {
      sectionTitle: s(page.aboutCompany.sectionTitle),
      sectionSubtitle: s(page.aboutCompany.sectionSubtitle),
      content: s(page.aboutCompany.content),
      imageUrl: s(page.aboutCompany.imageUrl),
      ctaText: s(page.aboutCompany.ctaText),
      ctaUrl: s(page.aboutCompany.ctaUrl),
      stats: (page.aboutCompany.stats ?? []).map(st => ({ value: s(st.value), label: s(st.label), icon: s(st.icon) })),
    } : initialLandingPage.aboutCompany,

    clientStats: page.clientStats ? {
      sectionTitle: s(page.clientStats.sectionTitle),
      totalClients: s(page.clientStats.totalClients),
      description: s(page.clientStats.description),
      logos: (page.clientStats.logos ?? []).map(l => ({ name: s(l.name), logoUrl: s(l.logoUrl) })),
    } : initialLandingPage.clientStats,

    solutions: page.solutions ? {
      title: s(page.solutions.title),
      subtitle: s(page.solutions.subtitle),
      items: (page.solutions.items ?? []).map((item, i) => ({
        icon: s(item.icon), title: s(item.title), description: s(item.description),
        imageUrl: s(item.imageUrl), ctaText: s(item.ctaText), ctaUrl: s(item.ctaUrl),
        displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.solutions,

    projects: page.projects ? {
      sectionTitle: s(page.projects.sectionTitle),
      sectionSubtitle: s(page.projects.sectionSubtitle),
      items: (page.projects.items ?? []).map((p, i) => ({
        title: s(p.title), client: s(p.client), description: s(p.description),
        thumbnailUrl: s(p.thumbnailUrl), resultText: s(p.resultText),
        ctaText: s(p.ctaText), ctaUrl: s(p.ctaUrl), displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.projects,

    testimonials: page.testimonials ? {
      title: s(page.testimonials.title),
      subtitle: s(page.testimonials.subtitle),
      items: (page.testimonials.items ?? []).map((t, i) => ({
        authorName: s(t.authorName), authorRole: s(t.authorRole),
        authorCompany: s(t.authorCompany), authorAvatarUrl: s(t.authorAvatarUrl),
        content: s(t.content), rating: n(t.rating, 5), displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.testimonials,

    awards: page.awards ? {
      title: s(page.awards.title),
      subtitle: s(page.awards.subtitle),
      items: (page.awards.items ?? []).map((a, i) => ({
        name: s(a.name), organization: s(a.organization), year: s(a.year),
        logoUrl: s(a.logoUrl), displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.awards,

    process: page.process ? {
      title: s(page.process.title),
      subtitle: s(page.process.subtitle),
      steps: (page.process.steps ?? []).map((st, i) => ({
        stepNumber: n(st.stepNumber, i + 1), title: s(st.title), description: s(st.description),
        icon: s(st.icon), duration: s(st.duration), displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.process,

    team: { title: s(page.team?.title), subtitle: s(page.team?.subtitle), memberTeamIds: [] },

    ctaSection: page.ctaSection ? {
      title: s(page.ctaSection.title), subtitle: s(page.ctaSection.subtitle),
      ctaText: s(page.ctaSection.ctaText), ctaUrl: s(page.ctaSection.ctaUrl),
      formEnabled: b(page.ctaSection.formEnabled),
    } : initialLandingPage.ctaSection,

    qnA: page.qnA ? {
      title: s(page.qnA.title),
      subtitle: s(page.qnA.subtitle),
      items: (page.qnA.items ?? []).map((q, i) => ({
        question: s(q.question), answer: s(q.answer), displayOrder: i + 1, isActive: true,
      })),
    } : initialLandingPage.qnA,
  };
}

// ============================================================
// IMAGE UPLOAD FIELD — dùng chung cho mọi section có ảnh
// ============================================================
interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  previewSize?: "sm" | "md" | "lg";
}

function ImageUploadField({ value, onChange, folder = "services", maxSizeMB = 2, previewSize = "md" }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const previewDim = previewSize === "sm" ? "w-14 h-10" : previewSize === "lg" ? "w-32 h-20" : "w-20 h-14";

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) { alert(`File quá lớn! Tối đa ${maxSizeMB}MB`); return; }
    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file, folder);
      if (response.success && response.url) { onChange(response.url as string); }
      else { alert(response.message || "Upload thất bại"); }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Không thể upload hình ảnh");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-500/10 dark:file:text-brand-400 ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        />
        {uploading ? (
          <p className="mt-1 text-xs text-brand-500 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" />Đang upload...</p>
        ) : value ? (
          <p className="mt-1 text-xs text-gray-400 truncate">{value}</p>
        ) : (
          <p className="mt-1 text-xs text-gray-400">JPG, PNG, WEBP · Tối đa {maxSizeMB}MB</p>
        )}
      </div>
      {value ? (
        <div className="relative flex-shrink-0">
          <img src={value} alt="preview" className={`${previewDim} object-cover rounded-lg border border-gray-200 dark:border-gray-700`} />
          <button type="button" onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white rounded-full flex items-center justify-center hover:bg-error-600">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className={`${previewDim} flex-shrink-0 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center`}>
          <ImageIcon className="w-5 h-5 text-gray-300" />
        </div>
      )}
    </div>
  );
}

// ============================================================
// SUB COMPONENTS
// ============================================================

function SectionCard({ title, icon, children, defaultOpen = true }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <span className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200">{icon}{title}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

function FieldRow({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div className={span === 2 ? "md:col-span-2" : span === 3 ? "md:col-span-3" : span === 4 ? "md:col-span-4" : ""}>
      <Label>{label}</Label>{children}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea rows={rows} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 text-sm text-gray-800 dark:text-white/90 bg-white dark:bg-gray-900 placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-3 focus:border-brand-300 focus:ring-brand-500/10" />
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-500/10 dark:text-brand-400 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors">
      <Plus className="w-3.5 h-3.5" />{label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="p-1.5 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 rounded-lg transition-colors">
      <X className="w-4 h-4" />
    </button>
  );
}

function ItemCard({ index, total, onMoveUp, onMoveDown, onRemove, children }: {
  index: number; total: number; onMoveUp: () => void; onMoveDown: () => void; onRemove: () => void; children: React.ReactNode;
}) {
  return (
    <div className="relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronUp className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronDown className="w-3.5 h-3.5" /></button>
          <span className="text-xs font-medium text-gray-500 ml-1">#{index + 1}</span>
        </div>
        <RemoveBtn onClick={onRemove} />
      </div>
      {children}
    </div>
  );
}

function StatRows({ stats, onAdd, onUpdate, onRemove, placeholder }: {
  stats: { value: string; label: string; icon?: string }[];
  onAdd: () => void;
  onUpdate: (i: number, f: string, v: string) => void;
  onRemove: (i: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Số liệu ({stats.length})</p>
        <AddBtn label="Thêm" onClick={onAdd} />
      </div>
      <div className="space-y-2">
        {stats.map((st, i) => (
          <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
            <Input type="text" placeholder="5.000+" value={st.value} onChange={e => onUpdate(i, "value", e.target.value)} />
            <Input type="text" placeholder={placeholder ?? "khách hàng"} value={st.label} onChange={e => onUpdate(i, "label", e.target.value)} />
            {st.icon !== undefined && <Input type="text" placeholder="Icon" value={st.icon} onChange={e => onUpdate(i, "icon", e.target.value)} />}
            <RemoveBtn onClick={() => onRemove(i)} />
          </div>
        ))}
        {stats.length === 0 && <p className="text-xs text-gray-400 text-center py-3">Chưa có số liệu nào</p>}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ServiceManagement() {
  const [activeTab, setActiveTab] = useState<"basic" | "landing">("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [landingData, setLandingData] = useState<LandingPageForm>(initialLandingPage);
  const [resolvedExperts, setResolvedExperts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setLoading(true); setServices(await serviceApi.getAll()); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const reloadServices = async () => {
    try { setServices(await serviceApi.getAll()); } catch (e) { console.error(e); }
  };

  const setLP = (fn: (prev: LandingPageForm) => LandingPageForm) => setLandingData(fn);
  const moveItem = <T,>(arr: T[], i: number, dir: "up" | "down"): T[] => {
    const a = [...arr]; const ni = dir === "up" ? i - 1 : i + 1;
    if (ni < 0 || ni >= a.length) return a;
    [a[i], a[ni]] = [a[ni], a[i]]; return a;
  };
  const removeItem = <T,>(arr: T[], i: number): T[] => arr.filter((_, idx) => idx !== i);

  const handleAddFeature = () => setFormData(p => ({ ...p, features: [...p.features, { id: 0, content: "", displayOrder: p.features.length + 1, isActive: true }] }));
  const handleRemoveFeature = (i: number) => {
    const nf = formData.features.filter((_, idx) => idx !== i);
    nf.forEach((f, idx) => { f.displayOrder = idx + 1; });
    setFormData(p => ({ ...p, features: nf }));
  };
  const handleFeatureChange = (i: number, field: string, value: any) =>
    setFormData(p => { const nf = [...p.features]; nf[i] = { ...nf[i], [field]: value }; return { ...p, features: nf }; });
  const moveFeature = (i: number, dir: "up" | "down") => {
    const nf = moveItem(formData.features, i, dir);
    nf.forEach((f, idx) => { f.displayOrder = idx + 1; });
    setFormData(p => ({ ...p, features: nf }));
  };

  const statHelpers = <K extends keyof LandingPageForm>(key: K, statsKey: string) => ({
    add: (empty: any) => setLP(p => ({ ...p, [key]: { ...(p[key] as any), [statsKey]: [...(p[key] as any)[statsKey], empty] } })),
    update: (i: number, f: string, v: string) => setLP(p => {
      const arr = [...(p[key] as any)[statsKey]]; arr[i] = { ...arr[i], [f]: v };
      return { ...p, [key]: { ...(p[key] as any), [statsKey]: arr } };
    }),
    remove: (i: number) => setLP(p => ({ ...p, [key]: { ...(p[key] as any), [statsKey]: removeItem((p[key] as any)[statsKey], i) } })),
  });

  const heroStats = statHelpers("hero", "stats");
  const aboutStats = statHelpers("about", "stats");
  const companyStats = statHelpers("aboutCompany", "stats");

  const addHighlight = () => setLP(p => ({ ...p, highlights: [...p.highlights, { icon: "", title: "", description: "", displayOrder: p.highlights.length + 1, isActive: true }] }));
  const updateHighlight = (i: number, f: keyof HighlightForm, v: any) =>
    setLP(p => { const a = [...p.highlights]; a[i] = { ...a[i], [f]: v }; return { ...p, highlights: a }; });

  const addPackage = () => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: [...p.pricing.packages, { name: "", price: "", priceNote: "", isPopular: false, ctaText: "", ctaUrl: "", displayOrder: p.pricing.packages.length + 1, features: [], isActive: true }] } }));
  const updatePackage = (i: number, f: keyof PricingPackageForm, v: any) =>
    setLP(p => { const a = [...p.pricing.packages]; a[i] = { ...a[i], [f]: v }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const addPkgFeature = (pi: number) => setLP(p => { const a = [...p.pricing.packages]; a[pi] = { ...a[pi], features: [...a[pi].features, ""] }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const updatePkgFeature = (pi: number, fi: number, v: string) => setLP(p => { const a = [...p.pricing.packages]; const f = [...a[pi].features]; f[fi] = v; a[pi] = { ...a[pi], features: f }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const removePkgFeature = (pi: number, fi: number) => setLP(p => { const a = [...p.pricing.packages]; a[pi] = { ...a[pi], features: removeItem(a[pi].features, fi) }; return { ...p, pricing: { ...p.pricing, packages: a } }; });

  const addLogo = () => setLP(p => ({ ...p, clientStats: { ...p.clientStats, logos: [...p.clientStats.logos, { name: "", logoUrl: "" }] } }));
  const updateLogo = (i: number, f: "name" | "logoUrl", v: string) =>
    setLP(p => { const a = [...p.clientStats.logos]; a[i] = { ...a[i], [f]: v }; return { ...p, clientStats: { ...p.clientStats, logos: a } }; });

  const addSolution = () => setLP(p => ({ ...p, solutions: { ...p.solutions, items: [...p.solutions.items, { icon: "", title: "", description: "", imageUrl: "", ctaText: "", ctaUrl: "", displayOrder: p.solutions.items.length + 1, isActive: true }] } }));
  const updateSolution = (i: number, f: keyof SolutionItemForm, v: any) =>
    setLP(p => { const a = [...p.solutions.items]; a[i] = { ...a[i], [f]: v }; return { ...p, solutions: { ...p.solutions, items: a } }; });

  const addProject = () => setLP(p => ({ ...p, projects: { ...p.projects, items: [...p.projects.items, { title: "", client: "", description: "", thumbnailUrl: "", resultText: "", ctaText: "", ctaUrl: "", displayOrder: p.projects.items.length + 1, isActive: true }] } }));
  const updateProject = (i: number, f: keyof ProjectItemForm, v: any) =>
    setLP(p => { const a = [...p.projects.items]; a[i] = { ...a[i], [f]: v }; return { ...p, projects: { ...p.projects, items: a } }; });

  const addTestimonial = () => setLP(p => ({ ...p, testimonials: { ...p.testimonials, items: [...p.testimonials.items, { authorName: "", authorRole: "", authorCompany: "", authorAvatarUrl: "", content: "", rating: 5, displayOrder: p.testimonials.items.length + 1, isActive: true }] } }));
  const updateTestimonial = (i: number, f: keyof TestimonialItemForm, v: any) =>
    setLP(p => { const a = [...p.testimonials.items]; a[i] = { ...a[i], [f]: v }; return { ...p, testimonials: { ...p.testimonials, items: a } }; });

  const addAward = () => setLP(p => ({ ...p, awards: { ...p.awards, items: [...p.awards.items, { name: "", organization: "", year: "", logoUrl: "", displayOrder: p.awards.items.length + 1, isActive: true }] } }));
  const updateAward = (i: number, f: keyof AwardItemForm, v: any) =>
    setLP(p => { const a = [...p.awards.items]; a[i] = { ...a[i], [f]: v }; return { ...p, awards: { ...p.awards, items: a } }; });

  const addStep = () => setLP(p => ({ ...p, process: { ...p.process, steps: [...p.process.steps, { stepNumber: p.process.steps.length + 1, title: "", description: "", icon: "", duration: "", displayOrder: p.process.steps.length + 1, isActive: true }] } }));
  const updateStep = (i: number, f: keyof ProcessStepForm, v: any) =>
    setLP(p => { const a = [...p.process.steps]; a[i] = { ...a[i], [f]: v }; return { ...p, process: { ...p.process, steps: a } }; });

  const addTeamMember = () => setLP(p => ({ ...p, team: { ...p.team, memberTeamIds: [...p.team.memberTeamIds, 0] } }));
  const updateTeamMember = (i: number, v: number) =>
    setLP(p => { const a = [...p.team.memberTeamIds]; a[i] = v; return { ...p, team: { ...p.team, memberTeamIds: a } }; });
  const removeTeamMember = (i: number) => setLP(p => ({ ...p, team: { ...p.team, memberTeamIds: removeItem(p.team.memberTeamIds, i) } }));

  const addQnA = () => setLP(p => ({ ...p, qnA: { ...p.qnA, items: [...p.qnA.items, { question: "", answer: "", displayOrder: p.qnA.items.length + 1, isActive: true }] } }));
  const updateQnA = (i: number, f: keyof QnAItemForm, v: any) =>
    setLP(p => { const a = [...p.qnA.items]; a[i] = { ...a[i], [f]: v }; return { ...p, qnA: { ...p.qnA, items: a } }; });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let nv: string | number | boolean = value;
    if (type === "checkbox") nv = (e.target as HTMLInputElement).checked;
    else if (type === "number") nv = parseInt(value) || 0;
    setFormData(p => ({ ...p, [name]: nv }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = (): boolean => {
    const ne: Record<string, string> = {};
    if (!formData.title.trim()) ne.title = "Vui lòng nhập tiêu đề";
    if (!formData.description.trim()) ne.description = "Vui lòng nhập mô tả";
    if (formData.displayOrder <= 0) ne.displayOrder = "Thứ tự phải lớn hơn 0";
    formData.features.forEach((f, i) => { if (!f.content.trim()) ne[`feature_${i}`] = "Nội dung không được trống"; });
    setErrors(ne);
    return Object.keys(ne).length === 0;
  };

  const handleSelectRow = async (service: Service) => {
    setSelectedId(service.id); setIsEditing(true); setErrors({}); setResolvedExperts([]);
    setFormData({ id: service.id, title: service.title, description: service.description, icon: service.icon || "", isActive: service.isActive, displayOrder: service.displayOrder, features: service.features.map(f => ({ id: f.id, content: f.content, displayOrder: f.displayOrder, isActive: f.isActive })) });
    const slug = service.slug;
    if (slug) {
      try {
        setLoadingPage(true);
        const pageData = await serviceApi.getBySlug(slug);
        if (pageData) {
          setLandingData(mapPageDTOtoLanding(pageData as ServicePageData));
          setResolvedExperts(pageData.team?.experts ?? []);
        }
      } catch (e) { console.error("Không load được landing page:", e); setLandingData(initialLandingPage); }
      finally { setLoadingPage(false); }
    } else { setLandingData(initialLandingPage); }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedId(null); setIsEditing(false); setFormData(initialFormData);
    setLandingData(initialLandingPage); setResolvedExperts([]); setErrors({}); setActiveTab("basic");
  };

  const buildLandingPayload = () => {
    const lp = landingData;
    return {
      slug: lp.slug || undefined,
      metaTitle: lp.metaTitle || undefined,
      metaDescription: lp.metaDescription || undefined,
      hero: lp.hero.title ? {
        badge: lp.hero.badge || undefined, title: lp.hero.title,
        highlightText: lp.hero.highlightText || undefined, subtitle: lp.hero.subtitle || undefined,
        ctaText: lp.hero.ctaText || undefined, ctaUrl: lp.hero.ctaUrl || undefined,
        ctaSecondaryText: lp.hero.ctaSecondaryText || undefined, ctaSecondaryUrl: lp.hero.ctaSecondaryUrl || undefined,
        heroImageUrl: lp.hero.heroImageUrl || undefined,
        stats: lp.hero.stats.map((s, i) => ({ value: s.value, label: s.label, displayOrder: i })),
      } : undefined,
      about: lp.about.content ? {
        sectionTitle: lp.about.sectionTitle || undefined, sectionSubtitle: lp.about.sectionSubtitle || undefined,
        content: lp.about.content, imageUrl: lp.about.imageUrl || undefined,
        videoUrl: lp.about.videoUrl || undefined, ctaText: lp.about.ctaText || undefined, ctaUrl: lp.about.ctaUrl || undefined,
        stats: lp.about.stats.map((s, i) => ({ value: s.value, label: s.label, icon: s.icon || undefined, displayOrder: i })),
      } : undefined,
      highlights: lp.highlights.length > 0 ? lp.highlights.map((h, i) => ({ icon: h.icon, title: h.title, description: h.description, displayOrder: h.displayOrder ?? i, isActive: h.isActive })) : undefined,
      pricing: lp.pricing.packages.length > 0 ? {
        title: lp.pricing.title || undefined, subtitle: lp.pricing.subtitle || undefined,
        packages: lp.pricing.packages.map((p, i) => ({ name: p.name, price: p.price, priceNote: p.priceNote || undefined, isPopular: p.isPopular, ctaText: p.ctaText || undefined, ctaUrl: p.ctaUrl || undefined, displayOrder: p.displayOrder ?? i, isActive: p.isActive, features: p.features.filter(f => f.trim()) })),
      } : undefined,
      aboutCompany: (lp.aboutCompany.content || lp.aboutCompany.sectionTitle) ? {
        sectionTitle: lp.aboutCompany.sectionTitle || undefined, sectionSubtitle: lp.aboutCompany.sectionSubtitle || undefined,
        content: lp.aboutCompany.content || undefined, imageUrl: lp.aboutCompany.imageUrl || undefined,
        ctaText: lp.aboutCompany.ctaText || undefined, ctaUrl: lp.aboutCompany.ctaUrl || undefined,
        stats: lp.aboutCompany.stats.map((s, i) => ({ value: s.value, label: s.label, icon: s.icon || undefined, displayOrder: i })),
      } : undefined,
      clientStats: lp.clientStats.totalClients ? {
        sectionTitle: lp.clientStats.sectionTitle || undefined, totalClients: lp.clientStats.totalClients,
        description: lp.clientStats.description || undefined,
        logos: lp.clientStats.logos.map((l, i) => ({ name: l.name, logoUrl: l.logoUrl, displayOrder: i })),
      } : undefined,
      solutions: lp.solutions.items.length > 0 ? {
        title: lp.solutions.title || undefined, subtitle: lp.solutions.subtitle || undefined,
        items: lp.solutions.items.map((item, i) => ({ icon: item.icon || undefined, title: item.title, description: item.description, imageUrl: item.imageUrl || undefined, ctaText: item.ctaText || undefined, ctaUrl: item.ctaUrl || undefined, displayOrder: item.displayOrder ?? i, isActive: true })),
      } : undefined,
      projects: lp.projects.items.length > 0 ? {
        sectionTitle: lp.projects.sectionTitle || undefined, sectionSubtitle: lp.projects.sectionSubtitle || undefined,
        items: lp.projects.items.map((p, i) => ({ title: p.title, client: p.client || undefined, description: p.description || undefined, thumbnailUrl: p.thumbnailUrl || undefined, resultText: p.resultText || undefined, ctaText: p.ctaText || undefined, ctaUrl: p.ctaUrl || undefined, displayOrder: p.displayOrder ?? i, isActive: true })),
      } : undefined,
      testimonials: lp.testimonials.items.length > 0 ? {
        title: lp.testimonials.title || undefined, subtitle: lp.testimonials.subtitle || undefined,
        items: lp.testimonials.items.map((t, i) => ({ authorName: t.authorName, authorRole: t.authorRole || undefined, authorCompany: t.authorCompany || undefined, authorAvatarUrl: t.authorAvatarUrl || undefined, content: t.content, rating: t.rating, displayOrder: t.displayOrder ?? i, isActive: true })),
      } : undefined,
      awards: lp.awards.items.length > 0 ? {
        title: lp.awards.title || undefined, subtitle: lp.awards.subtitle || undefined,
        items: lp.awards.items.map((a, i) => ({ name: a.name, organization: a.organization, year: a.year, logoUrl: a.logoUrl || undefined, displayOrder: a.displayOrder ?? i, isActive: true })),
      } : undefined,
      process: lp.process.steps.length > 0 ? {
        title: lp.process.title || undefined, subtitle: lp.process.subtitle || undefined,
        steps: lp.process.steps.map((s, i) => ({ stepNumber: s.stepNumber, title: s.title, description: s.description, icon: s.icon || undefined, duration: s.duration || undefined, displayOrder: s.displayOrder ?? i, isActive: true })),
      } : undefined,
      team: lp.team.memberTeamIds.length > 0 ? {
        title: lp.team.title || undefined, subtitle: lp.team.subtitle || undefined,
        members: lp.team.memberTeamIds.map((id, idx) => ({ memberTeamId: id, displayOrder: idx + 1 })),
      } : undefined,
      ctaSection: lp.ctaSection.title ? { title: lp.ctaSection.title, subtitle: lp.ctaSection.subtitle || undefined, ctaText: lp.ctaSection.ctaText, ctaUrl: lp.ctaSection.ctaUrl, formEnabled: lp.ctaSection.formEnabled } : undefined,
      qnA: lp.qnA.items.length > 0 ? {
        title: lp.qnA.title || undefined, subtitle: lp.qnA.subtitle || undefined,
        items: lp.qnA.items.map((q, i) => ({ question: q.question, answer: q.answer, displayOrder: q.displayOrder ?? i, isActive: q.isActive })),
      } : undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const landingPayload = buildLandingPayload();
      if (isEditing && selectedId) {
        await serviceApi.update({ id: selectedId, title: formData.title, description: formData.description, icon: formData.icon || undefined, isActive: formData.isActive, displayOrder: formData.displayOrder, features: formData.features, ...landingPayload } as UpdateServiceRequest);
      } else {
        await serviceApi.create({ title: formData.title, description: formData.description, icon: formData.icon || undefined, isActive: formData.isActive, displayOrder: formData.displayOrder, features: formData.features.map(({ content, displayOrder, isActive }) => ({ content, displayOrder, isActive })), ...landingPayload } as CreateServiceRequest);
      }
      await reloadServices(); handleReset();
      alert(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra khi lưu!");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    const service = services.find(s => s.id === id);
    if (!window.confirm(`Xóa service${service?.features.length ? ` và ${service.features.length} tính năng` : ""}?`)) return;
    try { setLoading(true); await serviceApi.delete(id); await reloadServices(); if (selectedId === id) handleReset(); alert("Xóa thành công!"); }
    catch (e) { alert("Có lỗi xảy ra!"); } finally { setLoading(false); }
  };

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lp = landingData;
  const lpSet = <K extends keyof LandingPageForm>(key: K, patch: Partial<LandingPageForm[K]>) =>
    setLP(p => ({ ...p, [key]: { ...(p[key] as any), ...patch } }));

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{isEditing ? "✏️ Cập nhật Service" : "➕ Thêm Service mới"}</h3>
          <p className="text-sm text-gray-500 mt-1">{isEditing ? `Đang chỉnh sửa: ${formData.title}` : "Điền thông tin để thêm service mới"}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-5">
          {([
            { key: "basic", label: "Thông tin cơ bản", icon: <Settings className="w-4 h-4" /> },
            { key: "landing", label: "Landing Page", icon: <LayoutTemplate className="w-4 h-4" />, loading: loadingPage },
          ] as const).map(tab => (
            <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? "border-brand-500 text-brand-600 dark:text-brand-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}>
              {tab.icon}{tab.label}
              {"loading" in tab && tab.loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500 ml-1" />}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* ── TAB 1: BASIC ──────────────────────────────────── */}
          {activeTab === "basic" && (
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2"><Label>Tiêu đề <span className="text-error-500">*</span></Label>
                  <Input name="title" type="text" placeholder="Nhập tiêu đề service" value={formData.title} onChange={handleChange} error={!!errors.title} hint={errors.title || ""} /></div>
                <div><Label>Icon</Label>
                  <IconPicker value={formData.icon} onChange={v => setFormData(p => ({ ...p, icon: v }))} placeholder="Chọn icon..." /></div>
                <div className="lg:col-span-3"><Label>Mô tả <span className="text-error-500">*</span></Label>
                  <textarea name="description" rows={3} placeholder="Nhập mô tả..." value={formData.description} onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm dark:bg-gray-900 dark:text-white/90 ${errors.description ? "border-error-500" : "border-gray-300 dark:border-gray-700"} focus:outline-none focus:ring-3 focus:border-brand-300`} />
                  {errors.description && <p className="mt-1 text-xs text-error-500">{errors.description}</p>}</div>
                <div><Label>Thứ tự</Label><Input name="displayOrder" type="number" min="1" value={formData.displayOrder} onChange={handleChange} error={!!errors.displayOrder} hint={errors.displayOrder} /></div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị service</span>
                  </label>
                </div>
                {formData.icon && <div className="flex items-center gap-3 pt-6">
                  <span className="text-sm text-gray-500">Preview:</span>
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center dark:bg-brand-500/10">
                    <DynamicIcon name={formData.icon} className="w-6 h-6 text-brand-600 dark:text-brand-400" /></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{formData.icon}</span></div>}
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div><h4 className="text-base font-semibold text-gray-800 dark:text-white/90">🎯 Tính năng ({formData.features.length})</h4></div>
                  <button type="button" onClick={handleAddFeature} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                    <Plus className="w-4 h-4" />Thêm tính năng</button>
                </div>
                <div className="space-y-3">
                  {formData.features.map((f, i) => (
                    <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-2 mb-3">
                        <button type="button" onClick={() => moveFeature(i, "up")} disabled={i === 0} className="p-1 text-gray-400 disabled:opacity-30">▲</button>
                        <button type="button" onClick={() => moveFeature(i, "down")} disabled={i === formData.features.length - 1} className="p-1 text-gray-400 disabled:opacity-30">▼</button>
                        <span className="text-sm font-medium text-gray-600">#{i + 1}</span>
                        {f.id > 0 ? <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">ID: {f.id}</span> : <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Mới</span>}
                        <RemoveBtn onClick={() => handleRemoveFeature(i)} />
                      </div>
                      <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-8"><Input type="text" placeholder="Nội dung tính năng..." value={f.content} onChange={e => handleFeatureChange(i, "content", e.target.value)} error={!!errors[`feature_${i}`]} hint={errors[`feature_${i}`]} /></div>
                        <div className="md:col-span-2"><Input type="number" min="1" value={f.displayOrder} onChange={e => handleFeatureChange(i, "displayOrder", parseInt(e.target.value) || 1)} /></div>
                        <div className="md:col-span-2 flex items-end pb-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={f.isActive} onChange={e => handleFeatureChange(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Hiện</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  {formData.features.length === 0 && <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-gray-500">Chưa có tính năng nào</p></div>}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: LANDING PAGE ─────────────────────────── */}
          {activeTab === "landing" && (
            <div className="p-5 space-y-4">
              {loadingPage && (
                <div className="flex items-center gap-3 px-4 py-3 bg-brand-50 dark:bg-brand-500/10 rounded-xl border border-brand-200 dark:border-brand-500/20">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                  <p className="text-sm text-brand-700 dark:text-brand-300">Đang tải dữ liệu landing page...</p>
                </div>
              )}

              {/* SEO */}
              <SectionCard title="SEO & Slug" icon={<Settings className="w-4 h-4 text-gray-400" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Slug (URL)"><Input type="text" placeholder="seo-marketing..." value={lp.slug} onChange={e => setLP(p => ({ ...p, slug: e.target.value }))} /><p className="mt-1 text-xs text-gray-400">dich-vu/<strong>{lp.slug || "..."}</strong></p></FieldRow>
                  <FieldRow label="Meta Title"><Input type="text" placeholder="Tiêu đề SEO" value={lp.metaTitle} onChange={e => setLP(p => ({ ...p, metaTitle: e.target.value }))} /></FieldRow>
                  <FieldRow label="Meta Description" span={2}><TextArea value={lp.metaDescription} onChange={v => setLP(p => ({ ...p, metaDescription: v }))} placeholder="Mô tả SEO (150-160 ký tự)" rows={2} /></FieldRow>
                </div>
              </SectionCard>

              {/* 1. Hero */}
              <SectionCard title="1. Hero Section" icon={<ImageIcon className="w-4 h-4 text-brand-500" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Badge"><Input type="text" placeholder="🏆 Dịch vụ hàng đầu" value={lp.hero.badge} onChange={e => lpSet("hero", { badge: e.target.value })} /></FieldRow>
                  <FieldRow label="Title *"><Input type="text" placeholder="Tiêu đề chính" value={lp.hero.title} onChange={e => lpSet("hero", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Highlight Text"><Input type="text" placeholder="Từ được highlight" value={lp.hero.highlightText} onChange={e => lpSet("hero", { highlightText: e.target.value })} /></FieldRow>
                  {/* ── Hero Image Upload ── */}
                  <FieldRow label="Hero Image">
                    <ImageUploadField
                      value={lp.hero.heroImageUrl}
                      onChange={v => lpSet("hero", { heroImageUrl: v })}
                      folder="services/hero"
                      previewSize="lg"
                    />
                  </FieldRow>
                  <FieldRow label="Subtitle" span={2}><TextArea value={lp.hero.subtitle} onChange={v => lpSet("hero", { subtitle: v })} placeholder="Mô tả ngắn dưới tiêu đề..." rows={2} /></FieldRow>
                  <FieldRow label="CTA Primary Text"><Input type="text" placeholder="Bắt đầu ngay" value={lp.hero.ctaText} onChange={e => lpSet("hero", { ctaText: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA Primary URL"><Input type="text" placeholder="/lien-he" value={lp.hero.ctaUrl} onChange={e => lpSet("hero", { ctaUrl: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA Secondary Text"><Input type="text" placeholder="Xem thêm" value={lp.hero.ctaSecondaryText} onChange={e => lpSet("hero", { ctaSecondaryText: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA Secondary URL"><Input type="text" placeholder="/portfolio" value={lp.hero.ctaSecondaryUrl} onChange={e => lpSet("hero", { ctaSecondaryUrl: e.target.value })} /></FieldRow>
                </div>
                <StatRows stats={lp.hero.stats} onAdd={() => heroStats.add({ value: "", label: "" })} onUpdate={(i, f, v) => heroStats.update(i, f, v)} onRemove={i => heroStats.remove(i)} placeholder="nhãn" />
              </SectionCard>

              {/* 2. About Service */}
              <SectionCard title="2. About Service — Giới thiệu dịch vụ" icon={<BookOpen className="w-4 h-4 text-indigo-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Về dịch vụ của chúng tôi" value={lp.about.sectionTitle} onChange={e => lpSet("about", { sectionTitle: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle section"><Input type="text" placeholder="Phụ đề" value={lp.about.sectionSubtitle} onChange={e => lpSet("about", { sectionSubtitle: e.target.value })} /></FieldRow>
                  {/* ── About Image Upload ── */}
                  <FieldRow label="Image" span={2}>
                    <ImageUploadField
                      value={lp.about.imageUrl}
                      onChange={v => lpSet("about", { imageUrl: v })}
                      folder="services/about"
                      previewSize="lg"
                    />
                  </FieldRow>
                  <FieldRow label="Video URL"><Input type="text" placeholder="https://youtube.com/..." value={lp.about.videoUrl} onChange={e => lpSet("about", { videoUrl: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA Text"><Input type="text" placeholder="Tìm hiểu thêm" value={lp.about.ctaText} onChange={e => lpSet("about", { ctaText: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA URL"><Input type="text" placeholder="/ve-chung-toi" value={lp.about.ctaUrl} onChange={e => lpSet("about", { ctaUrl: e.target.value })} /></FieldRow>
                  <FieldRow label="Nội dung (Rich text / Markdown)" span={2}><TextArea value={lp.about.content} onChange={v => lpSet("about", { content: v })} placeholder="Mô tả chi tiết về dịch vụ..." rows={5} /></FieldRow>
                </div>
                <StatRows stats={lp.about.stats} onAdd={() => aboutStats.add({ value: "", label: "", icon: "" })} onUpdate={(i, f, v) => aboutStats.update(i, f, v)} onRemove={i => aboutStats.remove(i)} placeholder="Năm kinh nghiệm" />
              </SectionCard>

              {/* 3. Highlights */}
              <SectionCard title="3. Highlights — Điểm nổi bật" icon={<Zap className="w-4 h-4 text-yellow-500" />} defaultOpen={false}>
                <div className="flex justify-end mb-2"><AddBtn label="Thêm highlight" onClick={addHighlight} /></div>
                <div className="space-y-3">
                  {lp.highlights.map((h, i) => (
                    <ItemCard key={i} index={i} total={lp.highlights.length} onMoveUp={() => setLP(p => ({ ...p, highlights: moveItem(p.highlights, i, "up") }))} onMoveDown={() => setLP(p => ({ ...p, highlights: moveItem(p.highlights, i, "down") }))} onRemove={() => setLP(p => ({ ...p, highlights: removeItem(p.highlights, i) }))}>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div><Label>Icon (Lucide)</Label><Input type="text" placeholder="Star, Zap..." value={h.icon} onChange={e => updateHighlight(i, "icon", e.target.value)} /></div>
                        <div><Label>Tiêu đề</Label><Input type="text" placeholder="Chuyên nghiệp" value={h.title} onChange={e => updateHighlight(i, "title", e.target.value)} /></div>
                        <div><Label>Thứ tự</Label><Input type="number" min="1" value={h.displayOrder} onChange={e => updateHighlight(i, "displayOrder", parseInt(e.target.value) || i + 1)} /></div>
                        <div className="md:col-span-3"><Label>Mô tả</Label><Input type="text" placeholder="Mô tả điểm nổi bật..." value={h.description} onChange={e => updateHighlight(i, "description", e.target.value)} /></div>
                        <div className="flex items-center gap-2"><input type="checkbox" checked={h.isActive} onChange={e => updateHighlight(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </div>
                    </ItemCard>
                  ))}
                  {lp.highlights.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có highlight nào</p></div>}
                </div>
              </SectionCard>

              {/* 4. Pricing */}
              <SectionCard title="4. Pricing — Bảng giá" icon={<span className="text-sm">💎</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Gói dịch vụ" value={lp.pricing.title} onChange={e => lpSet("pricing", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Chọn gói phù hợp..." value={lp.pricing.subtitle} onChange={e => lpSet("pricing", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Gói ({lp.pricing.packages.length})</p><AddBtn label="Thêm gói" onClick={addPackage} /></div>
                  <div className="space-y-4">
                    {lp.pricing.packages.map((pkg, pi) => (
                      <ItemCard key={pi} index={pi} total={lp.pricing.packages.length} onMoveUp={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: moveItem(p.pricing.packages, pi, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: moveItem(p.pricing.packages, pi, "down") } }))} onRemove={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: removeItem(p.pricing.packages, pi) } }))}>
                        <div className="grid md:grid-cols-3 gap-3">
                          <FieldRow label="Tên gói *"><Input type="text" placeholder="Basic, Pro..." value={pkg.name} onChange={e => updatePackage(pi, "name", e.target.value)} /></FieldRow>
                          <FieldRow label="Giá *"><Input type="text" placeholder="8.000.000" value={pkg.price} onChange={e => updatePackage(pi, "price", e.target.value)} /></FieldRow>
                          <FieldRow label="Ghi chú giá"><Input type="text" placeholder="đ/tháng" value={pkg.priceNote} onChange={e => updatePackage(pi, "priceNote", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA Text"><Input type="text" placeholder="Đăng ký ngay" value={pkg.ctaText} onChange={e => updatePackage(pi, "ctaText", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA URL"><Input type="text" placeholder="/lien-he" value={pkg.ctaUrl} onChange={e => updatePackage(pi, "ctaUrl", e.target.value)} /></FieldRow>
                          <div className="flex items-end pb-2"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pkg.isPopular} onChange={e => updatePackage(pi, "isPopular", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm">⭐ Phổ biến</span></label></div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-2"><p className="text-xs font-medium text-gray-500">Tính năng ({pkg.features.length})</p><AddBtn label="Thêm" onClick={() => addPkgFeature(pi)} /></div>
                          <div className="space-y-2">
                            {pkg.features.map((f, fi) => (
                              <div key={fi} className="flex items-center gap-2"><Input type="text" placeholder="Tính năng..." value={f} onChange={e => updatePkgFeature(pi, fi, e.target.value)} /><RemoveBtn onClick={() => removePkgFeature(pi, fi)} /></div>
                            ))}
                            {pkg.features.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Chưa có tính năng</p>}
                          </div>
                        </div>
                      </ItemCard>
                    ))}
                    {lp.pricing.packages.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có gói nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 5. About Company */}
              <SectionCard title="5. About Company — Về công ty" icon={<Building2 className="w-4 h-4 text-blue-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Về chúng tôi" value={lp.aboutCompany.sectionTitle} onChange={e => lpSet("aboutCompany", { sectionTitle: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Phụ đề" value={lp.aboutCompany.sectionSubtitle} onChange={e => lpSet("aboutCompany", { sectionSubtitle: e.target.value })} /></FieldRow>
                  {/* ── About Company Image Upload ── */}
                  <FieldRow label="Image" span={2}>
                    <ImageUploadField
                      value={lp.aboutCompany.imageUrl}
                      onChange={v => lpSet("aboutCompany", { imageUrl: v })}
                      folder="services/company"
                      previewSize="lg"
                    />
                  </FieldRow>
                  <FieldRow label="CTA Text"><Input type="text" placeholder="Tìm hiểu thêm" value={lp.aboutCompany.ctaText} onChange={e => lpSet("aboutCompany", { ctaText: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA URL"><Input type="text" placeholder="/ve-chung-toi" value={lp.aboutCompany.ctaUrl} onChange={e => lpSet("aboutCompany", { ctaUrl: e.target.value })} /></FieldRow>
                  <FieldRow label="Nội dung" span={2}><TextArea value={lp.aboutCompany.content} onChange={v => lpSet("aboutCompany", { content: v })} placeholder="Giới thiệu về công ty trong ngữ cảnh dịch vụ này..." rows={4} /></FieldRow>
                </div>
                <StatRows stats={lp.aboutCompany.stats} onAdd={() => companyStats.add({ value: "", label: "", icon: "" })} onUpdate={(i, f, v) => companyStats.update(i, f, v)} onRemove={i => companyStats.remove(i)} placeholder="Khách hàng" />
              </SectionCard>

              {/* 6. Client Stats */}
              <SectionCard title="6. Client Logos — Khách hàng tiêu biểu" icon={<Users className="w-4 h-4 text-blue-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Khách hàng tin tưởng" value={lp.clientStats.sectionTitle} onChange={e => lpSet("clientStats", { sectionTitle: e.target.value })} /></FieldRow>
                  <FieldRow label="Tổng số KH"><Input type="text" placeholder="5.000+" value={lp.clientStats.totalClients} onChange={e => lpSet("clientStats", { totalClients: e.target.value })} /></FieldRow>
                  <FieldRow label="Mô tả phụ" span={2}><Input type="text" placeholder="doanh nghiệp đã tin tưởng" value={lp.clientStats.description} onChange={e => lpSet("clientStats", { description: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Logo ({lp.clientStats.logos.length})</p><AddBtn label="Thêm logo" onClick={addLogo} /></div>
                  <div className="space-y-3">
                    {lp.clientStats.logos.map((logo, i) => (
                      <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input type="text" placeholder="Tên công ty" value={logo.name} onChange={e => updateLogo(i, "name", e.target.value)} />
                          <RemoveBtn onClick={() => setLP(p => ({ ...p, clientStats: { ...p.clientStats, logos: removeItem(p.clientStats.logos, i) } }))} />
                        </div>
                        {/* ── Logo Image Upload ── */}
                        <ImageUploadField
                          value={logo.logoUrl}
                          onChange={v => updateLogo(i, "logoUrl", v)}
                          folder="logos"
                          previewSize="sm"
                          maxSizeMB={1}
                        />
                      </div>
                    ))}
                    {lp.clientStats.logos.length === 0 && <p className="text-xs text-gray-400 text-center py-3">Chưa có logo nào</p>}
                  </div>
                </div>
              </SectionCard>

              {/* 7. Solutions */}
              <SectionCard title="7. Solutions — Giải pháp" icon={<Lightbulb className="w-4 h-4 text-orange-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề"><Input type="text" placeholder="Giải pháp toàn diện" value={lp.solutions.title} onChange={e => lpSet("solutions", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Phụ đề" value={lp.solutions.subtitle} onChange={e => lpSet("solutions", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Giải pháp ({lp.solutions.items.length})</p><AddBtn label="Thêm giải pháp" onClick={addSolution} /></div>
                  <div className="space-y-3">
                    {lp.solutions.items.map((item, i) => (
                      <ItemCard key={i} index={i} total={lp.solutions.items.length} onMoveUp={() => setLP(p => ({ ...p, solutions: { ...p.solutions, items: moveItem(p.solutions.items, i, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, solutions: { ...p.solutions, items: moveItem(p.solutions.items, i, "down") } }))} onRemove={() => setLP(p => ({ ...p, solutions: { ...p.solutions, items: removeItem(p.solutions.items, i) } }))}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <FieldRow label="Icon (Lucide)"><Input type="text" placeholder="CheckCircle" value={item.icon} onChange={e => updateSolution(i, "icon", e.target.value)} /></FieldRow>
                          <FieldRow label="Tiêu đề *"><Input type="text" placeholder="Tối ưu hiệu suất" value={item.title} onChange={e => updateSolution(i, "title", e.target.value)} /></FieldRow>
                          {/* ── Solution Image Upload ── */}
                          <FieldRow label="Image" span={2}>
                            <ImageUploadField
                              value={item.imageUrl}
                              onChange={v => updateSolution(i, "imageUrl", v)}
                              folder="services/solutions"
                            />
                          </FieldRow>
                          <FieldRow label="CTA Text"><Input type="text" placeholder="Tìm hiểu" value={item.ctaText} onChange={e => updateSolution(i, "ctaText", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA URL"><Input type="text" placeholder="/..." value={item.ctaUrl} onChange={e => updateSolution(i, "ctaUrl", e.target.value)} /></FieldRow>
                          <FieldRow label="Mô tả" span={2}><Input type="text" placeholder="Mô tả giải pháp..." value={item.description} onChange={e => updateSolution(i, "description", e.target.value)} /></FieldRow>
                        </div>
                        <div className="flex items-center gap-2 pt-1"><input type="checkbox" checked={item.isActive} onChange={e => updateSolution(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </ItemCard>
                    ))}
                    {lp.solutions.items.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có giải pháp nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 8. Projects */}
              <SectionCard title="8. Projects — Dự án đã thực hiện" icon={<FolderOpen className="w-4 h-4 text-green-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Dự án tiêu biểu" value={lp.projects.sectionTitle} onChange={e => lpSet("projects", { sectionTitle: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Phụ đề" value={lp.projects.sectionSubtitle} onChange={e => lpSet("projects", { sectionSubtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Dự án ({lp.projects.items.length})</p><AddBtn label="Thêm dự án" onClick={addProject} /></div>
                  <div className="space-y-3">
                    {lp.projects.items.map((p, i) => (
                      <ItemCard key={i} index={i} total={lp.projects.items.length} onMoveUp={() => setLP(prev => ({ ...prev, projects: { ...prev.projects, items: moveItem(prev.projects.items, i, "up") } }))} onMoveDown={() => setLP(prev => ({ ...prev, projects: { ...prev.projects, items: moveItem(prev.projects.items, i, "down") } }))} onRemove={() => setLP(prev => ({ ...prev, projects: { ...prev.projects, items: removeItem(prev.projects.items, i) } }))}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <FieldRow label="Tên dự án *"><Input type="text" placeholder="Website thương mại điện tử" value={p.title} onChange={e => updateProject(i, "title", e.target.value)} /></FieldRow>
                          <FieldRow label="Khách hàng"><Input type="text" placeholder="Vingroup, FPT..." value={p.client} onChange={e => updateProject(i, "client", e.target.value)} /></FieldRow>
                          <FieldRow label="Kết quả đạt được"><Input type="text" placeholder="Tăng 300% traffic" value={p.resultText} onChange={e => updateProject(i, "resultText", e.target.value)} /></FieldRow>
                          {/* ── Project Thumbnail Upload ── */}
                          <FieldRow label="Thumbnail">
                            <ImageUploadField
                              value={p.thumbnailUrl}
                              onChange={v => updateProject(i, "thumbnailUrl", v)}
                              folder="projects"
                              previewSize="lg"
                            />
                          </FieldRow>
                          <FieldRow label="CTA Text"><Input type="text" placeholder="Xem chi tiết" value={p.ctaText} onChange={e => updateProject(i, "ctaText", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA URL"><Input type="text" placeholder="/portfolio/..." value={p.ctaUrl} onChange={e => updateProject(i, "ctaUrl", e.target.value)} /></FieldRow>
                          <FieldRow label="Mô tả" span={2}><TextArea value={p.description} onChange={v => updateProject(i, "description", v)} placeholder="Mô tả dự án..." rows={2} /></FieldRow>
                        </div>
                        <div className="flex items-center gap-2 pt-1"><input type="checkbox" checked={p.isActive} onChange={e => updateProject(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </ItemCard>
                    ))}
                    {lp.projects.items.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có dự án nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 9. Testimonials */}
              <SectionCard title="9. Testimonials — Đánh giá khách hàng" icon={<MessageSquare className="w-4 h-4 text-pink-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Khách hàng nói gì" value={lp.testimonials.title} onChange={e => lpSet("testimonials", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Phụ đề" value={lp.testimonials.subtitle} onChange={e => lpSet("testimonials", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Đánh giá ({lp.testimonials.items.length})</p><AddBtn label="Thêm đánh giá" onClick={addTestimonial} /></div>
                  <div className="space-y-3">
                    {lp.testimonials.items.map((t, i) => (
                      <ItemCard key={i} index={i} total={lp.testimonials.items.length} onMoveUp={() => setLP(p => ({ ...p, testimonials: { ...p.testimonials, items: moveItem(p.testimonials.items, i, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, testimonials: { ...p.testimonials, items: moveItem(p.testimonials.items, i, "down") } }))} onRemove={() => setLP(p => ({ ...p, testimonials: { ...p.testimonials, items: removeItem(p.testimonials.items, i) } }))}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <FieldRow label="Tên *"><Input type="text" placeholder="Nguyễn Văn A" value={t.authorName} onChange={e => updateTestimonial(i, "authorName", e.target.value)} /></FieldRow>
                          <FieldRow label="Chức vụ"><Input type="text" placeholder="CEO, Marketing Manager..." value={t.authorRole} onChange={e => updateTestimonial(i, "authorRole", e.target.value)} /></FieldRow>
                          <FieldRow label="Công ty"><Input type="text" placeholder="Công ty ABC" value={t.authorCompany} onChange={e => updateTestimonial(i, "authorCompany", e.target.value)} /></FieldRow>
                          {/* ── Avatar Upload ── */}
                          <FieldRow label="Avatar">
                            <ImageUploadField
                              value={t.authorAvatarUrl}
                              onChange={v => updateTestimonial(i, "authorAvatarUrl", v)}
                              folder="avatars"
                              previewSize="sm"
                              maxSizeMB={1}
                            />
                          </FieldRow>
                          <FieldRow label="Rating (1-5)"><Input type="number" min="1" max="5" value={t.rating} onChange={e => updateTestimonial(i, "rating", parseInt(e.target.value) || 5)} /></FieldRow>
                          <FieldRow label="Nội dung *" span={2}><TextArea value={t.content} onChange={v => updateTestimonial(i, "content", v)} placeholder="Nội dung đánh giá..." rows={3} /></FieldRow>
                        </div>
                        <div className="flex items-center gap-2 pt-1"><input type="checkbox" checked={t.isActive} onChange={e => updateTestimonial(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </ItemCard>
                    ))}
                    {lp.testimonials.items.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có đánh giá nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 10. Awards */}
              <SectionCard title="10. Awards — Giải thưởng" icon={<Trophy className="w-4 h-4 text-amber-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Giải thưởng & Chứng nhận" value={lp.awards.title} onChange={e => lpSet("awards", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Được công nhận bởi..." value={lp.awards.subtitle} onChange={e => lpSet("awards", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Giải thưởng ({lp.awards.items.length})</p><AddBtn label="Thêm giải" onClick={addAward} /></div>
                  <div className="space-y-3">
                    {lp.awards.items.map((award, i) => (
                      <ItemCard key={i} index={i} total={lp.awards.items.length} onMoveUp={() => setLP(p => ({ ...p, awards: { ...p.awards, items: moveItem(p.awards.items, i, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, awards: { ...p.awards, items: moveItem(p.awards.items, i, "down") } }))} onRemove={() => setLP(p => ({ ...p, awards: { ...p.awards, items: removeItem(p.awards.items, i) } }))}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <FieldRow label="Tên giải *"><Input type="text" placeholder="Top 10 Dịch vụ SEO" value={award.name} onChange={e => updateAward(i, "name", e.target.value)} /></FieldRow>
                          <FieldRow label="Tổ chức *"><Input type="text" placeholder="Google, Forbes VN..." value={award.organization} onChange={e => updateAward(i, "organization", e.target.value)} /></FieldRow>
                          <FieldRow label="Năm"><Input type="text" placeholder="2024" value={award.year} onChange={e => updateAward(i, "year", e.target.value)} /></FieldRow>
                          {/* ── Award Logo Upload ── */}
                          <FieldRow label="Logo">
                            <ImageUploadField
                              value={award.logoUrl}
                              onChange={v => updateAward(i, "logoUrl", v)}
                              folder="awards"
                              previewSize="sm"
                              maxSizeMB={1}
                            />
                          </FieldRow>
                        </div>
                        <div className="flex items-center gap-2 pt-1"><input type="checkbox" checked={award.isActive} onChange={e => updateAward(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </ItemCard>
                    ))}
                    {lp.awards.items.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có giải thưởng nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 11. Process */}
              <SectionCard title="11. Process — Quy trình" icon={<span className="text-sm">🔄</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Quy trình làm việc" value={lp.process.title} onChange={e => lpSet("process", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Đơn giản, minh bạch..." value={lp.process.subtitle} onChange={e => lpSet("process", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Bước ({lp.process.steps.length})</p><AddBtn label="Thêm bước" onClick={addStep} /></div>
                  <div className="space-y-3">
                    {lp.process.steps.map((step, i) => (
                      <ItemCard key={i} index={i} total={lp.process.steps.length} onMoveUp={() => setLP(p => ({ ...p, process: { ...p.process, steps: moveItem(p.process.steps, i, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, process: { ...p.process, steps: moveItem(p.process.steps, i, "down") } }))} onRemove={() => setLP(p => ({ ...p, process: { ...p.process, steps: removeItem(p.process.steps, i) } }))}>
                        <div className="grid md:grid-cols-4 gap-3">
                          <FieldRow label="Số bước"><Input type="number" min="1" value={step.stepNumber} onChange={e => updateStep(i, "stepNumber", parseInt(e.target.value) || i + 1)} /></FieldRow>
                          <FieldRow label="Tiêu đề"><Input type="text" placeholder="Tư vấn & Khảo sát" value={step.title} onChange={e => updateStep(i, "title", e.target.value)} /></FieldRow>
                          <FieldRow label="Icon (Lucide)"><Input type="text" placeholder="MessageCircle" value={step.icon} onChange={e => updateStep(i, "icon", e.target.value)} /></FieldRow>
                          <FieldRow label="Thời gian"><Input type="text" placeholder="3-5 ngày" value={step.duration} onChange={e => updateStep(i, "duration", e.target.value)} /></FieldRow>
                          <FieldRow label="Mô tả" span={4}><Input type="text" placeholder="Mô tả bước này..." value={step.description} onChange={e => updateStep(i, "description", e.target.value)} /></FieldRow>
                        </div>
                        <div className="flex items-center gap-2 pt-1"><input type="checkbox" checked={step.isActive} onChange={e => updateStep(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span></div>
                      </ItemCard>
                    ))}
                    {lp.process.steps.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có bước nào</p></div>}
                  </div>
                </div>
              </SectionCard>

              {/* 12. Team */}
              <SectionCard title="12. Team — Đội ngũ" icon={<Users className="w-4 h-4 text-purple-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Đội ngũ chuyên gia" value={lp.team.title} onChange={e => lpSet("team", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Giàu kinh nghiệm" value={lp.team.subtitle} onChange={e => lpSet("team", { subtitle: e.target.value })} /></FieldRow>
                </div>
                {resolvedExperts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 mb-2">👥 Thành viên hiện tại — nhập IDs mới để thay đổi</p>
                    <div className="flex flex-wrap gap-2">
                      {resolvedExperts.map((expert, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/20">
                          {expert.avatarUrl && <img src={expert.avatarUrl} alt={expert.name} className="w-6 h-6 rounded-full object-cover" />}
                          <div><p className="text-xs font-medium text-purple-800 dark:text-purple-300">{expert.name}</p><p className="text-xs text-purple-600 dark:text-purple-400">{expert.role}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div><p className="text-sm font-medium text-gray-600">MemberTeam IDs ({lp.team.memberTeamIds.length})</p><p className="text-xs text-gray-400 mt-0.5">Nhập ID từ bảng MemberTeam</p></div>
                    <AddBtn label="Thêm thành viên" onClick={addTeamMember} />
                  </div>
                  <div className="space-y-2">
                    {lp.team.memberTeamIds.map((mid, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 w-6">#{i + 1}</span>
                        <Input type="number" min="1" placeholder="ID thành viên (e.g. 3)" value={mid || ""} onChange={e => updateTeamMember(i, parseInt(e.target.value) || 0)} />
                        <RemoveBtn onClick={() => removeTeamMember(i)} />
                      </div>
                    ))}
                    {lp.team.memberTeamIds.length === 0 && <p className="text-xs text-gray-400 text-center py-3">{resolvedExperts.length > 0 ? "💡 Điền IDs mới để thay đổi danh sách" : "Chưa có thành viên nào"}</p>}
                  </div>
                </div>
              </SectionCard>

              {/* 13. CTA */}
              <SectionCard title="13. CTA — Kêu gọi hành động" icon={<span className="text-sm">🎯</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề *"><Input type="text" placeholder="Sẵn sàng bứt phá?" value={lp.ctaSection.title} onChange={e => lpSet("ctaSection", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Tư vấn miễn phí ngay" value={lp.ctaSection.subtitle} onChange={e => lpSet("ctaSection", { subtitle: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA Text *"><Input type="text" placeholder="Liên hệ ngay" value={lp.ctaSection.ctaText} onChange={e => lpSet("ctaSection", { ctaText: e.target.value })} /></FieldRow>
                  <FieldRow label="CTA URL *"><Input type="text" placeholder="/lien-he" value={lp.ctaSection.ctaUrl} onChange={e => lpSet("ctaSection", { ctaUrl: e.target.value })} /></FieldRow>
                  <div className="flex items-center pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={lp.ctaSection.formEnabled} onChange={e => lpSet("ctaSection", { formEnabled: e.target.checked })} className="w-5 h-5 rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Hiện form liên hệ inline</span>
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* 14. Q&A */}
              <SectionCard title="14. Q&A — Câu hỏi thường gặp" icon={<HelpCircle className="w-4 h-4 text-teal-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section"><Input type="text" placeholder="Câu hỏi thường gặp" value={lp.qnA.title} onChange={e => lpSet("qnA", { title: e.target.value })} /></FieldRow>
                  <FieldRow label="Subtitle"><Input type="text" placeholder="Giải đáp thắc mắc" value={lp.qnA.subtitle} onChange={e => lpSet("qnA", { subtitle: e.target.value })} /></FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3"><p className="text-sm font-medium text-gray-600">Q&A ({lp.qnA.items.length})</p><AddBtn label="Thêm câu hỏi" onClick={addQnA} /></div>
                  <div className="space-y-3">
                    {lp.qnA.items.map((q, i) => (
                      <ItemCard key={i} index={i} total={lp.qnA.items.length} onMoveUp={() => setLP(p => ({ ...p, qnA: { ...p.qnA, items: moveItem(p.qnA.items, i, "up") } }))} onMoveDown={() => setLP(p => ({ ...p, qnA: { ...p.qnA, items: moveItem(p.qnA.items, i, "down") } }))} onRemove={() => setLP(p => ({ ...p, qnA: { ...p.qnA, items: removeItem(p.qnA.items, i) } }))}>
                        <FieldRow label="Câu hỏi *"><Input type="text" placeholder="Dịch vụ này phù hợp với ai?" value={q.question} onChange={e => updateQnA(i, "question", e.target.value)} /></FieldRow>
                        <FieldRow label="Trả lời *"><TextArea value={q.answer} onChange={v => updateQnA(i, "answer", v)} placeholder="Câu trả lời chi tiết..." rows={3} /></FieldRow>
                        <div className="flex items-center gap-2 pt-1">
                          <input type="checkbox" checked={q.isActive} onChange={e => updateQnA(i, "isActive", e.target.checked)} className="w-4 h-4 rounded" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Hiển thị</span>
                        </div>
                      </ItemCard>
                    ))}
                    {lp.qnA.items.length === 0 && <div className="text-center py-6 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-400">Chưa có câu hỏi nào</p></div>}
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
            <button type="submit" disabled={loading || loadingPage}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{isEditing ? "Đang cập nhật..." : "Đang thêm..."}</> : isEditing ? <><PencilIcon className="w-4 h-4" />Cập nhật</> : <><PlusIcon className="w-4 h-4" />Thêm mới</>}
            </button>
            <button type="button" onClick={handleReset} disabled={loading || loadingPage}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 disabled:opacity-50">
              Làm mới
            </button>
            {activeTab === "basic" && (
              <button type="button" onClick={() => setActiveTab("landing")} className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                <LayoutTemplate className="w-4 h-4" />Cài đặt Landing Page →
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── TABLE ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <div><h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">🛠️ Danh sách Service</h3>
            <p className="text-sm text-gray-500 mt-1">Tổng: {filteredServices.length}</p></div>
          <div className="w-72"><Input type="text" placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["Chọn", "Service", "Icon", "Slug", "Tính năng", "Thứ tự", "Trạng thái", "Xóa"].map(h => (
                  <th key={h} className={`px-4 py-3 ${h === "Service" ? "text-left" : "text-center"}`}>
                    <span className="text-xs font-medium text-gray-500 uppercase">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && services.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center"><Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto" /></td></tr>
              ) : filteredServices.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center"><p className="text-gray-500">{searchTerm ? "Không tìm thấy" : "Chưa có service nào"}</p></td></tr>
              ) : filteredServices.map(service => (
                <tr key={service.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === service.id ? "bg-brand-50 dark:bg-brand-500/10" : ""}`}>
                  <td className="px-4 py-4 text-center">
                    {selectedId === service.id && loadingPage
                      ? <Loader2 className="w-4 h-4 animate-spin text-brand-500 mx-auto" />
                      : <input type="radio" name="selectedService" checked={selectedId === service.id} onChange={() => handleSelectRow(service)} className="w-4 h-4 text-brand-500 cursor-pointer" />}
                  </td>
                  <td className="px-4 py-4"><p className="font-medium text-gray-800 dark:text-white/90">{service.title}</p><p className="text-xs text-gray-500 truncate max-w-64">{service.description}</p></td>
                  <td className="px-4 py-4 text-center">{service.icon ? <span className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-600 rounded-lg dark:bg-brand-500/10"><DynamicIcon name={service.icon} className="w-5 h-5" /></span> : <span className="text-gray-400">-</span>}</td>
                  <td className="px-4 py-4 text-center">{service.slug ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">/{service.slug}</span> : <span className="text-gray-400 text-xs">Chưa có</span>}</td>
                  <td className="px-4 py-4 text-center"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-500/10">{service.features.length} tính năng</span></td>
                  <td className="px-4 py-4 text-center"><span className="text-sm text-gray-600">{service.displayOrder}</span></td>
                  <td className="px-4 py-4 text-center">{service.isActive ? <span className="inline-flex items-center gap-1 text-success-600"><CheckCircleIcon className="w-5 h-5" /><span className="text-xs">Hiện</span></span> : <span className="inline-flex items-center gap-1 text-gray-400"><XIcon className="w-5 h-5" /><span className="text-xs">Ẩn</span></span>}</td>
                  <td className="px-4 py-4 text-center"><button onClick={() => handleDelete(service.id)} disabled={loading} className="p-2 text-error-500 hover:bg-error-50 rounded-lg disabled:opacity-50"><TrashBinIcon className="w-5 h-5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800"><p className="text-sm text-gray-500">Hiển thị {filteredServices.length} service</p></div>
      </div>
    </div>
  );
}