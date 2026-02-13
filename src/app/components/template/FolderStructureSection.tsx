import { siteConfig } from "@/app/lib/config";

export default function FolderStructureSection() {
  return (
    <section id="structure" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 block text-cyan">Cấu trúc chuẩn</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Kiến trúc <span className="gradient-text">NextJS App Router</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Mỗi template đều tuân theo cấu trúc thư mục chuẩn NextJS 14+ với App Router, hỗ trợ dynamic routes, SEO metadata, và loading states — giúp bạn dễ dàng tùy chỉnh và mở rộng.
            </p>
            <div className="flex flex-wrap gap-3">
              {["App Router", "Dynamic Routes", "SEO Ready", "TypeScript", "TailwindCSS"].map((feat) => (
                <span key={feat} className="tag-chip px-3 py-1.5 rounded-lg text-xs font-medium text-mint">{feat}</span>
              ))}
            </div>
          </div>

          <div className="gradient-border rounded-2xl overflow-hidden bg-dark2/60">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-500 ml-2 font-mono">app/</span>
            </div>
            <pre className="font-mono text-[13px] leading-[1.7] text-mint p-5 overflow-x-auto scrollbar-hide">{siteConfig.folderStructure}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
