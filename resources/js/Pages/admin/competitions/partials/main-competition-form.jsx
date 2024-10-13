import React from "react"
import slugify from "slugify"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import InputError from "@/Components/inputError"
import DateRangePicker from "@/Components/dateRangePicker"
import Tiptap from "@/Components/textEditor/tiptap"
import { format } from "date-fns"
import { MultiSelect } from "@/Components/multiSelect"

const MainCompetitionForm = ({
  data,
  setData,
  errors,
  initialData,
  levels,
  judges,
}) => {
  const isEditing = !!initialData

  const levelsList = levels.data.map(level => ({
    value: level.id,
    label: level.name,
  }))

  const judgesList = judges.data.map(judge => ({
    value: judge.id,
    label: judge.name,
  }))

  const handleDisplayNameChange = e => {
    const newName = e.target.value
    setData(prevData => ({
      ...prevData,
      name: newName,
      slug: slugify(newName, {
        replacement: "_",
        lower: true,
      }),
    }))
  }

  const handleDateChange = newDate => {
    setData(prevData => ({
      ...prevData,
      start_date: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : null,
      end_date: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : null,
    }))
  }

  return (
    <>
      <div className="gap-8 md:grid md:grid-cols-3">
        <div>
          <Label htmlFor="name" className="capitalize">
            Nama Perlombaan
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={data.name}
            autoFocus
            onChange={handleDisplayNameChange}
          />
          <InputError message={errors.name} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="slug" className="capitalize">
            Slug
          </Label>
          <Input disabled id="slug" type="text" name="slug" value={data.slug} />
          <InputError message={errors.slug} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="date-range" className="capitalize">
            Tanggal Pelaksanaan
          </Label>
          <DateRangePicker
            from={data.start_date}
            to={data.end_date}
            onChange={handleDateChange}
          />
          <InputError
            message={errors.start_date || errors.end_date}
            className="mt-2"
          />
        </div>
      </div>

      <div className="w-full space-y-8">
        <div>
          <Label>Deskripsi Perlombaan</Label>
          <Tiptap
            description={data.description}
            onChange={e => setData("description", e)}
          />
          <InputError message={errors.description} className="mt-2" />
        </div>
      </div>

      <div className="w-full space-y-8">
        <div>
          <Label>Tingkat Peserta</Label>
          <MultiSelect
            options={levelsList}
            onValueChange={e => setData("levels", e)}
            defaultValue={data.levels}
            placeholder="Pilih Tingkat Peserta"
            variant="inverted"
            animation={2}
            maxCount={5}
          />
          <InputError message={errors.levels} className="mt-2" />
        </div>
      </div>

      <div className="w-full space-y-8">
        <div>
          <Label>Juri</Label>
          <MultiSelect
            options={judgesList}
            onValueChange={e => setData("judges", e)}
            defaultValue={data.judges}
            placeholder="Pilih Juri"
            variant="inverted"
            animation={2}
            maxCount={5}
          />
          <InputError message={errors.judges} className="mt-2" />
        </div>
      </div>
    </>
  )
}

export default MainCompetitionForm
