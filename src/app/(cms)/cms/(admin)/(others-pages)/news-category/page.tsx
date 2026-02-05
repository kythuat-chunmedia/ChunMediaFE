import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import CategoryNewManagement from "./NewsCategoryManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Danh mục Tin tức | CMS Admin",
  description: "Thêm, sửa, xóa danh mục tin tức",
};

export default function CategoryNewPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Danh mục Tin tức" />
      <CategoryNewManagement />
    </div>
  );
}