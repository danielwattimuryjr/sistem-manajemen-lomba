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
import DropdownDialog from "../dropdown-dialog"

const ParticipantCellAction = ({ level: participant }) => {
  const { delete: destroy } = useForm()

  const deleteData = participant => {
    // destroy(route("dashboard.home.levels.destroy", role), {
    //   preserveScroll: true,
    //   onSuccess: () => {
    //     toast({
    //       title: "Tingkatan peserta berhasil dihapus",
    //       description: getTimeStamp(),
    //     })
    //   },
    // })
    console.log(participant)
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
          description="Keputusan ini tidak dapat di batalkan. Data peserta akan dihapus."
          action={() => deleteData(participant)}
          submit_text="Ya, saya yakin!"
          cancel_text="Batalkan"
          buttonStyle="destructive"
        >
          <Icon icon={"IconTrash"} className={"mr-2"} />
          Delete Permanently
        </DropdownDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ParticipantCellAction
