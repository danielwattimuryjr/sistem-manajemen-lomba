import FormField from "@/Components/form-field"
import LoadingButton from "@/Components/loading-button"
import { trans } from "@/lib/utils"
import { useForm } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast.js"
import { getTimeStamp } from "@/lib/getTimeStamp.js"

export default function LevelForm({ initialData }) {
  const { data, setData, post, put, processing, errors } = useForm({
    slug: initialData?.slug || "",
    name: initialData?.name || "",
  })

  const isEditing = !!initialData
  const toastMessage = isEditing
    ? "Tingkat peserta berhasil diperbaharui"
    : "Tingkat peserta berhasil dibuat"
  const handleSubmit = e => {
    e.preventDefault()

    const onSuccess = () => {
      toast({
        title: toastMessage,
        description: getTimeStamp(),
      })
    }

    isEditing
      ? put(route("dashboard.superadmin.levels.update", initialData), {
          onSuccess,
        })
      : post(route("dashboard.superadmin.levels.store"), { onSuccess })
  }

  const handleDisplayNameChange = e => {
    const newName = e.target.value
    setData(prevData => ({
      ...prevData,
      name: newName,
      slug: trans(newName),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="gap-8 md:grid md:grid-cols-3">
        <FormField.Input
          label={"name"}
          value={data.name}
          onChange={handleDisplayNameChange}
          error={errors.name}
          type="text"
          autoFocus
        />

        <FormField.Input
          label={"Slug (Identifier)"}
          value={data.slug}
          error={errors.slug}
          type="text"
          autoFocus
          disabled
        />
      </div>
      <LoadingButton
        label={"Submit"}
        loading={processing}
        disabled={processing}
      />
    </form>
  )
}
