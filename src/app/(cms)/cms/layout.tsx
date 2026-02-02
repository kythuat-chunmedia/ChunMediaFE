import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/app/(cms)/cms/context/SidebarContext';
import { ThemeProvider } from '@/app/(cms)/cms/context/ThemeContext';
import { CmsProviders } from './providers';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        {/* <AuthProvider>   */}
        <CmsProviders>
            <ThemeProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </CmsProviders>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}