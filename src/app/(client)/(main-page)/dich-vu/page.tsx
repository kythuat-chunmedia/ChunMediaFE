// import Link from 'next/link';
// import { Megaphone, TrendingUp, Video, Calendar, Check, ArrowRight, ScanHeart } from 'lucide-react';
// import { clientApi } from '@/app/lib/api';
// import { Service } from '@/app/types';

// export const metadata = {
//   title: 'Dịch Vụ | Communication Agency',
//   description: 'Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp.',
// };

// // Map icon name to component
// const iconMap: Record<string, React.ReactNode> = {
//   'fa-megaphone': <Megaphone className="w-8 h-8 text-teal-600" />,
//   'fa-trending-up': <TrendingUp className="w-8 h-8 text-teal-600" />,
//   'fa-video': <Video className="w-8 h-8 text-teal-600" />,
//   'fa-calendar': <Calendar className="w-8 h-8 text-teal-600" />,
//   'megaphone': <Megaphone className="w-8 h-8 text-teal-600" />,
//   'trending-up': <TrendingUp className="w-8 h-8 text-teal-600" />,
//   'video': <Video className="w-8 h-8 text-teal-600" />,
//   'scanheart': <ScanHeart className="w-8 h-8 text-teal-600" />,
//   'calendar': <Calendar className="w-8 h-8 text-teal-600" />,
// };

// // Default icon nếu không match
// const DefaultIcon = () => <Megaphone className="w-8 h-8 text-teal-600" />;
// // Quy trình triển khai (có thể tạo API riêng nếu cần)
// const processSteps = [
//   {
//     step: 1,
//     title: 'Tư Vấn & Phân Tích',
//     description: 'Lắng nghe và phân tích nhu cầu, mục tiêu của khách hàng để đưa ra giải pháp phù hợp nhất.',
//   },
//   {
//     step: 2,
//     title: 'Lập Kế Hoạch',
//     description: 'Xây dựng chiến lược và kế hoạch chi tiết với timeline và KPIs cụ thể.',
//   },
//   {
//     step: 3,
//     title: 'Triển Khai',
//     description: 'Thực hiện theo kế hoạch với sự giám sát chặt chẽ và báo cáo định kỳ.',
//   },
//   {
//     step: 4,
//     title: 'Đánh Giá & Tối Ưu',
//     description: 'Đo lường kết quả, đánh giá hiệu quả và tối ưu hóa liên tục.',
//   },
// ];

// export default async function ServicesPage() {
//   // ✅ Fetch services từ API
//   let services: Service[] = [];

//   try {
//     services = await clientApi.getServicesPublic();
//   } catch (error) {
//     console.error('Failed to fetch services:', error);
//   }

//   // Filter chỉ lấy services active và sort theo displayOrder
//   const activeServices = services
//     .filter((s) => s.isActive)
//     .sort((a, b) => a.displayOrder - b.displayOrder);

//   return (
//     <>
//       {/* Page Header */}
//       <section className="page-header-gradient text-white py-16 lg:py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl lg:text-4xl font-bold mb-4">Dịch Vụ</h1>
//           <p className="text-teal-100 max-w-2xl mx-auto">
//             Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp
//           </p>
//         </div>
//       </section>

//       {/* Services List */}
//       <section className="section-padding bg-white">
//         <div className="container mx-auto px-4">
//           {activeServices.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">Chưa có dịch vụ nào</p>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {activeServices.map((service) => {
//                 // Tạo slug từ title để làm id
//                 const slug = service.title
//                   .toLowerCase()
//                   .normalize('NFD')
//                   .replace(/[\u0300-\u036f]/g, '')
//                   .replace(/đ/g, 'd')
//                   .replace(/[^a-z0-9]+/g, '-')
//                   .replace(/(^-|-$)/g, '');

//                 return (
//                   <div
//                     key={service.id}
//                     id={slug}
//                     className="bg-gray-50 rounded-2xl p-8 lg:p-10"
//                   >
//                     <div className="flex flex-col lg:flex-row lg:items-start gap-8">
//                       {/* Icon */}
//                       <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
//                         {service.icon && iconMap[service.icon] 
//                           ? iconMap[service.icon] 
//                           : <DefaultIcon />
//                         }
//                       </div>

//                       {/* Content */}
//                       <div className="grow">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                           {service.title}
//                         </h2>
//                         <p className="text-gray-600 mb-6">
//                           {service.description}
//                         </p>

//                         {/* Features Grid */}
//                         {service.features && service.features.length > 0 && (
//                           <div className="grid md:grid-cols-2 gap-3">
//                             {service.features
//                               .filter((f) => f.isActive)
//                               .sort((a, b) => a.displayOrder - b.displayOrder)
//                               .map((feature) => (
//                                 <div
//                                   key={feature.id}
//                                   className="flex items-center gap-3"
//                                 >
//                                   <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
//                                     <Check className="w-3 h-3 text-white" />
//                                   </div>
//                                   <span className="text-gray-700 text-sm">
//                                     {feature.content}
//                                   </span>
//                                 </div>
//                               ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Process Section */}
//       <section className="section-padding bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
//               Quy Trình Triển Khai
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Quy trình làm việc chuyên nghiệp và hiệu quả
//             </p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-6">
//             {processSteps.map((step, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-sm flex items-start gap-6"
//               >
//                 <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
//                   <span className="text-white font-bold">{step.step}</span>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
//                   <p className="text-gray-600 text-sm">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="page-header-gradient text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//             Sẵn Sàng Bắt Đầu Dự Án?
//           </h2>
//           <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
//             Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
//           </p>
//           <Link
//             href="/lien-he"
//             className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
//           >
//             Liên Hệ Ngay
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }










import Link from 'next/link';
import { Check } from 'lucide-react';
import { clientApi } from '@/app/lib/api';
import { Service } from '@/app/types';
import DynamicIcon from '@/app/(cms)/cms/components/shared/DynamicIcon';  

export const metadata = {
  title: 'Dịch Vụ | Communication Agency',
  description: 'Giải pháp truyền thông toàn diện cho mọi nhu cầu của doanh nghiệp.',
};

// Quy trình triển khai
const processSteps = [
  {
    step: 1,
    title: 'Tư Vấn & Phân Tích',
    description: 'Lắng nghe và phân tích nhu cầu, mục tiêu của khách hàng để đưa ra giải pháp phù hợp nhất.',
  },
  {
    step: 2,
    title: 'Lập Kế Hoạch',
    description: 'Xây dựng chiến lược và kế hoạch chi tiết với timeline và KPIs cụ thể.',
  },
  {
    step: 3,
    title: 'Triển Khai',
    description: 'Thực hiện theo kế hoạch với sự giám sát chặt chẽ và báo cáo định kỳ.',
  },
  {
    step: 4,
    title: 'Đánh Giá & Tối Ưu',
    description: 'Đo lường kết quả, đánh giá hiệu quả và tối ưu hóa liên tục.',
  },
];

export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    services = await clientApi.getServicesPublic();
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  const activeServices = services
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

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
          {activeServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có dịch vụ nào</p>
            </div>
          ) : (
            <div className="space-y-8">
              {activeServices.map((service) => {
                const slug = service.title
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/đ/g, 'd')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');

                return (
                  <div
                    key={service.id}
                    id={slug}
                    className="bg-gray-50 rounded-2xl p-8 lg:p-10"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      {/* ✅ Icon - Sử dụng DynamicIcon */}
                      <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                        <DynamicIcon 
                          name={service.icon || "Megaphone"} 
                          className="w-8 h-8 text-teal-600"
                          fallback={<span className="text-2xl">🎯</span>}
                        />
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
                        {service.features && service.features.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-3">
                            {service.features
                              .filter((f) => f.isActive)
                              .sort((a, b) => a.displayOrder - b.displayOrder)
                              .map((feature) => (
                                <div
                                  key={feature.id}
                                  className="flex items-center gap-3"
                                >
                                  <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-gray-700 text-sm">
                                    {feature.content}
                                  </span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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