import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import ProductManagement from "./ProductManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Sản phẩm | CMS Admin",
  description: "Thêm, sửa, xóa sản phẩm",
};

export default function ProductPage() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Sản phẩm" />
      <ProductManagement />
    </div>
  );
}
