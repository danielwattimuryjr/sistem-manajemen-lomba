import Description from "@/Components/Description";
import PageTitle from "@/Components/PageHeader";
import ParticipantList from "@/Components/ParticipantList";
import Schedule from "@/Components/Schedule";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FilePenLine } from "lucide-react";

const ContestDetailPage = ({ data, participants }) => {
    return (
        <AdminLayout>
            <PageTitle title={data.title}>
                <Button
                    color={"warning"}
                    as={Link}
                    href={route("perlombaan.edit", data.slug)}
                >
                    <FilePenLine className="mr-2 h-5 w-5" />
                    Ubah Data
                </Button>
            </PageTitle>

            <section className="space-y-4">
                {/* Card Jadwal */}
                <Schedule
                    start_date={data.start_date}
                    end_date={data.end_date}
                />

                {/* Card Deskripsi */}
                <Description description={data.description} />

                {/* Card  Peserta */}
                <ParticipantList data={participants} />
            </section>
        </AdminLayout>
    );
};

export default ContestDetailPage;
