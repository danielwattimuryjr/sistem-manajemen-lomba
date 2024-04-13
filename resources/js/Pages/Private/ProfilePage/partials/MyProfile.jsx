import DateInput from "@/Components/DateInput";
import PageTitle from "@/Components/PageHeader";
import TextareaInput from "@/Components/Textarea";
import InputText from "@/Components/Textinput";
import { formatDate } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { Button, Card, Label, Radio } from "flowbite-react";

const MyProfile = ({ user, genders, queryParams, toggleEditMode }) => {
    // Form hook dari inertia
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
            <PageTitle title={"Profile Saya"} />
            <Card>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                        {/* NIK */}
                        {queryParams["edit"] ? (
                            <InputText
                                label={"NIK"}
                                value={data.nik}
                                placeholder={"Nomor Induk Kependudukan"}
                                onChange={(e) => setData("nik", e.target.value)}
                                color={errors?.nik && "failure"}
                                helperText={errors?.nik && errors.nik}
                            />
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <p className="font-bold">NIK : </p>
                                </div>
                                <p>{data.nik || "-"}</p>
                            </div>
                        )}

                        {/* Nama Lengkap */}
                        {queryParams["edit"] ? (
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
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <p className="font-bold">Nama Lengkap : </p>
                                </div>
                                <p>{data.full_name || "-"}</p>
                            </div>
                        )}

                        {/* Jenis kelamin */}
                        <div>
                            {queryParams["edit"] ? (
                                <>
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
                                                checked={
                                                    data.gender === genders.male
                                                }
                                                onChange={handleGenderChange}
                                            />
                                            <Label>{genders.male}</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Radio
                                                id={genders.female}
                                                value={genders.female}
                                                name="gender"
                                                checked={
                                                    data.gender ===
                                                    genders.female
                                                }
                                                onChange={handleGenderChange}
                                            />
                                            <Label>{genders.female}</Label>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mb-2 block">
                                        <p className="font-bold">
                                            Jenis Kelamin :{" "}
                                        </p>
                                    </div>
                                    <p>{data.gender || "-"}</p>
                                </>
                            )}
                        </div>

                        {/* Tanggal Lahir */}
                        {queryParams["edit"] ? (
                            <DateInput
                                label={"Tanggal Lahir"}
                                color={errors?.d_o_b && "failure"}
                                value={data.d_o_b}
                                onSelectedDateChanged={(e) =>
                                    setData("d_o_b", formatDate(e))
                                }
                                helperText={errors?.d_o_b && errors.d_o_b}
                            />
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <p className="font-bold">
                                        Tanggal Lahir :{" "}
                                    </p>
                                </div>
                                <p>{data.d_o_b || "-"}</p>
                            </div>
                        )}

                        {/* Nomor Telepon */}
                        {queryParams["edit"] ? (
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
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <p className="font-bold">
                                        Nomor Telepon :{" "}
                                    </p>
                                </div>
                                <p>{data.phone_number || "-"}</p>
                            </div>
                        )}

                        {/* Alamat */}
                        {queryParams["edit"] ? (
                            <TextareaInput
                                label={"Alamat"}
                                value={data.address}
                                placeholder={"Ketikkan alamat mu"}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                color={errors?.address && "failure"}
                                helperText={errors?.address && errors.address}
                            />
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <p className="font-bold">Alamat : </p>
                                </div>
                                <p>{data.address || "-"}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-row items-center justify-end">
                        {queryParams["edit"] ? (
                            <Button
                                className="mt-10"
                                color="warning"
                                type="submit"
                                disabled={processing}
                                isProcessing={processing}
                            >
                                Simpan Perubahan
                            </Button>
                        ) : (
                            <Button
                                className="mt-10"
                                color="dark"
                                onClick={() => toggleEditMode(true)}
                                type="button"
                            >
                                Ubah Profil
                            </Button>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default MyProfile;
