import ContestAssessmentFactor from "@/Components/ContestAssessmentFactor";
import Description from "@/Components/Description";
import PageTitle from "@/Components/PageHeader";
import Schedule from "@/Components/Schedule";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "flowbite-react";

const PerlombaanDetail = ({ contest: data, hasParticipated, factors }) => {
    const submitParticipation = () => {
        router.post(route("public.perlombaan.participate", data.slug));
    };

    return (
        <PublicLayout>
            <Head title={`Detail ${data.title}`} />

            <PageTitle title={data.title}>
                <Button
                    disabled={hasParticipated}
                    onClick={submitParticipation}
                    color={"blue"}
                >
                    {hasParticipated
                        ? "Anda Telah Mendaftarkan Diri"
                        : "Daftar Sekarang"}
                </Button>
            </PageTitle>

            <section className="space-y-4">
                {/* Card Jadwal */}
                <Schedule
                    start_date={data.start_date}
                    end_date={data.end_date}
                />

                {/* Card Faktor Penilaian */}
                <ContestAssessmentFactor data={factors} />

                {/* Card Deskripsi */}
                <Description description={data.description} />
            </section>
        </PublicLayout>
    );
};

export default PerlombaanDetail;
