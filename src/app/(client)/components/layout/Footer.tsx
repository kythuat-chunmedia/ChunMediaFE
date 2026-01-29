import Link from 'next/link';
import { Phone, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';

const quickLinks = [
  { title: 'Trang Chủ', href: '/' },
  { title: 'Giới Thiệu', href: '/gioi-thieu' },
  { title: 'Dịch Vụ', href: '/dich-vu' },
  { title: 'Portfolio', href: '/portfolio' },
];

const services = [
  { title: 'PR', href: '/dich-vu#pr' },
  { title: 'Marketing', href: '/dich-vu#marketing' },
  { title: 'Video', href: '/dich-vu#video' },
  { title: 'Sự Kiện', href: '/dich-vu#su-kien' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Link
              href="/"
              className="text-2xl font-display font-bold text-white mb-4 inline-block"
            >
              Communication
            </Link>
            <p className="text-secondary-300 mt-4 leading-relaxed">
              Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liên Kết Nhanh</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Dịch Vụ</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-400 mr-0 group-hover:mr-2 transition-all" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liên Hệ</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0123456789"
                  className="flex items-center text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3 text-primary-400" />
                  0123 456 789
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@communication.vn"
                  className="flex items-center text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3 text-primary-400" />
                  info@communication.vn
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-600 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-800">
        <div className="container py-6">
          <p className="text-center text-secondary-400 text-sm">
            © {new Date().getFullYear()} Communication. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
