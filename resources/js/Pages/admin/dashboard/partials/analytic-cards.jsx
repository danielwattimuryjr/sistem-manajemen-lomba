import OverviewCard from "@/Components/overview-card.jsx"
import { usePage } from "@inertiajs/react"

export default function AnalyticCards() {
  const {
    totalParticipants,
    participantGrowth,
    newParticipantsThisWeek,
    averageDailyRegistrations,
    activeCompetitions,
    activePercentage,
    completedCompetitions,
    completedThisMonth
  } = usePage().props

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard
        title={"Total Peserta"}
        subTitle={`${participantGrowth > 0 ? "+" : ""}${participantGrowth}% from last month`}
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
  )
}
