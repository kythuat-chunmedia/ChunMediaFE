import Link from 'next/link';
import { Metadata } from 'next';
import { Megaphone, BarChart3, Video, Calendar, Check } from 'lucide-react';
import { services, processSteps } from '@/config/site.config';

export const metadata: Metadata = {
  title: 'Dịch Vụ',
  description: 'Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp',
};

const iconMap: { [key: string]: React.ReactNode } = {
  megaphone: <Megaphone className="w-8 h-8 text-primary-600" />,
  chart: <BarChart3 className="w-8 h-8 text-primary-600" />,
  video: <Video className="w-8 h-8 text-primary-600" />,
  calendar: <Calendar className="w-8 h-8 text-primary-600" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-header-title">Dịch Vụ</h1>
          <p className="page-header-subtitle">
            Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.title.toLowerCase().replace(/[^a-z]/g, '-')}
                className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center">
                      {iconMap[service.icon]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="section-title">Quy Trình Triển Khai</h2>
          <p className="section-subtitle">
            Quy trình làm việc chuyên nghiệp và hiệu quả
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn Sàng Bắt Đầu Dự Án?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Liên Hệ Ngay
          </Link>
        </div>
      </section>
    </>
  );
}
