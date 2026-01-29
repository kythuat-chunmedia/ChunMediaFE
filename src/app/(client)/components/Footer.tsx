import Link from 'next/link';
import { Facebook, Linkedin, Youtube, Phone, Mail } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Communication</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Dịch Vụ</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-400 shrink-0" />
                <a
                  href="tel:0123456789"
                  className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  0123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <a
                  href="mailto:info@communication.vn"
                  className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  info@communication.vn
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com"
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
