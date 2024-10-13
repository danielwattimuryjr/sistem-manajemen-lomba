import React from "react"
import { useForm } from "@inertiajs/react"
import slugify from "slugify"
import Heading from "@/Components/heading"
import InputError from "@/Components/inputError"
import PageContainer from "@/Components/layout/pageContainer"
import LoadingButton from "@/Components/loadingButton"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { toast } from "@/hooks/use-toast"
import AdminLayout from "@/Layouts/admin-layout"
import { getTimeStamp } from "@/lib/getTimeStamp"
import Breadcrumbs from "@/Components/breadcrumbs"
import FormField from "@/Components/formField"
import { trans } from "@/lib/utils"

const RoleForm = ({ initialData }) => {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Tingkat Peserta",
      link: route("dashboard.levels.index"),
    },
    { title: initialData ? "Update Data" : "Tambah Data" },
  ]

  const isEditing = !!initialData
  const title = isEditing
    ? "Edit Tingkatan Peserta"
    : "Tambah Tingkatan Peserta"
  const description = isEditing
    ? "Update data tingkatan peserta"
    : "Tambah data tingkatan peserta"
  const toastMessage = isEditing
    ? "Tingkatan peserta berhasil diperbaharui"
    : "Tingkatan peserta berhasil ditambahkan"
  const action = isEditing ? "Simpan Perubahan" : "Tambah Data"

  const { data, setData, post, put, processing, errors } = useForm({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
  })

  const handleSubmit = e => {
    e.preventDefault()

    const onSuccess = () => {
      toast({
        title: toastMessage,
        description: getTimeStamp(),
      })
    }

    isEditing
      ? put(route("dashboard.levels.update", initialData), { onSuccess })
      : post(route("dashboard.levels.store"), { onSuccess })
  }

  const handleDisplayNameChange = e => {
    const newName = e.target.value
    setData(prevData => ({
      ...prevData,
      name: newName,
      slug: trans(newName),
    }))
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <Heading title={title} description={description} />

          <Separator />

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="gap-8 md:grid md:grid-cols-3">
              <FormField.Input
                label={"name"}
                value={data.name}
                onChange={handleDisplayNameChange}
                error={errors.name}
                type="text"
                autoFocus
              />

              <FormField.Input
                label={"Slug (Identifier)"}
                value={data.slug}
                error={errors.slug}
                type="text"
                autoFocus
                disabled
              />
            </div>
            <LoadingButton
              label={action}
              loading={processing}
              disabled={processing}
            />
          </form>
        </div>
      </PageContainer>
    </AdminLayout>
  )
}

export default RoleForm
