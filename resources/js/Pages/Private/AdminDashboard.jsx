import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";

export default function AdminDashboard({ auth }) {
    return (
        <AdminLayout>
            <PageTitle title={"Admin Dashboard"} />
        </AdminLayout>
    );
}
