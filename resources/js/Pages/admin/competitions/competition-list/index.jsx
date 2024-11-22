import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/admin-layout"
import PageContainer from "@/Components/layout/page-container"
import { Separator } from "@/Components/ui/separator"
import CompetitionTable from "@/Components/competition-table/competition-table"
import CompetitionListHeader from "./partials/header"

const CompetitionIndex = props => {
  const [params, setParams] = useState(props.state)

  const user = props.auth.user?.data
  const isSuperadmin = user?.role === "superadmin"

  const { data: competitions, meta, links } = props.competitions

  useFilter({
    route: isSuperadmin
      ? route("dashboard.superadmin.competitions.index")
      : route("dashboard.admin.competitions.index"),
    values: params,
    only: ["competitions"],
  })

  const handleSort = newField => {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <CompetitionListHeader isSuperadmin={isSuperadmin}/>
          <Separator />
          <CompetitionTable
            competitions={competitions}
            meta={meta}
            links={links}
            params={params}
            setParams={setParams}
            handleSort={handleSort}
          />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}

export default CompetitionIndex
