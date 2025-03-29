import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import React from "react"

export default function LevelFormHeader({ isEditing }) {
  const title = isEditing
    ? "Edit Tingkatan Peserta"
    : "Tambah Tingkatan Peserta"
  const description = isEditing
    ? "Update data tingkatan peserta"
    : "Tambah data tingkatan peserta"
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Tingkat Peserta",
      link: route("dashboard.superadmin.levels.index"),
    },
    { title: isEditing ? "Update Data" : "Tambah Data" },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Heading title={title} description={description} />
    </>
  )
}
