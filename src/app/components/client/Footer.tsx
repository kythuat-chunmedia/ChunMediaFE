// import Link from 'next/link';
// import Image from 'next/image';
// import { Facebook, Linkedin, Youtube, Phone, Mail } from 'lucide-react';
// import { ConfigSite, Menu, Portfolio, Service } from '@/app/types';
// import { clientApi } from '@/app/lib/api';
// import { toSlug } from '@/app/lib/helper';
// // import { ConfigSite } from '@/app/types';
// // import { clientApi } from '@/app/lib/api';

// const quickLinks = [
//   { href: '/', label: 'Trang Chủ' },
//   { href: '/gioi-thieu', label: 'Giới Thiệu' },
//   { href: '/dich-vu', label: 'Dịch Vụ' },
//   { href: '/portfolio', label: 'Portfolio' },
// ];

// const serviceLinks = [
//   { href: '/dich-vu#pr', label: 'PR' },
//   { href: '/dich-vu#marketing', label: 'Marketing' },
//   { href: '/dich-vu#video', label: 'Video' },
//   { href: '/dich-vu#event', label: 'Sự Kiện' },
// ];





// export default async function Footer() {
//   let configSite: ConfigSite | null = null;
//   let menus: Menu[] = [];
//   let services: Service[] = [];
//   let portfolios: Portfolio[] = [];

//   try {
//     const [configData, menuData, serviceData, portfolioData] = await Promise.all([
//       clientApi.getConfigSite(),
//       clientApi.getMenusRoot(),
//       clientApi.getServicesFooter(),
//       clientApi.getPortfolioFooter(),
      
//     ]);

//     configSite = configData;
//     menus = menuData;
//     services = serviceData;
//     portfolios = portfolioData;
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }


  
//   return (
//     <footer className="bg-slate-800 text-gray-300">
//       <div className="container mx-auto px-4 py-12 lg:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {/* Brand Section */}
//           <div className="space-y-8">
//             <div className='flex justify-start items-center'>
//               <Image
//                 src={configSite?.image
//                   || '/default-image.png'}
//                 alt={configSite?.title || 'Tiêu đề ảnh'}
//                 width={200}
//                 height={50}
//                 priority
//               />
//             </div>
//             {/* <h3 className="text-xl font-bold text-white">{configSite.title}</h3> */}
//             <p className="text-sm leading-relaxed text-gray-400">
//               {configSite?.description}
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Liên Kết Nhanh</h4>
//             <ul className="space-y-2">
//               {menus.map((menu) => (
//                 (menu.title.toLowerCase().trim() == 'trang chủ') ? '' :
//                 <li key={menu.id}>
//                   <Link
//                     href={toSlug(menu.title)}
//                     className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
//                   >
//                     {menu.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Dịch Vụ</h4>
//             <ul className="space-y-2">
//               {services.map((service) => (
//                 <li key={service.id}>
//                   <Link
//                     href={'/dich-vu'}
//                     className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
//                   >
//                     {service.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Portfolios */}
//           {/* <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Portfolio</h4>
//             <ul className="space-y-2">
//               {portfolios.map((portfolio) => (
//                 <li key={portfolio.id}>
//                   <Link
//                     href={'portfolio'}
//                     className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
//                   >
//                     {portfolio.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-white">Liên Hệ</h4>
//             <ul className="space-y-3">
//               <li className="flex items-center gap-3">
//                 <Phone size={16} className="text-teal-400 shrink-0" />
//                 <a
//                   href={`tel:${configSite?.hotline}`}
//                   className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
//                 >
//                   {configSite?.hotline}
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail size={16} className="text-teal-400 shrink-0" />
//                 <a
//                   href={`mailto:${configSite?.email}`}
//                   className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
//                 >
//                   {configSite?.email}
//                 </a>
//               </li>
//             </ul>

//             {/* Social Links */}
//             <div className="flex items-center gap-4 pt-2">
//               <a
//                 href={`${configSite?.facebook}`} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-teal-400 transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook size={20} />
//               </a>
//               <a
//                 href={`${configSite?.linkedin}`} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-teal-400 transition-colors"
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin size={20} />
//               </a>
//               <a
//                 href={`${configSite?.youtube}`} 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-teal-400 transition-colors"
//                 aria-label="YouTube"
//               >
//                 <Youtube size={20} />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="mt-12 pt-8 border-t border-slate-700">
//           <p className="text-center text-sm text-gray-500">
//             © {new Date().getFullYear()} Communication. Tất cả quyền được bảo lưu.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }










import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { ConfigSite, Menu, Portfolio, Service } from '@/app/types';
import { clientApi } from '@/app/lib/api';
import { toSlug } from '@/app/lib/helper';

export default async function Footer() {
  let configSite: ConfigSite | null = null;
  let menus: Menu[] = [];
  let services: Service[] = [];

  try {
    const [configData, menuData, serviceData] = await Promise.all([
      clientApi.getConfigSite(),
      clientApi.getMenusRoot(),
      clientApi.getServicesFooter(),
    ]);
    configSite = configData;
    menus = menuData;
    services = serviceData;
  } catch (error) {
    console.error('Failed to fetch footer data:', error);
  }

  return (
    <footer
      className="relative border-t border-[rgba(10,147,150,0.1)] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F1F8F8 0%, #E8F4F4 100%)' }}
      id="contact"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(10,147,150,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
          
          {/* Brand */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              {configSite?.image ? (
                <Image
                  src={configSite.image}
                  alt={configSite.title || 'Logo'}
                  width={160}
                  height={44}
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="inline-flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-[#0A9396] to-[#94D2BD] rounded-xl flex items-center justify-center text-white font-['Be_Vietnam_Pro'] font-extrabold text-sm relative overflow-hidden">
                    <span className="relative z-10">CM</span>
                  </div>
                  <span className="font-['Be_Vietnam_Pro'] text-2xl font-extrabold tracking-[-0.04em] bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
                    {configSite?.title ?? 'Chinh Media'}
                  </span>
                </div>
              )}
            </div>

            <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm leading-[1.85] mb-8 max-w-sm">
              {configSite?.description ?? 'Đơn vị tiên phong trong lĩnh vực truyền thông công nghệ, kết hợp AI và sáng tạo để mang đến giải pháp đột phá cho thương hiệu.'}
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { href: configSite?.facebook, label: 'Facebook', icon: <Facebook size={18} /> },
                { href: configSite?.linkedin, label: 'LinkedIn', icon: <Linkedin size={18} /> },
                { href: configSite?.youtube,  label: 'YouTube',  icon: <Youtube  size={18} /> },
              ].map(({ href, label, icon }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 bg-white/80 border border-[rgba(10,147,150,0.2)] rounded-xl flex items-center justify-center text-[#0A9396] transition-all duration-300 hover:bg-linear-to-br hover:from-[#0A9396] hover:to-[#94D2BD] hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(10,147,150,0.3)]"
                  >
                    {icon}
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-['Be_Vietnam_Pro'] text-base font-bold tracking-[-0.01em] text-[#1A1A1A] mb-6">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-3">
              {menus
                .filter((m) => m.title.toLowerCase().trim() !== 'trang chủ')
                .map((menu) => (
                  <li key={menu.id}>
                    <Link
                      href={toSlug(menu.title)}
                      className="font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors duration-200"
                    >
                      {menu.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Be_Vietnam_Pro'] text-base font-bold tracking-[-0.01em] text-[#1A1A1A] mb-6">
              Dịch Vụ
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href="/dich-vu"
                    className="font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Be_Vietnam_Pro'] text-base font-bold tracking-[-0.01em] text-[#1A1A1A] mb-6">
              Liên Hệ
            </h4>
            <ul className="space-y-4">
              {configSite?.hotline && (
                <li className="flex items-center gap-3">
                  <Phone size={15} className="text-[#0A9396] shrink-0" />
                  <a
                    href={`tel:${configSite.hotline}`}
                    className="font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors"
                  >
                    {configSite.hotline}
                  </a>
                </li>
              )}
              {configSite?.email && (
                <li className="flex items-center gap-3">
                  <Mail size={15} className="text-[#0A9396] shrink-0" />
                  <a
                    href={`mailto:${configSite.email}`}
                    className="font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors"
                  >
                    {configSite.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="pt-8 border-t border-[rgba(10,147,150,0.1)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm">
            © {new Date().getFullYear()} {configSite?.title ?? 'Chinh Media'}. Tất cả quyền được bảo lưu.
          </p>
          <p className="font-['Nunito_Sans'] text-[#6C757D] text-sm">
            {/* Powered by AI & Innovation */}
          </p>
        </div>
      </div>
    </footer>
  );
}