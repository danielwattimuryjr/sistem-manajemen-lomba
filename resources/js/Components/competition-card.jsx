import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card.jsx"

export default function CompetitionCard({
  competition,
  withParticipantCount = false,
  withCompetitionStatus = false,
}) {
  return (
    <Card key={competition.slug} className="duration-300 hover:scale-105">
      <CardHeader
        className={
          "flex flex-col items-start justify-start gap-2 md:flex-row md:items-center md:justify-between"
        }
      >
        <div className={"space-y-2"}>
          <CardTitle>{competition.name}</CardTitle>
          <CardDescription>{`${competition.startDate} - ${competition.endDate}`}</CardDescription>
        </div>

        {withCompetitionStatus && (
          <div className={"space-y-2"}>
            <p>{competition.status}</p>
          </div>
        )}
      </CardHeader>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <p className="text-xs italic text-muted-foreground md:text-sm">
            Klik untuk melihat info lebih lanjut
          </p>

          {withParticipantCount && (
            <p>Peserta: {competition.participantsCount}</p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
