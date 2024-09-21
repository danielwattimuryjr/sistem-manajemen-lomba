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
import Breadcrumbs from "@/Components/breadcrumbs"
import { DatePicker } from "@/Components/datePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { format } from "date-fns"

const UserForm = ({ initialData, levels }) => {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Peserta",
      link: route("dashboard.users.index"),
    },
    { title: initialData ? "Update Data" : "Tambah Data" },
  ]

  const isEditing = !!initialData
  const title = isEditing ? "Edit Peserta" : "Tambah Peserta"
  const description = isEditing ? "Update data peserta" : "Tambah data peserta"
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
      ? put(route("dashboard.users.update", initialData), { onSuccess })
      : post(route("dashboard.users.store"), { onSuccess })
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
      date_of_birth: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
    }))
  }

  console.log(errors)

  return (
    <AdminLayout>
      <PageContainer scrollable={true}>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <Heading title={title} description={description} />

          <Separator />

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="gap-8 md:grid md:grid-cols-3">
              <div>
                <Label htmlFor="email" className="capitalize">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  autoFocus
                  onChange={e => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="username" className="capitalize">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={data.username}
                  autoFocus
                  onChange={e => setData("username", e.target.value)}
                />
                <InputError message={errors.username} className="mt-2" />
              </div>

              {!initialData && (
                <div>
                  <Label htmlFor="password" className="capitalize">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoFocus
                    onChange={e => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>
              )}
            </div>

            <Separator />

            <div className="gap-8 md:grid md:grid-cols-3">
              <div>
                <Label htmlFor="name" className="capitalize">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  value={data.name}
                  autoFocus
                  onChange={e => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="nik" className="capitalize">
                  NIK (No. Induk Kependudukan)
                </Label>
                <Input
                  id="nik"
                  maxLength={16}
                  type="text"
                  name="nik"
                  value={data.nik}
                  autoFocus
                  onChange={e => setData("nik", e.target.value)}
                />
                <InputError message={errors.nik} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="capitalize">
                  Nomor Telepon
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  maxLength={10}
                  value={data.phone_number}
                  autoFocus
                  onChange={e => setData("phone_number", e.target.value)}
                />
                <InputError message={errors.phone_number} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="date_of_birth" className="capitalize">
                  Tanggal Lahir
                </Label>
                <DatePicker
                  placeholder={"Pilih tanggal lahir"}
                  selectedDate={data.date_of_birth}
                  onChange={handleDateChange}
                />
                <InputError message={errors.date_of_birth} className="mt-2" />
              </div>

              <div>
                <Label htmlFor="role" className="capitalize">
                  Role
                </Label>

                <Select
                  onValueChange={e => handleRoleChange(e)}
                  defaultValue={data.role}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin (Juri)</SelectItem>
                    <SelectItem value="guest">Guest (Peserta)</SelectItem>
                  </SelectContent>
                </Select>

                <InputError message={errors.role} className="mt-2" />
              </div>
              {data.role === "guest" && (
                <div>
                  <Label htmlFor="level_id" className="capitalize">
                    Tingkatan Peserta
                  </Label>

                  <Select
                    onValueChange={e => setData("level_id", `${e}`)}
                    defaultValue={`${data.level_id}`}
                  >
                    <SelectTrigger disabled={!(levels.data.length > 0)}>
                      <SelectValue
                        placeholder={
                          levels?.data
                            ? "Pilih Tingkatan Peserta"
                            : "Tingkat Peserta Kosong"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.data.map((level, i) => (
                        <SelectItem value={`${level.id}`} key={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <InputError message={errors.level_id} className="mt-2" />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="level_id" className="capitalize">
                Alamat
              </Label>

              <Textarea
                onChange={e => setData("address", e.target.value)}
                value={data.address}
              />

              <InputError message={errors.address} className="mt-2" />
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

export default UserForm
