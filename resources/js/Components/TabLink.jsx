import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { Hash } from "lucide-react";

const TabLink = ({ link, label, active }) => {
    return (
        <li className="group">
            <Link
                href={link}
                className={cn(
                    "inline-flex w-full items-center px-4 py-2 transition duration-150 ease-in-out group-hover:border-l-4 group-hover:border-blue-700 group-hover:text-blue-700",
                    active && "border-l-4 border-blue-700 text-blue-700",
                )}
            >
                <Hash className="me-2 h-4 w-4 text-blue-700" />
                {label}
            </Link>
        </li>
    );
};

export default TabLink;
