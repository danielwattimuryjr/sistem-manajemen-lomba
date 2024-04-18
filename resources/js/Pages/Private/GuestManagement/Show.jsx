import PageTitle from "@/Components/PageHeader";
import UserContestCard from "@/Components/UserContestCard";
import UserProfileCard from "@/Components/UserProfileCard";
import AdminLayout from "@/Layouts/Admin/Layout";
import { Link } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FilePenLine } from "lucide-react";

const Show = ({ data, contests }) => {
    return (
        <AdminLayout>
            <PageTitle title={data.full_name}>
                <Button
                    color={"warning"}
                    as={Link}
                    href={route("guest-management.edit", data.uuid)}
                >
                    <FilePenLine className="mr-2 h-5 w-5" />
                    Ubah Data
                </Button>
            </PageTitle>

            <section className="space-y-4">
                <UserProfileCard data={data} />

                <UserContestCard contests={contests} />
            </section>
        </AdminLayout>
    );
};

export default Show;
