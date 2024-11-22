import { Link } from "@inertiajs/react"
import Breadcrumbs from "@/Components/breadcrumbs";
import Heading from "@/Components/heading";
import { buttonVariants } from "@/Components/ui/button";
import { cn } from "@/lib/utils.js"
import { IconPlus } from "@tabler/icons-react"

export default function CompetitionListHeader({isSuperadmin}) {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    { title: isSuperadmin ? "Manajemen Perlombaan" : "Perlombaan" },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={"Perlombaan"}
          description={
            isSuperadmin
              ? "Di halaman ini, anda bisa melihat seluruh data tingkatan peserta yang terdaftar dalam sistem."
              : "Di halam ini, anda bisa melihat seluruh perlombaan yang ditugaskan kepada anda"
          }
        />

        {isSuperadmin && (
          <Link
            href={route("dashboard.superadmin.competitions.create")}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <IconPlus className="mr-2 h-4 w-4" />
            Tambah Data
          </Link>
        )}
      </div>
    </>
  )
}
