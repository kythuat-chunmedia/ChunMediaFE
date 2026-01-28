import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import AdminManagement from "./AdminManagement";
import { ProtectedRoute } from "@/components/auth/cms/ProtectedRoute";


export const metadata: Metadata = {
  title: "Quản lý Sản phẩm | CMS Admin",
  description: "Thêm, sửa, xóa sản phẩm",
};


export default function CategoryProductPage() {
  return (
    <div>
          {/* <ProtectedRoute> */}

      {/* <AuthProvider> */}
        <PageBreadcrumb pageTitle="Quản lý Admin" />
        <AdminManagement />
        {/* </AuthProvider> */}
          {/* </ProtectedRoute> */}
    </div>
  );
}