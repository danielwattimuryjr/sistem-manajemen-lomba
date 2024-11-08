import PageContainer from "@/Components/layout/page-container"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { useFilter } from "@/hooks/useFilter"
import AppLayout from "@/Layouts/app-layout"
import { Link } from "@inertiajs/react"
import { useState } from "react"

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
      <header className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground">
          Daftar Perlombaan
        </h2>
      </header>

      <div className="mx-auto w-full md:w-96">
        <Input
          type="text"
          placeholder="Cari Perlombaan"
          onChange={e =>
            setParams(prev => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {competitions.map((competition, idx) => (
          <Link href={route("guest.competitions.show", competition)}>
            <Card
              key={competition.slug}
              className="duration-200 hover:scale-105"
            >
              <CardHeader>
                <CardTitle>{competition.name}</CardTitle>
                <CardDescription>{`${competition.startDate} - ${competition.endDate}`}</CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <p className="text-xs italic text-muted-foreground md:text-sm">
                    Klik untuk melihat info lebih lanjut
                  </p>

                  <p>Peserta: {competition.participantsCount}</p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  )
}

export default GuestCompetitionIndex
