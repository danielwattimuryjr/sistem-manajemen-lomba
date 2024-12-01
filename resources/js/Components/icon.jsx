import { cn } from "@/lib/utils"
import * as tablerIcons from "@tabler/icons-react"
import { forwardRef } from "react"

export const Icon = forwardRef(({ className, icon, ...props }, ref) => {
  const IconComponent = tablerIcons[icon] // Dynamically get the icon component
  return (
    <IconComponent
      ref={ref} // Forward the ref here
      className={cn("h-6 w-6 stroke-[1.2]", className)}
      {...props}
    />
  )
})
