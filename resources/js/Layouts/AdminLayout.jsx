import Sidebar from "@/Components/SidebarComponent";
import Topbar from "@/Components/TopbarComponent";
import { Head, usePage } from "@inertiajs/react";
import { Toast } from "flowbite-react";
import { BadgeCheck } from "lucide-react";

const AdminLayout = ({ children }) => {
    const { flash } = usePage().props;

    return (
        <>
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

                    {flash?.success && (
                        <Toast className="absolute bottom-0 right-0 md:right-5 md:bottom-5 shadow-xl animate-fade-up animate-duration-500">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <BadgeCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">
                                {flash.success}
                            </div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                </div>
            </>
        </>
    );
};

export default AdminLayout;
