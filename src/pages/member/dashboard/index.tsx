import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/member/Dashboard";

const DasboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Dashboard Member"
      type="member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DasboardMemberPage;
