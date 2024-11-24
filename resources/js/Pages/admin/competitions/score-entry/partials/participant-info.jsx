import React from "react"

const Row = ({ title, children }) => (
  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
    <dt className="font-bold">{title}</dt>
    <dd className="space-x-4 sm:col-span-2">{children}</dd>
  </div>
)

export default function ScoreEntryParticipantInfo({ participant }) {
  return (
    <div className="flow-root">
      <div className="divide-y divide-muted text-sm">
        <Row title="Nama Peserta">{participant.name}</Row>
        <Row title="Username">{participant.username}</Row>
      </div>
    </div>
  )
}
