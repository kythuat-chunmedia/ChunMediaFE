import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import FeatureManagement from "./FeatureManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Tính năng | CMS Admin",
  description: "Thêm, sửa, xóa danh mục tính năng website",
};

export default function FeaturePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Tính năng Website" />
      <FeatureManagement />
    </div>
  );
}