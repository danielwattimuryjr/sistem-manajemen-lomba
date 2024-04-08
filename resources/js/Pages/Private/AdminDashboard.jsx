import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function AdminDashboard({ auth }) {
    return (
        <AdminLayout>
            <PageTitle title={"Admin Dashboard"} />
        </AdminLayout>
    );
}
