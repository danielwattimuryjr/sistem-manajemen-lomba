import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { Plus } from "lucide-react";
import DataTable from "react-data-table-component";

const ContestIndexPage = ({ contests }) => {
    const ContestTableColumn = [
        {
            name: "Nama Perlombaan",
            selector: (row) => row.title,
        },
        {
            name: "Deskripsi",
            selector: (row) => row.description,
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

            <DataTable columns={ContestTableColumn} data={contests} />
        </AdminLayout>
    );
};

export default ContestIndexPage;
