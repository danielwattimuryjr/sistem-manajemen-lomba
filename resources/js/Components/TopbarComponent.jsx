import { useSidebar } from "@/libs/zustand";
import { Link } from "@inertiajs/react";
import { Avatar, DarkThemeToggle } from "flowbite-react";
import { Menu, X } from "lucide-react";

const Topbar = () => {
    const sidebar = useSidebar();

    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
                <button onClick={() => sidebar.toggleShow()}>
                    {sidebar.isOpen ? (
                        <X className="rotate-0 scale-100 transition-all dark:-rotate-90" />
                    ) : (
                        <Menu className="scale-100 transition-all dark:rotate-0" />
                    )}
                </button>

                <Link
                    className="flex items-center gap-1 text-lg font-semibold"
                    href="#"
                >
                    <span className="text-primary">Admin</span>
                    Panel
                </Link>

                <div className="flex flex-row gap-2">
                    <DarkThemeToggle />

                    <Avatar placeholderInitials="DW" />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
