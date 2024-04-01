import PublicNavbar from "@/Components/PublicComponents/Navbar";

const PublicLayout = ({ children }) => {
    return (
        <>
            <PublicNavbar />
            <main className="bg-slate-50 text-black">
                <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    {children}
                </div>
            </main>
        </>
    );
};

export default PublicLayout;
