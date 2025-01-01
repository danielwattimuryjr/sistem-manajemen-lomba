import { Input } from "@/Components/ui/input"
import { useFilter } from "@/hooks/useFilter"
import AppLayout from "@/Layouts/app-layout"
import { Link } from "@inertiajs/react"
import { useState } from "react"
import CompetitionCard from "@/Components/competition-card.jsx"

const GuestCompetitionIndex = props => {
  const [params, setParams] = useState(props.state)
  const { data: competitions } = props.competitions

  useFilter({
    route: route("guest.competitions.index"),
    values: params,
    only: ["competitions"],
  })

  return (
    <AppLayout title={"Perlombaan"}>
      <h2 className="text-3xl font-bold tracking-tight text-center md:text-start">Daftar Perlombaan</h2>


      <div className="mx-auto w-full md:w-96">
        <Input
          type="text"
          placeholder="Cari Perlombaan"
          onChange={e =>
            setParams(prev => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      <div className="mt-10">
        {competitions.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {competitions.map(competition => (
              <Link
                href={route("guest.competitions.show", competition)}
                key={competition.slug}
              >
                <CompetitionCard
                  competition={competition}
                  withParticipantCount
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="animate-pulse text-center text-base font-semibold text-destructive">
            Belum Ada
          </p>
        )}
      </div>
    </AppLayout>
  )
}

export default GuestCompetitionIndex
