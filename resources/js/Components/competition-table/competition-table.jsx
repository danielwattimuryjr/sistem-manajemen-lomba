import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
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
import SortIndicator from "@/Components/sort-indicator"
import SimplePagination from "@/Components/simple-pagination"
import competitionTableColumns from "./columns"
import CompetitionCellAction from "./cell-action"
import { Icon } from "../icon"

const CompetitionTable = ({
  competitions,
  meta,
  links,
  params,
  setParams,
  handleSort,
}) => {
  return (
    <>
      <div className="item-center mb-3 flex justify-between">
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              {competitionTableColumns.map((col, i) => (
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
            {competitions.length > 0 ? (
              <>
                {competitions.map((competition, i) => (
                  <TableRow key={competition.id}>
                    <TableCell className="w-0 py-7 text-center">
                      {meta.from + i}
                    </TableCell>
                    <TableCell>{competition.name}</TableCell>
                    <TableCell
                      className={
                        competition.isActive
                          ? "text-green-400"
                          : "text-destructive"
                      }
                    >
                      <div className="flex items-center">
                        <Icon
                          icon={competition.isActive ? "IconCheck" : "IconX"}
                          className={"mr-2"}
                        />
                        {competition.isActive ? "Aktif" : "Tidak Aktif "}
                      </div>
                    </TableCell>
                    <TableCell>{competition.startDate}</TableCell>
                    <TableCell>{competition.endDate}</TableCell>
                    <TableCell>{competition.createdAt}</TableCell>
                    <TableCell>{competition.updatedAt}</TableCell>
                    <TableCell>
                      <CompetitionCellAction competition={competition} />
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

export default CompetitionTable
