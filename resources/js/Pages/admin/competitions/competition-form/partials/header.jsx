import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"

export default function CompetitionFormHeader({ isEditing }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Perlombaan",
      link: route("dashboard.admin.competitions.index"),
    },
    { title: isEditing ? "Update Data" : "Tambah Data" },
  ]
  const title = isEditing ? "Edit perlombaan" : "Tambah perlombaan"
  const description = isEditing
    ? "Update data perlombaan"
    : "Tambah data perlombaan"

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading title={title} description={description} />
    </>
  )
}
