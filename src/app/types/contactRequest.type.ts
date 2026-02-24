// =====================================================
// ENUMS (matching Domain/Enums/ContactEnums.cs)
// =====================================================
export enum WebsiteType {
  Landing = 0,
  Corporate = 1,
  Ecommerce = 2,
  News = 3,
  RealEstate = 4,
  Education = 5,
  Booking = 6,
  Portfolio = 7,
  Other = 8,
}

export enum HasWebsiteStatus {
  No = 0,
  YesRedesign = 1,
  YesUpgrade = 2,
}

export enum WebFeature {
  ContactForm = 0,
  LiveChat = 1,
  Cart = 2,
  Products = 3,
  Blog = 4,
  Maps = 5,
  Seo = 6,
  MultiLang = 7,
  Booking = 8,
  Social = 9,
  Reviews = 10,
  Email = 11,
  Cms = 12,
  Gallery = 13,
  Analytics = 14,
  Member = 15,
}

export enum HasLogoStatus {
  Yes = 0,
  No = 1,
  NeedDesign = 2,
}

export enum DesignStyle {
  Minimal = 0,
  Modern = 1,
  Corporate = 2,
  Creative = 3,
  Youthful = 4,
  Luxury = 5,
}

export enum ContentReadyStatus {
  Full = 0,
  Partial = 1,
  None = 2,
}

export enum HasDomainStatus {
  Yes = 0,
  No = 1,
  Unsure = 2,
}

export enum BudgetRange {
  Under5M = 0,
  From5To10M = 1,
  From10To20M = 2,
  From20To50M = 3,
  Over50M = 4,
  NeedConsult = 5,
}

export enum Timeline {
  Urgent = 0,
  OneToTwoWeeks = 1,
  TwoToFourWeeks = 2,
  OneToTwoMonths = 3,
  Flexible = 4,
}

export enum AddonService {
  Seo = 0,
  Content = 1,
  Logo = 2,
  Hosting = 3,
  Maintain = 4,
  Ads = 5,
}

export enum ContactRequestStatus {
  New = 0,
  Contacted = 1,
  InProgress = 2,
  QuoteSent = 3,
  Accepted = 4,
  Rejected = 5,
  Completed = 6,
}

// =====================================================
// LABEL MAPS (Enum string → Vietnamese)
// =====================================================
export const WebsiteTypeLabels: Record<string, string> = {
  Landing: "Landing Page",
  Corporate: "Website Doanh nghiệp",
  Ecommerce: "Thương mại điện tử",
  News: "Tin tức / Blog",
  RealEstate: "Bất động sản",
  Education: "Giáo dục / Khóa học",
  Booking: "Đặt lịch / Booking",
  Portfolio: "Portfolio / Cá nhân",
  Other: "Khác",
};

export const BudgetLabels: Record<string, string> = {
  Under5M: "Dưới 5 triệu",
  From5To10M: "5 – 10 triệu",
  From10To20M: "10 – 20 triệu",
  From20To50M: "20 – 50 triệu",
  Over50M: "Trên 50 triệu",
  NeedConsult: "Cần tư vấn",
};

export const TimelineLabels: Record<string, string> = {
  Urgent: "Gấp – dưới 1 tuần",
  OneToTwoWeeks: "1-2 tuần",
  TwoToFourWeeks: "2-4 tuần",
  OneToTwoMonths: "1-2 tháng",
  Flexible: "Linh hoạt",
};

export const StatusLabels: Record<string, string> = {
  New: "Mới",
  Contacted: "Đã liên hệ",
  InProgress: "Đang xử lý",
  QuoteSent: "Đã gửi báo giá",
  Accepted: "Chấp nhận",
  Rejected: "Từ chối",
  Completed: "Hoàn thành",
};

export const StatusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-cyan-100 text-cyan-700",
  InProgress: "bg-yellow-100 text-yellow-700",
  QuoteSent: "bg-purple-100 text-purple-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

export const HasWebsiteLabels: Record<string, string> = {
  No: "Chưa có, làm mới",
  YesRedesign: "Có rồi, muốn làm lại",
  YesUpgrade: "Có rồi, muốn nâng cấp",
};

export const HasLogoLabels: Record<string, string> = {
  Yes: "Có rồi",
  No: "Chưa có",
  NeedDesign: "Cần thiết kế",
};

export const ContentReadyLabels: Record<string, string> = {
  Full: "Có đầy đủ",
  Partial: "Có một phần",
  None: "Chưa có",
};

export const HasDomainLabels: Record<string, string> = {
  Yes: "Có rồi",
  No: "Chưa, cần đăng ký",
  Unsure: "Không chắc",
};

export const DesignStyleLabels: Record<string, string> = {
  Minimal: "Tối giản",
  Modern: "Hiện đại",
  Corporate: "Chuyên nghiệp",
  Creative: "Sáng tạo",
  Youthful: "Năng động",
  Luxury: "Sang trọng",
};

export const FeatureLabels: Record<string, string> = {
  ContactForm: "Form liên hệ",
  LiveChat: "Chat trực tuyến",
  Cart: "Giỏ hàng & Thanh toán",
  Products: "Quản lý sản phẩm",
  Blog: "Blog / Tin tức",
  Maps: "Google Maps",
  Seo: "SEO cơ bản",
  MultiLang: "Đa ngôn ngữ",
  Booking: "Đặt lịch online",
  Social: "Tích hợp MXH",
  Reviews: "Hệ thống đánh giá",
  Email: "Email marketing",
  Cms: "Trang quản trị CMS",
  Gallery: "Thư viện ảnh/video",
  Analytics: "Analytics & Thống kê",
  Member: "Hệ thống thành viên",
};

export const AddonLabels: Record<string, string> = {
  Seo: "SEO hàng tháng",
  Content: "Viết nội dung",
  Logo: "Thiết kế logo",
  Hosting: "Hosting & Domain",
  Maintain: "Bảo trì định kỳ",
  Ads: "Chạy quảng cáo",
};

// =====================================================
// STATUS HELPERS
// =====================================================
export const STATUS_MAP_TO_NUMBER: Record<string, number> = {
  New: 0, Contacted: 1, InProgress: 2, QuoteSent: 3,
  Accepted: 4, Rejected: 5, Completed: 6,
};

export const STATUS_MAP_TO_STRING: Record<number, string> = {
  0: "New", 1: "Contacted", 2: "InProgress", 3: "QuoteSent",
  4: "Accepted", 5: "Rejected", 6: "Completed",
};

// =====================================================
// INTERFACES (matching Application/DTOs)
// =====================================================
export interface ContactRequestListItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  company: string | null;
  websiteType: string;
  industry: string;
  budget: string;
  timeline: string;
  status: string;
  createdAt: string;
}

export interface ContactRequestDetail {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  company: string | null;
  position: string | null;
  city: string | null;
  source: string | null;
  websiteType: string;
  otherTypeDescription: string | null;
  industry: string;
  hasWebsite: string;
  currentUrl: string | null;
  currentIssue: string | null;
  features: string[];
  pageCount: string | null;
  language: string;
  specialRequirements: string | null;
  hasLogo: string;
  logoFileName: string | null;
  brandColor: string | null;
  designStyles: string[];
  referenceWebsites: { url: string; reason: string | null }[];
  contentReady: string;
  hasDomain: string | null;
  budget: string;
  timeline: string;
  paymentMethod: string | null;
  addons: string[];
  notes: string | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
  contactedAt: string | null;
}

export interface UpdateContactStatusBody {
  status: number;
  adminNote?: string;
}

export interface ContactRequestFilter {
  search?: string;
  status?: number;
  websiteType?: number;
  budget?: number;
  fromDate?: string;
  toDate?: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortDesc: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContactDashboard {
  totalRequests: number;
  newToday: number;
  pending: number;
  contacted: number;
  completed: number;
}

// Feature entity (giống Banner entity pattern)
export interface Feature {
  id: number;
  name: string;
  code: string;
  value: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  isActive: boolean;
  sortOrder: number;
  basePrice: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface FeatureFormData {
  name: string;
  code: string;
  description: string;
  icon: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  basePrice: number | null;
}





























// =====================================================
// Form Data (gửi enum number values lên BE)
// =====================================================
export interface LandingFormData {
  // Step 1: Contact
  fullName: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  city: string;
  source: string;
  // Step 2: Website Type
  websiteType: number | null;
  otherTypeDescription: string;
  industry: string;
  hasWebsite: number | null;
  currentUrl: string;
  currentIssue: string;
  // Step 3: Features
  features: number[];
  pageCount: string;
  language: string;
  specialRequirements: string;
  // Step 4: Design
  hasLogo: number | null;
  brandColor: string;
  designStyles: number[];
  referenceWebsites: { url: string; reason: string }[];
  contentReady: number | null;
  hasDomain: number | null;
  // Step 5: Budget
  budget: number | null;
  timeline: number | null;
  paymentMethod: string;
  addons: number[];
  notes: string;
  // Step 6
  agree: boolean;
}

export const initialFormData: LandingFormData = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  position: "",
  city: "",
  source: "",
  websiteType: null,
  otherTypeDescription: "",
  industry: "",
  hasWebsite: null,
  currentUrl: "",
  currentIssue: "",
  features: [],
  pageCount: "",
  language: "",
  specialRequirements: "",
  hasLogo: null,
  brandColor: "",
  designStyles: [],
  referenceWebsites: [{ url: "", reason: "" }],
  contentReady: null,
  hasDomain: null,
  budget: null,
  timeline: null,
  paymentMethod: "",
  addons: [],
  notes: "",
  agree: false,
};

// =====================================================
// BE Payload (matches CreateContactRequestDto)
// =====================================================
export interface CreateContactRequestPayload {
  fullName: string;
  phone: string;
  email: string;
  company?: string | null;
  position?: string | null;
  city?: string | null;
  source?: string | null;
  websiteType: number;
  otherTypeDescription?: string | null;
  industry: string;
  hasWebsite: number;
  currentUrl?: string | null;
  currentIssue?: string | null;
  features: number[];
  pageCount?: string | null;
  language: string;
  specialRequirements?: string | null;
  hasLogo: number;
  brandColor?: string | null;
  designStyles: number[];
  referenceWebsites: { url: string; reason: string }[];
  contentReady: number;
  hasDomain?: number | null;
  budget: number;
  timeline: number;
  paymentMethod?: string | null;
  addons: number[];
  notes?: string | null;
}

// =====================================================
// Progress Steps
// =====================================================
export const STEPS = [
  { num: 1, label: "Liên hệ" },
  { num: 2, label: "Loại web" },
  { num: 3, label: "Tính năng" },
  { num: 4, label: "Thiết kế" },
  { num: 5, label: "Ngân sách" },
  { num: 6, label: "Xác nhận" },
];

// =====================================================
// UI Option Arrays (enum value → display)
// =====================================================
export const WEBSITE_TYPE_OPTIONS = [
  { value: WebsiteType.Landing, icon: "🚀", title: "Landing Page", desc: "Trang đích bán hàng, giới thiệu sản phẩm" },
  { value: WebsiteType.Corporate, icon: "🏢", title: "Website doanh nghiệp", desc: "Giới thiệu công ty, dịch vụ, đội ngũ" },
  { value: WebsiteType.Ecommerce, icon: "🛒", title: "Thương mại điện tử", desc: "Bán hàng online, giỏ hàng, thanh toán" },
  { value: WebsiteType.News, icon: "📰", title: "Tin tức / Blog", desc: "Trang tin, tạp chí, blog" },
  { value: WebsiteType.RealEstate, icon: "🏠", title: "Bất động sản", desc: "Dự án, bản đồ, liên hệ" },
  { value: WebsiteType.Education, icon: "🎓", title: "Giáo dục / Khóa học", desc: "LMS, khóa học online" },
  { value: WebsiteType.Booking, icon: "📅", title: "Đặt lịch / Booking", desc: "Spa, nhà hàng, phòng khám" },
  { value: WebsiteType.Portfolio, icon: "🎨", title: "Portfolio / Cá nhân", desc: "Hồ sơ năng lực, CV" },
  { value: WebsiteType.Other, icon: "✨", title: "Khác", desc: "Loại đặc thù khác" },
];

export const FEATURE_UI_OPTIONS = [
  { value: WebFeature.ContactForm, label: "📝 Form liên hệ" },
  { value: WebFeature.LiveChat, label: "💬 Chat (Zalo, Messenger)" },
  { value: WebFeature.Cart, label: "🛒 Giỏ hàng & Thanh toán" },
  { value: WebFeature.Products, label: "📦 Quản lý sản phẩm" },
  { value: WebFeature.Blog, label: "📰 Blog / Tin tức" },
  { value: WebFeature.Maps, label: "📍 Google Maps" },
  { value: WebFeature.Seo, label: "🔍 SEO cơ bản" },
  { value: WebFeature.MultiLang, label: "🌍 Đa ngôn ngữ" },
  { value: WebFeature.Booking, label: "📅 Đặt lịch online" },
  { value: WebFeature.Social, label: "📱 Tích hợp MXH" },
  { value: WebFeature.Reviews, label: "⭐ Hệ thống đánh giá" },
  { value: WebFeature.Email, label: "📧 Email marketing" },
  { value: WebFeature.Cms, label: "⚙️ Trang quản trị CMS" },
  { value: WebFeature.Gallery, label: "🖼️ Thư viện ảnh/video" },
  { value: WebFeature.Analytics, label: "📊 Analytics & Thống kê" },
  { value: WebFeature.Member, label: "👥 Hệ thống thành viên" },
];

export const DESIGN_STYLE_OPTIONS = [
  { value: DesignStyle.Minimal, icon: "🤍", title: "Tối giản", desc: "Clean, ít chi tiết" },
  { value: DesignStyle.Modern, icon: "💎", title: "Hiện đại", desc: "Trend, sáng tạo" },
  { value: DesignStyle.Corporate, icon: "🏛️", title: "Chuyên nghiệp", desc: "Uy tín, đáng tin" },
  { value: DesignStyle.Creative, icon: "🎭", title: "Sáng tạo", desc: "Độc đáo, nghệ thuật" },
  { value: DesignStyle.Youthful, icon: "⚡", title: "Năng động", desc: "Trẻ trung, sôi nổi" },
  { value: DesignStyle.Luxury, icon: "👑", title: "Sang trọng", desc: "Cao cấp, tinh tế" },
];

export const HAS_WEBSITE_OPTIONS = [
  { value: HasWebsiteStatus.No, label: "Chưa có, làm mới" },
  { value: HasWebsiteStatus.YesRedesign, label: "Có rồi, muốn làm lại" },
  { value: HasWebsiteStatus.YesUpgrade, label: "Có rồi, muốn nâng cấp" },
];

export const HAS_LOGO_OPTIONS = [
  { value: HasLogoStatus.Yes, title: "✅ Có rồi" },
  { value: HasLogoStatus.No, title: "❌ Chưa có" },
  { value: HasLogoStatus.NeedDesign, title: "🎨 Cần thiết kế" },
];

export const CONTENT_READY_OPTIONS = [
  { value: ContentReadyStatus.Full, label: "Có đầy đủ (text + ảnh)" },
  { value: ContentReadyStatus.Partial, label: "Có một phần" },
  { value: ContentReadyStatus.None, label: "Chưa có, cần làm từ đầu" },
];

export const HAS_DOMAIN_OPTIONS = [
  { value: HasDomainStatus.Yes, label: "Có rồi" },
  { value: HasDomainStatus.No, label: "Chưa, cần đăng ký" },
  { value: HasDomainStatus.Unsure, label: "Không chắc" },
];

export const BUDGET_UI_OPTIONS = [
  { value: BudgetRange.Under5M, label: "Tiết kiệm", range: "Dưới 5 triệu" },
  { value: BudgetRange.From5To10M, label: "Cơ bản", range: "5 — 10 triệu" },
  { value: BudgetRange.From10To20M, label: "Nâng cao", range: "10 — 20 triệu", popular: true },
  { value: BudgetRange.From20To50M, label: "Chuyên nghiệp", range: "20 — 50 triệu" },
  { value: BudgetRange.Over50M, label: "Doanh nghiệp", range: "Trên 50 triệu" },
  { value: BudgetRange.NeedConsult, label: "Tư vấn", range: "Cần báo giá" },
];

export const TIMELINE_UI_OPTIONS = [
  { value: Timeline.Urgent, label: "🔥 Gấp — dưới 1 tuần" },
  { value: Timeline.OneToTwoWeeks, label: "⚡ 1-2 tuần" },
  { value: Timeline.TwoToFourWeeks, label: "📅 2-4 tuần" },
  { value: Timeline.OneToTwoMonths, label: "🗓️ 1-2 tháng" },
  { value: Timeline.Flexible, label: "🍃 Linh hoạt" },
];

export const ADDON_UI_OPTIONS = [
  { value: AddonService.Seo, label: "🔍 Gói SEO hàng tháng" },
  { value: AddonService.Content, label: "✍️ Viết nội dung" },
  { value: AddonService.Logo, label: "🎨 Thiết kế logo" },
  { value: AddonService.Hosting, label: "☁️ Hosting & Domain" },
  { value: AddonService.Maintain, label: "🛠️ Bảo trì kỹ thuật" },
  { value: AddonService.Ads, label: "📢 Quảng cáo Google/FB" },
];

export const BRAND_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#1e293b",
];

export const INDUSTRIES = [
  "Nhà hàng / F&B", "Bất động sản", "Y tế / Thẩm mỹ", "Giáo dục / Đào tạo",
  "Công nghệ / IT", "Thời trang / Mỹ phẩm", "Du lịch / Khách sạn",
  "Xây dựng / Nội thất", "Luật / Tư vấn / Kế toán", "Tài chính / Bảo hiểm",
  "Sản xuất / Công nghiệp", "Nông nghiệp / Thực phẩm", "Vận tải / Logistics",
  "Truyền thông / Quảng cáo", "Khác",
];

export const CITIES = [
  "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng",
  "Cần Thơ", "Bình Dương", "Đồng Nai", "Khánh Hòa", "Khác",
];

export const SOURCES = [
  "Google tìm kiếm", "Facebook", "Zalo", "TikTok", "Bạn bè giới thiệu", "Khác",
];
