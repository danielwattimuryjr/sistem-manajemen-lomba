import PageTitle from "@/Components/PageHeader";
import InputText from "@/Components/Textinput";
import AdminLayout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label } from "flowbite-react";
import { CircleX, Save } from "lucide-react";
import { useState } from "react";

const CreateAdminPage = () => {
    // State untuk visibility password
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        email: "",
        password: "",
    });

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const storeData = (e) => {
        e.preventDefault();
        post(route("admin-management.store"));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Create Admin"} />

            <Card>
                <form className="flex flex-col gap-4" onSubmit={storeData}>
                    {/* Nama Admin / Username / Nickname */}
                    <InputText
                        label={"Nama"}
                        value={data.full_name}
                        placeholder="Cth. Admin A"
                        onChange={(e) => setData("full_name", e.target.value)}
                        color={errors?.full_name && "failure"}
                        helperText={errors?.full_name}
                    />

                    {/* Email Untuk Admin */}
                    <InputText
                        label={"Email"}
                        value={data.email}
                        type={"email"}
                        placeholder="Cth. admin-test@mail.com"
                        onChange={(e) => setData("email", e.target.value)}
                        color={errors?.email && "failure"}
                        helperText={errors?.email}
                    />

                    {/* Password */}
                    <InputText
                        label={"Password"}
                        value={data.password}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Kata sandi"
                        onChange={(e) => setData("password", e.target.value)}
                        color={errors?.password && "failure"}
                        helperText={
                            errors?.password ||
                            "Kosongkan jika password tidak diubah"
                        }
                    />

                    {/* Password Confirm */}
                    <InputText
                        label={"Konfirmasi Password"}
                        value={data.password_confirmation}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Ketik ulang kata sandi nya"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        color={errors?.password_confirmation && "failure"}
                        helperText={
                            errors?.password_confirmation ||
                            "Kosongkan jika password tidak diubah"
                        }
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

export default CreateAdminPage;
