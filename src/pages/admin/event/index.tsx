import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/admin/Events";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="List of all events, create new category, and manage existing events"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
