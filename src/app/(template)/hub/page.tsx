import Header from "@/app/components/template/Header";
import HeroSection from "@/app/components/template/HeroSection";
import FolderStructureSection from "@/app/components/template/FolderStructureSection";
import TemplateGrid from "@/app/components/template/TemplateGrid";
import ContactSection from "@/app/components/template/ContactSection";
import Footer from "@/app/components/template/Footer";
import { clientApi } from "@/app/lib/api";
import { apiTemplateToLocal, extractCategories } from "@/app/lib/transform";

export default async function HomePage() {
  // Fetch data song song từ API
  const [apiTemplates, config] = await Promise.all([
    clientApi.getTemplatePublished().catch(() => []),
    clientApi.getConfigSite().catch(() => null),
  ]);

  // Transform API response → local types dùng cho components
  const templates = apiTemplates.map(apiTemplateToLocal);
  const categories = extractCategories(templates);

  return (
    <>
      <Header config={config} />
      <main>
        <HeroSection config={config} templateCount={templates.length} />
        <FolderStructureSection />
        <TemplateGrid templates={templates} categories={categories} />
        <ContactSection config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
