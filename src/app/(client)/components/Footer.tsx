import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Youtube, Phone, Mail } from 'lucide-react';
import { ConfigSite, Menu, Portfolio, Service } from '@/app/types';
import { clientApi } from '@/app/lib/api';
import { toSlug } from '@/app/lib/helper';
// import { ConfigSite } from '@/app/types';
// import { clientApi } from '@/app/lib/api';

const quickLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/gioi-thieu', label: 'Giới Thiệu' },
  { href: '/dich-vu', label: 'Dịch Vụ' },
  { href: '/portfolio', label: 'Portfolio' },
];

const serviceLinks = [
  { href: '/dich-vu#pr', label: 'PR' },
  { href: '/dich-vu#marketing', label: 'Marketing' },
  { href: '/dich-vu#video', label: 'Video' },
  { href: '/dich-vu#event', label: 'Sự Kiện' },
];





export default async function Footer() {
  let configSite: ConfigSite | null = null;
  let menus: Menu[] = [];
  let services: Service[] = [];
  let portfolios: Portfolio[] = [];

  try {
    const [configData, menuData, serviceData, portfolioData] = await Promise.all([
      clientApi.getConfigSite(),
      clientApi.getMenusRoot(),
      clientApi.getServicesFooter(),
      clientApi.getPortfolioFooter(),
      
    ]);

    configSite = configData;
    menus = menuData;
    services = serviceData;
    portfolios = portfolioData;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }


  
  return (
    <footer className="bg-slate-800 text-gray-300">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className='flex justify-start items-center'>
              <Image
                src={configSite?.image
                  || '/default-image.png'}
                alt={configSite?.title || 'Tiêu đề ảnh'}
                width={200}
                height={50}
                priority
              />
            </div>
            {/* <h3 className="text-xl font-bold text-white">{configSite.title}</h3> */}
            <p className="text-sm leading-relaxed text-gray-400">
              {configSite?.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              {menus.map((menu) => (
                (menu.title.toLowerCase().trim() == 'trang chủ') ? '' :
                <li key={menu.id}>
                  <Link
                    href={toSlug(menu.title)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Dịch Vụ</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={'/dich-vu'}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolios */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Portfolio</h4>
            <ul className="space-y-2">
              {portfolios.map((portfolio) => (
                <li key={portfolio.id}>
                  <Link
                    href={'portfolio'}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {portfolio.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <a
                  href={`tel:${configSite?.hotline}`}
                  className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  {configSite?.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <a
                  href={`mailto:${configSite?.email}`}
                  className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  {configSite?.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={`${configSite?.facebook}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={`${configSite?.linkedin}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`${configSite?.youtube}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Communication. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
