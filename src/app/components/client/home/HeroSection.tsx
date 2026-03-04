// 'use client';

// import Link from 'next/link';
// import { useEffect, useRef } from 'react';

// export function HeroSection() {
//   return (
//     <section className="min-h-screen flex items-center pt-32 pb-16 px-4 relative overflow-hidden">
//       <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
//         {/* Text */}
//         <div className="animate-[fadeInUp_0.8s_ease_both]">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-5 py-2 bg-[rgba(10,147,150,0.1)] border border-[rgba(10,147,150,0.3)] rounded-full text-[#0A9396] text-xs font-bold tracking-[0.06em] uppercase mb-8 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#0A9396] animate-[pulse_2s_infinite]" />
//             AI-Powered Communication
//           </div>

//           <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(3.2rem,5.5vw,5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] mb-6 text-[#1A1A1A] animate-[fadeInUp_0.8s_ease_0.3s_backwards]">
//             The Future of{' '}
//             <span className="bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
//               Tech Media
//             </span>
//           </h1>

//           <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] leading-[1.85] mb-10 max-w-[600px] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
//             Chúng tôi kết hợp công nghệ tiên tiến với chiến lược truyền thông sáng tạo, mang đến
//             giải pháp toàn diện cho thương hiệu của bạn trong kỷ nguyên số.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.8s_ease_0.5s_backwards]">
//             <Link
//               href="/portfolio"
//               className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,147,150,0.4)] group"
//             >
//               <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
//               Explore Projects <span>→</span>
//             </Link>
//             <Link
//               href="/gioi-thieu"
//               className="font-['Nunito_Sans'] inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#0A9396] border-2 border-[rgba(10,147,150,0.35)] rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:bg-[rgba(10,147,150,0.08)] hover:border-[#0A9396] hover:-translate-y-1"
//             >
//               Tìm Hiểu Thêm
//             </Link>
//           </div>
//         </div>

//         {/* Glass Code Card */}
//         <div className="animate-[fadeIn_1s_ease_0.6s_backwards] relative">
//           <div className="relative bg-white/70 backdrop-blur-xl border border-[rgba(10,147,150,0.2)] rounded-3xl p-10 shadow-[0_8px_32px_rgba(10,147,150,0.1)] overflow-hidden">
//             <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(10,147,150,0.05)_0%,transparent_70%)] animate-[spin_20s_linear_infinite]" />
//             <div className="font-['JetBrains_Mono'] text-sm leading-[1.9] relative z-10">
//               {[
//                 ['01', <><span className="text-[#D73A49]">const</span> <span className="text-[#0A9396]">brandStrategy</span> = () =&gt; {'{'}</>],
//                 ['02', <><span className="text-[#D73A49]">  return</span> {'{'}</>],
//                 ['03', <>    reach: <span className="text-[#22863A]">'10M+'</span>,</>],
//                 ['04', <>    engagement: <span className="text-[#22863A]">'300%↑'</span>,</>],
//                 ['05', <>    innovation: <span className="text-[#22863A]">'∞'</span></> ],
//                 ['06', <>  {'}'}</>],
//                 ['07', <>{'}'}</>],
//               ].map(([num, content], i) => (
//                 <div
//                   key={i}
//                   className="flex gap-4 mb-1 opacity-0"
//                   style={{ animation: `codeAppear 0.5s ease ${0.7 + i * 0.1}s forwards` }}
//                 >
//                   <span className="text-[#95A5A6] select-none min-w-[1.5em]">{num}</span>
//                   <span>{content}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes codeAppear {
//           to { opacity: 1; }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.2); }
//         }
//       `}</style>
//     </section>
//   );
// }









// 'use client';

// import Link from 'next/link';

// // 👇 Thay YOUR_VIDEO_ID bằng ID thực — VD: youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
// const YOUTUBE_ID = '94kJE_NL7H0';

// /*
//  * Autoplay + loop + muted trên YouTube embed:
//  *
//  * autoplay=1        → tự play ngay khi load
//  * mute=1            → bắt buộc mute để autoplay hoạt động (browser policy)
//  * loop=1            → lặp lại video
//  * playlist=ID       → bắt buộc khai báo cùng video ID để loop hoạt động
//  * controls=0        → ẩn toàn bộ thanh controls
//  * rel=0             → không hiện video gợi ý
//  * modestbranding=1  → ẩn logo YouTube
//  * iv_load_policy=3  → ẩn annotations/cards
//  * disablekb=1       → tắt phím tắt
//  * playsinline=1     → không fullscreen trên mobile
//  * fs=0              → ẩn nút fullscreen
//  * showinfo=0        → ẩn title bar (legacy, vẫn thêm cho chắc)
//  *
//  * ⚠️  controls=0 hoạt động tốt với autoplay muted.
//  *     Nếu người dùng click vào video, YouTube có thể hiện controls tạm thời —
//  *     dùng pointer-events:none trên overlay để chặn hoàn toàn tương tác.
//  */
// const EMBED_SRC =
//   `https://www.youtube.com/embed/${YOUTUBE_ID}` +
//   `?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}` +
//   `&controls=0&rel=0&modestbranding=1&iv_load_policy=3` +
//   `&disablekb=1&playsinline=1&fs=0&showinfo=0`;

// export function HeroSection() {
//   return (
//     <section className="min-h-screen flex items-center pt-32 pb-16 px-4 relative overflow-hidden">

//       {/* ── Background ── */}
//       <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]">
//         <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(10,147,150,0.07)_0%,transparent_65%)]" />
//       </div>
//       <div
//         className="absolute inset-0 -z-10 pointer-events-none"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(10,147,150,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.045) 1px,transparent 1px)',
//           backgroundSize: '44px 44px',
//         }}
//       />

//       <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 items-center">

//         {/* ══ LEFT ══ */}
//         <div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(10,147,150,0.09)] border border-[rgba(10,147,150,0.28)] rounded-full text-[#0A9396] text-[0.72rem] font-bold tracking-[0.07em] uppercase mb-7">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#0A9396] animate-[pdot_2s_infinite]" />
//             AI-Powered Communication
//           </div>

//           <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(2.8rem,4.2vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] mb-5">
//             The Future of{' '}
//             <span className="bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
//               Tech Media
//             </span>
//           </h1>

//           <p className="font-['Nunito_Sans'] text-base text-[#6C757D] leading-[1.85] mb-9 max-w-[480px]">
//             Chúng tôi kết hợp công nghệ tiên tiến với chiến lược truyền thông sáng tạo, mang đến
//             giải pháp toàn diện cho thương hiệu của bạn trong kỷ nguyên số.
//           </p>

//           <div className="flex flex-wrap gap-3">
//             <Link
//               href="/portfolio"
//               className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] group"
//             >
//               <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
//               Explore Projects →
//             </Link>
//             <Link
//               href="/gioi-thieu"
//               className="font-['Nunito_Sans'] inline-flex items-center px-7 py-3.5 border-[1.5px] border-[rgba(10,147,150,0.35)] text-[#0A9396] rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[rgba(10,147,150,0.07)] hover:border-[#0A9396] hover:-translate-y-0.5"
//             >
//               Tìm Hiểu Thêm
//             </Link>
//           </div>
//         </div>

//         {/* ══ RIGHT — Autoplay muted loop video ══ */}
//         <div className="relative">
//           {/* Glow halo */}
//           <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse,rgba(10,147,150,0.1),transparent_70%)] blur-xl pointer-events-none" />

//           {/* 16:10 wrapper */}
//           <div
//             className="relative w-full overflow-hidden rounded-2xl shadow-[0_16px_56px_rgba(10,147,150,0.15),0_0_0_1px_rgba(10,147,150,0.12)]"
//             style={{ aspectRatio: '16/10' }}
//           >
//             {/* iframe scale trick: phóng to 300% rồi scale xuống để cắt hết UI viền YT */}
//             <div className="absolute inset-0 scale-[1.04]">
//               <iframe
//                 className="absolute inset-0 w-full h-full border-0"
//                 src={EMBED_SRC}
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen={false}
//                 title="Chinh Media Showreel"
//               />
//             </div>

//             {/* Transparent overlay — chặn click vào iframe, giữ controls=0 hoàn toàn */}
//             <div className="absolute inset-0 z-10 cursor-default" />
//           </div>
//         </div>

//       </div>

//       <style jsx>{`
//         @keyframes pdot {
//           0%,100% { opacity:1; transform:scale(1); }
//           50%      { opacity:.4; transform:scale(1.3); }
//         }
//       `}</style>
//     </section>
//   );
// }







'use client';

import Link from 'next/link';

// 👇 Thay YOUR_VIDEO_ID bằng ID thực — VD: youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
const YOUTUBE_ID = '94kJE_NL7H0';

const EMBED_SRC =
  `https://www.youtube.com/embed/${YOUTUBE_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}` +
  `&controls=0&rel=0&modestbranding=1&iv_load_policy=3` +
  `&disablekb=1&playsinline=1&fs=0&showinfo=0`;

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-32 pb-16 px-4 relative overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]">
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(10,147,150,0.07)_0%,transparent_65%)]" />
      </div>
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,147,150,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.045) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-16 items-center">

        {/* ══ LEFT ══ */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(10,147,150,0.09)] border border-[rgba(10,147,150,0.28)] rounded-full text-[#0A9396] text-[0.72rem] font-bold tracking-[0.07em] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A9396] animate-[pdot_2s_infinite]" />
            AI-Powered Communication
          </div>

          <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(2.8rem,4.2vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#1A1A1A] mb-5">
            The Future of{' '}
            <span className="bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
              Tech Media
            </span>
          </h1>

          <p className="font-['Nunito_Sans'] text-base text-[#6C757D] leading-[1.85] mb-9 max-w-[480px]">
            Chúng tôi kết hợp công nghệ tiên tiến với chiến lược truyền thông sáng tạo, mang đến
            giải pháp toàn diện cho thương hiệu của bạn trong kỷ nguyên số.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(10,147,150,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(10,147,150,0.4)] group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              Explore Projects →
            </Link>
            <Link
              href="/gioi-thieu"
              className="font-['Nunito_Sans'] inline-flex items-center px-7 py-3.5 border-[1.5px] border-[rgba(10,147,150,0.35)] text-[#0A9396] rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[rgba(10,147,150,0.07)] hover:border-[#0A9396] hover:-translate-y-0.5"
            >
              Tìm Hiểu Thêm
            </Link>
          </div>
        </div>

        {/* ══ RIGHT — Video sạch, không UI ══ */}
        <div className="relative">
          {/* Glow halo */}
          <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse,rgba(10,147,150,0.1),transparent_70%)] blur-xl pointer-events-none" />

          {/*
           * TECHNIQUE: padding-bottom trick kết hợp negative margin
           *
           * Vấn đề: YouTube luôn render title bar ~40px trên cùng
           * và logo + related ~40px dưới cùng khi mới load.
           *
           * Giải pháp:
           * 1. Outer box: aspect-ratio chuẩn + overflow:hidden (clip)
           * 2. Inner iframe box: cao hơn outer 80px (40px trên + 40px dưới)
           *    bằng cách dùng top:-40px, height:calc(100%+80px)
           *    → title bar và logo bị đẩy ra ngoài vùng clip
           * 3. Overlay z-10 chặn mọi click/hover
           */}
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-[0_16px_56px_rgba(10,147,150,0.15),0_0_0_1px_rgba(10,147,150,0.12)]"
            style={{ aspectRatio: '16/10' }}
          >
            {/* Đẩy iframe lên 40px và kéo dài thêm 80px để crop title + logo */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: 0,
                right: 0,
                bottom: '-40px',
              }}
            >
              <iframe
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                src={EMBED_SRC}
                allow="autoplay; encrypted-media"
                allowFullScreen={false}
                title="Chinh Media Showreel"
              />
            </div>

            {/* Overlay chặn tương tác hoàn toàn */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                cursor: 'default',
              }}
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes pdot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.3); }
        }
      `}</style>
    </section>
  );
}