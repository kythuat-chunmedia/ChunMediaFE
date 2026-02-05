import PageBreadcrumb from "@/app/components/cms/common/PageBreadCrumb";
import MemberTeamManagement from "./MemberTeamManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Thành viên | CMS Admin",
  description: "Thêm, sửa, xóa thành viên team",
};

export default function MemberTeamPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quản lý Thành viên" />
      <MemberTeamManagement />
    </div>
  );
}