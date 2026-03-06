// app/(pages)/dich-vu/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { clientApi } from "@/app/lib/api";
import type { ServicePageData } from "@/app/types";

import HeroSection from "@/app/components/client/servicePage/HeroSection";
import HighlightsSection from "@/app/components/client/servicePage/HighlightsSection";
import ClientStatsSection from "@/app/components/client/servicePage/ClientStatsSection";
import PricingSection from "@/app/components/client/servicePage/PricingSection";
import ProcessSection from "@/app/components/client/servicePage/ProcessSection";
import AwardsSection from "@/app/components/client/servicePage/AwardsSection";
import TeamSection from "@/app/components/client/servicePage/TeamSection";
import CTASection from "@/app/components/client/servicePage/CtaSection";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { slug } = await params;

    try {
        const page: ServicePageData = await clientApi.getServicePage(slug);
        return {
            title: page.metaTitle ?? page.hero.title,
            description: page.metaDescription,
        };
    } catch {
        return { title: "Dịch Vụ" };
    }
}

export default async function ServiceSlugPage({ params }: Props) {
    const { slug } = await params;
console.log("Generating metadata for slug:", slug);
let page: ServicePageData;
console.log(0);
try {
    console.log(1);
    page = await clientApi.getServicePage(slug);
    console.log(2);
    console.log(page);
} catch (error) {
    console.error("Error fetching service page for slug:", slug, error);
    notFound();
}

    return (
        <main>
            {/* 1 — Hero */}
            <HeroSection data={page.hero} />

            {/* 2 — Điểm nổi bật: HighlightsSection nhận items (không phải data) */}
            {page.highlights && page.highlights.length > 0 && (
                <HighlightsSection items={page.highlights} />
            )}

            {/* 3 — Khách hàng: ClientStatsSection nhận data={{ ... }} */}
            {page.clientStats && (
                <ClientStatsSection data={page.clientStats} />
            )}

            {/* 4 — Bảng giá */}
            {page.pricing && (
                <PricingSection data={page.pricing} />
            )}

            {/* 5 — Quy trình */}
            {page.process && (
                <ProcessSection data={page.process} />
            )}

            {/* 6 — Giải thưởng */}
            {page.awards && (
                <AwardsSection data={page.awards} />
            )}

            {/* 7 — Đội ngũ: TeamSection nhận data có experts */}
            {page.team && (
                <TeamSection data={page.team} />
            )}

            {/* 8 — CTA + Form: CtaSection nhận data KHÔNG có experts */}
            {page.ctaSection && (
                <CTASection data={page.ctaSection} />
            )}
        </main>
    );
}