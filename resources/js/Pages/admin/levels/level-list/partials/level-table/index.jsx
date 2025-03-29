import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table.jsx"
import SortIndicator from "@/Components/sort-indicator.jsx"
import SimplePagination from "@/Components/simple-pagination.jsx"
import levelTableColumns from "./columns.jsx"
import DataTableLimitDropdown from "@/Components/data-table-limit-dropdown.jsx"
import { usePage } from "@inertiajs/react"
import { useFilter } from "@/hooks/useFilter.js"
import DataTableSearchInput from "@/Components/data-table-search-input.jsx"

const Index = () => {
  const props = usePage().props
  const [params, setParams] = useState(props.state)
  useFilter({
    route: route("dashboard.admin.levels.index"),
    values: params,
    only: ["levels"],
  })

  const { data: levels, meta, links } = props.levels

  const handleSort = newField => {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <DataTableLimitDropdown
          value={params?.limit}
          onValueChange={e => setParams({ ...params, limit: e })}
        />

        <DataTableSearchInput
          search={params?.search}
          onChange={e =>
            setParams(prev => ({ ...prev, search: e.target.value }))
          }
        />
      </div>

      <div className="h-[calc(80vh-220px)] overflow-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              {levelTableColumns.map((col, i) => (
                <TableHead key={i} onClick={() => handleSort(col.column)}>
                  <SortIndicator
                    label={col.label}
                    column={col.column}
                    field={params?.field}
                    direction={params?.direction}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {levels.length > 0 ? (
              <>
                {levels.map((level, i) => (
                  <TableRow key={level.id}>
                    <TableCell className="w-0 py-7 text-center">
                      {meta.from + i}
                    </TableCell>
                    <TableCell>{level.name}</TableCell>
                    <TableCell>{level.usersCount}</TableCell>
                    <TableCell>{level.createdAt}</TableCell>
                    <TableCell>{level.updatedAt}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="animate-pulse py-5 text-center text-base font-semibold text-destructive"
                >
                  Data Tidak Ada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <SimplePagination link={links} meta={meta} />
    </>
  )
}

export default Index
