import Breadcrumbs from "@/Components/breadcrumbs.jsx"
import Heading from "@/Components/heading.jsx"

export default function LeaderboardHeader({ competition }) {
  const breadcrumbItems = [
    {
      title: "Dashboard",
      link: route("dashboard.home"),
    },
    {
      title: "Manajemen Perlombaan",
      link: route("dashboard.superadmin.competitions.index"),
    },
    {
      title: competition.name,
      link: route("dashboard.superadmin.competitions.show", competition),
    },
    {
      title: "Hasil Akhir",
    },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading title={'Hasil Akhir'} description={'Lihat hasil perolehan nilai akhir pada tabel di bawah ini.'}/>
    </>
  )
}
