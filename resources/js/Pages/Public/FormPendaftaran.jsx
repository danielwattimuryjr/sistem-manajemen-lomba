import PageTitle from "@/Components/PageHeader";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { Card } from "flowbite-react";

const FormPendaftaran = ({ contest: { data } }) => {
    return (
        <PublicLayout>
            <Head title={`Form Pendaftaran ${data.title}`} />

            <PageTitle title={`Form Pendaftaran ${data.title}`} />

            <Card className="mt-4">Ini Form</Card>
        </PublicLayout>
    );
};

export default FormPendaftaran;
