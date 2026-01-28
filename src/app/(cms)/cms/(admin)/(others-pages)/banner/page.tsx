import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BannerManagement from "./BannerManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Sản phẩm | CMS Admin",
  description: "Thêm, sửa, xóa sản phẩm",
};

export default function CategoryProductPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Danh mục sản phẩm" />
      <BannerManagement />
    </div>
  );
}