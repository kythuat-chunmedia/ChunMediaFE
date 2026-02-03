// import Image from 'next/image';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { ArrowLeft, Eye, Users, BarChart3, ShoppingCart, DollarSign, Check, AlertCircle } from 'lucide-react';
// import { mockPortfolios } from '@/app/(client)/lib/mockData';
// import { formatNumber, formatCurrency } from '@/app/(client)/lib/api';

// interface PortfolioDetailPageProps {
//   params: Promise<{ slug: string }>;
// }

// export async function generateStaticParams() {
//   return mockPortfolios.map((portfolio) => ({
//     slug: portfolio.slug,
//   }));
// }

// export async function generateMetadata({ params }: PortfolioDetailPageProps) {
//   const { slug } = await params;
//   const portfolio = mockPortfolios.find((p) => p.slug === slug);
  
//   if (!portfolio) {
//     return {
//       title: 'Portfolio không tìm thấy',
//     };
//   }

//   return {
//     title: `${portfolio.title} | Communication Agency`,
//     description: portfolio.shortDescription,
//   };
// }

// export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
//   const { slug } = await params;
//   const portfolio = mockPortfolios.find((p) => p.slug === slug);

// console.log(slug);
// console.log(params);


//   if (!portfolio) {
//     notFound();
//   }

//   const challenges = [
//     'Thị trường cạnh tranh cao với nhiều thương hiệu lớn',
//     'Ngân sách hạn chế cần tối ưu hiệu quả',
//     'Thời gian triển khai ngắn (3 tháng)',
//   ];

//   const solutions = [
//     'Nghiên cứu kỹ insight khách hàng và đối thủ',
//     'Tập trung vào các kênh có ROI cao nhất',
//     'Làm việc với đội ngũ chuyên nghiệp 24/7',
//     'Tối ưu hóa liên tục dựa trên data thực tế',
//   ];

//   return (
//     <>
//       {/* Page Header */}
//       <section className="page-header-gradient text-white py-12 lg:py-16">
//         <div className="container mx-auto px-4">
//           <Link
//             href="/portfolio"
//             className="inline-flex items-center gap-2 text-teal-100 hover:text-white transition-colors mb-6"
//           >
//             <ArrowLeft size={18} />
//             Quay lại Portfolio
//           </Link>
          
//           <h1 className="text-2xl lg:text-3xl font-bold mb-4">
//             {portfolio.title}
//           </h1>
          
//           <div className="flex flex-wrap items-center gap-4 text-sm">
//             <span className="bg-teal-700/50 px-3 py-1 rounded-full">
//               {portfolio.industry === 'Fashion' ? 'Marketing' :
//                portfolio.industry === 'Technology' ? 'Sự Kiện' :
//                portfolio.industry === 'F&B' ? 'Video' :
//                portfolio.industry === 'Healthcare' ? 'PR' : 'Sự Kiện'}
//             </span>
//             <span className="flex items-center gap-2">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               {portfolio.year}
//             </span>
//             <span>{portfolio.industry}</span>
//           </div>
//         </div>
//       </section>

//       {/* Banner Image */}
//       <section className="bg-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="relative aspect-21/9 rounded-2xl overflow-hidden shadow-lg">
//             <Image
//               src={portfolio.bannerUrl || portfolio.thumbnailUrl}
//               alt={portfolio.title}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="section-padding bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-full">
//             {/* Project Overview */}
//             <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng Quan Dự Án</h2>
//               <div 
//                 className="prose-content"
//                 dangerouslySetInnerHTML={{ __html: portfolio.content }}
//               />
//             </div>

//             {/* KPIs */}
//             <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết Quả (KPIs)</h2>
              
//               <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                 <div className="bg-gray-50 rounded-xl p-6 text-center">
//                   <Eye className="w-8 h-8 text-teal-600 mx-auto mb-3" />
//                   <p className="text-sm text-gray-600 mb-1">Reach</p>
//                   <p className="text-3xl font-bold text-teal-600">
//                     {formatNumber(portfolio.reach)}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-6 text-center">
//                   <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
//                   <p className="text-sm text-gray-600 mb-1">Engagement</p>
//                   <p className="text-3xl font-bold text-teal-600">
//                     {formatNumber(portfolio.engagement)}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-6 text-center">
//                   <BarChart3 className="w-8 h-8 text-teal-600 mx-auto mb-3" />
//                   <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
//                   <p className="text-3xl font-bold text-teal-600">
//                     {portfolio.conversionRate}%
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div className="bg-teal-50 rounded-xl p-6">
//                   <p className="text-sm text-gray-600 mb-1">Đơn Hàng</p>
//                   <p className="text-2xl font-bold text-teal-600">
//                     {portfolio.orderQuantity.toLocaleString('vi-VN')}+ đơn hàng
//                   </p>
//                 </div>
//                 <div className="bg-teal-50 rounded-xl p-6">
//                   <p className="text-sm text-gray-600 mb-1">Doanh Thu</p>
//                   <p className="text-2xl font-bold text-teal-600">
//                     {formatCurrency(portfolio.revenue).replace('₫', 'VNĐ')}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Challenges & Solutions */}
//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="bg-white rounded-2xl p-8 shadow-sm">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Thách Thức</h3>
//                 <ul className="space-y-4">
//                   {challenges.map((challenge, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
//                       <span className="text-gray-600 text-sm">{challenge}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-white rounded-2xl p-8 shadow-sm">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Giải Pháp</h3>
//                 <ul className="space-y-4">
//                   {solutions.map((solution, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
//                       <span className="text-gray-600 text-sm">{solution}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="page-header-gradient text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//             Bạn Có Dự Án Tương Tự?
//           </h2>
//           <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
//             Liên hệ với chúng tôi để được tư vấn và triển khai dự án của bạn
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









import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Eye, Users, BarChart3, ShoppingCart, DollarSign, Check, AlertCircle } from 'lucide-react';
import { clientApi } from '@/app/lib/api';
import { formatNumber, formatCurrency } from '@/app/(client)/lib/api';
import { Portfolio } from '@/app/types';

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Dynamic metadata từ API
export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;

  try {
    const portfolio = await clientApi.getPortfolioDetail(slug);

    if (!portfolio) {
      return { title: 'Portfolio không tìm thấy' };
    }

    return {
      title: portfolio.seoTitle || portfolio.title,
      description: portfolio.seoDescription || portfolio.shortDescription,
      openGraph: {
        title: portfolio.seoTitle || portfolio.title,
        description: portfolio.seoDescription || portfolio.shortDescription,
        ...(portfolio.thumbnailUrl && {
          images: [{ url: portfolio.thumbnailUrl, alt: portfolio.title }],
        }),
      },
    };
  } catch {
    return { title: 'Portfolio không tìm thấy' };
  }
}

// ✅ Hàm map industry → service type
const getServiceType = (industry: string | null | undefined) => {
  switch (industry) {
    case 'Fashion & Beauty':
      return 'Marketing';
    case 'Technology':
      return 'Sự Kiện';
    case 'F&B (Food & Beverage)':
      return 'Video';
    case 'Healthcare':
      return 'PR';
    case 'Finance & Banking':
      return 'Sự Kiện';
    default:
      return 'Marketing';
  }
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;

  let portfolio: Portfolio | null = null;

  try {
    portfolio = await clientApi.getPortfolioDetail(slug);
  } catch (error) {
    console.error('Failed to fetch portfolio detail:', error);
  }

  if (!portfolio) {
    notFound();
  }

  const serviceType = getServiceType(portfolio.industry);

  return (
    <>
      {/* Page Header */}
      <section className="page-header-gradient text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-teal-100 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Quay lại Portfolio
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            {portfolio.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-teal-700/50 px-3 py-1 rounded-full">
              {serviceType}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {portfolio.year}
            </span>
            {portfolio.industry && <span>{portfolio.industry}</span>}
            {portfolio.clientName && (
              <span className="bg-white/10 px-3 py-1 rounded-full">
                {portfolio.clientName}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Banner Image */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="relative aspect-21/9 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={portfolio.bannerUrl || portfolio.thumbnailUrl}
              alt={portfolio.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-full">
            {/* Project Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng Quan Dự Án</h2>

              {portfolio.shortDescription && (
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {portfolio.shortDescription}
                </p>
              )}

              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: portfolio.content }}
              />
            </div>

            {/* KPIs */}
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kết Quả (KPIs)</h2>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Eye className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Reach</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatNumber(portfolio.reach)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Engagement</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatNumber(portfolio.engagement)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {portfolio.conversionRate}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-teal-50 rounded-xl p-6">
                  <ShoppingCart className="w-6 h-6 text-teal-600 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Đơn Hàng</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {portfolio.orderQuantity.toLocaleString('vi-VN')}+ đơn hàng
                  </p>
                </div>
                <div className="bg-teal-50 rounded-xl p-6">
                  <DollarSign className="w-6 h-6 text-teal-600 mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Doanh Thu</p>
                  <p className="text-2xl font-bold text-teal-600">
                    {formatCurrency(portfolio.revenue).replace('₫', 'VNĐ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-header-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Bạn Có Dự Án Tương Tự?
          </h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn và triển khai dự án của bạn
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