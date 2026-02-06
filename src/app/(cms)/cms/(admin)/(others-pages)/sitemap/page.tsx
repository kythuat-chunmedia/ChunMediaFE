import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import SitemapManagement from "./SitemapManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Sitemap | CMS Admin",
  description: "Thêm, sửa, xóa Sitemap",
};

export default function ProductPage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Sitemap" />
      <SitemapManagement />
    </div>
  );
}
