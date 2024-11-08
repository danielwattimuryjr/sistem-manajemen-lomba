import LoadingButton from "@/Components/loading-button"
import { ThemeToggle } from "@/Components/theme-toggle"
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert"
import { buttonVariants } from "@/Components/ui/button"
import { Head, Link, useForm, usePage } from "@inertiajs/react"
import { IconExclamationCircle } from "@tabler/icons-react"

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm()
  const { auth } = usePage().props

  const submit = e => {
    e.preventDefault()

    post(route("verification.send"))
  }

  return (
    <>
      <Head title={"Verifikasi Email"} />
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Perhatian!
            </h1>
            <p className="mt-4 text-muted-foreground">
              Mohon verifikasi email anda terlebih dahulu! <br />
              Tidak menerima email? Klik tombol di bawah ini untuk mengirim
              ulang.
            </p>

            <p className="mt-2 text-muted-foreground"></p>

            <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
              <LoadingButton
                disabled={processing}
                loading={processing}
                label={"Kirim Ulang"}
              />

              <Link
                href={route("logout")}
                method="post"
                as="button"
                className={buttonVariants({ variant: "link" })}
              >
                Log Out
              </Link>
            </form>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {status === "verification-link-sent" && (
        <Alert className="fixed left-4 top-4 z-10 w-fit">
          <IconExclamationCircle className="h-4 w-4" />
          <AlertTitle>Email berhasil dikirim</AlertTitle>
          <AlertDescription>
            Email berhasil dikirimkan ke {auth.user.data.email}!
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
