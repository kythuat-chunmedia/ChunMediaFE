"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/app/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between backdrop-blur-[20px] border-b border-white/5 transition-all duration-300 ${
      scrolled ? "py-3 px-4 md:px-10 bg-[#0a0e1a]/95" : "py-4 px-4 md:px-10 bg-[#0a0e1a]/80"
    }`}>
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-10 h-10 bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 rounded-[10px] flex items-center justify-center font-black text-lg text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          AK
        </div>
        <div className="font-bold text-xl text-[#f1f5f9] tracking-tight">
          An Khang <span className="text-indigo-400">Digital</span>
        </div>
      </a>
      <div className="flex items-center gap-5">
        {/* <div className="hidden md:flex items-center gap-1.5 text-sm text-[#94a3b8]">📞 {siteConfig.phone}</div> */}
        <a href="#form-section" className="px-6 py-2.5 bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 rounded-lg text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.5)] shadow-[0_2px_12px_rgba(99,102,241,0.3)] no-underline">
          Nhận Báo Giá Miễn Phí
        </a>
      </div>
    </nav>
  );
}
