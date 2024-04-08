import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import PageTitle from "@/Components/PageHeader";

// TODO: GANTI LAYOUT NYA
export default function Edit({ auth: { user } }) {
    return (
        <PublicLayout>
            <Head title="Profile" />

            <PageTitle title={"Profile Saya"} />

            <div class="mb-8 mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                <div class="rounded-lg bg-gray-200 p-5">
                    <ul className="mb-4">
                        <li className="font-bold">Nama :</li>
                        <li>{user.name}</li>
                    </ul>

                    <ul className="mb-4">
                        <li className="font-bold">Email :</li>
                        <li>{user.email}</li>
                    </ul>
                </div>
                <div class="h-32 rounded-lg bg-gray-200 lg:col-span-2">
                    {/* TODO: ISI DENGAN INFORMASI DATA DIRI */}
                </div>
            </div>

            <PageTitle title={"Perlombaan yang saya ikuti"} />
        </PublicLayout>
    );
}
