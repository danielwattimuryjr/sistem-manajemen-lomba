import PageTitle from "@/Components/PageHeader";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";

const PerlombaanDetail = ({
    available: isAvailable,
    contest: { data },
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

            <Card className="mt-4 leading-relaxed">
                <div className="mb-5 flex items-center justify-between">
                    <div className="w-1/3 flex-1 border-r border-gray-300 text-center">
                        <div className="space-x-1 text-lg font-bold">
                            <span className=" hidden lg:inline">Tanggal</span>
                            <span className="">Mulai</span>
                        </div>
                        <p>{data.start_date}</p>
                    </div>

                    <div className="w-1/3 flex-1 text-center">
                        <div className="space-x-1 text-lg font-bold">
                            <span className=" hidden lg:inline">Tanggal</span>
                            <span className="">Selesai</span>
                        </div>
                        <p>{data.end_date}</p>
                    </div>
                </div>

                <div
                    className="ProseMirror"
                    dangerouslySetInnerHTML={{
                        __html: data.description,
                    }}
                />
            </Card>
        </PublicLayout>
    );
};

export default PerlombaanDetail;
