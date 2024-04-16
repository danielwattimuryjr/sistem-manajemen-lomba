import ErrorToast from "@/Components/ErrorToast";
import SuccessToast from "@/Components/SuccessToast";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Header from "./partials/Header/Index";
import Sidebar from "./partials/Sidebar/Index";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    return (
        <>
            <Head title="Admin Panel" />
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                {/* <!-- ===== Page Wrapper Start ===== --> */}
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 text-black md:p-6 2xl:p-10">
                                {children}
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
                {/* <!-- ===== Page Wrapper End ===== --> */}

                {flash?.message?.type == "success" && (
                    <SuccessToast message={flash.message.text} />
                )}
                {flash?.message?.type == "error" && (
                    <ErrorToast message={flash.message.text} />
                )}
            </div>
        </>
    );
};

export default AdminLayout;
