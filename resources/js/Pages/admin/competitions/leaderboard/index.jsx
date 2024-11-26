import AdminLayout from "@/Layouts/admin-layout.jsx"
import PageContainer from "@/Components/layout/page-container.jsx"
import { Separator } from "@/Components/ui/separator.jsx"
import LeaderboardHeader from "@/pages/admin/competitions/leaderboard/partials/header.jsx"
import LeaderboardTable from "@/pages/admin/competitions/leaderboard/partials/leaderboard-table.jsx"

export default function LeaderboardPage(props) {
  const {data: competition} = props.competition

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-8">
          <LeaderboardHeader competition={competition} />
          <Separator />
          <LeaderboardTable finalScores={props.finalScores}/>
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
