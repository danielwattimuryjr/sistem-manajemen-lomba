import TabLink from "@/Components/TabLink";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import MyContest from "./partials/MyContest";
import MyProfile from "./partials/MyProfile";

const ProfilePage = ({
    auth: { user },
    availableGenders,
    queryParams = null,
    contests: participatedContests,
    fragment,
}) => {
    queryParams = queryParams || {};

    const toggleEditMode = (value) => {
        if (value) {
            queryParams["edit"] = true;
        } else {
            delete queryParams["edit"];
        }

        router.get(route("profile.index", queryParams));
    };

    if (fragment) {
        window.location.hash = `#${fragment}`;
    }

    return (
        <PublicLayout>
            <Head title="Profile" />

            <div class="md:flex md:flex-row">
                {/* Sidebar */}
                <ul class="space-y mb-4 space-y-4 font-medium text-gray-500  md:mb-0 md:me-4 md:w-1/5 md:flex-none">
                    <TabLink
                        link={"#profile-section"}
                        label={"Profil Saya"}
                        active
                    />
                    <TabLink
                        link={"#contest-section"}
                        label={"Perlombaan Saya"}
                    />
                </ul>

                <div className="flex w-full flex-col gap-10">
                    <MyProfile
                        genders={availableGenders}
                        queryParams={queryParams}
                        toggleEditMode={toggleEditMode}
                        user={user}
                    />

                    <MyContest contests={participatedContests} />
                </div>
            </div>

            <div className="mb-14 space-y-5"></div>
        </PublicLayout>
    );
};

export default ProfilePage;
