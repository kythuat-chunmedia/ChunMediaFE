import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import NewManagement from "./NewsManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Tin tức | CMS Admin",
  description: "Thêm, sửa, xóa tin tức và bài viết",
};

export default function NewPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Tin tức" />
      <NewManagement />
    </div>
  );
}