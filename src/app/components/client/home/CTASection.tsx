import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="max-w-4xl mx-auto text-center py-20 px-8 bg-white/80 backdrop-blur-xl border border-[rgba(10,147,150,0.2)] rounded-3xl shadow-[0_8px_32px_rgba(10,147,150,0.1)] overflow-hidden relative">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(10,147,150,0.05)_0%,transparent_70%)] animate-[spin_20s_linear_infinite]" />
        <div className="relative z-10">
          <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] leading-snug mb-5 text-[#1A1A1A]">
            Sẵn sàng tạo nên<br />điều đột phá?
          </h2>
          <p className="font-['Nunito_Sans'] text-lg text-[#6C757D] leading-[1.8] mb-10 max-w-xl mx-auto">
            Hãy để chúng tôi giúp thương hiệu của bạn tỏa sáng trong kỷ nguyên số. Liên hệ ngay để nhận tư vấn miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lien-he"
              className="font-['Nunito_Sans'] relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-linear-to-br from-[#0A9396] to-[#94D2BD] text-white rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,147,150,0.4)] group"
            >
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              Start Your Project <span>→</span>
            </Link>
            <Link
              href="/dich-vu"
              className="font-['Nunito_Sans'] inline-flex items-center justify-center px-8 py-4 bg-transparent text-[#0A9396] border-2 border-[rgba(10,147,150,0.35)] rounded-xl font-bold text-base tracking-wide transition-all duration-300 hover:bg-[rgba(10,147,150,0.08)] hover:border-[#0A9396] hover:-translate-y-1"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}