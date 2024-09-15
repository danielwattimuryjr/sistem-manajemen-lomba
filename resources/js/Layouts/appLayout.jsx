import GuestNav from "@/Components/guestNav"
import { Toaster } from "@/Components/ui/toaster"
import { Head } from "@inertiajs/react"

const AppLayout = ({ title, children }) => {
  return (
    <>
      <Head title={title} />

      <main className="w-full overflow-hidden">
        <GuestNav />
        {children}
        <Toaster />
      </main>
    </>
  )
}

export default AppLayout
