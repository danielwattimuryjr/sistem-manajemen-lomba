import React from "react"
import { useForm } from "@inertiajs/react"
import PageContainer from "@/Components/layout/page-container"
import LoadingButton from "@/Components/loading-button"
import { Separator } from "@/Components/ui/separator"
import { toast } from "@/hooks/use-toast"
import AdminLayout from "@/Layouts/admin-layout"
import { getTimeStamp } from "@/lib/getTimeStamp"
import FormField from "@/Components/form-field"
import UserFormHeader from "@/pages/admin/users/user-form/partials/header.jsx"

const UserForm = ({ initialData, levels }) => {
  const isEditing = !!initialData
  const toastMessage = isEditing
    ? "Peserta berhasil diperbaharui"
    : "Peserta berhasil ditambahkan"
  const action = isEditing ? "Simpan Perubahan" : "Tambah Data"

  const { data, setData, post, put, processing, errors } = useForm({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    username: initialData?.username || "",
    role: initialData?.role || "",
    phone_number: initialData?.phone_number || "",
    address: initialData?.address || "",
    nik: initialData?.nik || "",
    date_of_birth: initialData?.date_of_birth || undefined,
    level_id: initialData?.level_id || undefined,
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
      ? put(route("dashboard.superadmin.users.update", initialData), {
          onSuccess,
        })
      : post(route("dashboard.superadmin.users.store"), { onSuccess })
  }

  const handleRoleChange = selectedRole => {
    if (selectedRole === "admin") {
      setData(data => ({
        ...data,
        role: selectedRole,
        level_id: undefined,
      }))
    } else {
      setData("role", selectedRole)
    }
  }

  const handleDateChange = selectedDate => {
    setData(data => ({
      ...data,
      date_of_birth: selectedDate ?? null,
    }))
  }

  const roleOptions = [
    {
      id: "admin",
      label: "Admin (Juri)",
    },
    {
      id: "guest",
      label: "Guest (Peserta)",
    },
  ]

  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <UserFormHeader isEditing={isEditing} />
        <Separator />
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField.Input
              label={"E- mail"}
              value={data.email}
              onChange={e => setData("email", e.target.value)}
              error={errors.email}
              type="email"
              autoFocus
            />

            <FormField.Input
              label={"username"}
              value={data.username}
              onChange={e => setData("username", e.target.value)}
              error={errors.username}
            />

            {!initialData && (
              <FormField.Input
                label={"Password"}
                value={data.password}
                onChange={e => setData("password", e.target.value)}
                error={errors.password}
                type="password"
              />
            )}
          </div>

          <Separator />

          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField.Input
              label={"Nama lengkap"}
              value={data.name}
              onChange={e => setData("name", e.target.value)}
              error={errors.name}
            />
            <FormField.Input
              label={"Nomor Induk Kependudukan (NIK)"}
              value={data.nik}
              onChange={e => setData("nik", e.target.value)}
              error={errors.nik}
              maxLength={16}
            />
            <FormField.Input
              label={"Nomor Telepon"}
              value={data.phone_number}
              onChange={e => setData("phone_number", e.target.value)}
              error={errors.phone_number}
              maxLength={10}
            />
            <FormField.Date
              label={"Tanggal Lahir"}
              value={data.date_of_birth}
              onChange={handleDateChange}
              error={errors.date_of_birth}
              placeholder="Pilih tanggal lahir"
            />

            <FormField.SelectOption
              label={"role"}
              value={data.role}
              onChange={e => handleRoleChange(e)}
              error={errors.role}
              placeholder={"Pilih Jenis Pengguna"}
              options={roleOptions}
            />

            {data.role === "guest" && (
              <FormField.SelectOption
                label={"Tingkatan Peserta"}
                value={data.level_id}
                onChange={e => setData("level_id", e)}
                error={errors.level_id}
                placeholder={"Pilih Tingkat Peserta"}
                options={levels.data.map(level => ({
                  id: level.id,
                  label: level.name,
                }))}
              />
            )}

            <FormField.Textarea
              label={"Alamat"}
              value={data.address}
              onChange={e => setData("address", e.target.value)}
              error={errors.address}
            />
          </div>

          <LoadingButton
            label={action}
            loading={processing}
            disabled={processing}
          />
        </form>
      </PageContainer>
    </AdminLayout>
  )
}

export default UserForm
