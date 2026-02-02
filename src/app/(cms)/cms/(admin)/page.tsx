import PageBreadcrumb from "@/app/(cms)/cms/components/common/PageBreadCrumb";
import { Metadata } from "next";
import DashboardPage from "./(ui-elements)/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | CMS Admin",
  description: "Tổng quan hoạt động hệ thống CMS",
};

export default function Dashboard() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Dashboard" />
      <DashboardPage />
    </div>
  );
}