import PageContainer from "@/Components/layout/page-container"
import AdminLayout from "@/Layouts/admin-layout"
import React from "react"
import LevelListHeader from "./partials/header"
import { Separator } from "@/Components/ui/separator.jsx"
import LevelTable from "./partials/level-table"

export default function LevelList(props) {
  return (
    <AdminLayout>
      <PageContainer>
        <LevelListHeader />
        <Separator />
        <LevelTable />
      </PageContainer>
    </AdminLayout>
  )
}
