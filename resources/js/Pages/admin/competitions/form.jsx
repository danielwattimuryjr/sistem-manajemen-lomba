import React, { useEffect } from "react"
import { useForm } from "@inertiajs/react"
import { toast } from "@/hooks/use-toast"
import AdminLayout from "@/Layouts/adminLayout"
import PageContainer from "@/Components/layout/pageContainer"
import LoadingButton from "@/Components/loadingButton"
import Breadcrumbs from "@/Components/breadcrumbs"
import { Separator } from "@/Components/ui/separator"
import Heading from "@/Components/heading"
import { getTimeStamp } from "@/lib/getTimeStamp"
import MainCompetitionForm from "./partials/mainCompetitionForm"
import FormAssessmentFactor from "./partials/assessmentFactorsForm"

const CompetitionForm = ({ initialData }) => {
  const breadcrumbItems = [
    { title: "Dashboard", link: route("dashboard.home") },
    {
      title: "Manajemen Perlombaan",
      link: route("dashboard.competitions.index"),
    },
    { title: initialData ? "Update Data" : "Tambah Data" },
  ]

  const isEditing = !!initialData
  const title = isEditing ? "Edit perlombaan" : "Tambah perlombaan"
  const description = isEditing
    ? "Update data perlombaan"
    : "Tambah data perlombaan"
  const toastMessage = isEditing
    ? "Perlombaan berhasil diperbaharui"
    : "Perlombaan berhasil ditambahkan"
  const action = isEditing ? "Simpan Perubahan" : "Tambah Data"

  const { data, setData, post, put, processing, errors } = useForm({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    start_date: initialData?.start_date || null,
    end_date: initialData?.end_date || null,
    assessment_factors: [],
  })

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      assessment_factors: [{ name: "", value: 0 }],
    }))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    const onSuccess = () => {
      toast({
        title: toastMessage,
        description: getTimeStamp(),
      })
    }

    isEditing
      ? put(route("dashboard.competitions.update", initialData.id), {
          onSuccess,
        })
      : post(route("dashboard.competitions.store"), { onSuccess })
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
          <Breadcrumbs items={breadcrumbItems} />

          <Heading title={title} description={description} />

          <Separator />

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            {/* Form Perlombaan */}
            <MainCompetitionForm
              data={data}
              setData={setData}
              errors={errors}
              initialData={initialData}
            />

            <Separator />

            {/* Form Assessment Factor */}
            <FormAssessmentFactor
              initialFactors={data.assessment_factors}
              setAssessmentFactors={setAssessmentFactors}
            />

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

export default CompetitionForm