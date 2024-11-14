import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/admin-layout"
import PageContainer from "@/Components/layout/page-container"
import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import { Separator } from "@/Components/ui/separator"
import CompetitionActionGroup from "./partials/competition-action-group"
import CompetitionInfo from "./partials/competition-info"
import CompetitionCriteria from "./partials/competition-criteria"
import CompetitionParticipantsTable from "./partials/competition-participants-table"

const CompetitionIndex = props => {
  const { data: competition } = props.competition
  const { data: participants } = props.participants

  const [params, setParams] = useState(props.state)
  const user = props.auth.user?.data
  const isSuperadmin = !!user?.role === "superadmin"

  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: isSuperadmin ? "Manajemen Perlombaan" : "Perlombaan",
      link: isSuperadmin
        ? route("dashboard.superadmin.competitions.index")
        : route("dashboard.admin.competitions.index"),
    },
    { title: competition.name },
  ]

  useFilter({
    route: isSuperadmin
      ? route("dashboard.superadmin.competitions.show", competition)
      : route("dashboard.admin.competitions.show", competition),
    values: params,
    only: ["participants"],
  })

  const handleParamsChange = newParams => {
    setParams(newParams)
  }

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-8">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="flex flex-col items-center justify-around gap-y-4 md:flex-row md:justify-between">
            <Heading title={competition.name} />
            {isSuperadmin && (
              <CompetitionActionGroup competition={competition} />
            )}
          </header>

          <Separator />

          <CompetitionInfo competition={competition} />

          <Separator />

          <CompetitionCriteria criterias={competition.criterias} />

          <Separator />

          <CompetitionParticipantsTable
            participants={participants}
            params={params}
            setParams={handleParamsChange}
          />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}

export default CompetitionIndex
