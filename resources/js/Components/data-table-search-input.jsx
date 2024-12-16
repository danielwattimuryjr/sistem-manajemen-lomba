import { Input } from "@/Components/ui/input.jsx"
import React from "react"

export default function DataTableSearchInput({ search, onChange }) {
  return (
    <div className="w-72">
      <Input
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Pencarian..."
      />
    </div>
  )
}
