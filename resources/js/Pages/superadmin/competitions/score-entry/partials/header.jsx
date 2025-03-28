import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import React from "react"

export default function ScoreEntryHeader({ competition }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Perlombaan",
      link: route("dashboard.superadmin.competitions.index"),
    },
    {
      title: competition.name,
      link: route("dashboard.superadmin.competitions.show", competition.slug),
    },
    { title: "Form Penilaian" },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading title={competition.name} />
    </>
  )
}
