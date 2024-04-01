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
            <div className="mx-auto max-w-lg text-center">
                <h2 className="text-3xl font-bold text-black sm:text-4xl">
                    Daftar Perlombaan
                </h2>

                <p className="mt-4 text-black">
                    Lihatlah seluruh perlombaan yang ada, dan segeralah
                    daftarkan dirimu!
                </p>
            </div>

            {/* Search */}
            <Searchbar
                value={queryParams.title}
                onChange={(e) => searchFieldChanged("title", e.target.value)}
                onKeyPress={(e) => onKeyPress("title", e)}
            />

            {/* Get All Perlombaan */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-5 ">
                {data.map((d) => {
                    return <ContestCard contest={d} />;
                })}
            </ul>
        </PublicLayout>
    );
};

export default PerlombaanAll;
