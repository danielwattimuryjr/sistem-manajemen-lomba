import InputText from "@/Components/Textinput";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";

const SignIn = () => {
    // State untuk form
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    // State untuk visibility password
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // Function untuk submit
    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <AuthLayout title="Sign In">
            <Head title="Sign In" />

            <Card className="w-full sm:max-w-md md:mt-0 xl:p-0">
                <div className="space-y-4 md:space-y-6">
                    <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                        {/* Email Input */}
                        <InputText
                            label={"Email"}
                            value={data.email}
                            type="email"
                            placeholder="john@doe.com"
                            onChange={(e) => setData("email", e.target.value)}
                            color={errors?.email && "failure"}
                            helperText={errors?.email && errors.email}
                        />

                        {/* Password Input */}
                        <InputText
                            label={"Password"}
                            value={data.password}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Kata sandi"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            color={errors?.password && "failure"}
                            helperText={errors?.password && errors.password}
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
                                        Lihat Password
                                    </Label>
                                </div>
                            </div>
                            <Link
                                href="#"
                                className="text-primary-600 text-sm font-medium text-blue-500 hover:underline"
                            >
                                Lupa Password
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            isProcessing={processing}
                            disabled={processing}
                        >
                            Sign in
                        </Button>

                        <p className="text-sm font-light text-gray-500">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="text-primary-600 font-medium text-blue-500 hover:underline"
                            >
                                Daftar di sini.
                            </Link>
                        </p>
                    </form>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default SignIn;
