import { cn } from "@/lib/utils";
import { useState } from "react";
import NavLink from "./NavLink";
import { Button } from "flowbite-react";
import { LogIn } from "lucide-react";
import { Link } from "@inertiajs/react";

const PublicNavbar = ({ auth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="relative bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <img
                                className="w-auto h-6 sm:h-7"
                                src="https://merakiui.com/images/full-logo.svg"
                                alt=""
                            />
                        </a>

                        <div className="flex lg:hidden">
                            <button
                                onClick={toggle}
                                type="button"
                                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                            >
                                {isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
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
                                        className="w-6 h-6"
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
                            "absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center",
                            isOpen
                                ? "translate-x-0 opacity-100 "
                                : "opacity-0 -translate-x-full"
                        )}
                    >
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <NavLink href="/">Beranda</NavLink>

                            <NavLink href={route("public.perlombaan.all")}>
                                Perlombaan
                            </NavLink>

                            <NavLink href="#">Kontak</NavLink>

                            <NavLink href="#">FAQ</NavLink>
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            {auth ? (
                                <button
                                    type="button"
                                    className="flex items-center focus:outline-none"
                                    aria-label="toggle profile dropdown"
                                >
                                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                        <img
                                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                                            className="object-cover w-full h-full"
                                            alt="avatar"
                                        />
                                    </div>

                                    <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                                        {(auth && auth.user.name) || "Username"}
                                    </h3>
                                </button>
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
