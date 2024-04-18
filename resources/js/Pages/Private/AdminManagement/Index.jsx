import FilterComponent from "@/Components/FilterComponent";
import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link, useForm } from "@inertiajs/react";
import { Button, Card, Modal, Tooltip } from "flowbite-react";
import { FilePenLine, OctagonAlert, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const ManageAdminPage = ({ data }) => {
    // State untuk modal dan form
    const [openModal, setOpenModal] = useState(false);
    const { delete: destroy, processing, errors } = useForm();

    // State untuk data table
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Function untuk handle filter Admin by name
    const filteredItems = data.filter(
        (item) =>
            item.full_name &&
            item.full_name.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Function untuk execute delete data admin
    const deleteAdmin = (id) => {
        destroy(route("admin-management.destroy", id));
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
    const AdminTableColumn = [
        {
            name: "Nama",
            selector: (row) => row.full_name,
            sortable: true,
        },

        {
            name: "E- mail",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        <div className="flex flex-col gap-2 lg:flex-row">
                            <Tooltip content="Ubah data admin">
                                <Button
                                    color={"warning"}
                                    size="sm"
                                    as={Link}
                                    href={route(
                                        "admin-management.edit",
                                        row.uuid,
                                    )}
                                >
                                    <FilePenLine className="h-4 w-4" />
                                </Button>
                            </Tooltip>
                            <Tooltip content="Hapus Data admin">
                                <Button
                                    color={"failure"}
                                    size="sm"
                                    onClick={() => setOpenModal(true)}
                                >
                                    <Trash2 className="h-4 w-4" />
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
                                        Kamu yakin ingin menghapus data ini?
                                        <b className="text-red-600">
                                            Data yang sudah dihapus tidak dapat
                                            dikembalikan lagi
                                        </b>
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            color="failure"
                                            onClick={() =>
                                                deleteAdmin(row.uuid)
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
                title={"All Admins"}
                description={
                    "Di halaman ini kamu dapat melihat seluruh data user admin yang ada"
                }
            >
                <Button
                    color={"blue"}
                    as={Link}
                    href={route("admin-management.create")}
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Admin
                </Button>
            </PageTitle>

            <Card>
                <DataTable
                    columns={AdminTableColumn}
                    data={filteredItems}
                    subHeaderComponent={subHeaderComponentMemo}
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    pagination
                />
            </Card>
        </AdminLayout>
    );
};

export default ManageAdminPage;
