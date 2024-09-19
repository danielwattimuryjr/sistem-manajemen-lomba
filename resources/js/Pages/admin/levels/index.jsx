import { Link } from "@inertiajs/react"
import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/adminLayout"
import PageContainer from "@/Components/layout/pageContainer"
import Breadcrumbs from "@/Components/breadcrumbs"
import Heading from "@/Components/heading"
import { buttonVariants } from "@/Components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/Components/ui/separator"
import LevelTable from "@/Components/levelTable/levelTable"

const RoleIndex = props => {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    { title: "Manajemen Tingkat Peserta" },
  ]

  const { data: levels, meta, links } = props.levels
  const [params, setParams] = useState(props.state)
  useFilter({
    route: route("dashboard.levels.index"),
    values: params,
    only: ["levels"],
  })

  const handleSort = newField => {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex items-start justify-between">
            <Heading
              title={"Tingkatan Peserta"}
              description={
                "Di halaman ini, anda bisa melihat seluruh data tingkatan peserta yang terdaftar dalam sistem."
              }
            />

            <Link
              href={route("dashboard.levels.create")}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <IconPlus className="mr-2 h-4 w-4" />
              Tambah Data
            </Link>
          </div>

          <Separator />

          <LevelTable
            levels={levels}
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

export default RoleIndex
