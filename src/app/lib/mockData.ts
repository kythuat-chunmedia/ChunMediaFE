import { Banner, CategoryNew, New, ConfigSite, Menu } from '@/app/types';

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
// export const mockMenus: Menu[] = [
//   { id: 1, title: 'Trang Chủ', sortOrder: 1, isActive: true, createdAt: '2024-01-01' },
//   { id: 2, title: 'Giới Thiệu', sortOrder: 2, isActive: true, createdAt: '2024-01-01' },
//   { id: 3, title: 'Dịch Vụ', sortOrder: 3, isActive: true, createdAt: '2024-01-01' },
//   { id: 4, title: 'Portfolio', sortOrder: 4, isActive: true, createdAt: '2024-01-01' },
//   { id: 5, title: 'Tin Tức', sortOrder: 5, isActive: true, createdAt: '2024-01-01' },
//   { id: 6, title: 'Liên Hệ', sortOrder: 6, isActive: true, createdAt: '2024-01-01' }
// ];

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
