import { Link } from "@inertiajs/react";

const NavLink = ({ children, ...props }) => {
    return (
        <Link
            {...props}
            className="mx-3 mt-2 transform rounded-md px-3 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 lg:mt-0"
        >
            {children}
        </Link>
    );
};

export default NavLink;
