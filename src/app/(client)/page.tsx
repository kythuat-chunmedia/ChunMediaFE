import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { portfolioItems, siteConfig } from '@/app/(client)/config/site.config';

export default function HomePage() {
  const featuredPortfolio = portfolioItems.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
              Communication Agency
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 animate-fadeInUp delay-100">
              Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp delay-200">
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <Play className="w-5 h-5" />
                Xem Showreel
              </Link>
              <Link
                href="/lien-he"
                className="btn-outline-white"
              >
                Liên Hệ Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Về Chúng Tôi</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Với hơn 10 năm kinh nghiệm trong ngành truyền thông, chúng tôi tự hào là đối tác tin cậy của hàng trăm thương hiệu lớn nhỏ. Chúng tôi chuyên cung cấp các giải pháp truyền thông toàn diện từ PR, Marketing, sản xuất Video đến tổ chức Sự kiện.
            </p>
            <Link
              href="/gioi-thieu"
              className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Tìm hiểu thêm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="section-title">Dự Án Tiêu Biểu</h2>
          <p className="section-subtitle">
            Những dự án thành công của chúng tôi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPortfolio.map((item) => (
              <div key={item.id} className="card card-hover overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                  >
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/portfolio" className="btn-primary">
              Xem Tất Cả Dự Án
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Đối Tác Của Chúng Tôi</h2>
          <p className="section-subtitle">
            Những thương hiệu đã tin tưởng và hợp tác cùng chúng tôi
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={`https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200`}
                  alt={`Partner ${i}`}
                  width={120}
                  height={60}
                  className="object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
