import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import UserManagement from "./UserManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Sản phẩm | CMS Admin",
  description: "Thêm, sửa, xóa sản phẩm",
};

export default function CategoryProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Danh mục sản phẩm" />
      <UserManagement />
    </div>
  );
}