import GuestNav from "@/Components/guestNav"
import { Head } from "@inertiajs/react"

const AppLayout = ({ title, children }) => {
  return (
    <>
      <Head title={title} />
      <main className="w-full overflow-hidden">
        <GuestNav />
        {children}
      </main>
    </>
  )
}

export default AppLayout
