import { Toast } from "flowbite-react";
import { Ban } from "lucide-react";

const ErrorToast = ({ message }) => {
    return (
        <Toast className="fixed bottom-5 right-5 shadow-xl duration-500 animate-in slide-in-from-bottom">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <Ban className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
        </Toast>
    );
};

export default ErrorToast;
