// app/components/shared/PageHeader.tsx
// Shared page header — dùng cho tất cả trang con

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Background — nhất quán với homepage */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#F8F9FA] to-[#E9ECEF]" />
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,147,150,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,147,150,0.04) 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(10,147,150,0.07)_0%,transparent_65%)] -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(10,147,150,0.09)] border border-[rgba(10,147,150,0.28)] rounded-full text-[#0A9396] text-[0.72rem] font-bold tracking-[0.07em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A9396]" />
            {badge}
          </div>
        )}
        <h1 className="font-['Be_Vietnam_Pro'] text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold tracking-[-0.04em] leading-[1.1] text-[#1A1A1A] mb-4">
          {title}
        </h1>
        {description && (
          <p className="font-['Nunito_Sans'] text-base text-[#6C757D] leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}