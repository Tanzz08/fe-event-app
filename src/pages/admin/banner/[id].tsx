import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/admin/DetailCategory";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="DetailCategory"
      description="Manage information for this category"
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;
