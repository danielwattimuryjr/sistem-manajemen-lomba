import Description from "@/Components/Description";
import PageTitle from "@/Components/PageHeader";
import Schedule from "@/Components/Schedule";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "flowbite-react";

const PerlombaanDetail = ({
    available: isAvailable,
    contest: data,
    hasParticipated,
}) => {
    // const { post, processing, errors } = useForm();
    const submitParticipation = () => {
        router.post(route("public.perlombaan.participate", data.slug));
    };

    return (
        <PublicLayout>
            <Head title={`Detail ${data.title}`} />

            <PageTitle title={data.title}>
                <Button
                    disabled={!isAvailable || hasParticipated}
                    onClick={submitParticipation}
                    color={"blue"}
                >
                    {hasParticipated
                        ? "Anda Telah Mendaftarkan Diri"
                        : isAvailable
                          ? "Daftar Sekarang"
                          : "Kuota Sudah Penuh"}
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
            </section>
        </PublicLayout>
    );
};

export default PerlombaanDetail;
