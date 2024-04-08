import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { CircleX, FilePenLine, Save } from "lucide-react";

const EditAdminPage = ({ user: { data: userData } }) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: userData.name,
        email: userData.email,
    });

    const updateData = (e) => {
        e.preventDefault();
        patch(route("admin-management.update", userData.uuid));
    };

    return (
        <AdminLayout>
            <PageTitle title={"Create Admin"} />

            <Card>
                <form className="flex flex-col gap-4" onSubmit={updateData}>
                    {/* Nama Admin / Username / Nickname */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="name-admin"
                                color={errors?.name && "failure"}
                                value="Name"
                            />
                        </div>
                        <TextInput
                            className="w-full"
                            id="name-admin"
                            type="text"
                            placeholder="Cth. Admin A"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            color={errors?.name && "failure"}
                            helperText={errors?.name && errors.name}
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        color="warning"
                        className="w-full"
                        disabled={processing}
                        isProcessing={processing}
                    >
                        <FilePenLine className="mr-2 h-5 w-5" />
                        Update
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

export default EditAdminPage;
