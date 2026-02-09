import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/client/Header";
import Footer from "@/app/components/client/Footer";
import { ConfigSite } from "../types";
import { clientApi } from "../lib/api";
import CallToAction from "../components/client/CallToAction";

// ✅ Dynamic metadata từ ConfigSite API
export async function generateMetadata(): Promise<Metadata> {
  let config: ConfigSite | null = null;

  try {
    config = await clientApi.getConfigSite();
  } catch (error) {
    console.error("Failed to fetch ConfigSite for metadata:", error);
  }

  const siteName = config?.title || "Communication Agency";
  const seoTitle = config?.title || `${siteName} | PR, Marketing, Video & Sự Kiện`;
  const seoDescription =
    config?.description ||
    "Chuyên cung cấp các dịch vụ PR, Marketing, Video và Sự kiện chuyên nghiệp.";
  const seoKeywords = config?.description || "PR,Marketing,Video Production,Sự kiện,Truyền thông,Agency";
  const siteUrl = config?.aboutUrl || "";
  const logoUrl = config?.aboutImage || "";
  const favicon = config?.favicon || "/favicon.ico";

  return {
    title: {
      default: seoTitle,
      template: `%s | ${siteName}`,
    },
    description: seoDescription,
    keywords: seoKeywords.split(",").map((k) => k.trim()),
    authors: [{ name: siteName }],
    icons: {
      icon: favicon,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      locale: "vi_VN",
      siteName: siteName,
      ...(siteUrl && { url: siteUrl }),
      ...(logoUrl && { images: [{ url: logoUrl, alt: siteName }] }),
    },
    ...(siteUrl && {
      metadataBase: new URL(siteUrl),
    }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let config: ConfigSite | null = null;

  try {
    config = await clientApi.getConfigSite();
  } catch (error) {
    console.error("Failed to fetch ConfigSite for GTM:", error);
  }

  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {config?.gtmScript && (
          <script
            dangerouslySetInnerHTML={{
              __html: config.gtmScript.replace(
                /<\/?script>/g,
                ""
              ),
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {config?.gtmBody && (
          <div
            dangerouslySetInnerHTML={{
              __html: config.gtmBody,
            }}
          />
        )}

        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <CallToAction />
        </div>
      </body>
    </html>
  );
}