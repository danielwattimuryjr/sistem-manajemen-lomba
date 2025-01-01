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
import UserCellAction from "./cell-action"
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
  const { data, setData, patch, reset } = useForm({
    user_id: [],
  })
  useFilter({
    route: route("dashboard.superadmin.users.index"),
    values: params,
    only: ["users"],
  })
  useEffect(() => {
    reset()
  }, [selectedRole])

  function handleSort(newField) {
    let newDirection = params?.direction ?? "asc"
    const field = params?.field ?? "created_at"

    if (newField === field) {
      newDirection = newDirection === "asc" ? "desc" : "asc"
    }

    setParams({ ...params, field: newField, direction: newDirection })
  }

  function onUserChecked(userId, isChecked) {
    if (isChecked) {
      setData(prevData => ({
        ...prevData,
        user_id: [...prevData.user_id, userId],
      }))
    } else {
      setData(prevData => ({
        ...prevData,
        user_id: prevData.user_id.filter(id => id !== userId),
      }))
    }
  }

  function isUserChecked(id) {
    return data.user_id.includes(id)
  }

  function checkAllUser(isChecked) {
    if (isChecked) {
      axios
        .post(route("dashboard.superadmin.users.ids"), {
          role: selectedRole,
        })
        .then(response => {
          setData("user_id", response.data)
          const test = response.data
          console.log("requested", test)
        })
        .catch(error => {
          console.error("Error fetching user IDs:", error)
        })
    } else {
      reset()
    }
  }

  function bulkVerifiedUser() {
    patch(route("dashboard.superadmin.users.bulk-verify"), {
      onSuccess: () => {
        toast({
          title: "Status user telah diperbaharui",
          description: getTimeStamp(),
        })

        reset()
      },
      onError: () => {
        toast({
          title: "Terjadi kesalahan saat memperbaharui status user",
          description: getTimeStamp(),
        })
      },
    })
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

          <ButtonTooltip
            tooltip={"Verifikasi Pengguna"}
            disabled={data.user_id.length === 0}
            size={"icon"}
            onClick={bulkVerifiedUser}
          >
            <Icon icon={"IconRosetteDiscountCheck"} />
          </ButtonTooltip>
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
              <TableHead>
                <Checkbox onCheckedChange={e => checkAllUser(e)} />
              </TableHead>
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
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length > 0 ? (
              <>
                {users.map((user, i) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={isUserChecked(user.id)}
                        onCheckedChange={e => onUserChecked(user.id, e)}
                        disabled={user.accountVerified}
                      />
                    </TableCell>
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
                    <TableCell>
                      <UserCellAction user={user} />
                      {/* <LevelCellAction level={level} /> */}
                    </TableCell>
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
