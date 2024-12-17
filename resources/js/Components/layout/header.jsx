import { cn } from "@/lib/utils"
import { usePage } from "@inertiajs/react"
import MobileSidebar from "./mobile-sidebar"
import { ThemeToggle } from "../theme-toggle"
import UserNav from "../user-nav"

const Header = () => {
  const { auth } = usePage().props
  const user = auth.user?.data

  return (
    <header className="sticky inset-x-0 top-0 w-full">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar role={user?.role} />
        </div>
        <div className="flex flex-row-reverse items-center gap-2">
          {auth?.user?.data && <UserNav />}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header
