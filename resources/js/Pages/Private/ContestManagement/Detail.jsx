import ContestAssessmentFactor from "@/Components/ContestAssessmentFactor";
import Description from "@/Components/Description";
import PageTitle from "@/Components/PageHeader";
import ParticipantList from "@/Components/ParticipantList";
import Schedule from "@/Components/Schedule";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import { Badge, Button } from "flowbite-react";
import { Check, FilePenLine, Trophy, X } from "lucide-react";

const ContestDetailPage = ({ data, participants, factors }) => {
    return (
        <AdminLayout>
            <PageTitle
                title={data.title}
                description={
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <Badge color={data.isActive ? "success" : "failure"}>
                            {data.isActive ? "Aktif" : "Non Aktif"}
                        </Badge>
                    </div>
                }
            >
                <div className="flex items-center gap-4 ">
                    <Button
                        className="w-full"
                        color={data.isActive ? "failure" : "success"}
                        onClick={(e) => {
                            e.preventDefault();

                            router.patch(
                                route("perlombaan.update-status", {
                                    contest: data.slug,
                                    status: data.isActive ? 0 : 1,
                                }),
                            );
                        }}
                    >
                        {data.isActive ? (
                            <X className="mr-2 h-5 w-5" />
                        ) : (
                            <Check className="mr-2 h-5 w-5" />
                        )}
                        {data.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                        className="w-full"
                        color={"warning"}
                        as={Link}
                        href={route("perlombaan.edit", data.slug)}
                    >
                        <FilePenLine className="mr-2 h-5 w-5" />
                        Update
                    </Button>

                    <Button
                        className="w-full"
                        as={Link}
                        href={route("perlombaan.get-saw", data.slug)}
                    >
                        <Trophy className="mr-2 h-5 w-5" />
                        Winner
                    </Button>
                </div>
            </PageTitle>

            <section className="space-y-4">
                {/* Card Jadwal */}
                <Schedule
                    start_date={data.start_date}
                    end_date={data.end_date}
                />

                {/* Card Deskripsi */}
                <Description description={data.description} />

                {/* Card Faktor Penilaian */}
                <ContestAssessmentFactor data={factors} />

                {/* Card  Peserta */}
                <ParticipantList
                    data={participants}
                    slug={data.slug}
                    factors={factors}
                />
            </section>
        </AdminLayout>
    );
};

export default ContestDetailPage;
