"use client";

import React, { useState, useEffect } from "react";
import Label from "@/app/components/cms/form/Label";
import Input from "@/app/components/cms/form/input/InputField";
import { Service, CreateServiceRequest, UpdateServiceRequest } from "@/app/types";
import { PlusIcon, PencilIcon, TrashBinIcon, CheckCircleIcon, XIcon } from "../../../icons";
import { serviceApi } from "@/app/lib/api/index";
import { X, Plus, ChevronUp, ChevronDown, GripVertical, ImageIcon, Users, Trophy, Zap, Settings, LayoutTemplate, Loader2 } from "lucide-react";
import IconPicker from "@/app/components/shared/IconPicker";
import DynamicIcon from "@/app/components/shared/DynamicIcon";

// ============================================================
// TYPES
// ============================================================

interface ServiceFeatureFormData {
  id: number;
  content: string;
  displayOrder: number;
  isActive: boolean;
}

interface HeroStatForm { value: string; label: string; }
interface HeroForm {
  badge: string; title: string; highlightText: string; subtitle: string;
  ctaText: string; ctaUrl: string; ctaSecondaryText: string; ctaSecondaryUrl: string;
  heroImageUrl: string; stats: HeroStatForm[];
}
interface HighlightForm { icon: string; title: string; description: string; displayOrder: number; }
interface ClientStatsForm { totalClients: string; description: string; logos: { name: string; logoUrl: string }[]; }
interface PricingPackageForm {
  name: string; price: string; priceNote: string; isPopular: boolean;
  ctaText: string; ctaUrl: string; displayOrder: number; features: string[];
}
interface PricingForm { title: string; subtitle: string; packages: PricingPackageForm[]; }
interface ProcessStepForm { stepNumber: number; title: string; description: string; icon: string; duration: string; displayOrder: number; }
interface ProcessForm { title: string; subtitle: string; steps: ProcessStepForm[]; }
interface AwardItemForm { name: string; organization: string; year: string; logoUrl: string; displayOrder: number; }
interface AwardsForm { title: string; items: AwardItemForm[]; }
interface TeamForm { title: string; subtitle: string; memberTeamIds: number[]; }
interface CtaForm { title: string; subtitle: string; ctaText: string; ctaUrl: string; formEnabled: boolean; }

interface LandingPageForm {
  slug: string; metaTitle: string; metaDescription: string;
  hero: HeroForm; highlights: HighlightForm[]; clientStats: ClientStatsForm;
  pricing: PricingForm; process: ProcessForm; awards: AwardsForm;
  team: TeamForm; ctaSection: CtaForm;
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
  hero: {
    badge: "", title: "", highlightText: "", subtitle: "",
    ctaText: "", ctaUrl: "", ctaSecondaryText: "", ctaSecondaryUrl: "",
    heroImageUrl: "", stats: [],
  },
  highlights: [],
  clientStats: { totalClients: "", description: "", logos: [] },
  pricing: { title: "", subtitle: "", packages: [] },
  process: { title: "", subtitle: "", steps: [] },
  awards: { title: "", items: [] },
  team: { title: "", subtitle: "", memberTeamIds: [] },
  ctaSection: { title: "", subtitle: "", ctaText: "", ctaUrl: "", formEnabled: true },
};

// ============================================================
// HELPERS — map ServicePageDTO → LandingPageForm
// ============================================================

/**
 * Map response từ GET /api/service/get-by-slug/{slug} (ServicePageDTO)
 * → LandingPageForm để đổ vào state.
 *
 * Cấu trúc ServicePageDTO (BE trả về):
 * {
 *   id, slug, metaTitle, metaDescription,
 *   hero: { badge, title, highlightText, subtitle, ctaText, ctaUrl,
 *           ctaSecondaryText, ctaSecondaryUrl, heroImageUrl,
 *           stats: [{ value, label }] },
 *   highlights: [{ icon, title, description }],
 *   clientStats: { totalClients, description, logos: [{ name, logoUrl }] },
 *   pricing: { title, subtitle, packages: [{ id, name, price, priceNote,
 *              isPopular, features: string[], ctaText, ctaUrl }] },
 *   process: { title, subtitle, steps: [{ stepNumber, title, description,
 *              icon, duration }] },
 *   awards: { title, items: [{ name, organization, year, logoUrl }] },
 *   team: { title, subtitle, experts: [{ name, role, avatarUrl,
 *           experience, specialties }] },
 *   ctaSection: { title, subtitle, ctaText, ctaUrl, formEnabled }
 * }
 *
 * LƯU Ý team: BE trả về experts[] với dữ liệu đã resolve,
 * nhưng form chỉ lưu memberTeamIds[] (để gửi lên update).
 * Cần có thêm `teamExperts` state để hiện preview.
 */
function mapPageDTOtoLanding(page: any, serviceId: number): LandingPageForm {
  return {
    slug: page.slug ?? "",
    metaTitle: page.metaTitle ?? "",
    metaDescription: page.metaDescription ?? "",

    hero: page.hero ? {
      badge: page.hero.badge ?? "",
      title: page.hero.title ?? "",
      highlightText: page.hero.highlightText ?? "",
      subtitle: page.hero.subtitle ?? "",
      ctaText: page.hero.ctaText ?? "",
      ctaUrl: page.hero.ctaUrl ?? "",
      ctaSecondaryText: page.hero.ctaSecondaryText ?? "",
      ctaSecondaryUrl: page.hero.ctaSecondaryUrl ?? "",
      heroImageUrl: page.hero.heroImageUrl ?? "",
      stats: (page.hero.stats ?? []).map((s: any) => ({
        value: s.value ?? "",
        label: s.label ?? "",
      })),
    } : initialLandingPage.hero,

    highlights: (page.highlights ?? []).map((h: any, i: number) => ({
      icon: h.icon ?? "",
      title: h.title ?? "",
      description: h.description ?? "",
      displayOrder: i + 1,
    })),

    clientStats: page.clientStats ? {
      totalClients: page.clientStats.totalClients ?? "",
      description: page.clientStats.description ?? "",
      logos: (page.clientStats.logos ?? []).map((l: any) => ({
        name: l.name ?? "",
        logoUrl: l.logoUrl ?? "",
      })),
    } : initialLandingPage.clientStats,

    pricing: page.pricing ? {
      title: page.pricing.title ?? "",
      subtitle: page.pricing.subtitle ?? "",
      packages: (page.pricing.packages ?? []).map((p: any, i: number) => ({
        name: p.name ?? "",
        price: p.price ?? "",
        priceNote: p.priceNote ?? "",
        isPopular: p.isPopular ?? false,
        ctaText: p.ctaText ?? "",
        ctaUrl: p.ctaUrl ?? "",
        displayOrder: i + 1,
        features: Array.isArray(p.features) ? p.features : [],
      })),
    } : initialLandingPage.pricing,

    process: page.process ? {
      title: page.process.title ?? "",
      subtitle: page.process.subtitle ?? "",
      steps: (page.process.steps ?? []).map((s: any, i: number) => ({
        stepNumber: s.stepNumber ?? i + 1,
        title: s.title ?? "",
        description: s.description ?? "",
        icon: s.icon ?? "",
        duration: s.duration ?? "",
        displayOrder: i + 1,
      })),
    } : initialLandingPage.process,

    awards: page.awards ? {
      title: page.awards.title ?? "",
      items: (page.awards.items ?? []).map((a: any, i: number) => ({
        name: a.name ?? "",
        organization: a.organization ?? "",
        year: a.year ?? "",
        logoUrl: a.logoUrl ?? "",
        displayOrder: i + 1,
      })),
    } : initialLandingPage.awards,

    // team: BE trả experts[], nhưng form gửi memberTeamIds[]
    // Không thể recover IDs từ experts (BE không expose ID trong PageDTO)
    // → giữ memberTeamIds rỗng, hiển thị experts ở preview riêng
    team: {
      title: page.team?.title ?? "",
      subtitle: page.team?.subtitle ?? "",
      memberTeamIds: [],  // ← xem giải thích bên dưới
    },

    ctaSection: page.ctaSection ? {
      title: page.ctaSection.title ?? "",
      subtitle: page.ctaSection.subtitle ?? "",
      ctaText: page.ctaSection.ctaText ?? "",
      ctaUrl: page.ctaSection.ctaUrl ?? "",
      formEnabled: page.ctaSection.formEnabled ?? true,
    } : initialLandingPage.ctaSection,
  };
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
        <span className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
          {icon}{title}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

function FieldRow({ label, children, span = 1 }: { label: string; children: React.ReactNode; span?: number }) {
  return (
    <div className={span === 2 ? "md:col-span-2" : span === 3 ? "md:col-span-3" : ""}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 2 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea rows={rows} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
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
  index: number; total: number; onMoveUp: () => void; onMoveDown: () => void;
  onRemove: () => void; children: React.ReactNode;
}) {
  return (
    <div className="relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <button type="button" onClick={onMoveUp} disabled={index === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronUp className="w-3.5 h-3.5" /></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronDown className="w-3.5 h-3.5" /></button>
          <span className="text-xs font-medium text-gray-500 ml-1">#{index + 1}</span>
        </div>
        <RemoveBtn onClick={onRemove} />
      </div>
      {children}
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
  // ── NEW: loading riêng khi fetch landing page data ────────
  const [loadingPage, setLoadingPage] = useState(false);

  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [landingData, setLandingData] = useState<LandingPageForm>(initialLandingPage);
  // ── NEW: lưu experts đã resolve từ BE (chỉ dùng để hiển thị) ──
  const [resolvedExperts, setResolvedExperts] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try { setLoading(true); const data = await serviceApi.getAll(); setServices(data); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const reloadServices = async () => {
    try { const data = await serviceApi.getAll(); setServices(data); }
    catch (e) { console.error(e); }
  };

  // ── Feature Handlers ──────────────────────────────────────
  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, { id: 0, content: "", displayOrder: formData.features.length + 1, isActive: true }] });
  };
  const handleRemoveFeature = (i: number) => {
    const nf = [...formData.features]; nf.splice(i, 1);
    nf.forEach((f, idx) => { f.displayOrder = idx + 1; });
    setFormData({ ...formData, features: nf });
  };
  const handleFeatureChange = (i: number, field: string, value: any) => {
    const nf = [...formData.features]; nf[i] = { ...nf[i], [field]: value };
    setFormData({ ...formData, features: nf });
  };
  const moveFeature = (i: number, dir: "up" | "down") => {
    const nf = [...formData.features]; const ni = dir === "up" ? i - 1 : i + 1;
    if (ni < 0 || ni >= nf.length) return;
    [nf[i], nf[ni]] = [nf[ni], nf[i]];
    nf.forEach((f, idx) => { f.displayOrder = idx + 1; });
    setFormData({ ...formData, features: nf });
  };

  const moveItem = <T,>(arr: T[], i: number, dir: "up" | "down"): T[] => {
    const a = [...arr]; const ni = dir === "up" ? i - 1 : i + 1;
    if (ni < 0 || ni >= a.length) return a;
    [a[i], a[ni]] = [a[ni], a[i]]; return a;
  };
  const removeItem = <T,>(arr: T[], i: number): T[] => arr.filter((_, idx) => idx !== i);

  const setLP = (fn: (prev: LandingPageForm) => LandingPageForm) => setLandingData(fn);

  // Hero stats
  const addStat = () => setLP(p => ({ ...p, hero: { ...p.hero, stats: [...p.hero.stats, { value: "", label: "" }] } }));
  const removeStat = (i: number) => setLP(p => ({ ...p, hero: { ...p.hero, stats: removeItem(p.hero.stats, i) } }));
  const updateStat = (i: number, f: keyof HeroStatForm, v: string) =>
    setLP(p => { const s = [...p.hero.stats]; s[i] = { ...s[i], [f]: v }; return { ...p, hero: { ...p.hero, stats: s } }; });

  // Highlights
  const addHighlight = () => setLP(p => ({ ...p, highlights: [...p.highlights, { icon: "", title: "", description: "", displayOrder: p.highlights.length + 1 }] }));
  const updateHighlight = (i: number, f: keyof HighlightForm, v: any) =>
    setLP(p => { const a = [...p.highlights]; a[i] = { ...a[i], [f]: v }; return { ...p, highlights: a }; });

  // Client logos
  const addLogo = () => setLP(p => ({ ...p, clientStats: { ...p.clientStats, logos: [...p.clientStats.logos, { name: "", logoUrl: "" }] } }));
  const updateLogo = (i: number, f: "name" | "logoUrl", v: string) =>
    setLP(p => { const a = [...p.clientStats.logos]; a[i] = { ...a[i], [f]: v }; return { ...p, clientStats: { ...p.clientStats, logos: a } }; });

  // Pricing packages
  const addPackage = () => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: [...p.pricing.packages, { name: "", price: "", priceNote: "", isPopular: false, ctaText: "", ctaUrl: "", displayOrder: p.pricing.packages.length + 1, features: [] }] } }));
  const updatePackage = (i: number, f: keyof PricingPackageForm, v: any) =>
    setLP(p => { const a = [...p.pricing.packages]; a[i] = { ...a[i], [f]: v }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const addPackageFeature = (pi: number) =>
    setLP(p => { const a = [...p.pricing.packages]; a[pi] = { ...a[pi], features: [...a[pi].features, ""] }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const updatePackageFeature = (pi: number, fi: number, v: string) =>
    setLP(p => { const a = [...p.pricing.packages]; const f = [...a[pi].features]; f[fi] = v; a[pi] = { ...a[pi], features: f }; return { ...p, pricing: { ...p.pricing, packages: a } }; });
  const removePackageFeature = (pi: number, fi: number) =>
    setLP(p => { const a = [...p.pricing.packages]; a[pi] = { ...a[pi], features: removeItem(a[pi].features, fi) }; return { ...p, pricing: { ...p.pricing, packages: a } }; });

  // Process steps
  const addStep = () => setLP(p => ({ ...p, process: { ...p.process, steps: [...p.process.steps, { stepNumber: p.process.steps.length + 1, title: "", description: "", icon: "", duration: "", displayOrder: p.process.steps.length + 1 }] } }));
  const updateStep = (i: number, f: keyof ProcessStepForm, v: any) =>
    setLP(p => { const a = [...p.process.steps]; a[i] = { ...a[i], [f]: v }; return { ...p, process: { ...p.process, steps: a } }; });

  // Awards
  const addAward = () => setLP(p => ({ ...p, awards: { ...p.awards, items: [...p.awards.items, { name: "", organization: "", year: "", logoUrl: "", displayOrder: p.awards.items.length + 1 }] } }));
  const updateAward = (i: number, f: keyof AwardItemForm, v: any) =>
    setLP(p => { const a = [...p.awards.items]; a[i] = { ...a[i], [f]: v }; return { ...p, awards: { ...p.awards, items: a } }; });

  // Team
  const addTeamMember = () => setLP(p => ({ ...p, team: { ...p.team, memberTeamIds: [...p.team.memberTeamIds, 0] } }));
  const updateTeamMember = (i: number, v: number) =>
    setLP(p => { const a = [...p.team.memberTeamIds]; a[i] = v; return { ...p, team: { ...p.team, memberTeamIds: a } }; });
  const removeTeamMember = (i: number) =>
    setLP(p => ({ ...p, team: { ...p.team, memberTeamIds: removeItem(p.team.memberTeamIds, i) } }));

  // ── Form Handlers ─────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let nv: string | number | boolean = value;
    if (type === "checkbox") nv = (e.target as HTMLInputElement).checked;
    else if (type === "number") nv = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [name]: nv }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
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

  // ── SELECT ROW — populate cả basic + landing page ─────────
  const handleSelectRow = async (service: Service) => {
    setSelectedId(service.id);
    setIsEditing(true);
    setErrors({});
    setResolvedExperts([]);

    // 1. Đổ ngay basic info (luôn có)
    setFormData({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      isActive: service.isActive,
      displayOrder: service.displayOrder,
      features: service.features.map(f => ({
        id: f.id, content: f.content,
        displayOrder: f.displayOrder, isActive: f.isActive,
      })),
    });

    // 2. Nếu service có slug → gọi get-by-slug để lấy full landing page data
    const slug = (service as any).slug;
    if (slug) {
      try {
        setLoadingPage(true);
        // Gọi endpoint: GET /api/service/get-by-slug/{slug}
        const pageData = await serviceApi.getBySlug(slug);
        if (pageData) {
          setLandingData(mapPageDTOtoLanding(pageData, service.id));
          // Lưu experts để hiển thị preview (không dùng để submit)
          setResolvedExperts(pageData.team?.experts ?? []);
        }
      } catch (e) {
        console.error("Không load được landing page:", e);
        setLandingData(initialLandingPage);
      } finally {
        setLoadingPage(false);
      }
    } else {
      // Chưa có slug → landing page trống
      setLandingData(initialLandingPage);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedId(null); setIsEditing(false);
    setFormData(initialFormData); setLandingData(initialLandingPage);
    setResolvedExperts([]); setErrors({}); setActiveTab("basic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const landingPayload = {
        slug: landingData.slug || undefined,
        metaTitle: landingData.metaTitle || undefined,
        metaDescription: landingData.metaDescription || undefined,
        hero: landingData.hero.title ? landingData.hero : undefined,
        highlights: landingData.highlights.length > 0 ? landingData.highlights : undefined,
        clientStats: landingData.clientStats.totalClients ? landingData.clientStats : undefined,
        pricing: landingData.pricing.packages.length > 0 ? landingData.pricing : undefined,
        process: landingData.process.steps.length > 0 ? landingData.process : undefined,
        awards: landingData.awards.items.length > 0 ? landingData.awards : undefined,
        team: landingData.team.memberTeamIds.length > 0
          ? {
              title: landingData.team.title,
              subtitle: landingData.team.subtitle,
              // Map sang members: [{ memberTeamId, displayOrder }]
              members: landingData.team.memberTeamIds.map((id, idx) => ({
                memberTeamId: id,
                displayOrder: idx + 1,
              })),
            }
          : undefined,
        ctaSection: landingData.ctaSection.title ? landingData.ctaSection : undefined,
      };

      if (isEditing && selectedId) {
        const updateData: UpdateServiceRequest = {
          id: selectedId,
          title: formData.title,
          description: formData.description,
          icon: formData.icon || undefined,
          isActive: formData.isActive,
          displayOrder: formData.displayOrder,
          features: formData.features,
          ...landingPayload,
        };
        await serviceApi.update(updateData);
      } else {
        const createData: CreateServiceRequest = {
          title: formData.title,
          description: formData.description,
          icon: formData.icon || undefined,
          isActive: formData.isActive,
          displayOrder: formData.displayOrder,
          features: formData.features.map(({ content, displayOrder, isActive }) => ({ content, displayOrder, isActive })),
          ...landingPayload,
        };
        await serviceApi.create(createData);
      }

      await reloadServices();
      handleReset();
      alert(isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Có lỗi xảy ra khi lưu!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const service = services.find(s => s.id === id);
    const featureCount = service?.features.length || 0;
    if (!window.confirm(featureCount > 0 ? `Xóa service và ${featureCount} tính năng?` : "Xóa service này?")) return;
    try {
      setLoading(true);
      await serviceApi.delete(id);
      await reloadServices();
      if (selectedId === id) handleReset();
      alert("Xóa thành công!");
    } catch (e) { console.error(e); alert("Có lỗi xảy ra!"); }
    finally { setLoading(false); }
  };

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* ── FORM SECTION ──────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEditing ? "✏️ Cập nhật Service" : "➕ Thêm Service mới"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? `Đang chỉnh sửa: ${formData.title}` : "Điền thông tin để thêm service mới"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-5">
          {([
            { key: "basic", label: "Thông tin cơ bản", icon: <Settings className="w-4 h-4" /> },
            { key: "landing", label: "Landing Page", icon: <LayoutTemplate className="w-4 h-4" />, badge: loadingPage },
          ] as const).map(tab => (
            <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-brand-500 text-brand-600 dark:text-brand-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}>
              {tab.icon}{tab.label}
              {/* Loading indicator trên tab Landing Page */}
              {"badge" in tab && tab.badge && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500 ml-1" />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── TAB 1: THÔNG TIN CƠ BẢN ────────────────────── */}
          {activeTab === "basic" && (
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <Label>Tiêu đề <span className="text-error-500">*</span></Label>
                  <Input name="title" type="text" placeholder="Nhập tiêu đề service"
                    value={formData.title} onChange={handleChange}
                    error={!!errors.title} hint={errors.title || "Tên hiển thị của service"} />
                </div>
                <div>
                  <Label>Icon</Label>
                  <IconPicker value={formData.icon} onChange={v => setFormData(p => ({ ...p, icon: v }))} placeholder="Chọn icon..." />
                  <p className="mt-1.5 text-xs text-gray-500">Chọn icon từ thư viện Lucide</p>
                </div>
                <div className="lg:col-span-3">
                  <Label>Mô tả <span className="text-error-500">*</span></Label>
                  <textarea name="description" rows={3} placeholder="Nhập mô tả về service..."
                    value={formData.description} onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
                      errors.description ? "border-error-500 focus:border-error-300 focus:ring-error-500/10" : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700"
                    }`} />
                  {errors.description
                    ? <p className="mt-1.5 text-xs text-error-500">{errors.description}</p>
                    : <p className="mt-1.5 text-xs text-gray-500">Mô tả chi tiết về service</p>}
                </div>
                <div>
                  <Label>Thứ tự <span className="text-error-500">*</span></Label>
                  <Input name="displayOrder" type="number" placeholder="1" min="1"
                    value={formData.displayOrder} onChange={handleChange}
                    error={!!errors.displayOrder} hint={errors.displayOrder || "Thứ tự hiển thị"} />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Hiển thị service</span>
                  </label>
                </div>
                {formData.icon && (
                  <div className="flex items-center gap-3 pt-6">
                    <span className="text-sm text-gray-500">Preview:</span>
                    <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center dark:bg-brand-500/10">
                      <DynamicIcon name={formData.icon} className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{formData.icon}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">🎯 Tính năng ({formData.features.length})</h4>
                    <p className="text-sm text-gray-500 mt-1">Thêm các tính năng cho service này</p>
                  </div>
                  <button type="button" onClick={handleAddFeature}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
                    <Plus className="w-4 h-4" />Thêm tính năng
                  </button>
                </div>
                {formData.features.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Chưa có tính năng nào. Nhấn "Thêm tính năng" để bắt đầu.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className={`relative p-4 rounded-lg border ${errors[`feature_${index}`] ? "border-error-300 bg-error-50 dark:bg-error-500/10" : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1">
                            <button type="button" onClick={() => moveFeature(index, "up")} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">▲</button>
                            <button type="button" onClick={() => moveFeature(index, "down")} disabled={index === formData.features.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed">▼</button>
                          </div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tính năng #{index + 1}</span>
                          {feature.id > 0
                            ? <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded dark:bg-blue-500/20 dark:text-blue-400">ID: {feature.id}</span>
                            : <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded dark:bg-green-500/20 dark:text-green-400">Mới</span>}
                          <button type="button" onClick={() => handleRemoveFeature(index)}
                            className="ml-auto p-1.5 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-8">
                            <Label>Nội dung</Label>
                            <Input type="text" placeholder="Nhập nội dung tính năng..." value={feature.content}
                              onChange={e => handleFeatureChange(index, "content", e.target.value)}
                              error={!!errors[`feature_${index}`]} hint={errors[`feature_${index}`]} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Thứ tự</Label>
                            <Input type="number" min="1" value={feature.displayOrder}
                              onChange={e => handleFeatureChange(index, "displayOrder", parseInt(e.target.value) || 1)} />
                          </div>
                          <div className="md:col-span-2 flex items-end pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={feature.isActive}
                                onChange={e => handleFeatureChange(index, "isActive", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">Hiện</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 2: LANDING PAGE ─────────────────────────── */}
          {activeTab === "landing" && (
            <div className="p-5 space-y-4">

              {/* Loading overlay khi đang fetch */}
              {loadingPage && (
                <div className="flex items-center gap-3 px-4 py-3 bg-brand-50 dark:bg-brand-500/10 rounded-xl border border-brand-200 dark:border-brand-500/20">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-500 shrink-0" />
                  <p className="text-sm text-brand-700 dark:text-brand-300">Đang tải dữ liệu landing page...</p>
                </div>
              )}

              {/* SEO & Slug */}
              <SectionCard title="SEO & Slug" icon={<Settings className="w-4 h-4 text-gray-400" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Slug (URL)">
                    <Input type="text" placeholder="seo-marketing, thiet-ke-web..." value={landingData.slug}
                      onChange={e => setLP(p => ({ ...p, slug: e.target.value }))} />
                    <p className="mt-1 text-xs text-gray-400">dich-vu/<strong>{landingData.slug || "..."}</strong></p>
                  </FieldRow>
                  <FieldRow label="Meta Title">
                    <Input type="text" placeholder="Tiêu đề SEO" value={landingData.metaTitle}
                      onChange={e => setLP(p => ({ ...p, metaTitle: e.target.value }))} />
                  </FieldRow>
                  <FieldRow label="Meta Description" span={2}>
                    <TextArea value={landingData.metaDescription} onChange={v => setLP(p => ({ ...p, metaDescription: v }))} placeholder="Mô tả SEO (150-160 ký tự)" />
                  </FieldRow>
                </div>
              </SectionCard>

              {/* Hero */}
              <SectionCard title="Hero Section" icon={<ImageIcon className="w-4 h-4 text-brand-500" />}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Badge (nhãn nhỏ)">
                    <Input type="text" placeholder="🏆 Dịch vụ hàng đầu" value={landingData.hero.badge}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, badge: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Title *">
                    <Input type="text" placeholder="Tiêu đề chính" value={landingData.hero.title}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, title: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Highlight Text">
                    <Input type="text" placeholder="Từ được highlight màu" value={landingData.hero.highlightText}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, highlightText: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Hero Image URL">
                    <Input type="text" placeholder="/images/hero-seo.png" value={landingData.hero.heroImageUrl}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, heroImageUrl: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Subtitle" span={2}>
                    <TextArea value={landingData.hero.subtitle} onChange={v => setLP(p => ({ ...p, hero: { ...p.hero, subtitle: v } }))} placeholder="Mô tả ngắn dưới tiêu đề..." />
                  </FieldRow>
                  <FieldRow label="CTA Primary Text">
                    <Input type="text" placeholder="Bắt đầu ngay" value={landingData.hero.ctaText}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, ctaText: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="CTA Primary URL">
                    <Input type="text" placeholder="/lien-he" value={landingData.hero.ctaUrl}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, ctaUrl: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="CTA Secondary Text">
                    <Input type="text" placeholder="Xem thêm" value={landingData.hero.ctaSecondaryText}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, ctaSecondaryText: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="CTA Secondary URL">
                    <Input type="text" placeholder="/portfolio" value={landingData.hero.ctaSecondaryUrl}
                      onChange={e => setLP(p => ({ ...p, hero: { ...p.hero, ctaSecondaryUrl: e.target.value } }))} />
                  </FieldRow>
                </div>
                {/* Hero Stats */}
                <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Số liệu nổi bật ({landingData.hero.stats.length})</p>
                    <AddBtn label="Thêm số liệu" onClick={addStat} />
                  </div>
                  <div className="space-y-2">
                    {landingData.hero.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <Input type="text" placeholder="5.000+" value={stat.value} onChange={e => updateStat(i, "value", e.target.value)} />
                          <Input type="text" placeholder="khách hàng" value={stat.label} onChange={e => updateStat(i, "label", e.target.value)} />
                        </div>
                        <RemoveBtn onClick={() => removeStat(i)} />
                      </div>
                    ))}
                    {landingData.hero.stats.length === 0 && <p className="text-xs text-gray-400 text-center py-3">Chưa có số liệu nào</p>}
                  </div>
                </div>
              </SectionCard>

              {/* Highlights */}
              <SectionCard title="Highlights — Điểm nổi bật" icon={<Zap className="w-4 h-4 text-yellow-500" />} defaultOpen={false}>
                <div className="flex justify-end mb-2"><AddBtn label="Thêm highlight" onClick={addHighlight} /></div>
                <div className="space-y-3">
                  {landingData.highlights.map((h, i) => (
                    <ItemCard key={i} index={i} total={landingData.highlights.length}
                      onMoveUp={() => setLP(p => ({ ...p, highlights: moveItem(p.highlights, i, "up") }))}
                      onMoveDown={() => setLP(p => ({ ...p, highlights: moveItem(p.highlights, i, "down") }))}
                      onRemove={() => setLP(p => ({ ...p, highlights: removeItem(p.highlights, i) }))}>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div><Label>Icon (Lucide name)</Label>
                          <Input type="text" placeholder="Star, Zap, Shield..." value={h.icon} onChange={e => updateHighlight(i, "icon", e.target.value)} /></div>
                        <div><Label>Tiêu đề</Label>
                          <Input type="text" placeholder="Chuyên nghiệp" value={h.title} onChange={e => updateHighlight(i, "title", e.target.value)} /></div>
                        <div><Label>Thứ tự</Label>
                          <Input type="number" min="1" value={h.displayOrder} onChange={e => updateHighlight(i, "displayOrder", parseInt(e.target.value) || i + 1)} /></div>
                        <div className="md:col-span-3"><Label>Mô tả</Label>
                          <Input type="text" placeholder="Mô tả ngắn điểm nổi bật..." value={h.description} onChange={e => updateHighlight(i, "description", e.target.value)} /></div>
                      </div>
                    </ItemCard>
                  ))}
                  {landingData.highlights.length === 0 && (
                    <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-400">Chưa có highlight nào</p>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Client Stats */}
              <SectionCard title="Client Stats — Khách hàng" icon={<Users className="w-4 h-4 text-blue-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tổng số khách hàng">
                    <Input type="text" placeholder="5.000+" value={landingData.clientStats.totalClients}
                      onChange={e => setLP(p => ({ ...p, clientStats: { ...p.clientStats, totalClients: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Mô tả phụ">
                    <Input type="text" placeholder="doanh nghiệp tin tưởng" value={landingData.clientStats.description}
                      onChange={e => setLP(p => ({ ...p, clientStats: { ...p.clientStats, description: e.target.value } }))} />
                  </FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Logo khách hàng ({landingData.clientStats.logos.length})</p>
                    <AddBtn label="Thêm logo" onClick={addLogo} />
                  </div>
                  <div className="space-y-2">
                    {landingData.clientStats.logos.map((logo, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <Input type="text" placeholder="Tên công ty" value={logo.name} onChange={e => updateLogo(i, "name", e.target.value)} />
                          <Input type="text" placeholder="/logos/vingroup.png" value={logo.logoUrl} onChange={e => updateLogo(i, "logoUrl", e.target.value)} />
                        </div>
                        <RemoveBtn onClick={() => setLP(p => ({ ...p, clientStats: { ...p.clientStats, logos: removeItem(p.clientStats.logos, i) } }))} />
                      </div>
                    ))}
                    {landingData.clientStats.logos.length === 0 && <p className="text-xs text-gray-400 text-center py-3">Chưa có logo nào</p>}
                  </div>
                </div>
              </SectionCard>

              {/* Pricing */}
              <SectionCard title="Pricing — Bảng giá" icon={<span className="text-sm">💎</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section">
                    <Input type="text" placeholder="Gói dịch vụ" value={landingData.pricing.title}
                      onChange={e => setLP(p => ({ ...p, pricing: { ...p.pricing, title: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Subtitle">
                    <Input type="text" placeholder="Chọn gói phù hợp..." value={landingData.pricing.subtitle}
                      onChange={e => setLP(p => ({ ...p, pricing: { ...p.pricing, subtitle: e.target.value } }))} />
                  </FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Gói dịch vụ ({landingData.pricing.packages.length})</p>
                    <AddBtn label="Thêm gói" onClick={addPackage} />
                  </div>
                  <div className="space-y-4">
                    {landingData.pricing.packages.map((pkg, pi) => (
                      <ItemCard key={pi} index={pi} total={landingData.pricing.packages.length}
                        onMoveUp={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: moveItem(p.pricing.packages, pi, "up") } }))}
                        onMoveDown={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: moveItem(p.pricing.packages, pi, "down") } }))}
                        onRemove={() => setLP(p => ({ ...p, pricing: { ...p.pricing, packages: removeItem(p.pricing.packages, pi) } }))}>
                        <div className="grid md:grid-cols-3 gap-3">
                          <FieldRow label="Tên gói *"><Input type="text" placeholder="Basic, Pro, Enterprise" value={pkg.name} onChange={e => updatePackage(pi, "name", e.target.value)} /></FieldRow>
                          <FieldRow label="Giá *"><Input type="text" placeholder="8.000.000" value={pkg.price} onChange={e => updatePackage(pi, "price", e.target.value)} /></FieldRow>
                          <FieldRow label="Ghi chú giá"><Input type="text" placeholder="đ/tháng" value={pkg.priceNote} onChange={e => updatePackage(pi, "priceNote", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA Text"><Input type="text" placeholder="Đăng ký ngay" value={pkg.ctaText} onChange={e => updatePackage(pi, "ctaText", e.target.value)} /></FieldRow>
                          <FieldRow label="CTA URL"><Input type="text" placeholder="/lien-he" value={pkg.ctaUrl} onChange={e => updatePackage(pi, "ctaUrl", e.target.value)} /></FieldRow>
                          <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={pkg.isPopular} onChange={e => updatePackage(pi, "isPopular", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">⭐ Phổ biến nhất</span>
                            </label>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-500">Tính năng gói ({pkg.features.length})</p>
                            <AddBtn label="Thêm" onClick={() => addPackageFeature(pi)} />
                          </div>
                          <div className="space-y-2">
                            {pkg.features.map((f, fi) => (
                              <div key={fi} className="flex items-center gap-2">
                                <Input type="text" placeholder="Tính năng của gói này..." value={f} onChange={e => updatePackageFeature(pi, fi, e.target.value)} />
                                <RemoveBtn onClick={() => removePackageFeature(pi, fi)} />
                              </div>
                            ))}
                            {pkg.features.length === 0 && <p className="text-xs text-gray-400 text-center py-2">Chưa có tính năng</p>}
                          </div>
                        </div>
                      </ItemCard>
                    ))}
                    {landingData.pricing.packages.length === 0 && (
                      <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-400">Chưa có gói dịch vụ nào</p>
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Process */}
              <SectionCard title="Process — Quy trình" icon={<span className="text-sm">🔄</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section">
                    <Input type="text" placeholder="Quy trình làm việc" value={landingData.process.title}
                      onChange={e => setLP(p => ({ ...p, process: { ...p.process, title: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Subtitle">
                    <Input type="text" placeholder="Đơn giản, minh bạch..." value={landingData.process.subtitle}
                      onChange={e => setLP(p => ({ ...p, process: { ...p.process, subtitle: e.target.value } }))} />
                  </FieldRow>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Các bước ({landingData.process.steps.length})</p>
                    <AddBtn label="Thêm bước" onClick={addStep} />
                  </div>
                  <div className="space-y-3">
                    {landingData.process.steps.map((step, i) => (
                      <ItemCard key={i} index={i} total={landingData.process.steps.length}
                        onMoveUp={() => setLP(p => ({ ...p, process: { ...p.process, steps: moveItem(p.process.steps, i, "up") } }))}
                        onMoveDown={() => setLP(p => ({ ...p, process: { ...p.process, steps: moveItem(p.process.steps, i, "down") } }))}
                        onRemove={() => setLP(p => ({ ...p, process: { ...p.process, steps: removeItem(p.process.steps, i) } }))}>
                        <div className="grid md:grid-cols-4 gap-3">
                          <FieldRow label="Số bước"><Input type="number" min="1" value={step.stepNumber} onChange={e => updateStep(i, "stepNumber", parseInt(e.target.value) || i + 1)} /></FieldRow>
                          <FieldRow label="Tiêu đề"><Input type="text" placeholder="Tư vấn & Khảo sát" value={step.title} onChange={e => updateStep(i, "title", e.target.value)} /></FieldRow>
                          <FieldRow label="Icon (Lucide)"><Input type="text" placeholder="MessageCircle" value={step.icon} onChange={e => updateStep(i, "icon", e.target.value)} /></FieldRow>
                          <FieldRow label="Thời gian"><Input type="text" placeholder="3-5 ngày" value={step.duration} onChange={e => updateStep(i, "duration", e.target.value)} /></FieldRow>
                          <FieldRow label="Mô tả" span={3}><Input type="text" placeholder="Mô tả bước này..." value={step.description} onChange={e => updateStep(i, "description", e.target.value)} /></FieldRow>
                        </div>
                      </ItemCard>
                    ))}
                    {landingData.process.steps.length === 0 && (
                      <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-400">Chưa có bước nào</p>
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Awards */}
              <SectionCard title="Awards — Giải thưởng" icon={<Trophy className="w-4 h-4 text-amber-500" />} defaultOpen={false}>
                <FieldRow label="Tiêu đề section">
                  <Input type="text" placeholder="Giải thưởng & Chứng nhận" value={landingData.awards.title}
                    onChange={e => setLP(p => ({ ...p, awards: { ...p.awards, title: e.target.value } }))} />
                </FieldRow>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Giải thưởng ({landingData.awards.items.length})</p>
                    <AddBtn label="Thêm giải" onClick={addAward} />
                  </div>
                  <div className="space-y-3">
                    {landingData.awards.items.map((award, i) => (
                      <ItemCard key={i} index={i} total={landingData.awards.items.length}
                        onMoveUp={() => setLP(p => ({ ...p, awards: { ...p.awards, items: moveItem(p.awards.items, i, "up") } }))}
                        onMoveDown={() => setLP(p => ({ ...p, awards: { ...p.awards, items: moveItem(p.awards.items, i, "down") } }))}
                        onRemove={() => setLP(p => ({ ...p, awards: { ...p.awards, items: removeItem(p.awards.items, i) } }))}>
                        <div className="grid md:grid-cols-2 gap-3">
                          <FieldRow label="Tên giải thưởng *"><Input type="text" placeholder="Top 10 Dịch vụ SEO..." value={award.name} onChange={e => updateAward(i, "name", e.target.value)} /></FieldRow>
                          <FieldRow label="Tổ chức trao giải *"><Input type="text" placeholder="Google, Forbes VN..." value={award.organization} onChange={e => updateAward(i, "organization", e.target.value)} /></FieldRow>
                          <FieldRow label="Năm"><Input type="text" placeholder="2024" value={award.year} onChange={e => updateAward(i, "year", e.target.value)} /></FieldRow>
                          <FieldRow label="Logo URL"><Input type="text" placeholder="/logos/google-award.png" value={award.logoUrl} onChange={e => updateAward(i, "logoUrl", e.target.value)} /></FieldRow>
                        </div>
                      </ItemCard>
                    ))}
                    {landingData.awards.items.length === 0 && (
                      <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-400">Chưa có giải thưởng nào</p>
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* Team */}
              <SectionCard title="Team — Đội ngũ" icon={<Users className="w-4 h-4 text-purple-500" />} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề section">
                    <Input type="text" placeholder="Đội ngũ chuyên gia" value={landingData.team.title}
                      onChange={e => setLP(p => ({ ...p, team: { ...p.team, title: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Subtitle">
                    <Input type="text" placeholder="Giàu kinh nghiệm, tận tâm" value={landingData.team.subtitle}
                      onChange={e => setLP(p => ({ ...p, team: { ...p.team, subtitle: e.target.value } }))} />
                  </FieldRow>
                </div>

                {/* Preview experts đã resolve từ BE */}
                {resolvedExperts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      👥 Thành viên hiện tại ({resolvedExperts.length}) — chỉ xem, thêm ID bên dưới để thay đổi
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {resolvedExperts.map((expert, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-200 dark:border-purple-500/20">
                          {expert.avatarUrl && (
                            <img src={expert.avatarUrl} alt={expert.name}
                              className="w-6 h-6 rounded-full object-cover shrink-0" />
                          )}
                          <div>
                            <p className="text-xs font-medium text-purple-800 dark:text-purple-300">{expert.name}</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400">{expert.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        MemberTeam IDs ({landingData.team.memberTeamIds.length})
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Nhập ID từ bảng MemberTeam. Để trống = giữ nguyên danh sách cũ khi update.
                      </p>
                    </div>
                    <AddBtn label="Thêm thành viên" onClick={addTeamMember} />
                  </div>
                  <div className="space-y-2">
                    {landingData.team.memberTeamIds.map((mid, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="text-xs text-gray-500 w-6">#{i + 1}</span>
                        <Input type="number" min="1" placeholder="ID thành viên (e.g. 3)"
                          value={mid || ""} onChange={e => updateTeamMember(i, parseInt(e.target.value) || 0)} />
                        <RemoveBtn onClick={() => removeTeamMember(i)} />
                      </div>
                    ))}
                    {landingData.team.memberTeamIds.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-3">
                        {resolvedExperts.length > 0
                          ? "💡 Điền IDs mới để thay đổi danh sách thành viên khi update"
                          : "Chưa có thành viên nào. Nhập MemberTeam ID từ DB."}
                      </p>
                    )}
                  </div>
                </div>
              </SectionCard>

              {/* CTA Section */}
              <SectionCard title="CTA Section — Kêu gọi hành động" icon={<span className="text-sm">🎯</span>} defaultOpen={false}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FieldRow label="Tiêu đề *">
                    <Input type="text" placeholder="Sẵn sàng bứt phá doanh số?" value={landingData.ctaSection.title}
                      onChange={e => setLP(p => ({ ...p, ctaSection: { ...p.ctaSection, title: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="Subtitle">
                    <Input type="text" placeholder="Liên hệ ngay để được tư vấn miễn phí" value={landingData.ctaSection.subtitle}
                      onChange={e => setLP(p => ({ ...p, ctaSection: { ...p.ctaSection, subtitle: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="CTA Text *">
                    <Input type="text" placeholder="Tư vấn miễn phí" value={landingData.ctaSection.ctaText}
                      onChange={e => setLP(p => ({ ...p, ctaSection: { ...p.ctaSection, ctaText: e.target.value } }))} />
                  </FieldRow>
                  <FieldRow label="CTA URL *">
                    <Input type="text" placeholder="/lien-he" value={landingData.ctaSection.ctaUrl}
                      onChange={e => setLP(p => ({ ...p, ctaSection: { ...p.ctaSection, ctaUrl: e.target.value } }))} />
                  </FieldRow>
                  <div className="flex items-center pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={landingData.ctaSection.formEnabled}
                        onChange={e => setLP(p => ({ ...p, ctaSection: { ...p.ctaSection, formEnabled: e.target.checked } }))}
                        className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Hiện form liên hệ inline</span>
                    </label>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
            <button type="submit" disabled={loading || loadingPage}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" />{isEditing ? "Đang cập nhật..." : "Đang thêm..."}</>
                : isEditing
                  ? <><PencilIcon className="w-4 h-4" />Cập nhật</>
                  : <><PlusIcon className="w-4 h-4" />Thêm mới</>}
            </button>
            <button type="button" onClick={handleReset} disabled={loading || loadingPage}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Làm mới
            </button>
            {activeTab === "basic" && (
              <button type="button" onClick={() => setActiveTab("landing")}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
                <LayoutTemplate className="w-4 h-4" />Cài đặt Landing Page →
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ── TABLE SECTION ────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">🛠️ Danh sách Service</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tổng: {filteredServices.length} service</p>
          </div>
          <div className="w-72">
            <Input type="text" placeholder="🔍 Tìm kiếm service..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["Chọn", "Service", "Icon", "Slug", "Tính năng", "Thứ tự", "Trạng thái", "Xóa"].map(h => (
                  <th key={h} className={`px-4 py-3 ${h === "Service" ? "text-left" : "text-center"}`}>
                    <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading && services.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-400">Đang tải...</p>
                  </div>
                </td></tr>
              ) : filteredServices.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <p className="text-gray-500 dark:text-gray-400">{searchTerm ? "Không tìm thấy service" : "Chưa có service nào"}</p>
                  </div>
                </td></tr>
              ) : filteredServices.map(service => (
                <tr key={service.id}
                  className={`transition-colors hover:bg-gray-50 dark:hover:bg-white/2 ${selectedId === service.id ? "bg-brand-50 dark:bg-brand-500/10" : ""}`}>
                  <td className="px-4 py-4">
                    {/* Loading spinner khi đang fetch landing page của row này */}
                    {selectedId === service.id && loadingPage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-500 mx-auto" />
                    ) : (
                      <input type="radio" name="selectedService" checked={selectedId === service.id}
                        onChange={() => handleSelectRow(service)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 cursor-pointer" />
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-800 dark:text-white/90">{service.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-65">{service.description}</p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {service.icon ? (
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-600 rounded-lg dark:bg-brand-500/10 dark:text-brand-400">
                        <DynamicIcon name={service.icon} className="w-5 h-5" />
                      </span>
                    ) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {(service as any).slug ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                        /{(service as any).slug}
                      </span>
                    ) : <span className="text-gray-400 text-xs">Chưa có</span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                      {service.features.length} tính năng
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{service.displayOrder}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {service.isActive
                      ? <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400"><CheckCircleIcon className="w-6 h-6" /><span className="text-xs">Hiện</span></span>
                      : <span className="inline-flex items-center gap-1 text-gray-400"><XIcon className="w-6 h-6" /><span className="text-xs">Ẩn</span></span>}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => handleDelete(service.id)} disabled={loading}
                      className="p-2 text-error-500 hover:bg-error-50 rounded-lg transition-colors dark:hover:bg-error-500/10 disabled:opacity-50">
                      <TrashBinIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">Hiển thị {filteredServices.length} service</p>
        </div>
      </div>

      {/* ── FEATURES PREVIEW ─────────────────────────────────── */}
      {selectedId && formData.features.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
            {formData.icon && (
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center dark:bg-brand-500/10">
                <DynamicIcon name={formData.icon} className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">👀 Preview: {formData.title}</h3>
              <p className="text-sm text-gray-500">{formData.description}</p>
            </div>
          </div>
          <div className="p-5">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              Tính năng ({formData.features.filter(f => f.isActive).length} đang hiển thị)
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {formData.features.filter(f => f.isActive).sort((a, b) => a.displayOrder - b.displayOrder).map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-800/50">
                  <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature.content}</span>
                </div>
              ))}
            </div>
            {formData.features.filter(f => !f.isActive).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Tính năng đang ẩn ({formData.features.filter(f => !f.isActive).length})</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {formData.features.filter(f => !f.isActive).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg opacity-50 dark:bg-gray-800">
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center shrink-0">
                        <XIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-500 line-through">{feature.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}