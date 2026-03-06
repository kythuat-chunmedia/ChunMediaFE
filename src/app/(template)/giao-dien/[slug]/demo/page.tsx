// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { clientApi } from "@/app/lib/api";
// import { apiTemplateToLocal } from "@/app/lib/transform";
// import { siteConfig } from "@/app/lib/config";
// import DemoViewer from "./DemoViewer";

// interface Props {
//   params: { slug: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const apiTemplate = await clientApi.getTemplateDetail(params.slug).catch(() => null);
//   if (!apiTemplate) return { title: "Không tìm thấy" };

//   const t = apiTemplateToLocal(apiTemplate);
//   return {
//     title: `Demo — ${t.name} | TemplateHub`,
//     description: `Xem demo trực tiếp giao diện ${t.name} trên nhiều thiết bị`,
//   };
// }

// export default async function DemoPage({ params }: Props) {
//   const apiTemplate = await clientApi.getTemplateDetail(params.slug).catch(() => null);
//       console.log("apiTemplate:", apiTemplate);

//   if (!apiTemplate) notFound();

//   const template = apiTemplateToLocal(apiTemplate);
//   const demoUrl = template.demoUrl !== "#"
//     ? template.demoUrl
//     : `${siteConfig.demoBaseUrl}/${template.slug}/`;

//     console.log("Demo URL:", demoUrl);
//     console.log("Template:", template);

//   return <DemoViewer template={template} demoUrl={demoUrl} />;
// }







import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientApi } from "@/app/lib/api";
import { apiTemplateToLocal } from "@/app/lib/transform";
import { siteConfig } from "@/app/lib/config";
import DemoViewer from "./DemoViewer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const apiTemplate = await clientApi
    .getTemplateDetail(slug)
    .catch(() => null);

  if (!apiTemplate) {
    return { title: "Không tìm thấy" };
  }

  const t = apiTemplateToLocal(apiTemplate);

  return {
    title: `Demo — ${t.name} | TemplateHub`,
    description: `Xem demo trực tiếp giao diện ${t.name} trên nhiều thiết bị`,
  };
}

export default async function DemoPage(
  { params }: Props
) {
  const { slug } = await params;

  const apiTemplate = await clientApi
    .getTemplateDetail(slug)
    .catch(() => null);

  if (!apiTemplate) notFound();

  const template = apiTemplateToLocal(apiTemplate);

  const demoUrl =
    template.demoUrl !== "#"
      ? template.demoUrl
      : `${siteConfig.demoBaseUrl}/${template.slug}/`;

  return <DemoViewer template={template} demoUrl={demoUrl} />;
}
