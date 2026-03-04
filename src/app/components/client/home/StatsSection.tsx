const stats = [
  { number: '500+', label: 'Dự Án Thành Công' },
  { number: '10M+', label: 'Lượt Tiếp Cận' },
  { number: '98%', label: 'Khách Hàng Hài Lòng' },
  { number: '24/7', label: 'Support Team' },
];

export function StatsSection() {
  return (
    <section className="pb-24 px-4">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ number, label }) => (
          <div
            key={label}
            className="text-center p-8 bg-white/80 backdrop-blur-xl border border-[rgba(10,147,150,0.15)] rounded-2xl shadow-[0_4px_20px_rgba(10,147,150,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0A9396] hover:bg-white/95 hover:shadow-[0_8px_32px_rgba(10,147,150,0.15)]"
          >
            <div className="font-['Be_Vietnam_Pro'] text-[2.8rem] font-extrabold tracking-[-0.04em] leading-none mb-2 bg-linear-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
              {number}
            </div>
            <div className="font-['Nunito_Sans'] text-[#6C757D] text-sm font-medium">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}