import AdminLayout from "@/Layouts/admin-layout"
import PageContainer from "@/Components/layout/page-container"
import { Separator } from "@/Components/ui/separator"
import CompetitionDetailHeader from "@/pages/superadmin/competitions/show-competition-details/partials/header.jsx"
import CompetitionDetailInfo from "@/pages/superadmin/competitions/show-competition-details/partials/competition-info.jsx"
import CompetitionDetailCriteriaTable from "@/pages/superadmin/competitions/show-competition-details/partials/criteria-table.jsx"
import CompetitionDetailParticipants from "@/pages/superadmin/competitions/show-competition-details/partials/participants.jsx"

const CompetitionShow = props => {
  const { data: competition } = props.competition
  const user = props.auth.user?.data
  const isSuperadmin = user?.role === "superadmin"

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <CompetitionDetailHeader
          competition={competition}
          isSuperadmin={isSuperadmin}
        />
        <Separator />
        <CompetitionDetailInfo competition={competition} />
        <Separator />
        <CompetitionDetailCriteriaTable criterias={competition.criterias} />
        <Separator />
        <CompetitionDetailParticipants
          competition={competition}
          isSuperadmin={isSuperadmin}
        />
      </PageContainer>
    </AdminLayout>
  )
}

export default CompetitionShow
