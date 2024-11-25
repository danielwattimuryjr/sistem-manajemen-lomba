import { Link, router, usePage } from "@inertiajs/react"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import participantTableColumns from "./columns"
import { buttonVariants } from "../ui/button"
import { useMemo } from "react"
import ButtonDialog from "@/Components/button-dialog.jsx"

const ParticipantTable = ({
  params,
  setParams,
  participants,
  competition,
}) => {
  const { criterias } = competition
  const { scoreEntries, auth } = usePage().props

  const updatedTableColumns = useMemo(() => {
    if (!criterias || criterias.length === 0) return participantTableColumns

    const criteriaColumns = criterias.map(criteria => ({
      column: `criteria_${criteria.id}`,
      label: `${criteria.name} (${criteria.weight}%)`,
    }))

    const finalScoreIndex = participantTableColumns.findIndex(
      column => column.column === "final_score",
    )

    const columns = [...participantTableColumns]
    columns.splice(finalScoreIndex, 0, ...criteriaColumns)

    return columns
  }, [criterias, participantTableColumns])

  const user = auth.user?.data
  const isSuperadmin = user?.role === 'superadmin'

  function postCalculateFinalScores () {
    router.post(
      route('dashboard.superadmin.competitions.calculate-final-scores', competition)
    )
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
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

        {isSuperadmin && (
            <ButtonDialog
              triggerIcon={'IconMedal2'}
              triggerButtonLabel={'Tentukan Pemenang'}
              triggerButtonDisabled={!competition.isActive}
              dialogTitle={'Konfirmasi'}
              dialogDescription={'Pastikan bahwa seluruh peserta sudah dinilai. Aksi ini akan menghitung nilai akhir dan menonaktifkan perlombaan.'}
              dialogCancelButtonLabel={'Batalkan'}
              dialogActionButtonLabel={'Lanjutkan'}
              dialogActionButtonOnClick={postCalculateFinalScores}
            />
        )}
      </div>

      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">#</TableHead>
              {updatedTableColumns.map((col, i) => (
                <TableHead key={i}>
                  <div className="flex items-center">
                    <span className="mr-2 capitalize">{col.label}</span>
                  </div>
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {participants.length > 0 ? (
              <>
                {participants.map((participant, i) => (
                  <TableRow key={participant.id}>
                    <TableCell className="w-0 py-7 text-center">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <h3>{participant.name}</h3>

                      <div className="text-muted-foreground">
                        {participant.email}
                      </div>
                    </TableCell>

                    <TableCell>{participant.participantCode}</TableCell>

                    <TableCell>{participant.createdAt}</TableCell>

                    {criterias.map((criteria, idx) => {
                      const participantData = scoreEntries[participant.id]?.data
                      const scoreObject = participantData?.find(
                        entry => entry.criteriaId === criteria.id,
                      )
                      const score = scoreObject?.score

                      return (
                        <TableCell key={idx}>
                          {score ?? (
                            <Link
                              href={route(
                                "dashboard.admin.score-entries.create",
                                {
                                  competition: competition.slug,
                                  participant: participant.username,
                                },
                              )}
                              className={buttonVariants({ variant: "link" })}
                            >
                              Berikan Nilai
                            </Link>
                          )}
                        </TableCell>
                      )
                    })}

                    <TableCell>0</TableCell>

                    <TableCell>{/* Cell Action */}</TableCell>
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

export default ParticipantTable
