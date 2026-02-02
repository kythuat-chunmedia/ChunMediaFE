import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import PortfolioManagement from "./PortfolioManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Portfolio | CMS Admin",
  description: "Quản lý các case study và dự án portfolio",
};

export default function PortfolioPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Portfolio" />
      <PortfolioManagement />
    </div>
  );
}