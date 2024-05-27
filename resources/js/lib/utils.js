import { clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatDate(value) {
    return dayjs(value).format("DD MMMM YYYY");
}

export function transformText(text) {
    // Mengubah seluruh huruf menjadi uppercase
    const uppercaseText = text.toUpperCase();

    // Mengganti spasi dengan '_'
    const transformedText = uppercaseText.replace(/ /g, "_");

    return transformedText;
}

export function roundToDecimalPlaces(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}
