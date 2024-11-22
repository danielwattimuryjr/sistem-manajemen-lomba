import slugify from "slugify"
import { format } from "date-fns"
import FormField from "@/Components/form-field"

export default function CompetitionMainForm({data, setData, errors, levels, judges}) {
  const levelList = levels.data.map(level => ({
    value: level?.id,
    label: level?.name
  }))
  const judgesList = judges.data.map(judge => ({
    id: judge?.id,
    label: judge?.name
  }))

  function handleDisplayNameChange(event) {
    const newName = event.target.value
    setData(data => ({
      ...data,
      name: newName,
      slug: slugify(newName, {
        replacement: '-',
        lower: true
      })
    }))
  }

  function handleDateChange(newDate) {
    setData(data => ({
      ...data,
      start_date: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : null,
      end_date: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : null,
    }))
  }

  return (
    <>
      <div className="gap-8 md:grid md:grid-cols-3">
        <FormField.Input
          label={'name perlombaan'}
          error={errors.name}
          value={data.name}
          onChange={handleDisplayNameChange}
          autoFocus
        />

        <FormField.Input
          label={'slug'}
          error={errors.slug}
          value={data.slug}
          autoFocus
          disabled
        />

        <FormField.DateRangePicker
          label={'tanggal pelaksanaan'}
          error={errors.start_date || errors.end_date}
          value={{
            start_date: data.start_date,
            end_date: data.end_date
          }}
          onChange={handleDateChange}
        />
      </div>

      <div className="w-full space-y-8">
        <FormField.TipTap
          label={'deskripsi perlombaan'}
          error={errors.description}
          value={data.description}
          onChange={(e) => setData('description', e)}
        />
      </div>

      <div className="w-full space-y-8">
        <div>
          <FormField.MultiSelect
            label={'tingkat peserta'}
            options={levelList}
            onChange={e => setData("levels", e)}
            value={data.levels}
            placeholder="Pilih Tingkat Peserta"
            variant="inverted"
            animation={2}
            maxCount={5}
          />
        </div>
      </div>

      <div className="w-full space-y-8">
        <div>
          <FormField.SelectOption
            label={"juri"}
            options={judgesList}
            onChange={e => setData("user_id", e)}
            placeholder={"Pilih Juri"}
            error={errors.user_id}
            value={data.user_id}
          />
        </div>
      </div>
    </>
  )
}
