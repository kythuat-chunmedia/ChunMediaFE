"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/app/lib/config";
import type { ConfigSite } from "@/app/types";

interface HeaderProps {
  config?: ConfigSite | null;
}

export default function Header({ config }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const siteName = config?.title || siteConfig.name;
  const logoUrl = config?.image || null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(10,147,150,0.08)] border-b border-[rgba(10,147,150,0.1)]"
        : "bg-white/80 backdrop-blur-sm border-b border-[rgba(10,147,150,0.06)]"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/hub" className="flex items-center gap-2.5">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteName} width={32} height={32} className="w-8 h-8 rounded-lg object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A9396] to-[#94D2BD] flex items-center justify-center shadow-[0_2px_8px_rgba(10,147,150,0.35)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
          )}
          <span className="font-['Be_Vietnam_Pro'] font-extrabold text-lg tracking-tight">
            <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
              {siteName.split(" ")[0] || "Template"}
            </span>
            <span className="text-[#6C757D] font-light ml-1">
              {siteName.split(" ").slice(1).join(" ") || "Hub"}
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href}
              className="font-['Nunito_Sans'] text-sm text-[#6C757D] hover:text-[#0A9396] transition-colors duration-200 relative group">
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#0A9396] to-[#94D2BD] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact"
            className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-['Nunito_Sans'] font-bold text-sm shadow-[0_4px_14px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,147,150,0.4)] transition-all duration-300 group">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            Liên hệ ngay
          </a>
          <button className="md:hidden text-[#6C757D] hover:text-[#0A9396] p-1 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(10,147,150,0.1)] bg-white/98 backdrop-blur-xl px-6 py-4 flex flex-col gap-1">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
              className="font-['Nunito_Sans'] text-[#6C757D] hover:text-[#0A9396] py-2.5 text-sm transition-colors border-b border-[rgba(10,147,150,0.06)] last:border-0">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}