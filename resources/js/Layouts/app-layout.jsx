import Banner from "@/Components/banner"
import GuestNav from "@/Components/guestNav"
import { Toaster } from "@/Components/ui/toaster"
import { Head, usePage } from "@inertiajs/react"

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
                <p class="text-center text-sm font-medium">
                  <b>Peringatan!</b> {""}
                  {!user?.data?.isEmailVerified
                    ? "Email mu belum di verifikasi. Segera cek Email!"
                    : "Akun mu belum diverifikasi oleh admin."}
                </p>
              </Banner>
            )}
          </>
        )}

        {children}
        <Toaster />
      </main>
    </>
  )
}

export default AppLayout
