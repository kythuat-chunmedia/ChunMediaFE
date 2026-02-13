import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import TemplateManagement from "./TemplateManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Giao diện | CMS Admin",
  description: "Thêm, sửa, xóa Giao diện",
};

export default function ProductPage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Giao diện" />
      <TemplateManagement />
    </div>
  );
}
