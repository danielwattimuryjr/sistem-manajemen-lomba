import CompetitionCriteriaForm from "./partials/criteria-form"
import CompetitionFormHeader from "./partials/header"
import CompetitionMainForm from "./partials/main-form"
import { useForm } from "@inertiajs/react"
import AdminLayout from "@/Layouts/admin-layout.jsx"
import PageContainer from "@/Components/layout/page-container.jsx"
import { Separator } from "@/Components/ui/separator.jsx"
import LoadingButton from "@/Components/loading-button.jsx"

export default function CompetitionForm({ initialData, levels, judges }) {
  const isEditing = !!initialData

  const toastMessage = isEditing
    ? "Perlombaan berhasil diperbaharui"
    : "Perlombaan berhasil ditambahkan"
  const action = isEditing ? "Simpan Perubahan" : "Tambah Data"

  const { data, setData, post, put, processing, errors } = useForm({
    name: initialData?.name || "",
    user_id: initialData?.user_id || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    start_date: initialData?.start_date || null,
    end_date: initialData?.end_date || null,
    assessment_factors: initialData?.assessment_factors || [
      {
        name: "",
        weight: 0,
      },
    ],
    levels: initialData?.levels || [],
  })

  console.log(data)

  const handleSubmit = e => {
    e.preventDefault()

    const onSuccess = () => {
      toast({
        title: toastMessage,
        description: getTimeStamp(),
      })
    }

    isEditing
      ? put(route("dashboard.superadmin.competitions.update", initialData), {
          onSuccess,
        })
      : post(route("dashboard.superadmin.competitions.store"), { onSuccess })
  }

  const setAssessmentFactors = newFactors => {
    setData(prevData => ({
      ...prevData,
      assessment_factors: newFactors,
    }))
  }

  return (
    <AdminLayout>
      <PageContainer scrollable>
        <div className="space-y-4">
          <CompetitionFormHeader isEditing={isEditing} />
          <Separator />
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <CompetitionMainForm
              data={data}
              setData={setData}
              errors={errors}
              levels={levels}
              judges={judges}
            />
            <Separator />
            <CompetitionCriteriaForm
              initialFactors={data.assessment_factors}
              setAssessmentFactors={setAssessmentFactors}
              errors={errors}
            />
            <Separator />
            <LoadingButton
              label={action}
              loading={processing}
              disabled={processing}
            />
          </form>
        </div>
      </PageContainer>
    </AdminLayout>
  )
}
