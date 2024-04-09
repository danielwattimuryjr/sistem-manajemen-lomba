import { Toast } from "flowbite-react";
import { CircleCheck } from "lucide-react";

const SuccessToast = ({ message }) => {
    return (
        <Toast className="fixed bottom-0 right-0 shadow-xl duration-500 animate-in slide-in-from-bottom md:bottom-5 md:right-5">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <CircleCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
        </Toast>
    );
};

export default SuccessToast;
