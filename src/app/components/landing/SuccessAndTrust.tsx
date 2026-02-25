"use client";

import React from "react";
import { siteConfig } from "@/app/lib/config";

export function SuccessState() {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-20 h-20 mx-auto mb-6 bg-[rgba(16,185,129,0.15)] border-2 border-emerald-500 rounded-full flex items-center justify-center text-4xl animate-successBounce">
        🎉
      </div>
      <h2 className="text-[28px] font-extrabold mb-3">Gửi thành công!</h2>
      <p className="text-[#94a3b8] text-base max-w-[400px] mx-auto leading-relaxed">
        Cảm ơn bạn đã gửi yêu cầu. Đội ngũ của chúng tôi sẽ liên hệ bạn trong vòng{" "}
        <strong className="text-white">2 giờ làm việc</strong>.
      </p>
      {/* <div className="mt-8 p-5 bg-[#0f1629] border border-[#2a3456] rounded-xl inline-flex flex-col md:flex-row gap-4 md:gap-8">
        {[
          { icon: "📞", label: "Gọi ngay", value: siteConfig.phone },
          { icon: "💬", label: "Zalo chat", value: siteConfig.zalo },
          { icon: "📧", label: "Email", value: siteConfig.email },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-2xl mb-1.5">{item.icon}</div>
            <div className="text-[13px] text-[#94a3b8]">{item.label}</div>
            <div className="text-[15px] font-bold text-[#f1f5f9]">{item.value}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export function TrustSection() {
  return (
    <div className="text-center mt-12 py-8">
      <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
        {[
          { icon: "🔒", text: "Bảo mật thông tin" },
          { icon: "⚡", text: "Phản hồi nhanh 2h" },
          { icon: "💯", text: "Báo giá miễn phí" },
          { icon: "🤝", text: "Cam kết hoàn tiền" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2.5 text-[#64748b] text-[13px]">
            <div className="w-9 h-9 bg-white/4 rounded-lg flex items-center justify-center text-lg">{item.icon}</div>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
