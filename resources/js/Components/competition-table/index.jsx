import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SortIndicator from "@/Components/sort-indicator"
import SimplePagination from "@/Components/simple-pagination"
import competitionTableColumns from "./columns"
import CompetitionCellAction from "./cell-action"
import { Icon } from "../icon"
import DataTableLimitDropdown from "@/Components/data-table-limit-dropdown.jsx"
import DataTableSearchInput from "@/Components/data-table-search-input.jsx"

const Index = ({
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
        <DataTableLimitDropdown
          value={params?.limit}
          onValueChange={e => setParams({ ...params, limit: e })}
        />
        <DataTableSearchInput
          value={params?.search}
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
      </div>
      <SimplePagination link={links} meta={meta} />
    </>
  )
}

export default Index
