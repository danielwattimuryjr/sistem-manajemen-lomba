import { cn } from "@/lib/utils"
import { Link, usePage } from "@inertiajs/react"
import MobileSidebar from "./mobileSidebar"
import { ThemeToggle } from "../themeToggle"
import { Button, buttonVariants } from "../ui/button"

const Header = () => {
  const { auth } = usePage().props
  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex flex-row-reverse items-center gap-2">
          {auth.user && (
            <Link
              as="button"
              method="post"
              href={route("logout")}
              className={buttonVariants({
                variant: "destructive",
              })}
            >
              Sign Out
            </Link>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header
