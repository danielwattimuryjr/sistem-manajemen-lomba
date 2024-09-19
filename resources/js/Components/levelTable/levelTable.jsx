import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import SortIndicator from "@/components/SortIndicator"
import SimplePagination from "@/components/SimplePagination"
import levelTableColumns from "./columns"
import LevelCellAction from "./cellAction"

const LevelTable = ({ levels, meta, links, params, setParams, handleSort }) => {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <Select
            value={params?.limit}
            onValueChange={e => setParams({ ...params, limit: e })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={params?.limit ?? 10} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="75">75</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
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

      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
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
            <TableHead />
          </TableRow>

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
                    <TableCell>
                      <LevelCellAction level={level} />
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
      </ScrollArea>
      <SimplePagination link={links} meta={meta} />
    </>
  )
}

export default LevelTable
