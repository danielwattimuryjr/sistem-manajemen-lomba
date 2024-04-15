import FilterComponent from "@/Components/FilterComponent";
import { formatDate } from "@/lib/utils";
import { Card } from "flowbite-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const ParticipantList = ({ data }) => {
    const [filterText, setFilterText] = useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Funciton untuk handle filter by full_name
    const filteredItems = data.users.filter(
        (item) =>
            item.full_name &&
            item.full_name.toLowerCase().includes(filterText.toLowerCase()),
    );

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

    const columns = [
        {
            name: "Nama",
            sortable: true,
            selector: (row) => row.full_name,
        },
        {
            name: "Email",
            sortable: true,
            selector: (row) => row.email,
            cell: (row) => (
                <a href={"mailto:" + row.email} target="_blank">
                    {row.email}
                </a>
            ),
        },
        {
            name: "Tgl. Daftar",
            sortable: true,
            selector: (row) => formatDate(row.participated_at),
        },
    ];

    return (
        <Card>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                Daftar Peserta
            </h5>

            <p>Total Peserta: {data.current}</p>

            <DataTable
                data={filteredItems}
                columns={columns}
                pagination
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </Card>
    );
};

export default ParticipantList;
