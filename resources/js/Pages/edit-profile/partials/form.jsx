import { useForm, usePage } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"
import FormField from "@/Components/form-field.jsx"
import React from "react"
import LoadingButton from "@/Components/loading-button.jsx"

export default function EditProfileForm() {
  const user = usePage().props.auth?.user?.data
  const { data, setData, patch, processing, errors } = useForm({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    phone_number: user?.phoneNumber || "",
    address: user?.address || "",
    nik: user?.nik || "",
    date_of_birth: user?.dateOfBirth || undefined,
  })

  function handleSubmit(e) {
    e.preventDefault()

    patch(
      route('profiles.update'),
      {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            title: 'Profile berhasil diperbaharui',
            description: getTimeStamp()
          })
        }
      }
    )
  }

  return <form onSubmit={handleSubmit} className="w-full space-y-8">
    <div className="gap-8 md:grid md:grid-cols-3">
      <FormField.Input
        label={"Nama"}
        value={data.name}
        onChange={e => setData("name", e.target.value)}
        error={errors.name}
        autoFocus
      />

      <FormField.Input
        label={"E- mail"}
        value={data.email}
        onChange={e => setData("email", e.target.value)}
        error={errors.email}
        type="email"
      />

      <FormField.Date
        label={"Tanggal Lahir"}
        value={data.date_of_birth}
        onChange={(e) => setData('date_of_birth', e)}
        error={errors.date_of_birth}
        placeholder="Pilih tanggal lahir"
      />

      <FormField.Input
        label={"username"}
        value={data.username}
        onChange={e => setData("username", e.target.value)}
        error={errors.username}
      />

      <FormField.Textarea
        label={"Alamat"}
        value={data.address}
        onChange={e => setData("address", e.target.value)}
        error={errors.address}
      />

      <FormField.Input
        label={"Nomor Telepon"}
        value={data.phone_number}
        onChange={e => setData("phone_number", e.target.value)}
        error={errors.phone_number}
        maxLength={10}
      />

      <FormField.Input
        label={"Nomor Induk Kependudukan (NIK)"}
        value={data.nik}
        onChange={e => setData("nik", e.target.value)}
        error={errors.nik}
        maxLength={16}
      />
    </div>

    <LoadingButton
      label={'Update'}
      loading={processing}
      disabled={processing}
    />
  </form>
}
