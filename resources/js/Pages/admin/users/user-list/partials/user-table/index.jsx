import React, { useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import SortIndicator from "@/Components/sort-indicator"
import SimplePagination from "@/Components/simple-pagination"
import userTableColumns from "./columns"
import { useForm, usePage } from "@inertiajs/react"
import { IconCircleCheckFilled } from "@tabler/icons-react"
import { Checkbox } from "@/Components/ui/checkbox.jsx"
import { useFilter } from "@/hooks/useFilter.js"
import ButtonTooltip from "@/Components/button-tooltip.jsx"
import { Icon } from "@/Components/icon.jsx"
import { getTimeStamp } from "@/lib/getTimeStamp.js"
import { toast } from "@/hooks/use-toast.js"
import axios from "axios"
import DataTableLimitDropdown from "@/Components/data-table-limit-dropdown.jsx"

const Index = ({ selectedRole, params, setParams }) => {
  const { users: usersData } = usePage().props

  useFilter({
    route: route("dashboard.admin.users.index"),
    values: params,
    only: ["users"],
  })

  function handleSort(newField) {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  const { data: users, meta, links } = usersData

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className={"flex flex-row gap-x-2"}>
          <DataTableLimitDropdown
            value={params?.limit}
            onValueChange={e => setParams({ ...params, limit: e })}
          />
        </div>
        <div className="w-72">
          <Input
            type="text"
            value={params?.search}
            onChange={e =>
              setParams(prev => ({ ...prev, search: e.target.value }))
            }
            placeholder="Pencarian..."
          />
        </div>
      </div>

      <div className="h-[calc(80vh-220px)] overflow-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              {userTableColumns.map((col, i) => (
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
            {users.length > 0 ? (
              <>
                {users.map((user, i) => (
                  <TableRow key={user.id}>
                    <TableCell className="w-0 py-7 text-center">
                      {meta.from + i}
                    </TableCell>
                    <TableCell>
                      {user.name}

                      <div className="text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      {user.emailVerified && (
                        <IconCircleCheckFilled className="m-auto h-8 w-8 text-green-300" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.accountVerified && (
                        <IconCircleCheckFilled className="m-auto h-8 w-8 text-green-300" />
                      )}
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.updatedAt}</TableCell>
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
      <SimplePagination links={links} meta={meta} />
    </>
  )
}

export default Index
