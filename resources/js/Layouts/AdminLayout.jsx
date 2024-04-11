import ErrorToast from "@/Components/ErrorToast";
import Sidebar from "@/Components/SidebarComponent";
import SuccessToast from "@/Components/SuccessToast";
import Topbar from "@/Components/TopbarComponent";
import { Head, usePage } from "@inertiajs/react";

const AdminLayout = ({ children }) => {
    const {
        flash: { message },
    } = usePage().props;

    return (
        <>
            <Head title="Admin Panel" />

            <div className="relative">
                <div className="flex h-screen flex-col">
                    <Topbar />
                    <main className="flex flex-1 overflow-hidden">
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <div className="flex flex-1 items-stretch overflow-hidden">
                                <Sidebar />
                                <div className="flex flex-1 flex-col overflow-auto">
                                    <div className="flex flex-col gap-4 p-4 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {message?.type == "success" && (
                    <SuccessToast message={message.text} />
                )}
                {message?.type == "error" && (
                    <ErrorToast message={message.text} />
                )}
            </div>
        </>
    );
};

export default AdminLayout;
