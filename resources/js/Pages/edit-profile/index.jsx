import AdminLayout from "@/Layouts/admin-layout.jsx"
import PageContainer from "@/Components/layout/page-container.jsx"
import EditProfileHeader from "@/pages/edit-profile/partials/header.jsx"
import { Separator } from "@/Components/ui/separator.jsx"
import EditProfileForm from "@/pages/edit-profile/partials/form.jsx"

export default function EditProfile() {
  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-8">
          <EditProfileHeader/>
          <Separator />
          <EditProfileForm />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
