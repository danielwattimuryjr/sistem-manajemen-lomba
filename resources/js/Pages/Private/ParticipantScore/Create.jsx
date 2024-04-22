import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import AdminLayout from "@/Layouts/Admin/Layout";
import { router, useForm } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";

const Create = ({ contest_data, user_data }) => {
    console.log(contest_data, user_data);
    const { data, setData, post, processing, errors } = useForm({
        score: 0,
    });

    const submit = (e) => {
        e.preventDefault();

        post(
            route("perlombaan.penilaian.store", {
                contest: contest_data.slug,
                user: user_data.uuid,
            }),
            {
                onSuccess: router.get("perlombaan.show", {
                    contest: contest_data.slug,
                }),
            },
        );
    };

    return (
        <AdminLayout>
            {JSON.stringify(errors)}
            <PageTitle title={"Form Penilaian"} />

            <Card>
                <form onSubmit={submit}>
                    <InputText
                        type="number"
                        value={data.score}
                        onChange={(e) => setData("score", e.target.value)}
                        min={0}
                        label={"Nilai"}
                        placeholder={`Masukkan nilai untuk ${user_data.full_name}`}
                        color={errors?.score && "failure"}
                        helperText={errors?.score}
                    />

                    <Button
                        type="submit"
                        className="mt-4 self-end"
                        isProcessing={processing}
                        disabled={processing}
                    >
                        Submit
                    </Button>
                </form>
            </Card>

            {/* <div className="flex flex-col gap-4 md:flex-row">
                

                <Card>Ini data lomba</Card>
            </div> */}
        </AdminLayout>
    );
};

export default Create;
