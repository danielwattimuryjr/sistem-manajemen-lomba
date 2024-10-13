import { DatePicker } from "@/Components/datePicker"
import FormField from "@/Components/formField"
import LoadingButton from "@/Components/loadingButton"
import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Textarea } from "@/Components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import AuthLayout from "@/Layouts/auth-layout"
import { getTimeStamp } from "@/lib/getTimeStamp"
import { Link, useForm } from "@inertiajs/react"

const SignUp = ({ levels }) => {
  const { data, setData, post, errors, processing, reset } = useForm({
    name: "",
    email: "",
    password: "",
    username: "",
    password_confirmation: "",
    phone_number: "",
    address: "",
    level_id: "",
    nik: "",
    date_of_birth: null,
  })

  const submit = e => {
    e.preventDefault()

    post(route("register"), {
      preserveScroll: true,
      onFinish: () => reset("password", "password_confirmation"),
      onSuccess: () => {
        toast({
          title: "Berhasil Register",
          description: getTimeStamp(),
        })
      },
    })
  }

  const handleDateChange = selectedDate => {
    setData(data => ({
      ...data,
      date_of_birth: selectedDate ?? null,
    }))
  }

  return (
    <AuthLayout title={"Sign Up"}>
      <form onSubmit={submit} className="space-y-4">
        <FormField.Input
          label={"Username"}
          value={data.username}
          onChange={e => setData("username", e.target.value)}
          error={errors.username}
          autoComplete="username"
          placeholder={"john.doe"}
          autoFocus
        />

        <FormField.Input
          label={"E- mail"}
          value={data.email}
          onChange={e => setData("email", e.target.value)}
          error={errors.email}
          type="email"
          autoComplete="email"
          placeholder={"john.doe@mail.com"}
          autoFocus
        />

        <FormField.Input
          label={"Password"}
          value={data.password}
          onChange={e => setData("password", e.target.value)}
          error={errors.password}
          type="password"
        />

        <FormField.Input
          label={"Password Confirmation"}
          value={data.password_confirmation}
          onChange={e => setData("password_confirmation", e.target.value)}
          error={errors.password_confirmation}
          type="password"
          placeholder="Ketikkan ulang password di sini"
        />

        <Separator />

        <FormField.Input
          label={"Nama Lengkap"}
          value={data.name}
          onChange={e => setData("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
          placeholder="John Doe"
        />

        <FormField.Input
          label={"Nomor Induk Kependudukan (NIK)"}
          value={data.nik}
          onChange={e => setData("nik", e.target.value)}
          error={errors.nik}
          placeholder="0129384742131"
          maxLength={16}
        />

        <FormField.Date
          label={"Tanggal Lahir"}
          value={data.date_of_birth}
          onChange={handleDateChange}
          error={errors.date_of_birth}
          placeholder="Pilih tanggal lahir"
        />

        <FormField.Input
          label={"Nomor Telepon"}
          value={data.phone_number}
          onChange={e => setData("phone_number", e.target.value)}
          error={errors.phone_number}
          placeholder={"0812345678"}
          maxLength={10}
        />

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

        <FormField.Textarea
          label={"Alamat"}
          component={Textarea}
          value={data.address}
          onChange={e => setData("address", e.target.value)}
          error={errors.address}
        />

        <div className="flex items-center justify-end">
          <Link
            href={route("login")}
            className={buttonVariants({ variant: "link" })}
          >
            Login?
          </Link>

          <LoadingButton
            className="ml-4"
            disabled={processing}
            loading={processing}
          >
            Log in
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignUp
