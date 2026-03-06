import { siteConfig } from "@/app/lib/config";

export default function FolderStructureSection() {
  return (
    <section id="structure" className="py-20 px-6 relative" style={{ background: "linear-gradient(135deg,#F1F8F8,#E8F4F4)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)]">
              <span className="font-['Nunito_Sans'] text-xs font-bold tracking-widest uppercase text-[#0A9396]">Cấu trúc chuẩn</span>
            </div>
            <h2 className="font-['Be_Vietnam_Pro'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[#1A1A1A] mb-5">
              Kiến trúc{" "}
              <span className="bg-gradient-to-br from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
                NextJS App Router
              </span>
            </h2>
            <p className="font-['Nunito_Sans'] text-[#6C757D] mb-6 leading-relaxed text-sm">
              Mỗi template đều tuân theo cấu trúc thư mục chuẩn NextJS 14+ với App Router, hỗ trợ dynamic routes,
              SEO metadata, và loading states — giúp bạn dễ dàng tùy chỉnh và mở rộng.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["App Router", "Dynamic Routes", "SEO Ready", "TypeScript", "TailwindCSS"].map((feat) => (
                <span key={feat}
                  className="font-['Nunito_Sans'] text-xs font-bold px-3 py-1.5 rounded-lg bg-[rgba(10,147,150,0.08)] border border-[rgba(10,147,150,0.2)] text-[#0A9396]">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Code block */}
          <div className="bg-[#1A2332] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(10,147,150,0.12)] border border-[rgba(10,147,150,0.15)]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-[#151D2B]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-[#0A9396]/70" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#95A5A6] ml-2">app/</span>
            </div>
            <pre className="font-['JetBrains_Mono'] text-[13px] leading-[1.8] text-[#94D2BD] p-5 overflow-x-auto">
              {siteConfig.folderStructure}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}