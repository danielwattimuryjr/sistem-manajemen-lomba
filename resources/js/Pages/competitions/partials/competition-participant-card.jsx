import ParticipantTable from "@/Components/participant-table/participant-table"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import { IconPlus } from "@tabler/icons-react"
import React from "react"

const CompetitionParticipantCard = ({
  participants,
  isAdmin,
  params,
  setParams,
}) => {
  return (
    <Card>
      <CardHeader>Peserta Lomba</CardHeader>
      <CardContent>
        <ParticipantTable
          isAdmin={isAdmin}
          params={params}
          participants={participants}
          setParams={setParams}
        />
      </CardContent>
    </Card>
  )
}

export default CompetitionParticipantCard
