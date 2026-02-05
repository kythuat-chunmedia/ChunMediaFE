'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, X } from 'lucide-react';
import { ConfigSite, Menu } from '@/app/types';
import { toSlug } from '@/app/lib/helper';

type Props = {
  configSite: ConfigSite | null;
  menus: Menu[];
};

export default function HeaderClient({ configSite, menus }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* <span className="text-xl lg:text-2xl font-bold text-teal-600 tracking-tight">
              Communication
            </span> */}

            <Image
              src={configSite?.image
                || '/default-image.png'}
              alt={configSite?.title || 'Tiêu đề ảnh'}
              width={200}
              height={50}
              priority
              className='p-5'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menus.map((menu) => (
              <Link
                key={toSlug(menu.title)}
                href={`/${toSlug(menu.title)}`}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md
                  ${isActive(toSlug(menu.title))
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
              >
                {menu.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-teal-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
        >
          <nav className="flex flex-col space-y-1">
            {menus.map((menu) => (
              <Link
                key={toSlug(menu.title)}
                href={`/${toSlug(menu.title)}`}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md
                  ${isActive(toSlug(menu.title))
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
              >
                {menu.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
