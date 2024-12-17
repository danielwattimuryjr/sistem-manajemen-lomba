import { Button } from "@/Components/ui/button.jsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip.jsx"

export default function ButtonTooltip({ children, tooltip, ...props }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button {...props}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className={"capitalize"}>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
