import TabLink from "@/Components/TabLink";
import PublicLayout from "@/Layouts/Public/Layout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import MyContest from "./partials/MyContest";
import MyProfile from "./partials/MyProfile";

const ProfilePage = ({
    auth: { user },
    availableGenders,
    queryParams = null,
    contests: participatedContests,
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

            <div class="md:flex md:flex-row">
                {/* Sidebar */}
                <ul class="space-y mb-4 space-y-4 font-medium text-gray-500  md:mb-0 md:me-4 md:w-1/5 md:flex-none">
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
                        <MyContest contests={participatedContests} />
                    ) : (
                        <MyProfile
                            genders={availableGenders}
                            queryParams={queryParams}
                            toggleEditMode={toggleEditMode}
                            user={user}
                        />
                    )}
                </div>
            </div>

            <div className="mb-14 space-y-5"></div>
        </PublicLayout>
    );
};

export default ProfilePage;
