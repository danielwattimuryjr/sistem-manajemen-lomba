import { Icon } from "./icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"

const ButtonDialog = ({
  triggerIcon,
  triggerButtonLabel,
  triggerButtonVariant = "primary",
  dialogTitle,
  dialogDescription,
  dialogActionButtonLabel = "Yes",
  dialogActionButtonVariant = "primary",
  dialogActionButtonOnClick,
  dialogCancelButtonLabel = "No",
  dialogCancelButtonVariant,
  dialogCancelButtonOnClick,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          size={
            triggerIcon && triggerButtonLabel
              ? "default"
              : triggerIcon && !triggerButtonLabel
                ? "icon"
                : !triggerIcon && triggerButtonLabel
                  ? "default"
                  : "default"
          }
        >
          {triggerIcon && (
            <Icon icon={triggerIcon} className={triggerButtonLabel && "mr-2"} />
          )}
          {triggerButtonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          {dialogDescription && (
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{dialogCancelButtonLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={dialogActionButtonOnClick}>
            {dialogActionButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonDialog
