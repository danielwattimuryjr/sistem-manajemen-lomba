import Heading from "@/Components/heading.jsx"
import { usePage } from "@inertiajs/react"
import { Separator } from "@/Components/ui/separator.jsx"
import { useFilter } from "@/hooks/useFilter.js"
import UserCompetitionTable from "@/Components/user-competition-table/index.jsx"
import { useState } from "react"

export default function UserCompetition() {
  const { auth, userCompetitions, state } = usePage().props
  const [params, setParams] = useState(state)
  useFilter({
    route: route("welcome"),
    values: params,
    only: ["userCompetitions"],
  })

  const user = auth?.user

  if (!user) return

  const competitions = userCompetitions?.data

  return (
    <>
      <Separator />
      <Heading title={"Perlombaan Yang Kamu Ikuti"} />

      <UserCompetitionTable
        competitions={competitions}
        params={params}
        setParams={setParams}
      />
    </>
  )
}
