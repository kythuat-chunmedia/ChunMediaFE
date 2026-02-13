import type { Metadata } from "next";
import { siteConfig } from "@/app/lib/config";
import { clientApi } from "@/app/lib/api";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: "400"
});


// Fetch config at build time for metadata
async function getConfig() {
  try {
    return await clientApi.getConfigSite();
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();

  const title = config?.title || siteConfig.name;
  const description = config?.description || siteConfig.description;
  const favicon = config?.favicon || undefined;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: favicon ? { icon: favicon } : undefined,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: title,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  
  const config = await getConfig();

  return (
    <html lang="vi"  className={`${outfit.variable} ${spaceMono.variable}`}>
      <head>
        {/* Google Analytics */}
        {config?.googleAnalytics && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${config.googleAnalytics}');`,
              }}
            />
          </>
        )}

        {/* GTM Head Script */}
        {config?.gtmScript && (
          <script dangerouslySetInnerHTML={{ __html: config.gtmScript }} />
        )}
      </head>
      <body className="min-h-screen bg-dark text-white overflow-x-hidden font-outfit antialiased">
        {/* GTM Body Noscript */}
        {config?.gtmBody && (
          <noscript dangerouslySetInnerHTML={{ __html: config.gtmBody }} />
        )}

        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
