import PageTitle from "@/Components/PageHeader";
import PublicLayout from "@/Layouts/PublicLayout";
import { formatDate } from "@/lib/utils";
import InputText from "@/Components/Textinput";
import DateInput from "@/Components/DateInput";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label, Radio } from "flowbite-react";
import { useEffect, useState } from "react";
import TextareaInput from "@/Components/Textarea";

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
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {/* NIK */}
                        <InputText
                            label={"NIK"}
                            value={data.nik}
                            placeholder={"Nomor Induk Kependudukan"}
                            onChange={(e) => setData("nik", e.target.value)}
                            color={errors?.nik && "failure"}
                            helperText={errors?.nik && errors.nik}
                        />

                        {/* Nama Lengkap */}
                        <InputText
                            label={"Nama Lengkap"}
                            value={data.full_name}
                            placeholder={"John Doe"}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            color={errors?.full_name && "failure"}
                            helperText={errors?.full_name && errors.full_name}
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
                                        id={genders.male}
                                        value={genders.male}
                                        name="gender"
                                        checked={data.gender === genders.male}
                                        onChange={handleGenderChange}
                                    />
                                    <Label>{genders.male}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                        id={genders.female}
                                        value={genders.female}
                                        name="gender"
                                        checked={data.gender === genders.female}
                                        onChange={handleGenderChange}
                                    />
                                    <Label>{genders.female}</Label>
                                </div>
                            </div>
                        </div>

                        {/* Tanggal Lahir */}
                        <DateInput
                            label={"Tanggal Lahir"}
                            color={errors?.d_o_b && "failure"}
                            value={data.d_o_b}
                            onSelectedDateChanged={(e) =>
                                setData("d_o_b", formatDate(e))
                            }
                            helperText={errors?.d_o_b && errors.d_o_b}
                        />

                        {/* Nomor Telepon */}
                        <InputText
                            label={"Nomor Telepon"}
                            type={"tel"}
                            value={data.phone_number}
                            placeholder={"081234567890"}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            color={errors?.phone_number && "failure"}
                            helperText={
                                errors?.phone_number && errors.phone_number
                            }
                        />

                        {/* Alamat */}
                        <TextareaInput
                            label={"Alamat"}
                            value={data.address}
                            placeholder={"Ketikkan alamat mu"}
                            onChange={(e) => setData("address", e.target.value)}
                            color={errors?.address && "failure"}
                            helperText={errors?.address && errors.address}
                        />
                    </div>
                </form>
            </Card>
        </PublicLayout>
    );
};

export default FormPendaftaran;
