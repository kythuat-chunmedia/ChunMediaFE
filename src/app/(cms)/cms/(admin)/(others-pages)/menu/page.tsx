import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import MenuManagement from "./MenuManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Menu | CMS Admin",
  description: "Thêm, sửa, xóa cấu trúc menu",
};

export default function MenuPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Menu" />
      <MenuManagement />
    </div>
  );
}