import EditUserProfileCard from "@/Components/EditUserProfileCard";
import TabLink from "@/Components/TabLink";
import UserContestCard from "@/Components/UserContestCard";
import UserProfileCard from "@/Components/UserProfileCard";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

const ProfilePage = ({
    auth: { user },
    genders,
    queryParams = null,
    contests,
    fragment,
}) => {
    const [section, setSection] = useState("profile-section");
    const handleChangeSection = (section) => setSection(section);

    queryParams = queryParams || {};

    const toggleEditMode = (value) => {
        if (value) {
            queryParams["edit"] = true;
        } else {
            delete queryParams["edit"];
        }

        router.get(route("profile.index", queryParams));
    };

    useEffect(() => {
        if (fragment) {
            handleChangeSection(fragment);
        }
    }, [fragment]);

    return (
        <PublicLayout>
            <Head title="Profile" />

            <div className="md:flex md:flex-row">
                {/* Sidebar */}
                <ul className="space-y mb-4 space-y-4 font-medium text-gray-500  md:mb-0 md:me-4 md:w-1/5 md:flex-none">
                    <TabLink
                        link={"#profile-section"}
                        label={"Profil Saya"}
                        active={section === "profile-section"}
                        onClick={() => handleChangeSection("profile-section")}
                    />
                    <TabLink
                        link={"#contest-section"}
                        label={"Perlombaan Saya"}
                        active={section === "contest-section"}
                        onClick={() => handleChangeSection("contest-section")}
                    />
                </ul>

                <div className=" w-full">
                    {section === "contest-section" ? (
                        <UserContestCard
                            contests={contests}
                            title={"Perlombaan Saya"}
                        />
                    ) : queryParams["edit"] ? (
                        <EditUserProfileCard
                            data={user}
                            title={"Update Profil Saya"}
                            genders={genders}
                        />
                    ) : (
                        <UserProfileCard
                            data={user}
                            title={"Profil Saya"}
                            footer={
                                <Button
                                    className="mt-10"
                                    color="dark"
                                    onClick={() => toggleEditMode(true)}
                                    type="button"
                                >
                                    Ubah Profil
                                </Button>
                            }
                        />
                    )}
                </div>
            </div>

            <div className="mb-14 space-y-5"></div>
        </PublicLayout>
    );
};

export default ProfilePage;
