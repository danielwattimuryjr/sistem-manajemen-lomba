import PageContainer from "@/Components/layout/page-container"
import AdminLayout from "@/Layouts/admin-layout"
import { Separator } from "@/Components/ui/separator.jsx"
import MyProfileHeader from "@/pages/my-profile/partials/header.jsx"
import UserInfo from "@/pages/my-profile/user-info.jsx"

export default function UserProfile() {
  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-8">
          <MyProfileHeader />
          <Separator />
          <UserInfo />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
