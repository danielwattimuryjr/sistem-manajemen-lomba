import PageContainer from "@/Components/layout/page-container"
import { Separator } from "@/Components/ui/separator"
import UserTable from "./partials/user-table"
import { useFilter } from "@/hooks/useFilter"
import AdminLayout from "@/Layouts/admin-layout"
import { useState } from "react"
import UserListHeader from "@/pages/admin/users/user-list/partials/header.jsx"

const UserIndex = props => {
  const [params, setParams] = useState(props.state)
  useFilter({
    route: route("dashboard.admin.users.index"),
    values: params,
    only: ["users"],
  })

  const handleTab = selectedRole => {
    setParams({ ...params, role: selectedRole })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <UserListHeader
          defaultValue={params.role}
          onValueChange={val => handleTab(val)}
        />
        <Separator />
        {/* Table */}
        <UserTable
          selectedRole={params.role}
          params={params}
          setParams={setParams}
        />
      </PageContainer>
    </AdminLayout>
  )
}

export default UserIndex
