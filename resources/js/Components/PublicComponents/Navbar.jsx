import { cn } from "@/lib/utils";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button, Tooltip } from "flowbite-react";
import { LogIn, Power } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {
        auth: { user },
    } = usePage().props;

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container mx-auto px-6 py-4">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="/">
                            <img
                                className="h-6 w-auto sm:h-7"
                                src="https://merakiui.com/images/full-logo.svg"
                                alt=""
                            />
                        </a>

                        <div className="flex lg:hidden">
                            <button
                                onClick={toggle}
                                type="button"
                                className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                            >
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "absolute inset-x-0 z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:bg-transparent lg:p-0 lg:opacity-100",
                            isOpen
                                ? "translate-x-0 opacity-100 "
                                : "-translate-x-full opacity-0",
                        )}
                    >
                        <div className="-mx-6 flex flex-col lg:mx-8 lg:flex-row lg:items-center">
                            <NavLink href="/">Beranda</NavLink>

                            <NavLink href={route("public.perlombaan.all")}>
                                Perlombaan
                            </NavLink>

                            <NavLink href={route("faq")}>FAQ</NavLink>

                            <NavLink href={route("contact-us")}>Kontak</NavLink>

                            {user && (
                                <div className="lg:hidden">
                                    <NavLink
                                        href={route("logout")}
                                        method="post"
                                        // as="button"
                                        type="button"
                                    >
                                        Logout
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center lg:mt-0">
                            {user ? (
                                <>
                                    <Tooltip content={"Profile"}>
                                        <Link
                                            type="button"
                                            className="flex items-center focus:outline-none"
                                            aria-label="toggle profile dropdown"
                                            href={route("profile.index")}
                                        >
                                            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-gray-400">
                                                <img
                                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                                    className="h-full w-full object-cover"
                                                    alt="avatar"
                                                />
                                            </div>

                                            <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                                                {user.full_name}
                                            </h3>
                                        </Link>
                                    </Tooltip>

                                    <Tooltip content="Sign Out">
                                        <Link
                                            type="button"
                                            method="post"
                                            className="mx-4 hidden transform text-gray-600 transition-colors duration-300 hover:text-gray-700 focus:text-gray-700 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:block"
                                            href={route("logout")}
                                        >
                                            <Power
                                                className="h-6 w-6 text-red-600"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            />
                                        </Link>
                                    </Tooltip>
                                </>
                            ) : (
                                <Button
                                    color="blue"
                                    size={"sm"}
                                    as={Link}
                                    href={route("login")}
                                >
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Sign In
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
