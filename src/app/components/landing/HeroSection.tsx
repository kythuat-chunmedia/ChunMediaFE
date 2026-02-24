"use client";

import React from "react";
import type { Feature } from "@/app/types";

const FALLBACK_STATS = [
  { id: 1, value: "500+", name: "Website hoàn thành" },
  { id: 2, value: "99%", name: "Khách hài lòng" },
  { id: 3, value: "2h", name: "Thời gian phản hồi" },
  { id: 4, value: "24/7", name: "Hỗ trợ kỹ thuật" },
];

export default function HeroSection({ features }: { features: Feature[] }) {
  const stats = features.length > 0
    ? features.map((f) => ({ id: f.id, value: f.value, name: f.name }))
    : FALLBACK_STATS;

  return (
    <section className="relative pt-[140px] pb-20 px-4 md:px-10 text-center z-1">
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] rounded-full text-[13px] font-medium text-indigo-400 mb-7 animate-fadeInUp">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulseDot" />
        Đang nhận dự án mới — Phản hồi trong 2 giờ
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.15] tracking-tight mb-5 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
        Biến Ý Tưởng Thành<br />
        <span className="bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Website Chuyên Nghiệp
        </span>
      </h1>
      <p className="text-lg text-[#94a3b8] max-w-[600px] mx-auto mb-10 leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
        Điền form bên dưới để nhận tư vấn miễn phí và báo giá chi tiết trong vòng 24 giờ.
        Chúng tôi thiết kế website chuẩn SEO, tối ưu tốc độ và trải nghiệm người dùng.
      </p>
      <div className="flex justify-center gap-8 md:gap-12 flex-wrap animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
        {stats.map((s) => (
          <div key={s.id} className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold bg-linear-to-br from-indigo-500 via-purple-500 to-violet-400 bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="text-[13px] text-[#64748b] mt-1">{s.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
