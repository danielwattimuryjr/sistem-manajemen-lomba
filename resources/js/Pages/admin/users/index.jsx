import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import PageContainer from "@/Components/layout/page-container"
import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import UserTable from "@/Components/user-table/user-table"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/admin-layout"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"
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
    route: route("dashboard.superadmin.users.index"),
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

  const handleTab = selectedRole => {
    setParams({ ...params, role: selectedRole })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <Heading
              title={"Pengguna"}
              description={
                <Tabs
                  defaultValue={params.role ?? "guest"}
                  className="mt-4 space-y-4"
                  onValueChange={val => handleTab(val)}
                >
                  <TabsList>
                    <TabsTrigger value="guest">Peserta</TabsTrigger>
                    <TabsTrigger value="admin">Juri</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            />

            <Link
              href={route("dashboard.superadmin.users.create")}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <IconPlus className="mr-2 h-4 w-4" />
              Tambah Data
            </Link>
          </div>

          <Separator />

          {/* Table */}
          <UserTable
            users={users}
            meta={meta}
            links={links}
            params={params}
            setParams={setParams}
            handleSort={handleSort}
          />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}

export default UserIndex
