import LoadingButton from "@/Components/loadingButton"
import AuthLayout from "@/Layouts/authLayout"
import { Link } from "@inertiajs/react"

const SignIn = () => {
  return (
    <AuthLayout title={"Sign In"} description={"Nice"}>
      <div className="flex flex-col gap-2">
        <Link href={route("dashboard.home")}>
          <LoadingButton label={"Admin Panel"} />
        </Link>

        <Link href={route("welcome")}>
          <LoadingButton label={"Guest"} />
        </Link>

        <LoadingButton label={"Register"} />
      </div>
    </AuthLayout>
  )
}

export default SignIn
