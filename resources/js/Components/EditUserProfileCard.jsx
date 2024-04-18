import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Button, Card, Label, Radio } from "flowbite-react";
import DateInput from "./DateInput";
import PageTitle from "./PageHeader";
import TextareaInput from "./Textarea";
import InputText from "./Textinput";

const EditUserProfileCard = ({ data: user, genders, title }) => {
    const { data, setData, patch, processing, errors, reset } = useForm({
        full_name: user.full_name,
        nik: user.nik,
        d_o_b: formatDate(user.d_o_b),
        address: user.address,
        phone_number: user.phone_number,
        gender: user.gender,
    });

    // Function untuk handle update profil
    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    // Function untuk handle onChange pada gender radio button
    const handleGenderChange = (e) => {
        setData("gender", e.target.value);
    };

    return (
        <div className="space-y-5" id="profile-section">
            <Card>
                {title && <PageTitle title={title} />}

                <form onSubmit={submit}>
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
                                {genders.map((gender) => (
                                    <div className="flex items-center gap-2">
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
                    </div>
                    <div className="mt-4">
                        <Button
                            className="mt-10"
                            color="warning"
                            type="submit"
                            disabled={processing}
                            isProcessing={processing}
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditUserProfileCard;
