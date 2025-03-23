import { clsx } from "clsx"
import slugify from "slugify"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function trans(text) {
  return slugify(text.replace(/\//g, "-"), {
    lower: true,
    replacement: "-",
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  })
}
