import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import ServiceManagement from "./ServiceManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Service | CMS Admin",
  description: "Thêm, sửa, xóa service và tính năng",
};

export default function ServicePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Service" />
      <ServiceManagement />
    </div>
  );
}