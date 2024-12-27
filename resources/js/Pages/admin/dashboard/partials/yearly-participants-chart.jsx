import { usePage } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card.jsx"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart.jsx"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

export default function YearlyParticipantChart () {
  const {participantStatistics} = usePage().props
  const chartConfig = {
    totalParticipants: {
      label: 'Total Partisipan',
      color: 'hsl(var(--chart-1))'
    }
  }
  return (
    <Card>
      <CardHeader className={'flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'}>
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className={'aspect-auto h-[280px] w-full'}>
          <LineChart
            accessibilityLayer
            data={participantStatistics}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="totalParticipants"
                />
              }
            />
            <Line dataKey={'totalParticipants'} fill="var(--color-desktop)" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
