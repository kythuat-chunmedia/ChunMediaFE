// 'use client'

// import Image from 'next/image';
// import Link from 'next/link';
// import { Portfolio } from '@/app/types'
// import { ArrowRight } from 'lucide-react';

// export function OutstandingPortfolio({ portfolios }: { portfolios: Portfolio[] }) {
//   return (
//     <section className="section-padding bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//             Dự Án Tiêu Biểu
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Những dự án thành công của chúng tôi
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {portfolios.map((portfolio) => (
//             <div
//               key={portfolio.id}
//               className="bg-white rounded-xl overflow-hidden shadow-sm card-hover"
//             >
//               <div className="image-zoom relative aspect-4/3">
//                 <Link
//                   href={`/portfolio/${portfolio.slug}`}
//                   className="transition-colors"
//                 >

//                   <Image
//                     src={portfolio.thumbnailUrl}
//                     alt={portfolio.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </Link>
//                 <div className="absolute top-4 left-4 flex gap-2">
//                   <span className="badge badge-teal">
//                     {portfolio.industry === 'Fashion' ? 'Marketing' :
//                       portfolio.industry === 'Technology' ? 'Sự Kiện' : 'Video'}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
//                   {portfolio.title.split(' - ')[0]}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {portfolio.shortDescription}
//                 </p>
//                 {/* <Link
//                     href={`/portfolio/${portfolio.slug}`}
//                     className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors"
//                   >
//                     Xem chi tiết
//                     <ArrowRight size={16} />
//                   </Link> */}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link
//             href="/portfolio"
//             className="btn-primary"
//           >
//             Xem Tất Cả Dự Án
//             <ArrowRight size={18} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }












'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Portfolio } from '@/app/types';
import { ArrowRight } from 'lucide-react';

const categoryLabel: Record<string, string> = {
  Fashion: 'Marketing',
  Technology: 'Sự Kiện',
};

export function OutstandingPortfolio({ portfolios }: { portfolios: Portfolio[] }) {
  return (
    <section className="py-32 px-4 bg-[#FFF8F0]/43" id="projects">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-xs font-bold tracking-widest uppercase mb-5 font-['Nunito_Sans']">
            Portfolio
          </span>
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] leading-snug mb-6 text-[#1A1A1A]">
            Dự Án Tiêu Biểu
          </h2>
          <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] max-w-[680px] mx-auto leading-[1.85]">
            Khám phá những dự án thành công mà chúng tôi đã thực hiện cho các thương hiệu hàng đầu.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="group bg-white/90 backdrop-blur-xl border border-[rgba(10,147,150,0.15)] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(10,147,150,0.08)] transition-all duration-400 hover:-translate-y-2.5 hover:border-[#0A9396] hover:shadow-[0_20px_60px_rgba(10,147,150,0.15)] cursor-pointer"
            >
              {/* Image */}
              <Link href={`/portfolio/${portfolio.slug}`} className="block relative h-[280px] overflow-hidden bg-linear-to-br from-[#E0F2F1] to-[#B2DFDB]">
                <Image
                  src={portfolio.thumbnailUrl}
                  alt={portfolio.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="font-['Nunito_Sans'] px-4 py-1.5 bg-[#0A9396] rounded-lg text-xs font-bold tracking-wide text-white">
                    {categoryLabel[portfolio.title] ?? 'Video'}
                  </span>
                  {/* <span className="font-['Nunito_Sans'] px-4 py-1.5 bg-[rgba(0,255,148,0.15)] border border-[#00FF94] rounded-lg text-xs font-bold text-[#00A86B]">
                    ● Live
                  </span> */}
                </div>
              </Link>

              {/* Content */}
              <div className="p-9">
                <h3 className="font-['Be_Vietnam_Pro'] text-xl font-bold tracking-[-0.025em] mb-3 text-[#1A1A1A]">
                  {portfolio.title.split(' - ')[0]}
                </h3>
                <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-[1.75] mb-6 line-clamp-2">
                  {portfolio.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['PR Campaign', 'Social Media', 'Video'].map((tag) => (
                    <span
                      key={tag}
                      className="font-['Nunito_Sans'] px-4 py-1.5 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-lg text-xs font-semibold text-[#0A9396] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/portfolio"
            className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,147,150,0.4)] group"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            Xem Tất Cả Dự Án
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}