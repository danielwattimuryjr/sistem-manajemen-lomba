import DateInput from "@/Components/DateInput";
import TextareaInput from "@/Components/Textarea";
import InputText from "@/Components/Textinput";
import AuthLayout from "@/Layouts/AuthLayout";
import { formatDate } from "@/lib/utils";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label, Radio } from "flowbite-react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useState } from "react";

const SignUp = ({ availableGenders: genders }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        password_confirmation: "",

        nik: "",
        full_name: "",
        d_o_b: formatDate(),
        address: "",
        phone_number: "",
        gender: "",
    });

    // State untuk visibility password
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // State untuk step form
    const [formStep, setFormStep] = useState(1);

    // Function untuk pindah ke step selanjutnya
    const nextStep = (e) => {
        e.preventDefault();
        post(route("validate-first-step"), {
            onSuccess: () => {
                setFormStep(2);
            },
        });
    };

    // Function untuk pindah ke step sebelumnya
    const prevStep = (e) => {
        e.preventDefault();
        setFormStep(1);
    };

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

        post(route("register"));
    };

    return (
        <AuthLayout title={"Sign Up"}>
            <Head title="Sign Up" />
            <Card className="w-full sm:max-w-3xl md:mt-0 xl:p-0">
                <div className="space-y-4 md:space-y-6">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        {`Tahap ${formStep} dari 2`}
                    </h1>
                    <form onSubmit={submit}>
                        {/* Full Name */}
                        {formStep == 1 && (
                            <div className="space-y-4 md:space-y-6">
                                {/* Email */}
                                <InputText
                                    label={"Email"}
                                    value={data.email}
                                    type="email"
                                    placeholder="john@doe.com"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    color={errors?.email && "failure"}
                                    helperText={errors?.email && errors.email}
                                />

                                {/* Password */}
                                <InputText
                                    label={"Password"}
                                    value={data.password}
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    placeholder="Kata sandi"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    color={errors?.password && "failure"}
                                    helperText={
                                        errors?.password && errors.password
                                    }
                                />

                                {/* Password Confirm */}
                                <InputText
                                    label={"Konfirmasi Password"}
                                    value={data.password_confirmation}
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    placeholder="Ketik ulang kata sandi nya"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    color={
                                        errors?.password_confirmation &&
                                        "failure"
                                    }
                                    helperText={
                                        errors?.password_confirmation &&
                                        errors.password_confirmation
                                    }
                                />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <Checkbox
                                                checked={isPasswordVisible}
                                                onChange={
                                                    togglePasswordVisibility
                                                }
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
                        )}

                        {formStep == 2 && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                                {/* NIK */}
                                <InputText
                                    label={"NIK"}
                                    value={data.nik}
                                    placeholder={"Nomor Induk Kependudukan"}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
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
                                    helperText={
                                        errors?.full_name && errors.full_name
                                    }
                                />

                                {/* Jenis kelamin */}
                                <div>
                                    <div className="mb-2 block">
                                        <Label className="font-bold">
                                            Jenis Kelamin :{" "}
                                        </Label>
                                    </div>
                                    <div className="flex flex-row gap-x-5">
                                        {genders.map((gender) => (
                                            <div className="flex items-center gap-2">
                                                <Radio
                                                    id={gender}
                                                    value={gender}
                                                    name="gender"
                                                    checked={
                                                        data.gender === gender
                                                    }
                                                    onChange={
                                                        handleGenderChange
                                                    }
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
                                        errors?.phone_number &&
                                        errors.phone_number
                                    }
                                />

                                {/* Alamat */}
                                <TextareaInput
                                    label={"Alamat"}
                                    value={data.address}
                                    placeholder={"Ketikkan alamat mu"}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    color={errors?.address && "failure"}
                                    helperText={
                                        errors?.address && errors.address
                                    }
                                />
                            </div>
                        )}

                        <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">
                            <div className="flex  items-center justify-end gap-2">
                                <Button
                                    type="button"
                                    disabled={formStep == 1 || processing}
                                    onClick={prevStep}
                                >
                                    <CircleArrowLeft className="h-6 w-6 md:mr-2" />{" "}
                                    <span className="hidden md:inline">
                                        Sebelum
                                    </span>
                                </Button>
                                {formStep == 1 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={processing}
                                    >
                                        <span className="hidden md:inline">
                                            Lanjut
                                        </span>
                                        <CircleArrowRight className="h-6 w-6 md:ml-2" />{" "}
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        // className="w-full"
                                        isProcessing={processing}
                                        disabled={processing}
                                    >
                                        Sign up
                                    </Button>
                                )}
                            </div>

                            <p className="text-sm font-light text-gray-500">
                                Sudah punya akun?{" "}
                                <Link
                                    href={route("login")}
                                    className=" font-medium text-blue-500 hover:underline"
                                >
                                    Masuk sekarang.
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default SignUp;
