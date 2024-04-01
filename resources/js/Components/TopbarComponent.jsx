import { useSidebar } from "@/libs/zustand";
import { Link } from "@inertiajs/react";
import { Avatar, DarkThemeToggle } from "flowbite-react";
import { Menu, X } from "lucide-react";

const Topbar = () => {
    const sidebar = useSidebar();

    return (
        <header className="border-b">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
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

                <Avatar placeholderInitials="DW" />
            </div>
        </header>
    );
};

export default Topbar;
