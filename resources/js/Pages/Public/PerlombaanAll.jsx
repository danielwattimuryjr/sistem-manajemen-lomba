import PublicLayout from "@/Layouts/PublicLayout";

const PerlombaanAll = ({ contests }) => {
    console.log(contests);
    return (
        <PublicLayout>
            <div class="mx-auto max-w-lg text-center">
                <h2 class="text-3xl font-bold sm:text-4xl text-black">
                    Daftar Perlombaan
                </h2>

                <p class="mt-4 text-black">
                    Lihatlah seluruh perlombaan yang ada, dan segeralah
                    daftarkan dirimu!
                </p>
            </div>
        </PublicLayout>
    );
};

export default PerlombaanAll;
