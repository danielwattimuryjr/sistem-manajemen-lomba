import Banner from "@/Components/banner"
import GuestNav from "@/Components/guest-nav"
import PageContainer from "@/Components/layout/page-container"
import { Toaster } from "@/Components/ui/toaster"
import { Head, router, usePage } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"

const AppLayout = ({ title, children }) => {
  const { user } = usePage().props?.auth

  return (
    <>
      <Head title={title} />

      <main className="w-full overflow-hidden">
        <GuestNav />
        {user?.data && (
          <>
            {!user?.data?.isEmailVerified && (
              <Banner>
                <p className="text-center text-sm font-medium">
                  <b>Peringatan!</b>{" "}
                  {" Email mu belum di verifikasi. Segera cek Email!"}
                </p>
              </Banner>
            )}

            {!user?.data?.isAccountVerified && (
              <Banner>
                <p className="text-center text-sm font-medium">
                  <b>Peringatan!</b> {" Akun mu belum diverifikasi oleh admin."}
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
