// import { Outfit } from 'next/font/google';
// import './globals.css';
// import "flatpickr/dist/flatpickr.css";
// import { SidebarProvider } from '@/context/SidebarContext';
// import { ThemeProvider } from '@/context/ThemeContext';
// import { AuthProvider } from '@/app/contexts/AuthContext';

// const outfit = Outfit({
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${outfit.className} dark:bg-gray-900`}>
//         <AuthProvider>  
//           <ThemeProvider>
//             <SidebarProvider>{children}</SidebarProvider>
//           </ThemeProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }




import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
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