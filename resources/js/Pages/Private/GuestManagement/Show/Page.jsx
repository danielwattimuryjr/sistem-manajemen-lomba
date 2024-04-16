import PageTitle from "@/Components/PageHeader";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FilePenLine } from "lucide-react";
import ContestCard from "./partials/ContestCard";
import ProfileCard from "./partials/ProfileCard";

const Show = ({ user }) => {
    return (
        <AdminLayout>
            <PageTitle title={user.full_name}>
                <Button
                    color={"warning"}
                    as={Link}
                    href={route("guest-management.edit", user.uuid)}
                >
                    <FilePenLine className="mr-2 h-5 w-5" />
                    Ubah Data
                </Button>
            </PageTitle>

            <section className="space-y-4">
                <ProfileCard data={user} />

                <ContestCard contests={user.contests} />
            </section>
        </AdminLayout>
    );
};

export default Show;
