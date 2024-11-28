import { Link, router } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip.jsx"
import { Button, buttonVariants } from "@/Components/ui/button.jsx"
import { Icon } from "@/Components/icon.jsx"
import ButtonDialog from "@/Components/button-dialog.jsx"
import React from "react"

export default function CompetitionDetailActionGroup({competition}) {
  const toggleCompetitionStatusHandler = () => {
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

  const deleteCompetitionHandler = () => {
    router.delete(
      route("dashboard.superadmin.competitions.destroy", competition),
      {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            title: "Perlombaan berhasil dihapus",
            description: getTimeStamp(),
          })
        },
      },
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              disabled={competition.hasFinalScores}
              size="icon"
              variant={competition.isActive ? "destructive" : "default"}
              onClick={toggleCompetitionStatusHandler}
            >
              {competition.isActive ? (
                <Icon icon={"IconX"} />
              ) : (
                <Icon icon={"IconCheck"} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center" sideOffset={8}>
            {competition.isActive
              ? "Non Aktifkan Perlombaan"
              : "Aktifkan Perlombaan"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Link
              href={route(
                "dashboard.superadmin.competitions.edit",
                competition,
              )}
              className={buttonVariants({ variant: "outline", size: "icon"})}
            >
              <Icon icon={"IconEdit"} />
            </Link>
          </TooltipTrigger>
          <TooltipContent align="center" sideOffset={8}>
            Edit Perlombaan
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ButtonDialog
              triggerButtonVariant={'destructive'}
              dialogDescription={
                "Keputusan ini tidak dapat di batalkan. Data perlombaan akan dihapus."
              }
              triggerIcon={"IconTrash"}
              dialogTitle={"Apa Kamu Yakin?"}
              dialogActionButtonOnClick={deleteCompetitionHandler}
            />
          </TooltipTrigger>
          <TooltipContent align="center" sideOffset={8}>
            Hapus Perlombaan
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
