import Link from "next/link";
import type { ConfigSite } from "@/app/types";

interface FooterProps {
  config?: ConfigSite | null;
}

export default function Footer({ config }: FooterProps) {
  const siteName = config?.title || "TemplateHub";
  const year = new Date().getFullYear();

  // Build social links from config
  const socials: { name: string; url: string; path: string }[] = [];
  if (config?.facebook) {
    socials.push({ name: "facebook", url: config.facebook, path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" });
  }
  if (config?.youtube) {
    socials.push({ name: "youtube", url: config.youtube, path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" });
  }

  // Fallback if no socials configured
  if (socials.length === 0) {
    socials.push(
      { name: "facebook", url: "#", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
      { name: "github", url: "#", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
    );
  }

  return (
    <footer className="border-t border-gray-800/30 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-linear-to-br from-mint to-cyan flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0f1a" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
          </div>
          <span className="text-[11px] text-gray-700">© {year} {siteName}. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={social.path} /></svg>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
