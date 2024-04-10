import PageTitle from "@/Components/PageHeader";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Datepicker,
    Label,
    Radio,
    TextInput,
    Textarea,
} from "flowbite-react";
import { useForm } from "@inertiajs/react";
import { formatDate } from "@/lib/utils";

const ProfilePage = ({
    auth: { user },
    availableGenders: genders,
    queryParams = null,
}) => {
    console.log(user);
    queryParams = queryParams || {};

    // Form hook dari inertia
    const { data, setData, patch, processing, errors, reset } = useForm({
        full_name: user.full_name,
        nik: user.nik,
        d_o_b: formatDate(user.d_o_b),
        address: user.address,
        phone_number: user.phone_number,
        gender: user.gender,
    });

    const toggleEditMode = (value) => {
        if (value) {
            queryParams["edit"] = true;
        } else {
            delete queryParams["edit"];
        }

        router.get(route("profile.index", queryParams));
    };

    // Function untuk handle update profil
    const handleUpdateProfile = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    // Function untuk handle onChange pada gender radio button
    const handleGenderChange = (e) => {
        setData("gender", e.target.value);
    };

    return (
        <PublicLayout>
            <Head title="Profile" />

            <PageTitle title={"Profile Saya"} />

            <div className="mb-8 mt-4 rounded-lg bg-white p-5 shadow-lg lg:col-span-2">
                {/* TODO: ISI DENGAN INFORMASI DATA DIRI */}
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleUpdateProfile}
                >
                    {/* Nama Lengkap */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Nama Lengkap : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <TextInput
                                className="w-full"
                                type="text"
                                placeholder=""
                                value={data.full_name}
                                onChange={(e) =>
                                    setData("full_name", e.target.value)
                                }
                                color={errors?.full_name && "failure"}
                                helperText={
                                    errors?.full_name && errors.full_name
                                }
                            />
                        ) : (
                            <p>{data.full_name || "-"}</p>
                        )}
                    </div>

                    {/* NIK */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">NIK : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <TextInput
                                className="w-full"
                                type="text"
                                placeholder=""
                                value={data.nik}
                                onChange={(e) => setData("nik", e.target.value)}
                                color={errors?.nik && "failure"}
                                helperText={errors?.nik && errors.nik}
                            />
                        ) : (
                            <p>{data.nik || "-"}</p>
                        )}
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Tanggal Lahir : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <Datepicker
                                color={errors?.d_o_b && "failure"}
                                value={data.d_o_b}
                                onSelectedDateChanged={(e) =>
                                    setData("d_o_b", formatDate(e))
                                }
                                helperText={errors?.d_o_b && errors.d_o_b}
                            />
                        ) : (
                            <p>{data.d_o_b || "-"}</p>
                        )}
                    </div>

                    {/* Alamat */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Alamat : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <Textarea
                                color={errors?.address && "failure"}
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                helperText={errors?.address && errors.address}
                            />
                        ) : (
                            <p>{data.address || "-"}</p>
                        )}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Jenis Kelamin : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <div className="flex flex-row gap-x-5">
                                <div className="flex items-center gap-2">
                                    <Radio
                                        id={genders.male}
                                        value={genders.male}
                                        name="gender"
                                        checked={data.gender === genders.male}
                                        onChange={handleGenderChange}
                                    />
                                    <Label htmlFor="united-state">
                                        {genders.male}
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Radio
                                        id={genders.female}
                                        value={genders.female}
                                        name="gender"
                                        checked={data.gender === genders.female}
                                        onChange={handleGenderChange}
                                    />
                                    <Label htmlFor={genders.female}>
                                        {genders.female}
                                    </Label>
                                </div>
                            </div>
                        ) : (
                            <p>{data.gender || "-"}</p>
                        )}
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <div className="mb-2 block">
                            <p className="font-bold">Nomor Telepon : </p>
                        </div>
                        {queryParams["edit"] ? (
                            <TextInput
                                type="tel"
                                color={errors?.phone_number && "failure"}
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                helperText={
                                    errors?.phone_number && errors.phone_number
                                }
                            />
                        ) : (
                            <p>{data.phone_number || "-"}</p>
                        )}
                    </div>

                    {queryParams["edit"] ? (
                        <Button
                            color="warning"
                            type="submit"
                            disabled={processing}
                            isProcessing={processing}
                        >
                            Simpan Perubahan
                        </Button>
                    ) : (
                        <Button
                            color="dark"
                            onClick={() => toggleEditMode(true)}
                            type="button"
                        >
                            Ubah Profil
                        </Button>
                    )}
                </form>
            </div>
            <div className=" grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8"></div>

            <PageTitle title={"Perlombaan yang saya ikuti"} />
        </PublicLayout>
    );
};

export default ProfilePage;
