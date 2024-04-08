import ContestCard from "@/Components/PublicComponents/ContestCard";
import Searchbar from "@/Components/PublicComponents/Searchbar";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";

const PerlombaanAll = ({ contests: { data }, queryParams = null }) => {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("public.perlombaan.all"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    return (
        <PublicLayout>
            <Head title="Perlombaan" />
            <h2 class="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Daftar Perlombaan
            </h2>
            <p class="mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
                Lihatlah seluruh perlombaan yang ada, dan segeralah daftarkan
                dirimu!
            </p>

            {/* Search */}
            <Searchbar
                value={queryParams.title}
                onChange={(e) => searchFieldChanged("title", e.target.value)}
                onKeyPress={(e) => onKeyPress("title", e)}
            />

            {/* Get All Perlombaan */}
            {data.length === 0 ? (
                <div className="mt-8 flex items-center justify-center p-10">
                    {queryParams["title"] ? (
                        <p className="text-center">
                            Perlombaan dengan nama <b>{queryParams["title"]}</b>{" "}
                            tidak ditemukan. 😊
                        </p>
                    ) : (
                        <p className="text-center">
                            Data Perlombaan masih kosong. Harap bersabar 😊
                        </p>
                    )}
                </div>
            ) : (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 ">
                    {data.map((d) => {
                        return <ContestCard contest={d} />;
                    })}
                </ul>
            )}
        </PublicLayout>
    );
};

export default PerlombaanAll;
