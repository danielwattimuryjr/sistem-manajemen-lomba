import InputError from "@/Components/inputError"
import LoadingButton from "@/Components/loadingButton"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { toast } from "@/hooks/use-toast"
import AuthLayout from "@/Layouts/authLayout"
import { getTimeStamp } from "@/lib/getTimeStamp"
import { Link, useForm } from "@inertiajs/react"

const SignIn = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  })

  const submit = e => {
    e.preventDefault()
    post(route("login"), {
      onSuccess: () => {
        toast({
          title: "Login Berhasil",
          description: getTimeStamp(),
        })
      },
    })
  }

  return (
    <AuthLayout title={"Sign In"}>
      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email" className={"capitalize"}>
            email
          </Label>

          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            autoFocus
            onChange={e => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password" className={"capitalize"}>
            password
          </Label>

          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={e => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route("register")}
            className={buttonVariants({ variant: "link" })}
          >
            Register?
          </Link>
          {/* <PrimaryLink href={route("register")} value={"register?"} /> */}

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

export default SignIn
