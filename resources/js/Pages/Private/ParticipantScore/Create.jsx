import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import AdminLayout from "@/Layouts/Admin/Layout";
import { router, useForm } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";
import { Save } from "lucide-react";
import { useEffect } from "react";

const Create = ({ contest_data, user_data, assessment_factors }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        form_penilaian: [],
    });
    console.log(errors);

    useEffect(() => {
        const defaultFormPenilaian = assessment_factors.map((factor) => ({
            factor_id: factor.id,
            nama_faktor: factor.nama_faktor,
            score: 0,
        }));

        setData("form_penilaian", defaultFormPenilaian);
    }, [assessment_factors]);

    const handleScoreChange = (index, value) => {
        const updatedFormPenilaian = [...data.form_penilaian];
        updatedFormPenilaian[index].score = value;
        setData("form_penilaian", updatedFormPenilaian);
    };

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
            <PageTitle title={"Form Penilaian"} />

            <Card>
                <form onSubmit={submit} className="space-y-4">
                    {data.form_penilaian.map((faktor, i) => (
                        <InputText
                            label={faktor.nama_faktor}
                            value={faktor.score}
                            onChange={(e) =>
                                handleScoreChange(i, e.target.value)
                            }
                        />
                    ))}

                    <Button
                        type="submit"
                        color="blue"
                        disabled={processing}
                        isProcessing={processing}
                    >
                        <Save className="mr-2 h-5 w-5" />
                        Simpan
                    </Button>
                </form>
            </Card>
        </AdminLayout>
    );
};

export default Create;
