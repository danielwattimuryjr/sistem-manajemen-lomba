import AdminLayout from "@/Layouts/admin-layout.jsx"
import PageContainer from "@/Components/layout/page-container.jsx"
import UserCompetitionHeader from "@/pages/my-competitions/partials/heading.jsx"
import { Separator } from "@/Components/ui/separator.jsx"
import UserCompetitionTable from "@/Components/user-competition-table/index.jsx"
import { usePage } from "@inertiajs/react"
import { useState } from "react"
import { useFilter } from "@/hooks/useFilter.js"

export default function UserComepetition() {
  const { auth, userCompetitions, state } = usePage().props
  const [params, setParams] = useState(state)
  useFilter({
    route: route("my-competitions"),
    values: params,
    only: ["userCompetitions"],
  })

  const user = auth?.user

  if (!user) return

  const competitions = userCompetitions?.data
  return (
    <AdminLayout>
      <PageContainer>
        <UserCompetitionHeader />
        <Separator />
        <UserCompetitionTable
          competitions={competitions}
          params={params}
          setParams={setParams}
        />
      </PageContainer>
    </AdminLayout>
  )
}
