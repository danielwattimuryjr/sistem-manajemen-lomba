import DateInput from "@/Components/DateInput";
import PageTitle from "@/Components/PageHeader";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/Textarea";
import InputText from "@/Components/Textinput";
import AdminLayout from "@/Layouts/Admin/Layout";
import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label, Radio } from "flowbite-react";
import { CircleX, Save } from "lucide-react";
import { useState } from "react";

const Create = ({ genders, availableRoles: levels }) => {
    // State untuk visibility password
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",

        nik: "",
        full_name: "",
        d_o_b: formatDate(),
        address: "",
        phone_number: "",
        gender: "",
        role_id: "",
    });

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
        post(route("guest-management.store"));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Create Guest"} />

            <Card>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        <InputText
                            label={"Email"}
                            value={data.email}
                            placeholder={"Nomor Induk Kependudukan"}
                            onChange={(e) => setData("email", e.target.value)}
                            color={errors?.email && "failure"}
                            helperText={errors?.email && errors.email}
                        />

                        <div className="flex flex-col gap-4">
                            {/* Password */}
                            <InputText
                                label={"Password"}
                                value={data.password}
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Kata sandi"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                color={errors?.password && "failure"}
                                helperText={errors?.password}
                            />

                            {/* Password Confirm */}
                            <InputText
                                label={"Konfirmasi Password"}
                                value={data.password_confirmation}
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Ketik ulang kata sandi nya"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                color={
                                    errors?.password_confirmation && "failure"
                                }
                                helperText={errors?.password_confirmation}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <Checkbox
                                            checked={isPasswordVisible}
                                            onChange={togglePasswordVisibility}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <Label className="text-gray-500">
                                            Perlihatkan Password
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-8 h-px flex-1 border-0 bg-gray-200 dark:bg-gray-700"></hr>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
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
                                {genders.map((gender, i) => (
                                    <div
                                        className="flex items-center gap-2"
                                        key={i}
                                    >
                                        <Radio
                                            id={gender}
                                            value={gender}
                                            name="gender"
                                            checked={data.gender === gender}
                                            onChange={handleGenderChange}
                                        />
                                        <Label>{gender}</Label>
                                    </div>
                                ))}
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

                        <SelectInput
                            color={errors?.role_id && "failure"}
                            label={"Tingkatan Peserta"}
                            onChange={(e) => setData("role_id", e.target.value)}
                            helperText={errors?.role_id}
                        >
                            <option selected disabled>
                                -- PILIH TINGKAT PESERTA --
                            </option>
                            {levels.map((level, i) => (
                                <option key={i} value={level.id}>
                                    {level.display_name}
                                </option>
                            ))}
                        </SelectInput>
                    </div>

                    <div className="mt-4 flex flex-row-reverse gap-2">
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            color="blue"
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

export default Create;
