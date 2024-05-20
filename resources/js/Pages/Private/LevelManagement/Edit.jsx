import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import AdminLayout from "@/Layouts/Admin/Layout";
import { transformText } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";
import { CircleX, Save } from "lucide-react";

const Edit = ({ role }) => {
    const { data, setData, patch, processing, errors } = useForm({
        display_name: role.display_name,
        name: role.name,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("tingkat-peserta.update", role.id));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Update Tingkatan Peserta"} />

            <Card>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        {/* Role Name */}
                        <InputText
                            label={"Nama Tingkatan"}
                            value={data.display_name}
                            placeholder={"Cth. SMA/SMK"}
                            onChange={(e) =>
                                setData((data) => ({
                                    ...data,
                                    display_name: e.target.value,
                                    name: transformText(e.target.value),
                                }))
                            }
                            color={errors?.display_name && "failure"}
                            helperText={
                                errors?.display_name && errors.display_name
                            }
                        />

                        {/* Nomor Telepon */}
                        <InputText
                            label={"Name"}
                            readOnly
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            color={errors?.name && "failure"}
                            helperText={errors?.name && errors.name}
                        />
                    </div>

                    <div className="mt-4 flex flex-row-reverse gap-2">
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="warning"
                            disabled={processing}
                            isProcessing={processing}
                        >
                            <Save className="mr-2 h-5 w-5" />
                            Simpan
                        </Button>

                        {/* Clear Button */}
                        <Button
                            type="reset"
                            color="failure"
                            disabled={processing}
                            isProcessing={processing}
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

export default Edit;
