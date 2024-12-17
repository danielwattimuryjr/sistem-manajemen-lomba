import AdminLayout from "@/Layouts/admin-layout"
import PageContainer from "@/Components/layout/page-container"
import { Separator } from "@/Components/ui/separator.jsx"
import OverviewCard from "@/Components/overview-card.jsx"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart.jsx"

const Dashboard = props => {
  const {
    totalParticipants,
    participantGrowth,
    activeCompetitions,
    activePercentage,
    averageDailyRegistrations,
    newParticipantsThisWeek,
    completedThisMonth,
    completedCompetitions,
    participantStatistics,
  } = props

  const chartConfig = {
    month: {
      label: "Bulan",
    },
    totalParticipants: {
      label: "Total Partisipan",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <h2 className="tracking-light text-2xl font-bold">
          Hi, Welcome back 👋
        </h2>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Peserta"
            subTitle={`${participantGrowth > 0 ? "+" : ""}${participantGrowth}% dari bulan lalu`}
          >
            {totalParticipants}
          </OverviewCard>

          <OverviewCard
            title="Peserta Baru"
            subTitle={`Rata-rata ${averageDailyRegistrations}/hari`}
          >
            {newParticipantsThisWeek}
          </OverviewCard>

          <OverviewCard
            title="Kompetisi Aktif"
            subTitle={`${activePercentage}% dari total kompetisi`}
          >
            {activeCompetitions}
          </OverviewCard>

          <OverviewCard
            title="Kompetisi Selesai"
            subTitle={`${completedThisMonth} bulan ini`}
          >
            {completedCompetitions}
          </OverviewCard>
        </div>
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Grafik Pertumbuhan Peserta</CardTitle>
              <CardDescription>
                Menampilkan total pendaftar bulanan sepanjang tahun ini
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[280px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={participantStatistics}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={8}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Line
                  dataKey="totalParticipants"
                  fill="var(--color-totalParticipants)"
                  radius={4}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </PageContainer>
    </AdminLayout>
  )
}

export default Dashboard
