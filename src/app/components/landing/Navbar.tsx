// "use client";

// import React, { useEffect, useState } from "react";
// import { siteConfig } from "@/app/lib/config";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between backdrop-blur-[20px] border-b border-white/5 transition-all duration-300 ${
//       scrolled ? "py-3 px-4 md:px-10 bg-[#0a0e1a]/95" : "py-4 px-4 md:px-10 bg-[#0a0e1a]/80"
//     }`}>
//       <a href="#" className="flex items-center gap-3 no-underline">
//         <div className="w-10 h-10 bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 rounded-[10px] flex items-center justify-center font-black text-lg text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
//           AK
//         </div>
//         <div className="font-bold text-xl text-[#f1f5f9] tracking-tight">
//           An Khang <span className="text-indigo-400">Digital</span>
//         </div>
//       </a>
//       <div className="flex items-center gap-5">
//         {/* <div className="hidden md:flex items-center gap-1.5 text-sm text-[#94a3b8]">📞 {siteConfig.phone}</div> */}
//         <a href="#form-section" className="px-6 py-2.5 bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 rounded-lg text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] shadow-[0_2px_12px_rgba(99,102,241,0.3)] no-underline">
//           Nhận Báo Giá Miễn Phí
//         </a>
//       </div>
//     </nav>
//   );
// }



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
            <Image src={logoUrl} alt={siteName} width={200} height={200} className="w-30 h-30 rounded-lg object-contain" />
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
            {/* <span className="gradient-text text-white">{siteName.split(' ')[0] || 'Template'}</span> */}
            {/* <span className="text-gray-400 font-light">{siteName.split(' ').slice(1).join(' ') || 'Hub'}</span> */}
          </span>
        </Link>

        {/* <nav className="hidden md:flex items-center gap-8 text-sm">
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
        </div> */}
      </div>

      {/* {mobileOpen && (
        <div className="md:hidden border-t border-gray-800/50 bg-gray-950/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-400 hover:text-white py-2 text-sm transition-colors" onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )} */}
    </header>
  );
}
