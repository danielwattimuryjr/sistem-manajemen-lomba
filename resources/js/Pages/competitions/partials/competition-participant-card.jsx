import Index from "@/Components/participant-table/index.jsx"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import React from "react"

const CompetitionParticipantCard = ({
  competition,
  participants,
  params,
  setParams,
}) => {
  return (
    <Card>
      <CardHeader>Peserta Lomba</CardHeader>
      <CardContent>
        <Index
          competition={competition}
          params={params}
          participants={participants}
          setParams={setParams}
        />
      </CardContent>
    </Card>
  )
}

export default CompetitionParticipantCard
