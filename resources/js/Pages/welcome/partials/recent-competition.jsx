import Heading from "@/Components/heading.jsx"
import { Link, usePage } from "@inertiajs/react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card.jsx"
import { buttonVariants } from "@/Components/ui/button.jsx"
import CompetitionCard from "@/Components/competition-card.jsx"

export default function RecentCompetition() {
  const {  competitions} = usePage().props

  return (
    <>
      <Heading title={"Perlombaan Terbaru"} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {competitions.data.map((competition, idx) => (
          <Link
            href={route("guest.competitions.show", competition)}
            key={competition.slug}
          >
            <CompetitionCard competition={competition} withParticipantCount />
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          className={buttonVariants({
            variant: "link",
          })}
          href={route("guest.competitions.index")}
        >
          See More
        </Link>
      </div>
    </>
  )
}
