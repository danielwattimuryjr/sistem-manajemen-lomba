import React from "react"
import DOMPurify from "dompurify"
import { Badge } from "@/Components/ui/badge"

const Row = ({ title, children }) => (
  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
    <dt className="font-bold">{title}</dt>
    <dd className="space-x-4 sm:col-span-2">{children}</dd>
  </div>
)

export default function CompetitionDetailInfo({ competition }) {
  const sanitizedDescriptionHTML = DOMPurify.sanitize(competition?.description)

  return (
    <div className="flow-root">
      <dl className="divide-y divide-muted text-sm">
        <Row title={"Tanggal Mulai"}>{competition.startDate}</Row>
        <Row title={"Tanggal Selesai"}>{competition.endDate}</Row>
        <Row title={"Juri"}>{competition.judge}</Row>
        <Row title={"Status Saat Ini"}>
          <p
            className={
              competition.isActive ? "text-green-400" : "text-destructive"
            }
          >
            {competition.isActive ? "Aktif" : "Tidak Aktif "}
          </p>
        </Row>
        <Row title={"Tingkat Perlombaan"}>
          {competition.levels.length > 0 ? (
            <>
              {competition.levels.map(level => (
                <Badge key={level.slug}>{level.name}</Badge>
              ))}
            </>
          ) : (
            "-"
          )}
        </Row>
      </dl>

      <div
        dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
        className="ProseMirror mt-4"
      />
    </div>
  )
}
