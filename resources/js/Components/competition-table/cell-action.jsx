import React from "react"
import { Button } from "../ui/button"
import { Icon } from "../icon"
import { Link, router, useForm, usePage } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast"
import { getTimeStamp } from "@/lib/getTimeStamp"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import DropdownDialog from "../dropdown-dialog"

const CompetitionCellAction = ({ competition }) => {
  const { delete: destroy } = useForm()
  const { auth } = usePage().props
  const user = auth.user?.data

  const deleteData = competition => {
    destroy(route("dashboard.superadmin.competitions.destroy", competition), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: "Perlombaan berhasil dihapus",
          description: getTimeStamp(),
        })
      },
    })
  }

  const toggleIsActiveHandler = competition => {
    router.patch(
      route("dashboard.superadmin.competitions.update-status", competition),
      {
        isActive: !competition.isActive,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            title: "Status perlombaan berhasil diperbaharui",
            description: getTimeStamp(),
          })
        },
      },
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-7" variant="outline" size="icon">
          <Icon icon={"IconDots"} className={"h-5 w-5 stroke-[1.2]"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "superadmin" && (
          <>
            {competition.isActive ? (
              <DropdownDialog
                description={
                  "Perlombaan yang di-non aktifkan tidak akan muncul di halaman utama pengguna. Apa anda yakin?"
                }
                action={() => toggleIsActiveHandler(competition)}
                submit_text="Ya, saya yakin!"
                cancel_text="Batalkan"
                buttonStyle="destructive"
              >
                <Icon icon={"IconX"} className={"mr-2"} />
                Non Aktifkan
              </DropdownDialog>
            ) : (
              <DropdownDialog
                description={
                  "Perlombaan di aktifkan akan muncul di halaman utama pengguna. Apa anda yakin?"
                }
                action={() => toggleIsActiveHandler(competition)}
                submit_text="Ya, saya yakin!"
                cancel_text="Batalkan"
                buttonStyle="destructive"
              >
                <Icon icon={"IconCheck"} className={"mr-2"} />
                Aktifkan
              </DropdownDialog>
            )}
            <DropdownDialog
              description="Keputusan ini tidak dapat di batalkan. Data perlombaan akan dihapus."
              action={() => deleteData(competition)}
              submit_text="Ya, saya yakin!"
              cancel_text="Batalkan"
              buttonStyle="destructive"
            >
              <Icon icon={"IconTrash"} className={"mr-2"} />
              Delete Permanently
            </DropdownDialog>
            <DropdownMenuItem>
              <Link
                href={route(
                  "dashboard.superadmin.competitions.edit",
                  competition,
                )}
                className="flex items-center"
              >
                <Icon icon={"IconEdit"} className={"mr-2"} />
                Perbaharui Data
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <Link
            href={
              user?.role === "superadmin"
                ? route("dashboard.superadmin.competitions.show", competition)
                : route("dashboard.admin.competitions.show", competition)
            }
            className="flex items-center"
          >
            <Icon icon={"IconEye"} className={"mr-2"} />
            Lihat Detail
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CompetitionCellAction
