import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
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