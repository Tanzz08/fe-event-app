import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/admin/Dashboard";

const DasboardAdminPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Admin"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DasboardAdminPage;
