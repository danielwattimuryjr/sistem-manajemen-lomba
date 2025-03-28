import Breadcrumbs from "@/Components/breadcrumbs.jsx"
import Heading from "@/Components/heading.jsx"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs.jsx"
import { Link } from "@inertiajs/react"
import { cn } from "@/lib/utils.js"
import { buttonVariants } from "@/Components/ui/button.jsx"
import { IconPlus } from "@tabler/icons-react"

export default function UserListHeader({ onValueChange, defaultValue }) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    { title: "Manajemen Pengguna" },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <div>
          <Heading title={"Pengguna"} />
          <Tabs
            defaultValue={defaultValue ?? "admin"}
            className="mt-4 space-y-4"
            onValueChange={onValueChange}
          >
            <TabsList>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="judges">Juri</TabsTrigger>
              <TabsTrigger value="participants">Peserta</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Link
          href={route("dashboard.superadmin.users.create")}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Tambah Data
        </Link>
      </div>
    </>
  )
}
