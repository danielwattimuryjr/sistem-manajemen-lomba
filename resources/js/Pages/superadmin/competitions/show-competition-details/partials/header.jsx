import Heading from "@/Components/heading.jsx"
import CompetitionDetailActionGroup from "@/pages/superadmin/competitions/show-competition-details/partials/action-group.jsx"
import Breadcrumbs from "@/Components/breadcrumbs.jsx"

export default function CompetitionDetailHeader({ competition, isSuperadmin }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: isSuperadmin ? "Manajemen Perlombaan" : "Perlombaan",
      link: isSuperadmin
        ? route("dashboard.superadmin.competitions.index")
        : route("dashboard.admin.competitions.index"),
    },
    { title: competition.name },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <header className="flex flex-col items-start justify-around gap-y-4 md:flex-row md:items-center md:justify-between">
        <Heading
          title={competition.name}
          description={
            competition.hasFinalScores ? "Perlombaan ini sudah dinilai" : ""
          }
        />
        {isSuperadmin && (
          <CompetitionDetailActionGroup competition={competition} />
        )}
      </header>
    </>
  )
}
