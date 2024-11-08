import Heading from "@/Components/heading"
import Header from "@/Components/layout/header"
import ParticipantTable from "@/Components/participant-table/participant-table"
import { Card } from "@/Components/ui/card"
import React from "react"

const CompetitionParticipantsTable = ({
  participants,
  isAdmin,
  params,
  setParams,
}) => {
  return (
    <>
      <Heading title={"Faktor Penilaian"} />

      <ParticipantTable
        isAdmin={isAdmin}
        params={params}
        participants={participants}
        setParams={setParams}
      />
    </>
  )
}

export default CompetitionParticipantsTable
