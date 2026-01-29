import Link from 'next/link';
import { Megaphone, TrendingUp, Video, Calendar, Check, ArrowRight } from 'lucide-react';
import { servicesData, processSteps } from '@/app/(client)/lib/mockData';

export const metadata = {
  title: 'Dịch Vụ | Communication Agency',
  description: 'Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp.',
};

const iconMap: Record<string, React.ReactNode> = {
  megaphone: <Megaphone className="w-8 h-8 text-teal-600" />,
  'trending-up': <TrendingUp className="w-8 h-8 text-teal-600" />,
  video: <Video className="w-8 h-8 text-teal-600" />,
  calendar: <Calendar className="w-8 h-8 text-teal-600" />,
};

export default function ServicesPage() {
  const services = [
    servicesData.pr,
    servicesData.marketing,
    servicesData.video,
    servicesData.event,
  ];

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Dịch Vụ</h1>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                id={service.icon === 'megaphone' ? 'pr' : 
                    service.icon === 'trending-up' ? 'marketing' :
                    service.icon === 'video' ? 'video' : 'event'}
                className="bg-gray-50 rounded-2xl p-8 lg:p-10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                    {iconMap[service.icon]}
                  </div>

                  {/* Content */}
                  <div className="grow">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-3">
                      {service.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-white" />
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Quy Trình Triển Khai
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quy trình làm việc chuyên nghiệp và hiệu quả
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-6"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Sẵn Sàng Bắt Đầu Dự Án?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
          </p>
          <Link
            href="/lien-he"
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Liên Hệ Ngay
          </Link>
        </div>
      </section>
    </>
  );
}
