import { useSidebar } from "@/lib/zustand";
import { usePage } from "@inertiajs/react";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { CircleGauge, Medal, Users } from "lucide-react";

const Sidebar = () => {
    const sidebar = useSidebar();
    const {
        auth: { user },
    } = usePage().props;

    return (
        <FlowbiteSidebar className={!sidebar.isOpen && "hidden"}>
            <FlowbiteSidebar.Items>
                <FlowbiteSidebar.ItemGroup>
                    <FlowbiteSidebar.Item
                        href={route("admin.dashboard")}
                        icon={CircleGauge}
                        active={route().current("admin.dashboard")}
                    >
                        Home
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                        href={route("perlombaan.index")}
                        icon={Medal}
                        active={route().current("*perlombaan*")}
                    >
                        Perlombaan
                    </FlowbiteSidebar.Item>
                    {user.role == "SUPERADMIN" && (
                        <FlowbiteSidebar.Item
                            href={route("admin-management.index")}
                            icon={Users}
                            active={route().current("*admin-management*")}
                        >
                            Manage Admin
                        </FlowbiteSidebar.Item>
                    )}
                </FlowbiteSidebar.ItemGroup>
            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
};

export default Sidebar;
