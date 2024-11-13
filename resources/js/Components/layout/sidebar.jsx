import { useState } from "react"
import { superadminNavItems, adminNavItems } from "@/constants/data"
import { useSidebar } from "@/hooks/useSidebar"
import { Link, usePage } from "@inertiajs/react"
import DashboardNav from "../dashboard-nav"
import { Icon } from "../icon"
import { cn } from "@/lib/utils"

const Sidebar = ({ className }) => {
  const { isMinimized, toggle } = useSidebar()

  const handleToggle = () => {
    toggle()
  }

  const { auth } = usePage().props
  const user = auth.user?.data

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[72px]",
        className,
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href={"#"} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </Link>
      </div>
      <Icon
        icon={"IconChevronLeft"}
        className={cn(
          "absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180",
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav
              items={
                user?.role === "superadmin" ? superadminNavItems : adminNavItems
              }
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
