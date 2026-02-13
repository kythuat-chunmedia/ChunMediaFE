import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import TemplateManagement from "./TemplateCategoryManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Thể loại giao diện | CMS Admin",
  description: "Thêm, sửa, xóa Thể loại giao diện",
};

export default function ProductPage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Thể loại giao diện" />
      <TemplateManagement />
    </div>
  );
}
