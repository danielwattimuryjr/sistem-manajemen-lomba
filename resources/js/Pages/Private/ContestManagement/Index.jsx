import FilterComponent from "@/Components/FilterComponent";
import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link, useForm } from "@inertiajs/react";
import { Badge, Button, Card, Modal, Tooltip } from "flowbite-react";
import { Eye, FilePenLine, OctagonAlert, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const ContestIndexPage = ({ contests: { data } }) => {
    // State untuk modal dan form
    const [openModal, setOpenModal] = useState(false);
    const [filterText, setFilterText] = useState("");

    // State untuk data table
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { delete: destroy } = useForm();

    // Funciton untuk handle filter by title
    const filteredItems = data.filter(
        (item) =>
            item.title &&
            item.title.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Function untuk handle delete contest
    const deleteContest = (id) => {
        destroy(route("perlombaan.destroy", id));
        setOpenModal(false);
    };

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    // Mendefinisikan Kolom untuk data table
    const ContestTableColumn = [
        {
            name: "Nama Perlombaan",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Tgl. Mulai",
            selector: (row) => row.start_date,
            sortable: true,
        },
        {
            name: "Tgl. Selesai",
            selector: (row) => row.end_date,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            selector: (row) => row.isActive,
            cell: (row) => {
                if (row.isActive) {
                    return (
                        <Badge color={"success"} className="uppercase">
                            aktif
                        </Badge>
                    );
                } else {
                    return (
                        <Badge color={"failure"} className="uppercase">
                            non-aktif
                        </Badge>
                    );
                }
            },
        },
        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        <div className="flex flex-col gap-2 lg:flex-row">
                            <Tooltip content="Lihat detail perlombaan">
                                <Button
                                    color={"success"}
                                    size="sm"
                                    as={Link}
                                    href={route("perlombaan.show", row.slug)}
                                >
                                    <Eye className="h-5" />
                                </Button>
                            </Tooltip>

                            <Tooltip content="Ubah data perlombaan">
                                <Button
                                    color={"warning"}
                                    size="sm"
                                    as={Link}
                                    href={route("perlombaan.edit", row.slug)}
                                >
                                    <FilePenLine className="h-5" />
                                </Button>
                            </Tooltip>

                            <Tooltip content="Hapus Data perlombaan">
                                <Button
                                    color={"failure"}
                                    size="sm"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <Trash2 className="h-5" />
                                </Button>
                            </Tooltip>
                        </div>

                        <Modal
                            show={openModal}
                            size="md"
                            onClose={() => setOpenModal(false)}
                            popup
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <OctagonAlert className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Kamu yakin ingin menghapus perlombaan
                                        ini?
                                        <b className="text-red-600">
                                            Data yang sudah dihapus tidak dapat
                                            dikembalikan lagi
                                        </b>
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            color="failure"
                                            onClick={() =>
                                                deleteContest(row.slug)
                                            }
                                        >
                                            {"Ya, saya yakin"}
                                        </Button>
                                        <Button
                                            color="gray"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Tidak, Batalkan
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                );
            },
        },
    ];

    return (
        <AdminLayout>
            <PageTitle
                title={"All Contest"}
                description={
                    "Di halaman ini kamu dapat melihat seluruh data perlombaan yang ada"
                }
            >
                <Button
                    color={"blue"}
                    as={Link}
                    href={route("perlombaan.create")}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Perlombaan
                </Button>
            </PageTitle>

            <Card>
                <DataTable
                    columns={ContestTableColumn}
                    data={filteredItems}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                />
            </Card>
        </AdminLayout>
    );
};

export default ContestIndexPage;
