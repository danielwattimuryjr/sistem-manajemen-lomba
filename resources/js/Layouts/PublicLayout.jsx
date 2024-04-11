import ErrorToast from "@/Components/ErrorToast";
import PublicNavbar from "@/Components/PublicComponents/Navbar";
import SuccessToast from "@/Components/SuccessToast";
import { usePage } from "@inertiajs/react";

const PublicLayout = ({ children }) => {
    const {
        flash: { message },
    } = usePage().props;

    return (
        <>
            <PublicNavbar />
            <main className="relative bg-slate-50 text-black">
                <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    {children}
                </div>
            </main>
            {message?.type == "success" && (
                <SuccessToast message={message.text} />
            )}
            {message?.type == "error" && <ErrorToast message={message.text} />}
        </>
    );
};

export default PublicLayout;
