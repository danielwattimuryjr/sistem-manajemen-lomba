import PageTitle from "@/Components/PageHeader";
import { formatDate } from "@/lib/utils";
import { Card } from "flowbite-react";
import DataTable from "react-data-table-component";

const MyContest = ({ contests }) => {
    const columns = [
        {
            name: "Perlombaan",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "Tgl. Mulai",
            sortable: true,
            selector: (row) => row.start_date,
        },
        {
            name: "Tgl. Selesai",
            sortable: true,
            selector: (row) => row.end_date,
        },
        {
            name: "Tgl. Daftar",
            sortable: true,
            selector: (row) => formatDate(row.pivot.created_at),
        },
    ];
    return (
        <div className="w-full space-y-5" id="contest-section">
            <PageTitle title={"Perlombaan yang saya ikuti"} />
            <Card>
                <DataTable columns={columns} data={contests} pagination />
            </Card>
        </div>
    );
};

export default MyContest;
