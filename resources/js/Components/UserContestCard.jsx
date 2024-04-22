import FilterComponent from "@/Components/FilterComponent";
import PageTitle from "@/Components/PageHeader";
import { formatDate } from "@/lib/utils";
import { Card } from "flowbite-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const UserContestCard = ({ contests, title, footer }) => {
    const [filterText, setFilterText] = useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Funciton untuk handle filter by title
    const filteredItems = contests.filter(
        (item) =>
            item.title &&
            item.title.toLowerCase().includes(filterText.toLowerCase()),
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
            selector: (row) => formatDate(row.created_at),
        },
        {
            name: "Nilai",
            selector: (row) => row.score,
            sortable: true,
            cell: (row) => (
                <>
                    {row.score !== null ? (
                        <p>{row.score}</p>
                    ) : (
                        <p>Belum ada nilai.</p>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="w-full space-y-5" id="contest-section">
            <Card>
                {title && <PageTitle title={title} />}
                <DataTable
                    data={filteredItems}
                    columns={columns}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />

                {footer && <div className="mt-4">{footer}</div>}
            </Card>
        </div>
    );
};

export default UserContestCard;
