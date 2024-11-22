import PageContainer from "@/Components/layout/page-container"
import AdminLayout from "@/Layouts/admin-layout"
import React from "react"
import ScoreEntryHeader from "./partials/header"
import ScoreEntryParticipantInfo from "./partials/participant-info"
import { Separator } from "@/Components/ui/separator"
import ScoreEntryForm from "@/pages/admin/competitions/score-entry/partials/form.jsx"

export default function ScoreEntry({ data }) {
  const { competition, criterias, participant } = data.data
  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <ScoreEntryHeader competition={competition} />

          <Separator />

          <ScoreEntryParticipantInfo participant={participant} />

          <Separator />

          {/* Penilaian */}
          <ScoreEntryForm criterias={criterias} competition={competition} participant={participant} />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
