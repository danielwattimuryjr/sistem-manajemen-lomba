import Banner from "@/Components/banner"
import GuestNav from "@/Components/guest-nav"
import PageContainer from "@/Components/layout/page-container"
import { Toaster } from "@/Components/ui/toaster"
import { Head, router, usePage } from "@inertiajs/react"
import { Button } from "@/Components/ui/button.jsx"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"

function resendEmailVerificationRequest() {
  router.post(route("verification.send"), undefined, {
    onSuccess: () => {
      toast({
        title: "Email send",
        description: getTimeStamp(),
      })
    },
  })
}

const AppLayout = ({ title, children }) => {
  const { user } = usePage().props?.auth

  return (
    <>
      <Head title={title} />

      <main className="w-full overflow-hidden">
        <GuestNav />
        {user?.data && (
          <>
            {(!user?.data?.isEmailVerified ||
              !user?.data?.isAccountVerified) && (
              <Banner>
                <p className="text-center text-sm font-medium">
                  <b>Peringatan!</b> {""}
                  {!user?.data?.isEmailVerified
                    ? "Email mu belum di verifikasi. Segera cek Email!"
                    : "Akun mu belum diverifikasi oleh admin."}
                  {!user?.data?.isEmailVerified && (
                    <Button
                      variant={"link"}
                      onClick={resendEmailVerificationRequest}
                    >
                      Kirim Email Ulang.
                    </Button>
                  )}
                </p>
              </Banner>
            )}
          </>
        )}

        <PageContainer scrollable>
          <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-4 sm:px-6 lg:px-8 lg:pb-14">
            {children}
          </div>
        </PageContainer>
        <Toaster />
      </main>
    </>
  )
}

export default AppLayout
