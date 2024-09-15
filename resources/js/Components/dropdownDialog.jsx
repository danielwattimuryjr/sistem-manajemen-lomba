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
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { buttonVariants } from "./ui/button"

const DropdownDialog = ({
  trigger_text,
  title = "Apa kamu yakin?",
  description,
  cancel_text = "Cancel",
  submit_text = "Continue",
  action,
  buttonStyle = "",
  children,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={event => event.preventDefault()}>
          {children || trigger_text}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel_text}</AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            className={buttonVariants({ variant: buttonStyle })}
          >
            {submit_text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DropdownDialog
