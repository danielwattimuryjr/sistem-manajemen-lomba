import DateInput from "@/Components/DateInput";
import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import Tiptap from "@/Components/Tiptap";
import AdminLayout from "@/Layouts/Admin/Layout";
import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Button, Card, Label } from "flowbite-react";
import { CircleX, Save } from "lucide-react";
import slugify from "react-slugify";

const ContestEditPage = ({ data: contest }) => {
    const { data, setData, patch, processing, errors } = useForm({
        title: contest.title,
        quota: contest.quota,
        description: contest.description,
        slug: contest.slug,
        isActive: contest.isActive,
        end_date: formatDate(contest.end_date),
        start_date: formatDate(contest.start_date),
    });

    const updateData = (e) => {
        e.preventDefault();
        patch(route("perlombaan.update", contest.slug));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Update Data Perlombaan"} />

            <Card>
                <form className="flex flex-col gap-4" onSubmit={updateData}>
                    <div className="flex flex-col gap-2 md:flex-row">
                        {/* Title Perlombaan */}
                        <div className="flex-1">
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

                        <div className="flex-1">
                            {/* Quota Peserta */}
                            <InputText
                                label={"Quota Peserta"}
                                value={data.quota}
                                type="number"
                                color={errors?.quota && "failure"}
                                onChange={(e) =>
                                    setData("quota", e.target.value)
                                }
                                helperText={
                                    errors?.quota ||
                                    "Kosongkan jika kuota peserta tak terbatas"
                                }
                            />
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
                            onChange={(content) =>
                                setData("description", content)
                            }
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

                    <div className="flex flex-col gap-2 md:flex-row">
                        {/* Submit Button */}
                    </div>
                </form>
            </Card>
        </AdminLayout>
    );
};

export default ContestEditPage;
