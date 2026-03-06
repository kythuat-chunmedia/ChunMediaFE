"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/app/lib/config";
import type { ConfigSite } from "@/app/types";

interface HeaderProps {
  config?: ConfigSite | null;
}

export default function Navbar({ config }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const siteName = config?.title || siteConfig.name;
  const logoUrl = config?.image || null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(10,147,150,0.08)] border-b border-[rgba(10,147,150,0.1)]"
          : "bg-white/70 backdrop-blur-sm border-b border-[rgba(10,147,150,0.06)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={200}
              height={200}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A9396] to-[#94D2BD] flex items-center justify-center shadow-[0_2px_8px_rgba(10,147,150,0.35)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
          )}
        </Link>

        <a
          href="#form-section"
          className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(10,147,150,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(10,147,150,0.4)] transition-all duration-300 group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          Nhận Báo Giá Miễn Phí
        </a>
      </div>
    </header>
  );
}