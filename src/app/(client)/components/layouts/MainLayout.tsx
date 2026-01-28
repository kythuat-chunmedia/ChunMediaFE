import { ReactNode } from 'react';
import { Header } from '@/app/(client)/components/shared/Header';
import { Footer } from '@/app/(client)/components/shared/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
