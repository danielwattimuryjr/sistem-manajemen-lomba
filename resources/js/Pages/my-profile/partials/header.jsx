import Heading from "@/Components/heading.jsx"
import { Button } from "@/Components/ui/button.jsx"
import { Icon } from "@/Components/icon.jsx"
import { router } from "@inertiajs/react"
import ButtonDialog from "@/Components/button-dialog.jsx"
import { getTimeStamp } from "@/lib/getTimeStamp.js"
import { toast } from "@/hooks/use-toast.js"

function redirectToEditProfile() {
  router.get(route("profiles.edit"))
}

function handleDeleteAccount() {
  router.delete(
    route('profiles.destroy'),
    undefined,
    {
      onSuccess: () => {
        toast({
          title: 'Akun berhasil dihapus',
          description: getTimeStamp()
        })
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Terjadi kesalahan saat mencoba menghapus akun',
          description: getTimeStamp()
        })
      }
    }
  )
}

export default function MyProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <Heading title={"My Profile"} />

      <div className="space-x-4">
        <ButtonDialog
          triggerButtonVariant={'destructive'}
          triggerIcon={'IconTrash'}
          triggerButtonLabel={'Delete Account'}
          dialogTitle={'Apa kamu yakin?'}
          dialogDescription={'Akun yang dihapus tidak dapat dikembalikan lagi. Seluruh data yang terhubung dengan pengguna ini juga akan dihapus secara permanen'}
          dialogActionButtonLabel={'Ya, saya yakin!'}
          dialogCancelButtonLabel={'Batalkan'}
          dialogActionButtonOnClick={handleDeleteAccount}
        />
        <Button onClick={redirectToEditProfile}>
          <Icon icon={"IconEdit"} className={"mr-2"} />
          Update
        </Button>
      </div>
    </div>
  )
}
