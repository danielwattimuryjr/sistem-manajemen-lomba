import { useSidebar } from "@/libs/zustand";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { CircleGauge, Medal, Package, PiggyBank, Users } from "lucide-react";

const Sidebar = () => {
    const sidebar = useSidebar();

    return (
        <FlowbiteSidebar className={!sidebar.isOpen && "hidden"}>
            <FlowbiteSidebar.Items>
                <FlowbiteSidebar.ItemGroup>
                    <FlowbiteSidebar.Item
                        href="#"
                        icon={CircleGauge}
                        active={route().current("dashboard")}
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
                    <FlowbiteSidebar.Item
                        href={"#"}
                        icon={Package}
                        active={route().current("*products*")}
                    >
                        Products
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                        href="#"
                        icon={PiggyBank}
                        active={route().current("*orders*")}
                    >
                        Orders
                    </FlowbiteSidebar.Item>
                </FlowbiteSidebar.ItemGroup>
            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
};

export default Sidebar;
