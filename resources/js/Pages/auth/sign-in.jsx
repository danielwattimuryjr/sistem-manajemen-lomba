import FormField from "@/Components/form-field"
import LoadingButton from "@/Components/loading-button"
import { buttonVariants } from "@/Components/ui/button"
import { toast } from "@/hooks/use-toast"
import AuthLayout from "@/Layouts/auth-layout"
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
      <form onSubmit={submit} className="space-y-4">
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

        <div className="flex items-center justify-end">
          <Link
            href={route("register")}
            className={buttonVariants({ variant: "link" })}
          >
            Register?
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

export default SignIn
