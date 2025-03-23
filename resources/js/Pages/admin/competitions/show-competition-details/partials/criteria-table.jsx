import Heading from "@/Components/heading.jsx"
import { Card } from "@/Components/ui/card.jsx"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table.jsx"

export default function CompetitionDetailCriteriaTable({ criterias }) {
  return (
    <>
      <Heading title={"Faktor Penilaian"} />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              <TableHead>Nama Faktor</TableHead>
              <TableHead>Bobot (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {criterias.length > 0 ? (
              <>
                {criterias.map((criteria, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center">C{idx + 1}</TableCell>
                    <TableCell>{criteria.name}</TableCell>
                    <TableCell>{criteria.weight}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="animate-pulse py-5 text-center text-base font-semibold text-destructive"
                >
                  Data Tidak Ada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total Bobot (%)</TableCell>
              <TableCell>
                {criterias.reduce((acc, criteria) => acc + criteria.weight, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </>
  )
}
