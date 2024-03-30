import PublicNavbar from "@/Components/PublicComponents/Navbar";

const PublicLayout = ({ children }) => {
    return (
        <>
            <PublicNavbar />
            <main class="bg-slate-50 text-white">
                <div class="mx-auto max-w-screen-xl min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    {children}
                </div>
            </main>
        </>
    );
};

export default PublicLayout;
