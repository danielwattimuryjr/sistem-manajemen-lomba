import PageContainer from "@/Components/layout/page-container"
import AdminLayout from "@/Layouts/admin-layout"
import React from "react"
import LevelFormHeader from "./partials/header"
import { Separator } from "@/Components/ui/separator"
import LevelForm from "./partials/level-form"

export default function LevelFormContainer({ initialData }) {
  const isEditing = !!initialData

  return (
    <AdminLayout>
      <PageContainer>
        <LevelFormHeader isEditing={isEditing} />
        <Separator />
        <LevelForm initialData={initialData} />
      </PageContainer>
    </AdminLayout>
  )
}
