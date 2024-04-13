import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";
import { useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { CircleX, Save } from "lucide-react";
import { useState } from "react";

const CreateAdminPage = () => {
    const [visible, setVisible] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        full_name: "",
        email: "",
        password: "",
    });

    const togglePassword = () => {
        setVisible(!visible);
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
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name-admin"
                                color={errors?.full_name && "failure"}
                                value="Name"
                            />
                        </div>
                        <TextInput
                            className="w-full"
                            id="name-admin"
                            type="text"
                            placeholder="Cth. Admin A"
                            value={data.full?.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            color={errors?.full_name && "failure"}
                            helperText={
                                errors?.full_name && errors.full?.full_name
                            }
                        />
                    </div>

                    {/* Email Untuk Admin */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email-admin"
                                color={errors?.email && "failure"}
                                value="Email Admin"
                            />
                        </div>
                        <TextInput
                            className="w-full"
                            id="email-admin"
                            type="email"
                            placeholder="Cth. admin-test@mail.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            color={errors?.email && "failure"}
                            helperText={errors?.email && errors.email}
                        />
                    </div>

                    {/* Password Untuk Admin */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password-admin"
                                color={errors?.password && "failure"}
                                value="Password Admin"
                            />
                        </div>
                        <TextInput
                            className="w-full"
                            id="password-admin"
                            type={visible ? "text" : "password"}
                            placeholder="Kata Sandi"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            color={errors?.password && "failure"}
                            helperText={errors?.password && errors.password}
                        />
                    </div>

                    {/* Toggle password checkbox */}
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="password-visibility"
                            checked={visible}
                            onChange={togglePassword}
                        />
                        <Label htmlFor="password-visibility" className="flex">
                            Perlihatkan password
                        </Label>
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

                    {/* Clear Button */}
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

export default CreateAdminPage;
