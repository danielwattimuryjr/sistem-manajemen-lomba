import LoadingButton from "@/Components/loading-button"
import AppLayout from "@/Layouts/app-layout"
import React, { useState } from "react"
import CompetitionInfoCard from "./partials/competition-info-card"
import CompetitionCriteriasCard from "./partials/competition-criterias-card"
import CompetitionParticipantCard from "./partials/competition-participant-card"
import { useForm } from "@inertiajs/react"
import { useFilter } from "@/hooks/useFilter"
import { toast } from "@/hooks/use-toast"
import { getTimeStamp } from "@/lib/getTimeStamp"

const GuestCompetitionShow = props => {
  const { post, processing } = useForm()
  const [params, setParams] = useState(props.state)

  const { data: competition } = props.competition
  const { data: participants } = props.participants
  const user = props.auth.user

  useFilter({
    route: route("guest.competitions.show", competition),
    values: params,
    only: ["participants"],
  })

  const handleParamsChange = newParams => {
    setParams(newParams)
  }

  const handleParticipationRequest = e => {
    e.preventDefault()

    post(route("guest.competitions.participate", competition), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: "Pendaftaran berhasil!",
          description: getTimeStamp(),
        })
      },
    })
  }

  return (
    <AppLayout title={`${competition.name}`}>
      <header className="flex flex-col items-center justify-around gap-y-4 md:flex-row md:justify-between">
        <h2 className="text-3xl font-bold">{competition.name}</h2>

        {user && (
          <form onSubmit={handleParticipationRequest}>
            <LoadingButton
              label={"Daftar"}
              loading={processing}
              disabled={
                processing ||
                !competition.isActive ||
                competition.hasFinalScores
              }
            />
          </form>
        )}
      </header>

      <CompetitionInfoCard competition={competition} />

      <CompetitionCriteriasCard criterias={competition.criterias} />

      <CompetitionParticipantCard
        competition={competition}
        participants={participants}
        params={params}
        setParams={handleParamsChange}
      />
    </AppLayout>
  )
}

export default GuestCompetitionShow
