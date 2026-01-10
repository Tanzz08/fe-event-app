import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/admin/Banner/DetailBanner";


const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      title="DetailBanner"
      description="Manage information for this Banner"
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDetailBannerPage;
