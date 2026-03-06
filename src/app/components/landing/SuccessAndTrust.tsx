"use client";

import React from "react";

export function SuccessState() {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-20 h-20 mx-auto mb-6 bg-emerald-50 border-2 border-emerald-400 rounded-full flex items-center justify-center text-4xl shadow-[0_0_0_6px_rgba(16,185,129,0.1)]">
        🎉
      </div>
      <h2 className="text-[28px] font-extrabold text-[#1A1A1A] mb-3">Gửi thành công!</h2>
      <p className="text-[#6C757D] text-base max-w-[400px] mx-auto leading-relaxed">
        Cảm ơn bạn đã gửi yêu cầu. Đội ngũ của chúng tôi sẽ liên hệ bạn trong vòng{" "}
        <strong className="text-[#0A9396]">2 giờ làm việc</strong>.
      </p>
    </div>
  );
}

export function TrustSection() {
  return (
    <div className="text-center mt-10 py-8">
      <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
        {[
          { icon: "🔒", text: "Bảo mật thông tin" },
          { icon: "⚡", text: "Phản hồi nhanh 2h" },
          { icon: "💯", text: "Báo giá miễn phí" },
          { icon: "🤝", text: "Cam kết hoàn tiền" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2.5 text-[#6C757D] text-[13px] font-medium">
            <div className="w-9 h-9 bg-white border border-[rgba(10,147,150,0.15)] rounded-xl flex items-center justify-center text-lg shadow-[0_2px_8px_rgba(10,147,150,0.06)]">
              {item.icon}
            </div>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}