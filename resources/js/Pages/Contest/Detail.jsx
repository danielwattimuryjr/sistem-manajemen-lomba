import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { Button, Card, Tooltip } from "flowbite-react";
import { ChevronDown, ChevronUp, FilePenLine } from "lucide-react";
import { useState } from "react";

const ContestDetailPage = ({ contest }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <AdminLayout>
            <PageTitle title={contest.title}>
                <Button
                    color={"warning"}
                    as={Link}
                    href={route("perlombaan.edit", contest.slug)}
                >
                    <FilePenLine className="mr-2 h-5 w-5" />
                    Ubah Data
                </Button>
            </PageTitle>

            {/* Card Jadwal */}
            <Card>
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4 text-center">
                    Jadwal Perlombaan
                </h5>
                <div className="flex items-center justify-between">
                    <div className="w-1/3 text-center flex-1 border-r border-gray-300">
                        <div className="text-lg font-bold space-x-1">
                            <span className=" hidden lg:inline">Tanggal</span>
                            <span className="">Mulai</span>
                        </div>
                        <p>{contest.start_date}</p>
                    </div>

                    <div className="w-1/3 text-center flex-1">
                        <div className="text-lg font-bold space-x-1">
                            <span className=" hidden lg:inline">Tanggal</span>
                            <span className="">Selesai</span>
                        </div>
                        <p>{contest.end_date}</p>
                    </div>
                </div>
            </Card>

            {/* Card Deskripsi */}
            <Card>
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                        Deskripsi Perlombaan
                    </h5>

                    <Tooltip
                        content={open ? "Tutup deskripsi" : "Lihat deskripsi"}
                    >
                        <Button color="light" onClick={toggleOpen}>
                            {open ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </Button>
                    </Tooltip>
                </div>

                {open && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: contest.description,
                        }}
                    />
                )}
            </Card>

            {/* Card  Peserta */}
            <Card>
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                    Daftar Peserta
                </h5>
            </Card>
        </AdminLayout>
    );
};

export default ContestDetailPage;
