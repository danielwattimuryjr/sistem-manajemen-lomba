import PageContainer from '@/Components/layout/page-container'
import AdminLayout from '@/Layouts/admin-layout'
import React, { useState } from 'react'
import LevelListHeader from './partials/header'
import { useFilter } from "@/hooks/useFilter.js"
import { Separator } from "@/Components/ui/separator.jsx"
import LevelTable from "@/Components/level-table/level-table.jsx"

export default function LevelList(props) {
  const { data: levels, meta, links } = props.levels

  const [params, setParams] = useState(props.state)
  useFilter({
    route: route("dashboard.superadmin.levels.index"),
    values: params,
    only: ["levels"],
  })

  const handleSort = newField => {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  return (
    <AdminLayout>
      <PageContainer>
        <div className="space-y-4">
          <LevelListHeader />
          <Separator />
          <LevelTable
            levels={levels}
            meta={meta}
            links={links}
            params={params}
            setParams={setParams}
            handleSort={handleSort}
          />
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
