import { ScrollArea } from "@/Components/ui/scroll-area.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table.jsx"
import React from "react"


export default function LeaderboardTable({ finalScores }) {
  const columns = [
    "Peserta",
    "Kode Peserta",
    "Hasil Akhir"
  ]

  return (
    <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Pos.</TableHead>
            {columns.map((column, idx) => (
              <TableHead key={idx}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalScores.map((score, idx) => (
            <TableRow key={idx}>
              <TableCell className={'text-center'}>{score.rank}</TableCell>
              <TableCell>{score.participant.user.name}</TableCell>
              <TableCell>{score.participant.kd_peserta}</TableCell>
              <TableCell>{score.total_score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
