import Breadcrumbs from '@/Components/breadcrumbs'
import Heading from '@/Components/heading'
import { buttonVariants } from '@/Components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from "@inertiajs/react"

export default function LevelListHeader() {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    { title: "Manajemen Tingkat Peserta" },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Tingkatan Peserta"}
          description={
            "Di halaman ini, anda bisa melihat seluruh data tingkatan peserta yang terdaftar dalam sistem."
          }
        />

        <Link
          href={route("dashboard.superadmin.levels.create")}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Tambah Data
        </Link>
      </div>
    </>  
  )
}
