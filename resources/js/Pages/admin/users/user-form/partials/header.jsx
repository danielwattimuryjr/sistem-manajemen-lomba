import Breadcrumbs from "@/Components/breadcrumbs.jsx"
import Heading from "@/Components/heading.jsx"
import React from "react"

export default function UserFormHeader({ isEditing }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Peserta",
      link: route("dashboard.superadmin.users.index"),
    },
    { title: isEditing ? "Update Data" : "Tambah Data" },
  ]

  const title = isEditing ? "Edit Peserta" : "Tambah Peserta"
  const description = isEditing ? "Update data peserta" : "Tambah data peserta"

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <Heading title={title} description={description} />
    </>
  )
}
