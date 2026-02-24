import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import ContactRequestManagement from "./ContactRequestManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Yêu cầu Báo giá | CMS Admin",
  description: "Xem, xử lý, cập nhật trạng thái các yêu cầu báo giá từ landing page",
};

export default function ContactRequestPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Yêu cầu Báo giá" />
      <ContactRequestManagement />
    </div>
  );
}