import { Card, CardContent } from "@/Components/ui/card.jsx"
import { usePage } from "@inertiajs/react"
import { format } from "date-fns"
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
      <CardContent className={"pt-4"}>
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
      </CardContent>
    </Card>
  )
}
