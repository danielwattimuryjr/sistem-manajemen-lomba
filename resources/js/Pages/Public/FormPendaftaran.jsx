import DateInput from "@/Components/DateInput";
import PageTitle from "@/Components/PageHeader";
import TextareaInput from "@/Components/Textarea";
import InputText from "@/Components/Textinput";
import PublicLayout from "@/Layouts/Public/Layout";
import { formatDate } from "@/lib/utils";
import { Head, Link, useForm } from "@inertiajs/react";
import { Card, Label, Radio } from "flowbite-react";
import { useState } from "react";

const FormPendaftaran = ({
    contest: { data: contestData },
    availableGenders: genders,
    auth: { user },
}) => {
    console.log(user);
    const { data, setData, post, processing, errors, reset } = useForm({
        nik: user.nik,
        full_name: user.full_name,
        d_o_b: formatDate(user.d_o_b),
        address: user.address,
        phone_number: user.phone_number,
        gender: user.gender,
    });

    // State untuk visibility password
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function untuk handle onChange pada gender radio button
    const handleGenderChange = (e) => {
        setData("gender", e.target.value);
    };

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const submit = (e) => {
        e.preventDefault();

        // post(route("register"));
    };
    return (
        <PublicLayout>
            <Head title={`Form Pendaftaran ${contestData.title}`} />

            <PageTitle title={`Form Pendaftaran ${contestData.title}`} />

            <Card className="mt-4">
                <p>
                    Seluruh informasi di bawah <b>diambil dari profil kamu.</b>
                    <br />
                    Jika informasi pribadi mu tidak sesuai,{" "}
                    <Link
                        href={route("profile.index")}
                        className="text-blue-500 hover:underline"
                    >
                        Klik di sini
                    </Link>{" "}
                    untuk mengubah profil.
                </p>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {/* NIK */}
                        <InputText label={"NIK"} value={data.nik} disabled />

                        {/* Nama Lengkap */}
                        <InputText
                            label={"Nama Lengkap"}
                            value={data.full_name}
                            disabled
                        />

                        {/* Jenis kelamin */}
                        <div>
                            <div className="mb-2 block">
                                <Label className="font-bold">
                                    Jenis Kelamin :{" "}
                                </Label>
                            </div>
                            <div className="flex flex-row gap-x-5">
                                <div className="flex items-center gap-2">
                                    <Radio
                                        value={genders.male}
                                        checked={data.gender === genders.male}
                                        disabled
                                    />
                                    <Label>{genders.male}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                        value={genders.female}
                                        checked={data.gender === genders.female}
                                        disabled
                                    />
                                    <Label>{genders.female}</Label>
                                </div>
                            </div>
                        </div>

                        {/* Tanggal Lahir */}
                        <DateInput
                            label={"Tanggal Lahir"}
                            value={data.d_o_b}
                            disabled
                        />

                        {/* Nomor Telepon */}
                        <InputText
                            label={"Nomor Telepon"}
                            type={"tel"}
                            value={data.phone_number}
                            disabled
                        />

                        {/* Alamat */}
                        <TextareaInput
                            label={"Alamat"}
                            value={data.address}
                            disabled
                        />
                    </div>
                </form>
            </Card>
        </PublicLayout>
    );
};

export default FormPendaftaran;
