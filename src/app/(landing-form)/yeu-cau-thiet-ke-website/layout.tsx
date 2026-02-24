import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Báo Giá Thiết Kế Website | An Khang Digital",
  description:
    "Nhận tư vấn miễn phí và báo giá chi tiết thiết kế website chuyên nghiệp. Chuẩn SEO, tối ưu tốc độ, responsive.",
  keywords: [
    "thiết kế website",
    "báo giá website",
    "làm website",
    "An Khang Digital",
  ],
  openGraph: {
    title: "Báo Giá Thiết Kế Website | An Khang Digital",
    description:
      "Nhận tư vấn miễn phí và báo giá chi tiết thiết kế website chuyên nghiệp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-vietnam">
        {children}
      </body>
    </html>
  );
}
