// Process steps
export const processSteps = [
  { step: 1, title: 'Tư Vấn & Nghiên Cứu', description: 'Gặp gỡ khách hàng, tìm hiểu nhu cầu và nghiên cứu thị trường, đối thủ.' },
  { step: 2, title: 'Lập Kế Hoạch', description: 'Xây dựng chiến lược và kế hoạch chi tiết, đề xuất giải pháp phù hợp.' },
  { step: 3, title: 'Triển Khai', description: 'Thực hiện dự án theo kế hoạch với đội ngũ chuyên nghiệp và quy trình chuẩn.' },
  { step: 4, title: 'Giám Sát & Tối Ưu', description: 'Theo dõi tiến độ, đo lường hiệu quả và tối ưu hóa trong quá trình triển khai.' },
  { step: 5, title: 'Báo Cáo & Đánh Giá', description: 'Tổng hợp kết quả, báo cáo chi tiết và đánh giá hiệu quả dự án.' }
];

// Team members
export const teamMembers = [
  { name: 'Nguyễn Văn A', position: 'Giám đốc Điều hành', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Trần Thị B', position: 'Giám đốc Sáng tạo', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Lê Văn C', position: 'Giám đốc Marketing', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Phạm Thị D', position: 'Trưởng phòng PR', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' }
];

// Awards
export const awards = [
  { year: 2024, title: 'Giải thưởng Agency của năm', organization: 'Hiệp hội Marketing Việt Nam' },
  { year: 2023, title: 'Chiến dịch Marketing xuất sắc', organization: 'Marketing Awards' },
  { year: 2022, title: 'Video quảng cáo hay nhất', organization: 'Video Awards Vietnam' },
  { year: 2021, title: 'Sự kiện sáng tạo nhất', organization: 'Event Awards' }
];

// Brand history
export const brandHistory = [
  { year: 2014, title: 'Thành lập', description: 'Khởi đầu với đội ngũ 5 người' },
  { year: 2016, title: 'Mở rộng', description: 'Mở văn phòng tại Hà Nội và TP.HCM' },
  { year: 2019, title: 'Phát triển', description: 'Đạt 100+ dự án thành công' },
  { year: 2024, title: 'Hiện tại', description: 'Đội ngũ 50+ nhân sự, 500+ dự án' }
];

// Partners
export const partners = [
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80',
  'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80'
];

























// ============================================================
// mockData.ts — Dữ liệu mẫu 2 slug khác nhau
// Đặt tại: app/lib/mockServicePages.ts
// Dùng tạm khi chưa có API — xoá khi backend sẵn sàng
// ============================================================

// import type { ServicePageData } from "@/app/types/servicePage.type";

// export const MOCK_SERVICE_PAGES: Record<string, ServicePageData> = {

//   // ── SLUG 1: Dịch vụ SEO ─────────────────────────────────
//   "dich-vu-seo": {
//     id: "seo", slug: "dich-vu-seo",
//     metaTitle: "Dịch Vụ SEO AI MAX | Tăng Top Google Bền Vững | Chun Media",
//     metaDescription: "Giải pháp SEO thế hệ mới kết hợp AI, cam kết Top 3 Google trong 90 ngày.",
//     hero: {
//       badge: "AI MAX 2025",
//       title: "Dịch Vụ SEO",
//       highlightText: "AI MAX",
//       subtitle: "Tăng thứ hạng Google bền vững với công nghệ AI thế hệ mới. Cam kết kết quả trong 90 ngày — hoặc hoàn tiền.",
//       ctaText: "Nhận Tư Vấn Miễn Phí",
//       ctaUrl: "#form",
//       ctaSecondaryText: "Xem Bảng Giá",
//       ctaSecondaryUrl: "#pricing",
//       heroImageUrl: "/images/service-seo-hero.png",
//       stats: [
//         { value: "5.000+", label: "khách hàng tin dùng" },
//         { value: "Top 3", label: "Google trong 90 ngày" },
//         { value: "115+", label: "chuyên gia SEO" },
//       ],
//     },
//     highlights: [
//       { icon: "🤖", title: "AI Phân Tích Từ Khóa", description: "Hệ thống AI quét & phân tích 10.000+ từ khóa tiềm năng trong ngành của bạn." },
//       { icon: "📈", title: "Tăng Traffic Thực", description: "Traffic từ SEO chuyển đổi cao gấp 5 lần so với quảng cáo trả phí." },
//       { icon: "🔒", title: "Cam Kết Bảo Hành", description: "Hoàn tiền nếu không đạt mục tiêu thứ hạng đã cam kết trong hợp đồng." },
//       { icon: "📊", title: "Báo Cáo Minh Bạch", description: "Dashboard real-time, báo cáo hàng tuần chi tiết đến từng từ khóa." },
//       { icon: "⚡", title: "Triển Khai Nhanh", description: "Onboarding trong 48h, bắt đầu thấy kết quả từ tuần thứ 2." },
//       { icon: "🌐", title: "SEO Đa Nền Tảng", description: "Tối ưu cho Google, Bing, và cả AI search như Perplexity, ChatGPT." },
//     ],
//     clientStats: {
//       totalClients: "5.000+",
//       description: "doanh nghiệp đã tin tưởng dịch vụ SEO của chúng tôi",
//       logos: [
//         { name: "Viettel", logoUrl: "/logos/viettel.png" },
//         { name: "Vingroup", logoUrl: "/logos/vingroup.png" },
//         { name: "LPBank", logoUrl: "/logos/lpbank.png" },
//         { name: "Masan", logoUrl: "/logos/masan.png" },
//       ],
//     },
//     pricing: {
//       title: "Bảng Giá Dịch Vụ SEO",
//       subtitle: "Linh hoạt theo quy mô và mục tiêu của doanh nghiệp",
//       packages: [
//         { id: "basic", name: "SEO Cơ Bản", price: "8.000.000", priceNote: "đ/tháng",
//           features: ["20 từ khóa mục tiêu", "Tối ưu On-page", "10 backlinks/tháng", "Báo cáo tháng", "Email support"],
//           ctaText: "Bắt Đầu Ngay" },
//         { id: "pro", name: "SEO Chuyên Nghiệp", price: "18.000.000", priceNote: "đ/tháng", isPopular: true,
//           features: ["50 từ khóa mục tiêu", "On-page + Technical SEO", "30 backlinks/tháng", "8 bài content/tháng", "Báo cáo tuần", "Hotline 24/7", "Dashboard real-time"],
//           ctaText: "Tư Vấn Ngay" },
//         { id: "ent", name: "SEO Doanh Nghiệp", price: "Liên hệ",
//           features: ["Không giới hạn từ khóa", "Chiến lược toàn diện", "Content factory", "Link building cao cấp", "Chuyên gia riêng", "SLA cam kết"],
//           ctaText: "Liên Hệ Tư Vấn" },
//       ],
//     },
//     process: {
//       title: "Quy Trình Triển Khai SEO",
//       steps: [
//         { stepNumber: 1, icon: "🔍", title: "Audit & Phân Tích", description: "Kiểm tra toàn diện website, phân tích đối thủ, nghiên cứu từ khóa chuyên sâu.", duration: "3-5 ngày" },
//         { stepNumber: 2, icon: "📋", title: "Xây Dựng Chiến Lược", description: "Lập kế hoạch SEO 6 tháng, xác định từ khóa mục tiêu và roadmap nội dung.", duration: "2-3 ngày" },
//         { stepNumber: 3, icon: "⚙️", title: "Triển Khai Kỹ Thuật", description: "Tối ưu tốc độ, cấu trúc website, schema markup, Core Web Vitals.", duration: "1-2 tuần" },
//         { stepNumber: 4, icon: "✍️", title: "Content & Links", description: "Sản xuất nội dung chuẩn E-E-A-T, xây dựng hệ thống backlink chất lượng cao.", duration: "Liên tục" },
//         { stepNumber: 5, icon: "📊", title: "Đo Lường & Tối Ưu", description: "Theo dõi KPI hàng tuần, điều chỉnh chiến thuật dựa trên data thực tế.", duration: "Liên tục" },
//       ],
//     },
//     awards: {
//       title: "Được Công Nhận Bởi Các Tổ Chức Uy Tín",
//       items: [
//         { name: "Top SEO Agency 2024", organization: "Clutch", year: "2024" },
//         { name: "Google Premier Partner", organization: "Google", year: "2024" },
//         { name: "Best Digital Agency", organization: "Vietnam Digital Awards", year: "2023" },
//       ],
//     },
//     team: {
//       title: "115+ Chuyên Gia SEO Hàng Đầu",
//       subtitle: "Bình quân 5 năm kinh nghiệm, chuyên sâu từng ngành",
//       experts: [
//         { name: "Nguyễn Minh Tuấn", role: "Head of SEO", avatarUrl: "/team/tuan.jpg", experience: "10 năm", specialties: ["Technical SEO", "E-commerce SEO"] },
//         { name: "Trần Thị Lan", role: "Content Strategist", avatarUrl: "/team/lan.jpg", experience: "7 năm", specialties: ["Content Marketing", "E-E-A-T"] },
//         { name: "Lê Hoàng Nam", role: "SEO Data Analyst", avatarUrl: "/team/nam.jpg", experience: "6 năm", specialties: ["Data Analytics", "AI SEO"] },
//       ],
//     },
//     ctaSection: {
//       title: "Bắt Đầu Tăng Thứ Hạng Google Ngay Hôm Nay",
//       subtitle: "Tư vấn miễn phí trong 24h — Không cam kết, không ràng buộc",
//       ctaText: "Nhận Tư Vấn Miễn Phí",
//       ctaUrl: "#form",
//       formEnabled: true,
//     },
//   },

//   // ── SLUG 2: Thiết kế website ─────────────────────────────
//   "thiet-ke-website": {
//     id: "website", slug: "thiet-ke-website",
//     metaTitle: "Thiết Kế Website Chuyên Nghiệp | Chuẩn SEO, Bàn Giao 7 Ngày",
//     metaDescription: "Thiết kế website đẹp, chuẩn SEO, responsive. Bàn giao trong 7-14 ngày làm việc.",
//     hero: {
//       badge: "Bàn giao 7 ngày",
//       title: "Thiết Kế Website",
//       highlightText: "Chuyên Nghiệp",
//       subtitle: "Giao diện độc quyền theo brand của bạn, chuẩn SEO, tốc độ cao. Bàn giao trong 7-14 ngày làm việc — bảo hành 12 tháng.",
//       ctaText: "Nhận Báo Giá Ngay",
//       ctaUrl: "#form",
//       ctaSecondaryText: "Xem Portfolio",
//       ctaSecondaryUrl: "/portfolio",
//       heroImageUrl: "/images/service-web-hero.png",
//       stats: [
//         { value: "500+", label: "website đã bàn giao" },
//         { value: "99%", label: "khách hàng hài lòng" },
//         { value: "7 ngày", label: "bàn giao cơ bản" },
//       ],
//     },
//     highlights: [
//       { icon: "🎨", title: "Thiết Kế Độc Quyền", description: "Giao diện thiết kế riêng theo brand của bạn, tuyệt đối không dùng template có sẵn." },
//       { icon: "📱", title: "Responsive Hoàn Hảo", description: "Hiển thị chuẩn trên mọi thiết bị: mobile, tablet và máy tính." },
//       { icon: "⚡", title: "PageSpeed 90+", description: "Core Web Vitals đạt chuẩn Google, tốc độ tải trang dưới 2 giây." },
//       { icon: "🔐", title: "Bảo Mật SSL", description: "Cài đặt SSL miễn phí, bảo mật toàn diện dữ liệu khách hàng." },
//       { icon: "🛠️", title: "Bảo Hành 12 Tháng", description: "Hỗ trợ kỹ thuật miễn phí trong năm đầu, sửa lỗi trong 24h." },
//       { icon: "📦", title: "CMS Dễ Dùng", description: "Cập nhật nội dung không cần biết code, giao diện quản lý trực quan." },
//     ],
//     clientStats: {
//       totalClients: "500+",
//       description: "website đã được thiết kế và bàn giao thành công",
//       logos: [
//         { name: "Client A", logoUrl: "/logos/client-a.png" },
//         { name: "Client B", logoUrl: "/logos/client-b.png" },
//         { name: "Client C", logoUrl: "/logos/client-c.png" },
//       ],
//     },
//     pricing: {
//       title: "Bảng Giá Thiết Kế Website",
//       subtitle: "Phù hợp với mọi quy mô từ startup đến doanh nghiệp lớn",
//       packages: [
//         { id: "landing", name: "Landing Page", price: "3.000.000", priceNote: "đ/trang",
//           features: ["1 trang landing", "Responsive mobile", "Form liên hệ", "SSL miễn phí", "Bàn giao 3 ngày"],
//           ctaText: "Đặt Ngay" },
//         { id: "standard", name: "Website Chuẩn", price: "12.000.000", isPopular: true,
//           features: ["5-10 trang thiết kế", "Thiết kế độc quyền", "CMS WordPress/NextJS", "SEO On-page cơ bản", "Google Analytics", "Bảo hành 12 tháng", "Bàn giao 7 ngày"],
//           ctaText: "Tư Vấn Ngay" },
//         { id: "ecommerce", name: "Website Thương Mại", price: "Liên hệ",
//           features: ["Không giới hạn trang", "E-commerce tích hợp", "Cổng thanh toán VNPay/Momo", "Quản lý kho hàng", "PWA Mobile App", "Hỗ trợ 24/7"],
//           ctaText: "Liên Hệ Ngay" },
//       ],
//     },
//     process: {
//       title: "Quy Trình Làm Website",
//       steps: [
//         { stepNumber: 1, icon: "💬", title: "Tư Vấn & Báo Giá", description: "Trao đổi nhu cầu, tư vấn giải pháp phù hợp, gửi báo giá chi tiết.", duration: "1 ngày" },
//         { stepNumber: 2, icon: "🎨", title: "Thiết Kế UI/UX", description: "Thiết kế mockup, lấy ý kiến và chỉnh sửa đến khi bạn hài lòng 100%.", duration: "2-3 ngày" },
//         { stepNumber: 3, icon: "💻", title: "Lập Trình", description: "Code website theo thiết kế đã duyệt, responsive, tối ưu tốc độ và SEO.", duration: "3-5 ngày" },
//         { stepNumber: 4, icon: "✅", title: "Kiểm Tra & Bàn Giao", description: "Test kỹ lưỡng, hướng dẫn sử dụng CMS, bàn giao source code hoàn chỉnh.", duration: "1-2 ngày" },
//       ],
//     },
//     awards: {
//       title: "Chứng Nhận & Đối Tác",
//       items: [
//         { name: "Top Web Design Agency", organization: "Clutch", year: "2024" },
//         { name: "Google Partner", organization: "Google", year: "2024" },
//       ],
//     },
//     team: {
//       title: "Đội Ngũ Thiết Kế & Lập Trình",
//       subtitle: "Kết hợp sáng tạo và kỹ thuật để tạo ra website ấn tượng nhất",
//       experts: [
//         { name: "Phạm Thu Hằng", role: "Lead UI/UX Designer", avatarUrl: "/team/hang.jpg", experience: "8 năm", specialties: ["UI Design", "Brand Identity"] },
//         { name: "Vũ Đức Anh", role: "Senior Frontend Dev", avatarUrl: "/team/anh.jpg", experience: "6 năm", specialties: ["NextJS", "Performance"] },
//         { name: "Bùi Ngọc Mai", role: "Project Manager", avatarUrl: "/team/mai.jpg", experience: "5 năm", specialties: ["Agile", "Client Success"] },
//       ],
//     },
//     ctaSection: {
//       title: "Sẵn Sàng Ra Mắt Website Ấn Tượng?",
//       subtitle: "Nhận báo giá chi tiết trong 2 giờ làm việc — Miễn phí 100%",
//       ctaText: "Nhận Báo Giá Miễn Phí",
//       ctaUrl: "#form",
//       formEnabled: true,
//     },
//   },
// };