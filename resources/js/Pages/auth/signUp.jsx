import { toast } from "@/hooks/use-toast"
import AuthLayout from "@/Layouts/authLayout"
import { getTimeStamp } from "@/lib/getTimeStamp"
import { useForm } from "@inertiajs/react"

const SignUp = () => {
  const { data, setData, post, errors, processing, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const submit = e => {
    e.preventDefault()

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
      onSuccess: () => {
        toast({
          title: "Berhasil Register",
          description: getTimeStamp(),
        })
      },
    })
  }

  return (
    <AuthLayout title={"Sign Up"}>
      <form onSubmit={submit}></form>
    </AuthLayout>
  )
}

export default SignUp
