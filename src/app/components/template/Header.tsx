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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-dark/85 backdrop-blur-xl border-b border-mint/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {logoUrl ? (
            <Image src={logoUrl} alt={siteName} width={32} height={32} className="w-8 h-8 rounded-lg object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-mint to-cyan flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0f1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
          )}
          <span className="font-bold text-lg tracking-tight">
            <span className="gradient-text">{siteName.split(' ')[0] || 'Template'}</span>
            <span className="text-gray-400 font-light">{siteName.split(' ').slice(1).join(' ') || 'Hub'}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-400 hover:text-white transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-mint to-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-gray-950">
            <span>Liên hệ ngay</span>
          </a>
          <button className="md:hidden text-gray-400 p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800/50 bg-gray-950/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-400 hover:text-white py-2 text-sm transition-colors" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
