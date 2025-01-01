import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import DashboardNav from "../dashboard-nav"
import { adminNavItems, superadminNavItems } from "@/constants/data"
import { Icon } from "../icon"

const MobileSidebar = ({ className, role }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Icon icon={"IconMenu2"} />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <DashboardNav
                  items={
                    role === "superadmin" ? superadminNavItems : adminNavItems
                  }
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar
