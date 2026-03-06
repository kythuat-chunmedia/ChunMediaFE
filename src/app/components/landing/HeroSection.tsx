"use client";

import React from "react";
import type { Feature } from "@/app/types";

const FALLBACK_STATS = [
  { id: 1, icon: "500+", name: "Website hoàn thành" },
  { id: 2, icon: "99%",  name: "Khách hài lòng" },
  { id: 3, icon: "2h",   name: "Thời gian phản hồi" },
  { id: 4, icon: "24/7", name: "Hỗ trợ kỹ thuật" },
];

export default function HeroSection({ features }: { features: Feature[] }) {
  const stats =
    features.length > 0
      ? features.map((f) => ({ id: f.id, icon: f.icon, name: f.name }))
      : FALLBACK_STATS;

  return (
    <section className="relative pt-28 pb-16 px-4 md:px-10 text-center z-10">
      {/* Live badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(10,147,150,0.09)] border border-[rgba(10,147,150,0.25)] rounded-full text-[13px] font-semibold text-[#0A9396] mb-7 animate-[fadeInUp_0.5s_ease-out_both]">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Đang nhận dự án mới — Phản hồi trong 2 giờ
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.12] tracking-tight mb-5 text-[#1A1A1A] animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
        Biến Ý Tưởng Thành<br />
        <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
          Website Chuyên Nghiệp
        </span>
      </h1>

      <p className="text-lg text-[#6C757D] max-w-[600px] mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
        Điền form bên dưới để nhận tư vấn miễn phí và báo giá chi tiết trong vòng 24 giờ.
        Chúng tôi thiết kế website chuẩn SEO, tối ưu tốc độ và trải nghiệm người dùng.
      </p>

      {/* Stats row */}
      <div className="relative z-10 max-w-[860px] mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-5 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
        {stats.map((s) => (
          <div
            key={s.id}
            className="text-center p-4 bg-white/80 border border-[rgba(10,147,150,0.12)] rounded-2xl backdrop-blur-sm shadow-[0_2px_16px_rgba(10,147,150,0.06)]"
          >
            {/* <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent tracking-tight mb-0.5">
              {s.icon}
            </div> */}
            <div className="text-[12px] text-[#95A5A6] font-medium">{s.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}