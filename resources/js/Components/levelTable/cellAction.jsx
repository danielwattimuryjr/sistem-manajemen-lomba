import React from "react"
import { Button } from "../ui/button"
import { Icon } from "../icon"
import { Link, useForm } from "@inertiajs/react"
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
import DropdownDialog from "../dropdownDialog"

const LevelCellAction = ({ level }) => {
  const { delete: destroy } = useForm()

  const deleteData = role => {
    destroy(route("dashboard.levels.destroy", role), {
      preserveScroll: true,
      onSuccess: () => {
        toast({
          title: "Tingkatan peserta berhasil dihapus",
          description: getTimeStamp(),
        })
      },
    })
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
        <DropdownDialog
          description="Keputusan ini tidak dapat di batalkan. Data tingkatan peserta akan dihapus."
          action={() => deleteData(level)}
          submit_text="Ya, saya yakin!"
          cancel_text="Batalkan"
          buttonStyle="destructive"
        >
          <Icon icon={"IconTrash"} className={"mr-2"} />
          Delete Permanently
        </DropdownDialog>
        <DropdownMenuItem>
          <Link
            href={route("dashboard.levels.edit", level)}
            className="flex items-center"
          >
            <Icon icon={"IconEdit"} className={"mr-2"} />
            Perbaharui Data
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LevelCellAction