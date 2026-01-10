import DashboardLayout from "@/components/layouts/DashboardLayout";
import Banner from "@/components/views/admin/Banner";

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      title="Banner"
      description="List of all Categories, create new banners, and manage existing banners"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default AdminBannerPage;
