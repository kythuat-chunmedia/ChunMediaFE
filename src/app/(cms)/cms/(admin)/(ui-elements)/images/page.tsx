import ComponentCard from "@/app/(cms)/cms/components/common/ComponentCard";
import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import ResponsiveImage from "@/app/(cms)/cms/components/ui/images/ResponsiveImage";
import ThreeColumnImageGrid from "@/app/(cms)/cms/components/ui/images/ThreeColumnImageGrid";
import TwoColumnImageGrid from "@/app/(cms)/cms/components/ui/images/TwoColumnImageGrid";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Images | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Images page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Images() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
