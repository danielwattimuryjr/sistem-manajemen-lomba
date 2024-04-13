import ErrorToast from "@/Components/ErrorToast";
import SuccessToast from "@/Components/SuccessToast";
import Navbar from "./partials/Navbar";

const PublicLayout = ({ children, flash }) => {
    return (
        <div className="relative">
            <Navbar />
            <main className=" bg-slate-50  text-black">
                <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    {children}
                </div>
            </main>
            {flash?.message?.type == "success" && (
                <SuccessToast message={flash.message.text} />
            )}
            {flash?.message?.type == "error" && (
                <ErrorToast message={flash.message.text} />
            )}
        </div>
    );
};

export default PublicLayout;
