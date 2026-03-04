const services = [
  {
    icon: '🚀',
    title: 'Digital Strategy',
    description: 'Chiến lược số hóa toàn diện, tối ưu hóa hiện diện trực tuyến của thương hiệu.',
    features: ['Data-driven insights', 'Competitor analysis', 'Growth roadmap'],
  },
  {
    icon: '🎨',
    title: 'Creative Content',
    description: 'Nội dung sáng tạo, thu hút với công nghệ AI và đội ngũ chuyên gia hàng đầu.',
    features: ['AI-powered creation', 'Multi-platform content', 'Viral campaigns'],
  },
  {
    icon: '📊',
    title: 'Performance Marketing',
    description: 'Marketing hiệu suất cao với ROI đo lường được và tối ưu hóa liên tục.',
    features: ['Real-time analytics', 'A/B testing', 'Conversion optimization'],
  },
  {
    icon: '🎬',
    title: 'Video Production',
    description: 'Sản xuất video chuyên nghiệp từ concept đến post-production.',
    features: ['4K/8K production', 'Motion graphics', 'Live streaming'],
  },
  {
    icon: '🤖',
    title: 'AI & Automation',
    description: 'Tự động hóa quy trình marketing với công nghệ AI và machine learning.',
    features: ['Chatbot integration', 'Auto-posting systems', 'Predictive analytics'],
  },
  {
    icon: '🎯',
    title: 'Brand Development',
    description: 'Xây dựng và phát triển thương hiệu mạnh mẽ, nhất quán trên mọi kênh.',
    features: ['Brand identity', 'Guidelines creation', 'Market positioning'],
  },
];

export function ServicesSection() {
  return (
    <section className="py-32 px-4 relative" id="services">
      <div className="text-center mb-20">
        <span className="inline-block px-5 py-2 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-xs font-bold tracking-widest uppercase mb-5 font-['Nunito_Sans']">
          Our Services
        </span>
        <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-snug mb-6 text-[#1A1A1A]">
          Giải Pháp Truyền Thông<br />Toàn Diện
        </h2>
        <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] max-w-[680px] mx-auto leading-[1.85]">
          Kết hợp công nghệ AI, dữ liệu lớn và chiến lược sáng tạo để mang đến hiệu quả vượt trội cho thương hiệu của bạn.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ icon, title, description, features }) => (
          <div
            key={title}
            className="group relative p-10 bg-white/80 backdrop-blur-xl border border-[rgba(10,147,150,0.15)] rounded-2xl shadow-[0_4px_20px_rgba(10,147,150,0.08)] transition-all duration-400 hover:-translate-y-2.5 hover:border-[#0A9396] hover:bg-white/95 hover:shadow-[0_12px_40px_rgba(10,147,150,0.15)] overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-[#0A9396] to-[#94D2BD] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

            <div className="w-14 h-14 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center text-2xl mb-6">
              {icon}
            </div>
            <h3 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.02em] mb-3 text-[#1A1A1A]">
              {title}
            </h3>
            <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-[1.75] mb-6">
              {description}
            </p>
            <ul className="space-y-1">
              {features.map((f) => (
                <li
                  key={f}
                  className="font-['Nunito_Sans'] text-[#6C757D] text-sm font-medium flex items-center gap-3 py-1"
                >
                  <span className="text-[#0A9396] font-bold shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}