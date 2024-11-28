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
import { Input } from "@/components/ui/input"
import { Icon } from "../icon"
import { Button } from "@/Components/ui/button.jsx"

const columns = [
  "Competition",
  "Score",
  "Posisi",
  "Kode Peserta",
  "Tgl. Pendaftaran",
]

const UserCompetitionTable = ({ competitions, params, setParams }) => {
  return (
    <>
      <div className="item-center mb-3 flex justify-between">
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
              {columns.map((column, idx) => (
                <TableHead key={idx}>{column}</TableHead>
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
                      {i + 1}
                    </TableCell>
                    <TableCell>{competition.name}</TableCell>
                    <TableCell>
                      {competition?.finalScore || "Sedang dinilai"}
                    </TableCell>
                    <TableCell>
                      {competition?.rank || "Sedang dinilai"}
                    </TableCell>
                    <TableCell>
                      {competition?.participantCode}
                    </TableCell>
                    <TableCell>
                      {competition?.joinedAt}
                    </TableCell>
                    <TableCell>
                      <Button size={"icon"} variant={"outline"}>
                        <Icon icon={"IconDownload"} />
                      </Button>
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
    </>
  )
}

export default UserCompetitionTable
