import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ContactManagement from "./ContactManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Liên hệ | CMS Admin",
  description: "Xem và quản lý các liên hệ từ khách hàng",
};

export default function ContactPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Liên hệ" />
      <ContactManagement />
    </div>
  );
}