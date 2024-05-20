import DateInput from "@/Components/DateInput";
import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import Tiptap from "@/Components/Tiptap";
import AdminLayout from "@/Layouts/Admin/Layout";
import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Label,
    Table,
    TextInput,
} from "flowbite-react";
import { CircleAlert, CircleMinus, CircleX, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import slugify from "react-slugify";

const ContestCreatePage = ({ roles }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        slug: "",
        isActive: 1,
        end_date: formatDate(),
        start_date: formatDate(),
        role_id: [],
        form_penilaian: [
            {
                nama_faktor: "",
                bobot_penilaian: 0,
            },
        ],
    });

    const [totalBobot, setTotalBobot] = useState(0);

    useEffect(() => {
        const total = data.form_penilaian.reduce(
            (acc, faktor) => acc + parseInt(faktor.bobot_penilaian),
            0,
        );
        setTotalBobot(total);
    }, [data.form_penilaian]);

    const storeData = (e) => {
        e.preventDefault();

        if (totalBobot !== 100) {
            return;
        }

        post(route("perlombaan.store"));
    };

    const handleCheckboxChange = (event, roleId) => {
        if (event.target.checked) {
            const updatedRoleIds = [...(data.role_id || []), roleId];
            setData("role_id", updatedRoleIds);
        } else {
            const updatedRoleIds = (data.role_id || []).filter(
                (id) => id !== roleId,
            );
            setData("role_id", updatedRoleIds);
        }
    };

    const addNewPenilaianRow = () => {
        setData("form_penilaian", [
            ...data.form_penilaian,
            {
                nama_faktor: "",
                bobot_penilaian: 0,
            },
        ]);
    };

    const removePenilaianRow = (i) => {
        const updatedFormPenilaian = data.form_penilaian.filter(
            (_, index) => index !== i,
        );
        setData("form_penilaian", updatedFormPenilaian);
    };

    const handleFaktorChange = (i, field, value) => {
        setData(
            "form_penilaian",
            data.form_penilaian.map((item, index) =>
                index === i ? { ...item, [field]: value } : item,
            ),
        );
    };

    return (
        <AdminLayout>
            <PageTitle title={"Tambah Perlombaan"} />

            <Card>
                <form onSubmit={storeData}>
                    <div className="divide-y-4">
                        <section
                            id="contest-form"
                            className="mb-8 flex flex-col gap-4"
                        >
                            <div>
                                <InputText
                                    label={"Nama Perlombaan"}
                                    value={data.title}
                                    placeholder={"Cth. Cerdas Cermat"}
                                    onChange={(e) =>
                                        setData((data) => ({
                                            ...data,
                                            title: e.target.value,
                                            slug: slugify(e.target.value),
                                        }))
                                    }
                                    color={errors?.title && "failure"}
                                    helperText={errors?.title}
                                />
                            </div>

                            {/* Deskripsi Perlombaan */}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="desc-perlombaan"
                                        color={errors?.role_id && "failure"}
                                        value="Pilih Tingkat Perlombaan"
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3">
                                    {roles.length > 0 ? (
                                        <>
                                            {roles.map((role, i) => (
                                                <div
                                                    className="flex items-center gap-2"
                                                    key={i}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            data.role_id.indexOf(
                                                                role.id,
                                                            ) !== -1
                                                        }
                                                        onChange={(event) =>
                                                            handleCheckboxChange(
                                                                event,
                                                                role.id,
                                                            )
                                                        }
                                                    />
                                                    <p>{role.display_name}</p>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="animate-pulse py-5 text-center text-base font-semibold text-red-500">
                                            Tingkatan Masih Kosong
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Deskripsi Perlombaan */}
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="desc-perlombaan"
                                        color={errors?.description && "failure"}
                                        value="Deskripsi Perlombaan"
                                    />
                                </div>

                                <Tiptap
                                    content={data.description}
                                    onChange={(content) => {
                                        setData("description", content);
                                        console.log(content);
                                    }}
                                    error={errors?.description}
                                />
                            </div>

                            <div className="flex flex-col gap-2 md:flex-row">
                                {/* Start Date */}
                                <div className="flex-1">
                                    <DateInput
                                        label={"Tgl. Mulai"}
                                        color={errors?.start_date && "failure"}
                                        value={data.start_date}
                                        onSelectedDateChanged={(e) =>
                                            setData("start_date", formatDate(e))
                                        }
                                        helperText={errors?.start_date}
                                    />
                                </div>

                                {/* End Date */}
                                <div className="flex-1">
                                    <DateInput
                                        label={"Tgl. Selesai"}
                                        value={data.end_date}
                                        onSelectedDateChanged={(e) =>
                                            setData("end_date", formatDate(e))
                                        }
                                        color={errors?.end_date && "failure"}
                                        helperText={
                                            errors?.end_date ||
                                            "Tanggal selesai harus di atas tanggal mulai"
                                        }
                                    />
                                </div>
                            </div>
                        </section>

                        <section
                            id="form-penilaian"
                            className="space-y-5 overflow-x-auto pt-8"
                        >
                            {errors.form_penilaian ||
                                (totalBobot !== 100 && (
                                    <Alert color="failure" icon={CircleAlert}>
                                        {errors.form_penilaian ||
                                            "Total bobot penilaian harus 100"}
                                    </Alert>
                                ))}

                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>
                                        Faktor Penilaian
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Bobot Penilaian (%)
                                    </Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {data.form_penilaian.length > 0 ? (
                                        <>
                                            {data.form_penilaian.map(
                                                (faktor, i) => (
                                                    <Table.Row key={i}>
                                                        <Table.Cell>
                                                            <TextInput
                                                                type="text"
                                                                placeholder="Cth. Kreativitas"
                                                                color={
                                                                    errors[
                                                                        `form_penilaian.${i}.nama_faktor`
                                                                    ] &&
                                                                    "failure"
                                                                }
                                                                helperText={
                                                                    errors[
                                                                        `form_penilaian.${i}.nama_faktor`
                                                                    ]
                                                                }
                                                                value={
                                                                    faktor.nama_faktor
                                                                }
                                                                onChange={(e) =>
                                                                    handleFaktorChange(
                                                                        i,
                                                                        "nama_faktor",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            <TextInput
                                                                type="number"
                                                                max={100}
                                                                min={0}
                                                                value={
                                                                    faktor.bobot_penilaian
                                                                }
                                                                color={
                                                                    errors[
                                                                        `form_penilaian.${i}.bobot_penilaian`
                                                                    ] &&
                                                                    "failure"
                                                                }
                                                                helperText={
                                                                    errors[
                                                                        `form_penilaian.${i}.bobot_penilaian`
                                                                    ]
                                                                }
                                                                onChange={(e) =>
                                                                    handleFaktorChange(
                                                                        i,
                                                                        "bobot_penilaian",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            <Button
                                                                type={"button"}
                                                                color={"light"}
                                                                className="text-red-500"
                                                                onClick={() =>
                                                                    removePenilaianRow(
                                                                        i,
                                                                    )
                                                                }
                                                            >
                                                                <CircleMinus className="h-4 w-6" />
                                                            </Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ),
                                            )}
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
                                        <Table.Cell>
                                            <Label value="Total Bobot" />
                                            <div className="text-gray-500 dark:text-gray-300">
                                                <span className="text-xs">
                                                    <span className="font-medium">
                                                        Pastikan total nya 100%!
                                                    </span>
                                                </span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell colSpan={2}>
                                            {`${totalBobot}%`}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan={4}>
                                            <Button
                                                type="button"
                                                className="w-full"
                                                size="sm"
                                                onClick={() =>
                                                    addNewPenilaianRow()
                                                }
                                            >
                                                <Plus className="h-4 w-6" />
                                                Add
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </section>
                    </div>

                    <div className="mt-4 flex flex-row-reverse gap-2">
                        <Button
                            type="submit"
                            color="blue"
                            disabled={processing}
                            isProcessing={processing}
                        >
                            <Save className="mr-2 h-5 w-5" />
                            Simpan
                        </Button>

                        <Button
                            type="reset"
                            color="failure"
                            disabled={processing}
                        >
                            <CircleX className="mr-2 h-5 w-5" />
                            Clear
                        </Button>
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
};

export default ContestCreatePage;
