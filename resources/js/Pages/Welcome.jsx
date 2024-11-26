import Heading from "@/Components/heading"
import PageContainer from "@/Components/layout/page-container"
import { buttonVariants } from "@/Components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Separator } from "@/Components/ui/separator"
import AppLayout from "@/Layouts/app-layout"
import { Link, usePage } from "@inertiajs/react"

const Home = ({ competitions }) => {
  const { auth } = usePage().props
  const user = auth.user

  return (
    <AppLayout title={"Home"}>
      <header className="text-center">
        <h2 className="text-3xl font-bold text-primary-foreground">
          {user ? `Hello, ${user.data.username}!` : `Selamat Datang!`}
        </h2>
      </header>

      <Heading title={"Perlombaan Terbaru"} />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {competitions.data.map((competition, idx) => (
          <Link
            href={route("guest.competitions.show", competition)}
            key={competition.slug}
          >
            <Card
              key={competition.slug}
              className="duration-300 hover:scale-105"
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

      {user && (
        <>
          <Separator />

          <Heading title={"Perlombaan Yang Kamu Ikuti"} />
        </>
      )}
    </AppLayout>
  )
}

export default Home
