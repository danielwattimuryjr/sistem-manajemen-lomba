import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Error = ({ status }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Kurangi countdown setiap detik
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Membersihkan timer saat komponen dibongkar
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (countdown === 0) {
            // Ganti "dashboard" dengan nama rute menuju halaman utama Anda
            // Jika menggunakan route name dari Laravel, pastikan nama rute sesuai
            router.visit(route("dashboard"));
        }
    }, [countdown]);

    const code = {
        503: "503",
        500: "500",
        404: "404",
        403: "403",
    }[status];

    const title = {
        503: "Sorry...",
        500: "Whoops!",
        404: "Uh-oh!",
        403: "Sorry...",
    }[status];

    const description = {
        503: "we are doing some maintenance. Please check back soon.",
        500: "something went wrong on our servers.",
        404: "the page you are looking for could not be found.",
        403: "you are forbidden from accessing this page.",
    }[status];

    return (
        <div class="grid h-screen place-content-center bg-white px-4">
            <div class="text-center">
                <h1 class="text-9xl font-black text-gray-200">{code}</h1>

                <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {title}
                </p>

                <p class="mt-4 text-gray-500">{description}</p>

                <p className="mt-4 text-gray-500">
                    Anda akan dialihkan ke halaman utama dalam{" "}
                    <b className="text-indigo-600">{countdown}</b> detik.
                </p>

                <Link
                    href={route("dashboard")}
                    class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    Kembali Sekarang
                </Link>
            </div>
        </div>
    );
};

export default Error;
