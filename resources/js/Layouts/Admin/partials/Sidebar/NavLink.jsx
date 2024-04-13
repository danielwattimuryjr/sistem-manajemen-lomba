import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const NavLink = ({ href, isActive, label, Icon }) => {
    return (
        <Link
            href={href}
            className={cn(
                "text-bodydark1 hover:bg-graydark group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out",
                isActive && "bg-graydark",
            )}
        >
            <Icon className="h-4 w-4" />

            {label}
        </Link>
    );
};

export default NavLink;
