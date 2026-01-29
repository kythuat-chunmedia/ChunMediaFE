import { Banner, CategoryNew, New, Portfolio, ConfigSite, Menu } from '@/app/(client)/types';

// Mock Banners
export const mockBanners: Banner[] = [
  {
    id: 1,
    title: 'Communication Agency - Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    link: '/',
    sortOrder: 1,
    isActive: true,
    createdAt: '2024-01-01'
  }
];

// Mock Category News
export const mockCategoryNews: CategoryNew[] = [
  { id: 1, name: 'Blog Chuyên Môn', description: 'Các bài viết chuyên môn', isActive: true, createdAt: '2024-01-01' },
  { id: 2, name: 'Tin Nội Bộ', description: 'Tin tức nội bộ công ty', isActive: true, createdAt: '2024-01-01' },
  { id: 3, name: 'Tuyển Dụng', description: 'Tin tuyển dụng', isActive: true, createdAt: '2024-01-01' }
];

// Mock News
export const mockNews: New[] = [
  {
    id: 1,
    title: 'Xu hướng Marketing Digital 2024',
    description: 'Khám phá những xu hướng marketing digital mới nhất trong năm 2024 và cách áp dụng vào chiến lược của bạn.',
    url: 'xu-huong-marketing-digital-2024',
    view: 1250,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    author: 'Nguyễn Văn A',
    content: `<p>Năm 2024 đánh dấu sự phát triển mạnh mẽ của marketing digital với nhiều xu hướng mới và công nghệ tiên tiến. Trong bài viết này, chúng tôi sẽ chia sẻ những xu hướng quan trọng nhất mà các marketer cần nắm bắt.</p>
    
<h2>1. AI và Machine Learning trong Marketing</h2>
<p>Trí tuệ nhân tạo đang thay đổi cách chúng ta tiếp cận marketing. Từ việc phân tích dữ liệu khách hàng đến tự động hóa quy trình, AI giúp tối ưu hóa hiệu quả và tăng ROI.</p>

<h2>2. Video Marketing Tiếp Tục Phát Triển</h2>
<p>Video vẫn là format nội dung được ưa chuộng nhất. Short-form video trên TikTok, Instagram Reels và YouTube Shorts đang thu hút lượng lớn người dùng.</p>

<h2>3. Personalization ở Mức Độ Cao</h2>
<p>Khách hàng ngày càng mong đợi trải nghiệm được cá nhân hóa. Marketing automation và data analytics giúp tạo ra những thông điệp phù hợp với từng đối tượng.</p>

<h2>4. Social Commerce</h2>
<p>Mua sắm trực tiếp trên social media đang trở thành xu hướng. Các nền tảng như Facebook Shop, Instagram Shopping giúp rút ngắn customer journey.</p>

<h2>5. Sustainability Marketing</h2>
<p>Người tiêu dùng ngày càng quan tâm đến tính bền vững. Các thương hiệu cần thể hiện cam kết về môi trường và xã hội trong chiến lược marketing.</p>

<p>Kết luận, để thành công trong marketing digital 2024, các doanh nghiệp cần nắm bắt và áp dụng những xu hướng này một cách linh hoạt và sáng tạo.</p>`,
    isActive: true,
    sortOrder: 1,
    categoryNewId: 1,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Cách xây dựng thương hiệu trên Social Media',
    description: 'Hướng dẫn chi tiết về cách xây dựng và phát triển thương hiệu hiệu quả trên các nền tảng social media.',
    url: 'cach-xay-dung-thuong-hieu-tren-social-media',
    view: 980,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    author: 'Trần Thị B',
    content: '<p>Content về xây dựng thương hiệu trên social media...</p>',
    isActive: true,
    sortOrder: 2,
    categoryNewId: 1,
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Tuyển dụng: Senior Marketing Manager',
    description: 'Chúng tôi đang tìm kiếm một Senior Marketing Manager với kinh nghiệm 5+ năm trong ngành.',
    url: 'tuyen-dung-senior-marketing-manager',
    view: 540,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    author: 'HR Team',
    content: '<p>Chi tiết về vị trí tuyển dụng...</p>',
    isActive: true,
    sortOrder: 3,
    categoryNewId: 3,
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    title: 'Sự kiện Team Building 2024',
    description: 'Tổng kết sự kiện team building đầu năm với nhiều hoạt động thú vị và gắn kết đội ngũ.',
    url: 'su-kien-team-building-2024',
    view: 320,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    author: 'Admin',
    content: '<p>Nội dung về sự kiện team building...</p>',
    isActive: true,
    sortOrder: 4,
    categoryNewId: 2,
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    title: 'Video Marketing: Từ Concept đến Production',
    description: 'Chia sẻ quy trình sản xuất video marketing chuyên nghiệp từ ý tưởng đến thành phẩm cuối cùng.',
    url: 'video-marketing-tu-concept-den-production',
    view: 780,
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80',
    author: 'Lê Văn C',
    content: '<p>Nội dung về quy trình sản xuất video...</p>',
    isActive: true,
    sortOrder: 5,
    categoryNewId: 1,
    createdAt: '2024-01-02'
  },
  {
    id: 6,
    title: 'Tuyển dụng: Video Editor',
    description: 'Cơ hội nghề nghiệp cho Video Editor với kỹ năng After Effects và Premiere Pro.',
    url: 'tuyen-dung-video-editor',
    view: 420,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    author: 'HR Team',
    content: '<p>Chi tiết vị trí Video Editor...</p>',
    isActive: true,
    sortOrder: 6,
    categoryNewId: 3,
    createdAt: '2023-12-28'
  }
];

// Mock Portfolios
export const mockPortfolios: Portfolio[] = [
  {
    id: 1,
    slug: 'chien-dich-marketing-digital-cho-thuong-hieu-a',
    title: 'Chiến dịch Marketing Digital cho Thương hiệu A',
    seoTitle: 'Chiến dịch Marketing Digital - Thương hiệu A',
    seoDescription: 'Chiến dịch marketing digital toàn diện cho thương hiệu thời trang hàng đầu',
    shortDescription: 'Chiến dịch marketing digital toàn diện với focus vào social media và influencer marketing.',
    content: `<h2>Tổng Quan Dự Án</h2>
<p>Đây là một dự án marketing digital quy mô lớn được triển khai cho thương hiệu thời trang hàng đầu. Chiến dịch tập trung vào việc xây dựng nhận thức thương hiệu và tăng doanh số bán hàng thông qua các kênh digital marketing.</p>

<p>Chúng tôi đã triển khai một chiến lược đa kênh bao gồm:</p>
<ul>
<li>Social Media Marketing trên Facebook, Instagram, TikTok</li>
<li>Influencer Marketing với 50+ KOLs và influencers</li>
<li>Content Marketing với 100+ bài viết và video</li>
<li>Paid Advertising với budget tối ưu</li>
<li>SEO và SEM để tăng visibility</li>
</ul>

<p>Kết quả đạt được vượt ngoài mong đợi với các chỉ số KPI ấn tượng.</p>`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    clientName: 'Thương hiệu A',
    industry: 'Fashion',
    year: 2024,
    reach: 5000000,
    engagement: 500000,
    conversionRate: 15,
    orderQuantity: 2500,
    revenue: 5000000000,
    isPublished: true,
    publishedAt: '2024-01-01',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 2,
    slug: 'su-kien-product-launch-thuong-hieu-b',
    title: 'Sự kiện Product Launch - Thương hiệu B',
    seoTitle: 'Sự kiện Product Launch - Thương hiệu B',
    seoDescription: 'Tổ chức sự kiện ra mắt sản phẩm công nghệ mới',
    shortDescription: 'Tổ chức sự kiện ra mắt sản phẩm công nghệ mới với 1000+ khách tham dự.',
    content: '<p>Nội dung chi tiết về sự kiện product launch...</p>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
    clientName: 'Thương hiệu B',
    industry: 'Technology',
    year: 2024,
    reach: 2000000,
    engagement: 200000,
    conversionRate: 25,
    orderQuantity: 1500,
    revenue: 3000000000,
    isPublished: true,
    publishedAt: '2024-01-01',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 3,
    slug: 'video-quang-cao-tvc-thuong-hieu-c',
    title: 'Video Quảng cáo TVC - Thương hiệu C',
    seoTitle: 'Video Quảng cáo TVC - Thương hiệu C',
    seoDescription: 'Sản xuất video quảng cáo TVC phát sóng trên các kênh truyền hình',
    shortDescription: 'Sản xuất video quảng cáo TVC phát sóng trên các kênh truyền hình và digital.',
    content: '<p>Nội dung chi tiết về video TVC...</p>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80',
    clientName: 'Thương hiệu C',
    industry: 'F&B',
    year: 2023,
    reach: 10000000,
    engagement: 1000000,
    conversionRate: 12,
    orderQuantity: 5000,
    revenue: 8000000000,
    isPublished: true,
    publishedAt: '2023-12-01',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-01'
  },
  {
    id: 4,
    slug: 'chien-dich-pr-cho-thuong-hieu-d',
    title: 'Chiến dịch PR cho Thương hiệu D',
    seoTitle: 'Chiến dịch PR - Thương hiệu D',
    seoDescription: 'Chiến dịch PR toàn diện với focus vào truyền thông và quan hệ báo chí',
    shortDescription: 'Chiến dịch PR toàn diện với focus vào truyền thông và quan hệ báo chí.',
    content: '<p>Nội dung chi tiết về chiến dịch PR...</p>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80',
    clientName: 'Thương hiệu D',
    industry: 'Healthcare',
    year: 2023,
    reach: 3000000,
    engagement: 300000,
    conversionRate: 18,
    orderQuantity: 800,
    revenue: 2000000000,
    isPublished: true,
    publishedAt: '2023-11-01',
    createdAt: '2023-11-01',
    updatedAt: '2023-11-01'
  },
  {
    id: 5,
    slug: 'su-kien-corporate-event-cong-ty-e',
    title: 'Sự kiện Corporate Event - Công ty E',
    seoTitle: 'Sự kiện Corporate Event - Công ty E',
    seoDescription: 'Tổ chức sự kiện corporate với quy mô lớn cho khách hàng doanh nghiệp',
    shortDescription: 'Tổ chức sự kiện corporate với quy mô lớn cho khách hàng doanh nghiệp.',
    content: '<p>Nội dung chi tiết về sự kiện corporate...</p>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80',
    clientName: 'Công ty E',
    industry: 'Finance',
    year: 2023,
    reach: 1000000,
    engagement: 150000,
    conversionRate: 30,
    orderQuantity: 500,
    revenue: 1500000000,
    isPublished: true,
    publishedAt: '2023-10-01',
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01'
  },
  {
    id: 6,
    slug: 'video-social-media-campaign-thuong-hieu-f',
    title: 'Video Social Media Campaign - Thương hiệu F',
    seoTitle: 'Video Social Media Campaign - Thương hiệu F',
    seoDescription: 'Sản xuất series video cho chiến dịch social media marketing',
    shortDescription: 'Sản xuất series video cho chiến dịch social media marketing.',
    content: '<p>Nội dung chi tiết về video social media...</p>',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1920&q=80',
    clientName: 'Thương hiệu F',
    industry: 'Fashion',
    year: 2022,
    reach: 8000000,
    engagement: 800000,
    conversionRate: 20,
    orderQuantity: 3000,
    revenue: 4000000000,
    isPublished: true,
    publishedAt: '2022-12-01',
    createdAt: '2022-12-01',
    updatedAt: '2022-12-01'
  }
];

// Mock Config Site
export const mockConfigSite: ConfigSite = {
  id: 1,
  title: 'Communication Agency',
  email: 'info@communication.vn',
  hotline: '0123 456 789',
  description: 'Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.',
  infoContact: '123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh, Việt Nam',
  infoFooter: 'Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.',
  image: '/images/logo.png',
  favicon: '/favicon.ico',
  googleMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.231240416691!2d106.80047931533432!3d10.870008892254776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sCông%20Viên%20Phần%20Mềm%20Quang%20Trung!5e0!3m2!1svi!2s!4v1623912345678!5m2!1svi!2s',
  googleAnalytics: '',
  place: 'Thành phố Hồ Chí Minh',
  aboutImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  aboutText: 'Với hơn 10 năm kinh nghiệm trong ngành truyền thông, chúng tôi tự hào là đối tác tin cậy của hàng trăm thương hiệu lớn nhỏ.',
  aboutUrl: '/gioi-thieu',
  facebook: 'https://facebook.com',
  zalo: '0123456789',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  tiktok: 'https://tiktok.com',
  twitter: 'https://twitter.com',
  x: 'https://x.com',
  youtube: 'https://youtube.com',
  pinterest: 'https://pinterest.com',
  liveChat: ''
};

// Mock Menus
export const mockMenus: Menu[] = [
  { id: 1, title: 'Trang Chủ', sortOrder: 1, isActive: true, createdAt: '2024-01-01' },
  { id: 2, title: 'Giới Thiệu', sortOrder: 2, isActive: true, createdAt: '2024-01-01' },
  { id: 3, title: 'Dịch Vụ', sortOrder: 3, isActive: true, createdAt: '2024-01-01' },
  { id: 4, title: 'Portfolio', sortOrder: 4, isActive: true, createdAt: '2024-01-01' },
  { id: 5, title: 'Tin Tức', sortOrder: 5, isActive: true, createdAt: '2024-01-01' },
  { id: 6, title: 'Liên Hệ', sortOrder: 6, isActive: true, createdAt: '2024-01-01' }
];

// Services data
export const servicesData = {
  pr: {
    icon: 'megaphone',
    title: 'PR (Public Relations)',
    description: 'Xây dựng và quản lý hình ảnh thương hiệu thông qua các hoạt động quan hệ công chúng chuyên nghiệp.',
    features: [
      'Quan hệ báo chí & truyền thông',
      'Xây dựng nội dung PR',
      'Quan hệ cộng đồng & CSR',
      'Quản lý khủng hoảng truyền thông',
      'Tổ chức họp báo & sự kiện PR'
    ]
  },
  marketing: {
    icon: 'trending-up',
    title: 'Marketing',
    description: 'Chiến lược marketing toàn diện từ nghiên cứu thị trường đến triển khai các chiến dịch hiệu quả.',
    features: [
      'Nghiên cứu thị trường & khách hàng',
      'Digital Marketing',
      'Social Media Marketing',
      'Chiến lược thương hiệu',
      'Content Marketing',
      'SEO & SEM'
    ]
  },
  video: {
    icon: 'video',
    title: 'Sản Xuất Video',
    description: 'Sản xuất video chuyên nghiệp từ concept đến hậu kỳ, phục vụ mọi nhu cầu truyền thông.',
    features: [
      'Video quảng cáo TVC',
      'Video sự kiện',
      'Video viral & social media',
      'Video giới thiệu sản phẩm',
      'Video doanh nghiệp',
      'Hậu kỳ & chỉnh sửa chuyên nghiệp'
    ]
  },
  event: {
    icon: 'calendar',
    title: 'Tổ Chức Sự Kiện',
    description: 'Tổ chức các sự kiện từ quy mô nhỏ đến lớn với đội ngũ chuyên nghiệp và trang thiết bị hiện đại.',
    features: [
      'Sự kiện ra mắt sản phẩm',
      'Triển lãm & trade show',
      'Team building & corporate events',
      'Hội nghị & hội thảo',
      'Sự kiện giải trí & âm nhạc',
      'Quản lý logistics & hậu cần'
    ]
  }
};

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
