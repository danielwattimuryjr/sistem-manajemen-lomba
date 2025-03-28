import { useForm } from "@inertiajs/react"
import React, { useEffect } from "react"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"
import FormField from "@/Components/form-field.jsx"
import slugify from "slugify"
import LoadingButton from "@/Components/loading-button.jsx"

export default function ScoreEntryForm({
  competition,
  participant,
  criterias,
}) {
  const { data, setData, post, processing, errors } = useForm({
    criterias: [],
  })

  useEffect(() => {
    setData(
      "criterias",
      criterias.map((criteria, idx) => ({
        id: criteria.id,
        name: criteria.name,
        score: 0,
      })),
    )
  }, [criterias])

  function handleScoreChange(index, value) {
    const updatedData = [...data.criterias]
    updatedData[index].score = value
    setData("criterias", updatedData)
  }

  function handleSubmit(event) {
    event.preventDefault()

    post(
      route("dashboard.admin.score-entries.store", {
        competition,
        participant,
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          toast({
            title: "Score berhasil dimasukkan",
            description: getTimeStamp(),
          })
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="gap-8 md:grid md:grid-cols-3">
        {data.criterias.map((criteria, index) => {
          const uniqueKeyName = slugify(criteria.name, { replacement: "-" })

          return (
            <FormField.Input
              key={uniqueKeyName}
              label={criteria.name}
              value={criteria.score}
              id={uniqueKeyName}
              onChange={e => handleScoreChange(index, e.target.value)}
              error={errors[`criterias.${index}.score`]}
              name={criteria.name}
              type={"number"}
            />
          )
        })}
      </div>

      <LoadingButton
        label={"Submit"}
        loading={processing}
        disabled={processing}
      />
    </form>
  )
}
