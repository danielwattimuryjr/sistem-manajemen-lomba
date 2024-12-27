import AdminLayout from "@/Layouts/admin-layout.jsx"
import PageContainer from "@/Components/layout/page-container.jsx"
import AnalyticCards from "@/Pages/admin/dashboard/partials/analytic-cards.jsx"
import YearlyParticipantChart from "@/Pages/admin/dashboard/partials/yearly-participants-chart.jsx"

export default function Dashboard() {
  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="tracking-light text-2xl font-bold">
            Hi, Welcome back 👋
          </h2>
        </div>

        <AnalyticCards />

        <YearlyParticipantChart />
      </PageContainer>
    </AdminLayout>
  )
}
