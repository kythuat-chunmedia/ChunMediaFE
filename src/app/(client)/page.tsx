export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { OutstandingPortfolio } from '@/app/components/client/home/OutstandingPortfolio';
import { clientApi } from '../lib/api';
import { Partner } from '@/app/types';
import SeoMetadataSetter from '../lib/helper/SeoMetadataSetter';


export default async function HomePage() {
  const portfolios = await clientApi.getPortfolios();

  // Fetch real partner data
  let partners: Partner[] = [];

  try {
    const data = await clientApi.getPartnerPublic();
    partners = data || [];
  } catch (error) {
    console.error('Failed to fetch partners:', error);
  }

  return (
    <>
<SeoMetadataSetter />

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
      <OutstandingPortfolio portfolios={portfolios} />

      {/* Partners Section */}
      {partners.length > 0 && (
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
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className="relative w-24 h-16">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}