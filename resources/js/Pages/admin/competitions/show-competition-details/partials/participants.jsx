import Heading from "@/Components/heading.jsx"
import React, { useState } from "react"
import ParticipantTable from "@/Components/participant-table/participant-table.jsx"
import { useFilter } from "@/hooks/useFilter.js"
import { usePage } from "@inertiajs/react"

export default function CompetitionDetailParticipants({
  parameters,
  particpants,
  competition,
  isSuperadmin
}) {
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

      <ParticipantTable
        competition={competition}
        params={params}
        participants={particpants}
        setParams={handleParamsChange}
      />
    </>
  )
}
