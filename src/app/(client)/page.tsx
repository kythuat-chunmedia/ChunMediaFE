import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { mockPortfolios, mockConfigSite, partners } from '@/app/(client)/lib/mockData';
import { formatNumber } from '@/app/(client)/lib/api';

export default function HomePage() {
  const featuredPortfolios = mockPortfolios.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Communication Agency
            </h1>
            <p className="text-lg lg:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="btn-outline gap-2"
              >
                <Play size={18} />
                Xem Showreel
              </Link>
              <Link
                href="/lien-he"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                Liên Hệ Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Về Chúng Tôi
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Với hơn 10 năm kinh nghiệm trong ngành truyền thông, chúng tôi tự hào là đối tác tin cậy 
              của hàng trăm thương hiệu lớn nhỏ. Chúng tôi chuyên cung cấp các giải pháp truyền thông 
              toàn diện từ PR, Marketing, sản xuất Video đến tổ chức Sự kiện.
            </p>
            <Link
              href="/gioi-thieu"
              className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              Tìm hiểu thêm
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dự Án Tiêu Biểu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những dự án thành công của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPortfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm card-hover"
              >
                <div className="image-zoom relative aspect-4/3">
                  <Image
                    src={portfolio.thumbnailUrl}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge badge-teal">
                      {portfolio.industry === 'Fashion' ? 'Marketing' : 
                       portfolio.industry === 'Technology' ? 'Sự Kiện' : 'Video'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {portfolio.title.split(' - ')[0]}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {portfolio.shortDescription}
                  </p>
                  <Link
                    href={`/portfolio/${portfolio.slug}`}
                    className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
                  >
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="btn-primary"
            >
              Xem Tất Cả Dự Án
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Đối Tác Của Chúng Tôi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những thương hiệu đã tin tưởng và hợp tác cùng chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="relative w-24 h-16">
                  <Image
                    src={partner}
                    alt={`Partner ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
