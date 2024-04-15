import TextareaInput from "@/Components/Textarea";
import InputText from "@/Components/Textinput";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";
import { SendHorizonal } from "lucide-react";

const ContactPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        sender_mail: "",
        subject: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("contact.send-mail"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Kontak" />

            <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Hubungi Kami
            </h2>
            <p className="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
                Mengalami permasalahan saat mendaftarkan diri? Ada pertanyaan
                seputar perlombaan yang diselenggarakan? Segera hubungi kami!
            </p>

            <Card>
                <div className="mx-auto w-full max-w-screen-md px-2 py-4 lg:py-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div>
                            <InputText
                                type={"email"}
                                value={data.sender_mail}
                                placeholder={"john.doe@mail.com"}
                                label={"Email mu"}
                                color={errors.sender_mail && "failure"}
                                helperText={errors.sender_mail}
                                onChange={(e) =>
                                    setData("sender_mail", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <InputText
                                placeholder={
                                    "Beritahukan kami apa yang bisa kami bantu"
                                }
                                value={data.subject}
                                label={"Subyek"}
                                color={errors.subject && "failure"}
                                helperText={errors.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <TextareaInput
                                rows={6}
                                label={"Deskripsi"}
                                placeholder={"Deskripsikan lebih detail..."}
                                value={data.description}
                                color={errors.description && "failure"}
                                helperText={errors.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </div>
                        <Button
                            isProcessing={processing}
                            disabled={processing}
                            type="submit"
                            size={"sm"}
                            className="text-center text-sm font-medium text-white sm:w-fit"
                        >
                            Kirim
                            <SendHorizonal className="ms-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </PublicLayout>
    );
};

export default ContactPage;
