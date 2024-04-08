import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { Button, Card, Tooltip } from "flowbite-react";
import { ChevronDown, ChevronUp, FilePenLine } from "lucide-react";
import { useState } from "react";

const ContestDetailPage = ({ contest: { data } }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

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

            {/* Card Jadwal */}
            <Card>
                <h5 className="mb-4 text-center text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Jadwal Perlombaan
                </h5>
                <div className="flex items-center justify-between">
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
                        className="ProseMirror"
                        dangerouslySetInnerHTML={{
                            __html: data.description,
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
