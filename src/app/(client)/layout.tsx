import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/(client)/components/Header";
import Footer from "@/app/(client)/components/Footer";

export const metadata: Metadata = {
  title: "Communication Agency | PR, Marketing, Video & Sự Kiện",
  description: "Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp. Với hơn 10 năm kinh nghiệm, chúng tôi là đối tác tin cậy của hàng trăm thương hiệu.",
  keywords: ["PR", "Marketing", "Video Production", "Sự kiện", "Truyền thông", "Agency"],
  authors: [{ name: "Communication Agency" }],
  openGraph: {
    title: "Communication Agency | PR, Marketing, Video & Sự Kiện",
    description: "Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
