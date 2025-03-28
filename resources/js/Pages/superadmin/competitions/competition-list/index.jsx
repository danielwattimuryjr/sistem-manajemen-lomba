import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/admin-layout"
import PageContainer from "@/Components/layout/page-container"
import { Separator } from "@/Components/ui/separator"
import Index from "@/Components/competition-table/index.jsx"
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
        <CompetitionListHeader isSuperadmin={isSuperadmin} />
        <Separator />
        <Index
          competitions={competitions}
          meta={meta}
          links={links}
          params={params}
          setParams={setParams}
          handleSort={handleSort}
        />
      </PageContainer>
    </AdminLayout>
  )
}

export default CompetitionIndex
