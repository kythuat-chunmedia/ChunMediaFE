import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import OrderManagement from "./OrderManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Đơn hàng | CMS Admin",
  description: "Xem và quản lý đơn hàng",
};

export default function OrderPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Đơn hàng" />
      <OrderManagement />
    </div>
  );
}