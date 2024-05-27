import FilterComponent from "@/Components/FilterComponent";
import { formatDate } from "@/lib/utils";
import { Button, Card, Tooltip } from "flowbite-react";
import { Download, PenSquare, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable from "react-data-table-component";

const ParticipantList = ({ data, slug, factors }) => {
    const [filterText, setFilterText] = useState("");

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Funciton untuk handle filter by full_name
    const filteredItems = data.filter(
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
            selector: (row) => formatDate(row.created_at),
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <div className="items flex flex-col gap-x-2 lg:flex-row">
                        <Tooltip content="Hapus dari perlombaan">
                            <Button color={"failure"} size="sm" href={"#"}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </Tooltip>

                        <Tooltip content="Ubah Data Nilai">
                            <Button color={"warning"} size="sm" href={"#"}>
                                <PenSquare className="h-4 w-4" />
                            </Button>
                        </Tooltip>
                    </div>
                </>
            ),
        },
    ];

    const insertIndex = 3;

    if (factors) {
        factors.forEach((factor, i) => {
            columns.splice(insertIndex + i, 0, {
                name: factor.nama_faktor,
                selector: (row) => {
                    if (row.scores) {
                        const scoreEntry = Object.values(row.scores).find(
                            (score) =>
                                score.contest_assessment_factor_id ===
                                factor.id,
                        );

                        return <p>{scoreEntry ? scoreEntry.score : 0}</p>;
                    } else {
                        return <p>-</p>;
                    }
                },
            });
        });
    }

    return (
        <Card>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                <div>
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                        Daftar Peserta
                    </h5>

                    <p>Total Peserta: {data.length}</p>
                </div>

                <a href={route("generate-participant-report", slug)}>
                    <Button color={"success"}>
                        <Download className="me-2 h-4 w-4" />
                        Excel
                    </Button>
                </a>
            </div>

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
