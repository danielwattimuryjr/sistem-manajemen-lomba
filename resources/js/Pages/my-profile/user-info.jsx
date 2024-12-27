import { Card, CardContent, CardTitle } from "@/Components/ui/card.jsx"
import { usePage } from "@inertiajs/react"
import { format } from "date-fns"
import { Separator } from "@/Components/ui/separator.jsx"

function Col({ title, children }) {
  return (
    <div>
      <h3 className="font-bold capitalize">{title}</h3>
      <p>{children}</p>
    </div>
  )
}

export default function UserInfo() {
  const user = usePage().props.auth?.user?.data
  return (
    <Card>
      <CardContent className={"space-y-4 pt-4"}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Col title={"Nama :"}>{user?.name}</Col>
          <Col title={"Email :"}>{user?.email}</Col>
          <Col title={"Tanggal Lahir :"}>
            {format(user?.dateOfBirth, "PPP")}
          </Col>
          <Col title={"Username :"}>{user?.username}</Col>
          <Col title={"Alamat :"}>{user?.address}</Col>
          <Col title={"Nomor Telepon :"}>{user?.phoneNumber}</Col>
          <Col title={"Nomor Induk Kependudukan (NIK) :"}>{user?.nik}</Col>
        </div>

        <Separator />

        <CardTitle>Info Akun</CardTitle>
        <ul className={"ml-4 list-disc"}>
          <li>
            {user?.isEmailVerified ? (
              <>
                Email{" "}
                <span className="text-green-500">Sudah terverifikasi</span>
              </>
            ) : (
              <>
                Email{" "}
                <span className="text-destructive">Belum diverifikasi</span>
              </>
            )}
          </li>
          <li>
            {user?.isAccountVerified ? (
              <>
                Akun <span className="text-green-500">Sudah terverifikasi</span>{" "}
                oleh admin
              </>
            ) : (
              <>
                Akun{" "}
                <span className="text-destructive">Belum diverifikasi</span>{" "}
                oleh admin
              </>
            )}
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
