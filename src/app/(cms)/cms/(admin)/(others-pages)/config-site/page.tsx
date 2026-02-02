import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import { Metadata } from "next";
import ConfigSiteManagement from "./ConfigSiteManagement";

export const metadata: Metadata = {
  title: "Cấu hình Website | CMS Admin",
  description: "Thiết lập thông tin chung và mạng xã hội cho website",
};

export default function ConfigSitePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Cấu hình Website" />
      <ConfigSiteManagement />
    </div>
  );
}