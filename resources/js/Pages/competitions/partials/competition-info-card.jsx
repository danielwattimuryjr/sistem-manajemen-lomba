import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import DOMPurify from "dompurify"
import React from "react"

const CompetitionInfoCard = ({ competition }) => {
  const sanitizedDescriptionHTML = DOMPurify.sanitize(competition.description)

  return (
    <Card>
      <CardHeader>Informasi Perlombaan</CardHeader>
      <CardContent>
        <div className="flow-root">
          <dl className="divide-y divide-muted text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-bold">Tanggal Mulai</dt>
              <dd className="sm:col-span-2">{competition.startDate}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-bold">Tanggal Selesai</dt>
              <dd className="sm:col-span-2">{competition.endDate}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-bold">Tingkat Perlombaan</dt>
              <dd className="space-x-4 sm:col-span-2">
                {competition.levels.map(level => (
                  <Badge key={level.slug}>{level.name}</Badge>
                ))}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-bold">Juri Perlombaan</dt>
              <dd className="space-x-4 sm:col-span-2">
                {competition.judges.map(judge => (
                  <Badge key={judge.username}>{judge.name}</Badge>
                ))}
              </dd>
            </div>
          </dl>

          <div
            dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
            className="ProseMirror mt-4"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CompetitionInfoCard
