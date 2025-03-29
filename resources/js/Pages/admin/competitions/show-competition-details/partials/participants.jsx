import Heading from "@/Components/heading.jsx"
import React, { useState } from "react"
import Index from "@/Components/participant-table/index.jsx"
import { useFilter } from "@/hooks/useFilter.js"
import { usePage } from "@inertiajs/react"

export default function CompetitionDetailParticipants({
  competition,
  isSuperadmin,
}) {
  const { participants, params: parameters } = usePage().props

  const [params, setParams] = useState(parameters)
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
    <>
      <Heading title={"Daftar Peserta"} />

      <Index
        competition={competition}
        params={params}
        participants={participants.data}
        setParams={handleParamsChange}
      />
    </>
  )
}
