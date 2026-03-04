// export const dynamic = 'force-dynamic';

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight, Play } from 'lucide-react';
// import { OutstandingPortfolio } from '@/app/components/client/home/OutstandingPortfolio';
// import { clientApi } from '../lib/api';
// import { Partner } from '@/app/types';
// import SeoMetadataSetter from '../lib/helper/SeoMetadataSetter';
// import HeroSection from '../components/client/home/HeroSection';
// import StatsSection from '../components/client/home/StatsSection';
// import ServicesSection from '../components/client/home/ServicesSection';
// import ProjectsSection from '../components/client/home/ProjectsSection';
// import ProcessSection from '../components/client/home/ProcessSection';
// import CTASection from '../components/client/home/CTASection';
// import FooterSection from '../components/client/home/FooterSection';


// export default async function HomePage() {
//   const portfolios = await clientApi.getPortfolios();

//   // Fetch real partner data
//   let partners: Partner[] = [];

//   try {
//     const data = await clientApi.getPartnerPublic();
//     partners = data || [];
//   } catch (error) {
//     console.error('Failed to fetch partners:', error);
//   }
//   <SeoMetadataSetter />

//   return (
//     <>
//       <HeroSection />
//       <StatsSection />
//       <ServicesSection />
//       <ProjectsSection />
//       <ProcessSection />
//       <CTASection />
//       {/* <FooterSection /> */}

//     </>
//   );
// }








export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { OutstandingPortfolio } from '@/app/components/client/home/OutstandingPortfolio';
import { HeroSection } from '@/app/components/client/home/HeroSection';
import { StatsSection } from '@/app/components/client/home/StatsSection';
import { ServicesSection } from '@/app/components/client/home/ServicesSection';
import { CtaSection } from '@/app/components/client/home/CTASection';
import { clientApi } from '../lib/api';
import { Partner } from '@/app/types';
import SeoMetadataSetter from '../lib/helper/SeoMetadataSetter';

export default async function HomePage() {
  const portfolios = await clientApi.getPortfolios();

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

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]">
        <div className="absolute -top-[200px] -right-[200px] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(10,147,150,0.08)_0%,transparent_70%)] animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[150px] -left-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(238,155,0,0.06)_0%,transparent_70%)] animate-[float_15s_ease-in-out_infinite_reverse]" />
      </div>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,147,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,147,150,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <OutstandingPortfolio portfolios={portfolios} />
      <CtaSection />

      {/* Partners Section */}
      {/* {partners.length > 0 && (
        <section className="py-20 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-5 py-2 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-xs font-bold tracking-widest uppercase mb-4">
                Partners
              </span>
              <h2 className="font-['Be_Vietnam_Pro'] text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1A1A1A] mb-3">
                Đối Tác Của Chúng Tôi
              </h2>
              <p className="font-['Nunito_Sans'] text-[#6C757D] max-w-xl mx-auto">
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
                    <Image src={partner.image} alt={partner.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </>
  );
}