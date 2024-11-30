import {  router, usePage } from "@inertiajs/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"

function logout () {
  router.post(
    route('logout'),
    undefined,
    {
      onSuccess: () => {
        toast({
          title: 'Logout berhasil',
          description: getTimeStamp()
        })
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Terjadi kesalahan saat proses logout',
          description: getTimeStamp()
        })
      }
    }
  )
}

function redirectToProfile () {
  router.get(
    route('profiles.index')
  )
}

const UserNav = ({ ...props }) => {
  const { auth } = usePage().props

  return (
    <DropdownMenu className={props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={auth.user?.data?.name ?? ""}
            />
            <AvatarFallback>{auth.user?.data?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {auth.user?.data?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth.user?.data?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={redirectToProfile}>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
