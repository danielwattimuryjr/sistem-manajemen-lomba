import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";
import { roundToDecimalPlaces } from "@/lib/utils";
import { Button, Card } from "flowbite-react";
import DataTable from "react-data-table-component";

function ShowLeaderboard({ leader_board, contest_data }) {
    // Extract unique factors from data
    const uniqueFactors = Array.from(
        new Set(
            leader_board.flatMap((item) =>
                item.details.map((detail) => detail.factor),
            ),
        ),
    );

    // Transform the data to include scores for each factor
    const transformedData = leader_board.map((item, index) => {
        const scores = {};
        item.details.forEach((detail) => {
            scores[detail.factor] = detail.score;
        });
        return {
            position: index + 1,
            user: item.user,
            final_score: roundToDecimalPlaces(item.final_score, 3),
            ...scores,
        };
    });

    // Define columns
    const columns = [
        {
            name: "Posisi",
            selector: (row) => row.position,
            sortable: true,
        },
        {
            name: "Nama Peserta",
            selector: (row) => row.user,
            sortable: true,
        },
        ...uniqueFactors.map((factor) => ({
            name: factor,
            selector: (row) => row[factor],
            sortable: true,
        })),
        {
            name: "Score",
            selector: (row) => row.final_score,
            sortable: true,
        },
    ];

    return (
        <AdminLayout>
            <PageTitle title={`Leaderboard Perlombaan ${contest_data.title}`} />

            <Card>
                <DataTable
                    columns={columns}
                    data={transformedData}
                    pagination
                />
                <Button size={"sm"}>Simpan Hasil Perlombaan</Button>
            </Card>
        </AdminLayout>
    );
}

export default ShowLeaderboard;
