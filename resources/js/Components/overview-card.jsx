import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card.jsx"
import { Icon } from "@/Components/icon.jsx"

export default function OverviewCard({
  title,
  subTitle,
  icon = "IconInfoSquareRounded",
  children,
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon icon={icon} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{children}</div>
        <p className="text-xs text-muted-foreground">{subTitle}</p>
      </CardContent>
    </Card>
  )
}
