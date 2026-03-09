// src/app/(client)/(main-page)/dich-vu/[slug]/page.tsx

import { notFound } from "next/navigation";
import { clientApi } from "@/app/lib/api";
import HeroSection from "@/app/components/client/servicePage/HeroSection";
import AboutSection from "@/app/components/client/servicePage/AboutSection";
import HighlightsSection from "@/app/components/client/servicePage/HighlightsSection";
import PricingSection from "@/app/components/client/servicePage/PricingSection";
import AboutCompanySection from "@/app/components/client/servicePage/AboutCompanySection";
import ClientStatsSection from "@/app/components/client/servicePage/ClientStatsSection";
import SolutionsSection from "@/app/components/client/servicePage/SolutionsSection";
import ProjectsSection from "@/app/components/client/servicePage/ProjectsSection";
import TestimonialsSection from "@/app/components/client/servicePage/TestimonialsSection";
import AwardsSection from "@/app/components/client/servicePage/AwardsSection";
import ProcessSection from "@/app/components/client/servicePage/ProcessSection";
import TeamSection from "@/app/components/client/servicePage/TeamSection";
import CtaSection from "@/app/components/client/servicePage/CtaSection";
import QnASection from "@/app/components/client/servicePage/QnaSection";

interface PageProps {
  params: { slug: string };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  let data;
  console.log("[slug]:", slug);
  try {
    data = await clientApi.getServicePage(slug);
    console.log("[ServicePage] fetched data:", data);
  } catch (err) {
    console.error("[ServicePage] fetch error:", err);
    notFound();
  }

  if (!data) notFound();

  // console.log("[ServicePage] rendering with data:", data);
  // console.log("[ServicePage] data sections:", {
  //   hero: !!data.hero,
  //   about: !!data.about,
  //   highlights: !!data.highlights?.length,
  //   pricing: !!data.pricing,
  //   aboutCompany: !!data.aboutCompany,
  //   clientStats: !!data.clientStats,
  //   solutions: !!data.solutions,
  //   projects: !!data.projects,
  //   testimonials: !!data.testimonials,
  //   awards: !!data.awards,
  //   process: !!data.process,
  //   team: !!data.team,
  //   ctaSection: !!data.ctaSection,
  //   qnA: !!data.qnA,
  // });

  return (
    <main>
      {data.hero         && <HeroSection          data={data.hero} />}
      {data.about        && <AboutSection         data={data.about} />}
      {data.highlights?.length ? <HighlightsSection highlights={data.highlights} /> : null}
      {data.pricing      && <PricingSection       data={data.pricing} />}
      {data.aboutCompany && <AboutCompanySection  data={data.aboutCompany} />}
      {data.clientStats  && <ClientStatsSection   data={data.clientStats} />}
      {data.solutions    && <SolutionsSection     data={data.solutions} />}
      {data.projects     && <ProjectsSection      data={data.projects} />}
      {data.testimonials && <TestimonialsSection  data={data.testimonials} />}
      {/* {data.awards       && <AwardsSection        data={data.awards} />} */}
      {data.process      && <ProcessSection       data={data.process} />}
      {data.team         && <TeamSection          data={data.team} />}
      {data.ctaSection   && <CtaSection           data={data.ctaSection} />}
      {data.qnA          && <QnASection           data={data.qnA} />}
    </main>
  );
}