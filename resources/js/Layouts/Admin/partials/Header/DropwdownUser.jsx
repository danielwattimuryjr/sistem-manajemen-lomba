import { Link, router } from "@inertiajs/react";
import { Eye, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen ||
                (dropdown.current && dropdown.current.contains(target)) ||
                (trigger.current && trigger.current.contains(target))
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [dropdownOpen]);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, []);

    return (
        <div className="relative">
            <button
                ref={trigger}
                onClick={(e) => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                to="#"
            >
                <span className="text-right">
                    <span className="block text-sm font-medium text-black dark:text-white">
                        Thomas Anree
                    </span>
                    <span className="block text-xs">UX Designer</span>
                </span>

                <svg
                    className="fill-current"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </button>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`w-62.5 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark absolute right-0 mt-4 flex flex-col rounded-sm border bg-white ${
                    dropdownOpen === true ? "block" : "hidden"
                }`}
            >
                <ul className="border-stroke dark:border-strokedark flex flex-col gap-5 border-b px-6 py-5">
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-[#3C50E0] lg:text-base"
                        >
                            <Eye className="h-6 w-6" />
                            View Page as User
                        </Link>
                    </li>
                </ul>
                <button
                    className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-200 ease-in-out hover:text-[#EE4B2B] lg:text-base"
                    onClick={() => {
                        router.post(route("logout"));
                    }}
                >
                    <LogOut className="h-6 w-6" />
                    Sign Out
                </button>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DropdownUser;
