import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import PageContainer from "@/Components/layout/pageContainer"
import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/adminLayout"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
import { TabsContent } from "@radix-ui/react-tabs"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"

const UserIndex = props => {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    { title: "Manajemen Pengguna" },
  ]

  const { data: users, meta, links } = props.users
  const [params, setParams] = useState(props.state)

  useFilter({
    route: route("dashboard.users.index"),
    values: params,
    only: ["users"],
  })

  const handleSort = newField => {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  const handleTab = userRole => {
    let newUserRole = params?.role ?? "guest"
    setParams({ ...params, role: newUserRole })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <Heading title={"Pengguna"} description={"..."} />

            <Link
              href={"#"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <IconPlus className="mr-2 h-4 w-4" />
              Tambah Data
            </Link>
          </div>

          <Separator />

          <Tabs defaultValue="guest" className="space-y-4">
            <TabsList>
              <TabsTrigger value="guest">Peserta</TabsTrigger>
              <TabsTrigger value="admin">Juri</TabsTrigger>
            </TabsList>
            <TabsContent value="guest">guest</TabsContent>
            <TabsContent value="admin">Admin</TabsContent>
          </Tabs>

          {/* Table */}
        </div>
      </PageContainer>
    </AdminLayout>
  )
}

export default UserIndex