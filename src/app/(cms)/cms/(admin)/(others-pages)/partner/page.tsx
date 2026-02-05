import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import PartnerManagement from "./PartnerManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Đối tác | CMS Admin",
  description: "Thêm, sửa, xóa đối tác",
};

export default function PartnerPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Đối tác" />
      <PartnerManagement />
    </div>
  );
}