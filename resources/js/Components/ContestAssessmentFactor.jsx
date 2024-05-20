import { Button, Card, Label, Table, Tooltip } from "flowbite-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const ContestAssessmentFactor = ({ data: assessment_factors }) => {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => {
        setOpen(!open);
    };
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white ">
                    Faktor Penilaian
                </h5>

                <Tooltip content={open ? "Tutup deskripsi" : "Lihat deskripsi"}>
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
                <Table>
                    <Table.Head>
                        <Table.HeadCell>#</Table.HeadCell>
                        <Table.HeadCell>Faktor Penilaian</Table.HeadCell>
                        <Table.HeadCell>Bobot Penilaian (%)</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {assessment_factors.length > 0 ? (
                            <>
                                {assessment_factors.map((faktor, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell>{i + 1}</Table.Cell>

                                        <Table.Cell>
                                            {faktor.nama_faktor}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {`${faktor.bobot_penilaian}%`}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </>
                        ) : (
                            <Table.Row>
                                <Table.Cell
                                    colSpan={4}
                                    className="animate-pulse py-5 text-center text-base font-semibold text-red-500"
                                >
                                    Faktor Penilaian Kosong.
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell colSpan={2}>
                                <Label value="Total Bobot" />
                            </Table.Cell>
                            <Table.Cell>{`100%`}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )}
        </Card>
    );
};

export default ContestAssessmentFactor;
