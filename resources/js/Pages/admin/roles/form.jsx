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
import AdminLayout from "@/Layouts/adminLayout"
import { getTimeStamp } from "@/lib/getTimeStamp"

const RoleForm = ({ initialData }) => {
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
    name: initialData?.name || "",
    display_name: initialData?.display_name || "",
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
      ? put(route("dashboard.roles.update", initialData.id), { onSuccess })
      : post(route("dashboard.roles.store"), { onSuccess })
  }

  const handleDisplayNameChange = e => {
    const newDisplayName = e.target.value
    setData(prevData => ({
      ...prevData,
      display_name: newDisplayName,
      name: slugify(newDisplayName, {
        replacement: "_",
        lower: true,
      }),
    }))
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <Heading title={title} description={description} />
          <Separator />
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="gap-8 md:grid md:grid-cols-3">
              <div>
                <Label htmlFor="display_name" className="capitalize">
                  Display Name
                </Label>
                <Input
                  id="display_name"
                  type="text"
                  name="display_name"
                  value={data.display_name}
                  autoFocus
                  onChange={handleDisplayNameChange}
                />
                <InputError message={errors.display_name} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="name" className="capitalize">
                  Name
                </Label>
                <Input
                  disabled
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
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
