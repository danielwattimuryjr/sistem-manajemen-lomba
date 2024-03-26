import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    Datepicker,
    Label,
    TextInput,
    Textarea,
    Toast,
} from "flowbite-react";
import { Ban, CircleX, Save } from "lucide-react";

const ContestCreatePage = () => {
    const formatDate = (date, format) => {
        const map = {
            dd: date.getDate().toString().padStart(2, "0"),
            MMMM: date.toLocaleString("en-US", { month: "long" }),
            yyyy: date.getFullYear(),
        };

        return format.replace(/dd|MMMM|yyyy/gi, (matched) => map[matched]);
    };

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        end_date: formatDate(new Date(), "dd MMMM yyyy"),
        start_date: formatDate(new Date(), "dd MMMM yyyy"),
    });

    const storeData = (e) => {
        e.preventDefault();

        post(route("perlombaan.store"));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Tambah Perlombaan"} />

            <Card>
                <form className="flex flex-col gap-4" onSubmit={storeData}>
                    {/* Title Perlombaan */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title-perlombaan"
                                color={errors?.title && "failure"}
                                value="Nama Perlombaan"
                            />
                        </div>
                        <TextInput
                            className="w-full"
                            id="title-perlombaan"
                            type="text"
                            placeholder="Cth. Cerdas Cermat"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            color={errors?.title && "failure"}
                            helperText={errors?.title && errors.title}
                        />
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
                        <Textarea
                            className="w-full"
                            id="desc-perlombaan"
                            type="text"
                            placeholder="Jelaskan isi dari acara"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            color={errors?.description && "failure"}
                            helperText={
                                errors?.description && errors.description
                            }
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        {/* Start Date */}
                        <div className="flex-1">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="start-date"
                                    color={errors?.start_date && "failure"}
                                    value="Tgl. Mulai"
                                />
                            </div>
                            <Datepicker
                                id="start-date"
                                color={errors?.start_date && "failure"}
                                value={data.start_date}
                                onSelectedDateChanged={(e) => {
                                    const selectedDate = new Date(e);
                                    const formattedDate = formatDate(
                                        selectedDate,
                                        "dd MMMM yyyy"
                                    );

                                    setData("start_date", formattedDate);
                                }}
                                helperText={
                                    errors?.start_date && errors.start_date
                                }
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex-1">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="end-date"
                                    color={errors?.end_date && "failure"}
                                    value="Tgl. Selesai"
                                />
                            </div>

                            <Datepicker
                                id="end-date"
                                value={data.end_date}
                                onSelectedDateChanged={(e) => {
                                    const selectedDate = new Date(e);
                                    const formattedDate = formatDate(
                                        selectedDate,
                                        "dd MMMM yyyy"
                                    );

                                    setData("end_date", formattedDate);
                                }}
                                color={errors?.end_date && "failure"}
                                helperText={errors?.end_date && errors.end_date}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        color="blue"
                        className="w-full"
                        disabled={processing}
                        isProcessing={processing}
                    >
                        <Save className="mr-2 h-5 w-5" />
                        Simpan
                    </Button>

                    <Button
                        type="reset"
                        color="failure"
                        className="w-full"
                        disabled={processing}
                        isProcessing={processing}
                    >
                        <CircleX className="mr-2 h-5 w-5" />
                        Clear
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
};

export default ContestCreatePage;
