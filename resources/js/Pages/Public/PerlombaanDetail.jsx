import PageTitle from "@/Components/PageHeader";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";

const PerlombaanDetail = ({ available: isAvailable, contest: { data } }) => {
    console.log(isAvailable);
    return (
        <PublicLayout>
            <Head title={`Detail ${data.title}`} />

            <PageTitle title={data.title}>
                <Button
                    as={Link}
                    disabled={!isAvailable}
                    href={route("public.perlombaan.form-daftar", data.slug)}
                    color={"blue"}
                >
                    {isAvailable ? "Daftar Sekarang" : "Kuota Sudah Penuh"}
                </Button>
            </PageTitle>

            <Card className="mt-4">
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
