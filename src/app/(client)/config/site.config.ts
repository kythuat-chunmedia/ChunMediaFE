import { MenuItem, ServiceItem, PortfolioItem, NewsItem, TeamMember, TimelineItem, AwardItem, ContactInfo } from '@/types';

export const siteConfig = {
  name: 'Communication',
  description: 'Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.',
  copyright: '© 2024 Communication. Tất cả quyền được bảo lưu.',
};

export const menuItems: MenuItem[] = [
  { id: '1', label: 'Trang Chủ', href: '/' },
  { id: '2', label: 'Giới Thiệu', href: '/gioi-thieu' },
  { id: '3', label: 'Dịch Vụ', href: '/dich-vu' },
  { id: '4', label: 'Portfolio', href: '/portfolio' },
  { id: '5', label: 'Tin Tức', href: '/tin-tuc' },
  { id: '6', label: 'Liên Hệ', href: '/lien-he' },
];

export const footerLinks = {
  quickLinks: [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Giới Thiệu', href: '/gioi-thieu' },
    { label: 'Dịch Vụ', href: '/dich-vu' },
    { label: 'Portfolio', href: '/portfolio' },
  ],
  services: [
    { label: 'PR', href: '/dich-vu#pr' },
    { label: 'Marketing', href: '/dich-vu#marketing' },
    { label: 'Video', href: '/dich-vu#video' },
    { label: 'Sự Kiện', href: '/dich-vu#su-kien' },
  ],
};

export const contactInfo: ContactInfo = {
  address: '123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh, Việt Nam',
  phones: ['0123 456 789', '0987 654 321'],
  emails: ['info@communication.vn', 'support@communication.vn'],
  workingHours: {
    weekdays: 'Thứ 2 - Thứ 6: 8:00 - 18:00',
    saturday: 'Thứ 7: 8:00 - 12:00',
    sunday: 'Chủ Nhật: Nghỉ',
  },
};

export const socialLinks = {
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  youtube: 'https://youtube.com',
};

export const services: ServiceItem[] = [
  {
    id: '1',
    icon: 'megaphone',
    title: 'PR (Public Relations)',
    description: 'Xây dựng và quản lý hình ảnh thương hiệu thông qua các hoạt động quan hệ công chúng chuyên nghiệp.',
    features: [
      'Quan hệ báo chí & truyền thông',
      'Quản lý khủng hoảng truyền thông',
      'Xây dựng nội dung PR',
      'Tổ chức họp báo & sự kiện PR',
      'Quan hệ cộng đồng & CSR',
    ],
  },
  {
    id: '2',
    icon: 'chart',
    title: 'Marketing',
    description: 'Chiến lược marketing toàn diện từ nghiên cứu thị trường đến triển khai các chiến dịch hiệu quả.',
    features: [
      'Nghiên cứu thị trường & khách hàng',
      'Chiến lược thương hiệu',
      'Digital Marketing',
      'Content Marketing',
      'Social Media Marketing',
      'SEO & SEM',
    ],
  },
  {
    id: '3',
    icon: 'video',
    title: 'Sản Xuất Video',
    description: 'Sản xuất video chuyên nghiệp từ concept đến hậu kỳ, phục vụ mọi nhu cầu truyền thông.',
    features: [
      'Video quảng cáo TVC',
      'Video giới thiệu sản phẩm',
      'Video sự kiện',
      'Video doanh nghiệp',
      'Video viral & social media',
      'Hậu kỳ & chỉnh sửa chuyên nghiệp',
    ],
  },
  {
    id: '4',
    icon: 'calendar',
    title: 'Tổ Chức Sự Kiện',
    description: 'Tổ chức các sự kiện từ quy mô nhỏ đến lớn với đội ngũ chuyên nghiệp và trang thiết bị hiện đại.',
    features: [
      'Sự kiện ra mắt sản phẩm',
      'Hội nghị & hội thảo',
      'Triển lãm & trade show',
      'Sự kiện giải trí & âm nhạc',
      'Team building & corporate events',
      'Quản lý logistics & hậu cần',
    ],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Chiến dịch Marketing Digital cho Thương hiệu A',
    category: 'Marketing',
    industry: 'Fashion',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    description: 'Chiến dịch marketing digital toàn diện với focus vào social media và influencer marketing.',
    stats: { reach: '5M+', engagement: '500K+', conversion: '15%' },
  },
  {
    id: '2',
    title: 'Sự kiện Product Launch - Thương hiệu B',
    category: 'Sự Kiện',
    industry: 'Technology',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    description: 'Tổ chức sự kiện ra mắt sản phẩm công nghệ mới với 1000+ khách tham dự.',
    stats: { reach: '2M+', engagement: '200K+', conversion: '25%' },
  },
  {
    id: '3',
    title: 'Video Quảng cáo TVC - Thương hiệu C',
    category: 'Video',
    industry: 'F&B',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600',
    description: 'Sản xuất video quảng cáo TVC phát sóng trên các kênh truyền hình và digital.',
    stats: { reach: '10M+', engagement: '1M+', conversion: '12%' },
  },
  {
    id: '4',
    title: 'Chiến dịch PR cho Thương hiệu D',
    category: 'PR',
    industry: 'Healthcare',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
    description: 'Chiến dịch PR toàn diện với focus vào truyền thông và quan hệ báo chí.',
    stats: { reach: '3M+', engagement: '300K+', conversion: '18%' },
  },
  {
    id: '5',
    title: 'Sự kiện Corporate Event - Công ty E',
    category: 'Sự Kiện',
    industry: 'Finance',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600',
    description: 'Tổ chức sự kiện corporate với quy mô lớn cho khách hàng doanh nghiệp.',
    stats: { reach: '1M+', engagement: '150K+', conversion: '30%' },
  },
  {
    id: '6',
    title: 'Video Social Media Campaign - Thương hiệu F',
    category: 'Video',
    industry: 'Fashion',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600',
    description: 'Sản xuất series video cho chiến dịch social media marketing.',
    stats: { reach: '8M+', engagement: '800K+', conversion: '20%' },
  },
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Xu hướng Marketing Digital 2024',
    category: 'Blog Chuyên Môn',
    excerpt: 'Khám phá những xu hướng marketing digital mới nhất trong năm 2024 và cách áp dụng vào chiến lược của bạn.',
    date: '15/01/2024',
    author: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=600',
  },
  {
    id: '2',
    title: 'Cách xây dựng thương hiệu trên Social Media',
    category: 'Blog Chuyên Môn',
    excerpt: 'Hướng dẫn chi tiết về cách xây dựng và phát triển thương hiệu hiệu quả trên các nền tảng social media.',
    date: '10/01/2024',
    author: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600',
  },
  {
    id: '3',
    title: 'Tuyển dụng: Senior Marketing Manager',
    category: 'Tuyển Dụng',
    excerpt: 'Chúng tôi đang tìm kiếm một Senior Marketing Manager với kinh nghiệm 5+ năm trong ngành.',
    date: '08/01/2024',
    author: 'HR Team',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600',
    isHiring: true,
  },
  {
    id: '4',
    title: 'Sự kiện Team Building 2024',
    category: 'Tin Nội Bộ',
    excerpt: 'Tổng kết sự kiện team building đầu năm với nhiều hoạt động thú vị và gắn kết đội ngũ.',
    date: '05/01/2024',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600',
  },
  {
    id: '5',
    title: 'Video Marketing: Từ Concept đến Production',
    category: 'Blog Chuyên Môn',
    excerpt: 'Chia sẻ quy trình sản xuất video marketing chuyên nghiệp từ ý tưởng đến thành phẩm cuối cùng.',
    date: '02/01/2024',
    author: 'Lê Văn C',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
  },
  {
    id: '6',
    title: 'Tuyển dụng: Video Editor',
    category: 'Tuyển Dụng',
    excerpt: 'Cơ hội nghề nghiệp cho Video Editor với kỹ năng After Effects và Premiere Pro.',
    date: '28/12/2023',
    author: 'HR Team',
    image: 'https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=600',
    isHiring: true,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    position: 'Giám đốc Điều hành',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '2',
    name: 'Trần Thị B',
    position: 'Giám đốc Sáng tạo',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    id: '3',
    name: 'Lê Văn C',
    position: 'Giám đốc Marketing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    position: 'Trưởng phòng PR',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
];

export const timeline: TimelineItem[] = [
  { year: '2014', title: 'Thành lập', description: 'Khởi đầu với đội ngũ 5 người' },
  { year: '2016', title: 'Mở rộng', description: 'Mở văn phòng tại Hà Nội và TP.HCM' },
  { year: '2019', title: 'Phát triển', description: 'Đạt 100+ dự án thành công' },
  { year: '2024', title: 'Hiện tại', description: 'Đội ngũ 50+ nhân sự, 500+ dự án' },
];

export const awards: AwardItem[] = [
  { year: '2024', title: 'Giải thưởng Agency của năm', organization: 'Hiệp hội Marketing Việt Nam' },
  { year: '2023', title: 'Chiến dịch Marketing xuất sắc', organization: 'Marketing Awards' },
  { year: '2022', title: 'Video quảng cáo hay nhất', organization: 'Video Awards Vietnam' },
  { year: '2021', title: 'Sự kiện sáng tạo nhất', organization: 'Event Awards' },
];

export const processSteps = [
  { step: 1, title: 'Tư Vấn & Nghiên Cứu', description: 'Gặp gỡ khách hàng, tìm hiểu nhu cầu và nghiên cứu thị trường, đối thủ.' },
  { step: 2, title: 'Lập Kế Hoạch', description: 'Xây dựng chiến lược và kế hoạch chi tiết, đề xuất giải pháp phù hợp.' },
  { step: 3, title: 'Triển Khai', description: 'Thực hiện dự án theo kế hoạch với đội ngũ chuyên nghiệp và quy trình chuẩn.' },
  { step: 4, title: 'Giám Sát & Tối Ưu', description: 'Theo dõi tiến độ, đo lường hiệu quả và tối ưu hóa trong quá trình triển khai.' },
  { step: 5, title: 'Báo Cáo & Đánh Giá', description: 'Tổng hợp kết quả, báo cáo chi tiết và đánh giá hiệu quả dự án.' },
];
