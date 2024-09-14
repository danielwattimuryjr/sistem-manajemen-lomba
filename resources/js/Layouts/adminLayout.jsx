import Header from "@/Components/layout/header"
import Sidebar from "@/Components/layout/sidebar"
import { Head } from "@inertiajs/react"

const AdminLayout = ({ children }) => {
  return (
    <>
      <Head title="Admin Panel" />
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <Header />
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminLayout
