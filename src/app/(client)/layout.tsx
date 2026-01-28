import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/app/(client)/components/layouts/MainLayout';
import { siteConfig } from '@/app/(client)/config/site.config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
