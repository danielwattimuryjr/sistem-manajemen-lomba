import React, { useState } from "react"
import { Input } from "@/Components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Button } from "@/Components/ui/button"
import { Icon } from "@/Components/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip"
import Heading from "@/Components/heading"
import InputError from "@/Components/input-error"

const FormAssessmentFactor = ({
  initialFactors = [],
  setAssessmentFactors,
  errors,
}) => {
  const [factors, setFactors] = useState(
    initialFactors.length > 0 ? initialFactors : [{ name: "", weight: 0 }],
  )

  const handleChangeAssessmentFactor = (index, key, value) => {
    const updatedFactors = factors.map((factor, i) =>
      i === index ? { ...factor, [key]: value } : factor,
    )
    setFactors(updatedFactors)
    setAssessmentFactors(updatedFactors)
  }

  const addAssessmentFactor = () => {
    const newFactor = { name: "", weight: 0 }
    const updatedFactors = [...factors, newFactor]
    setFactors(updatedFactors)
    setAssessmentFactors(updatedFactors)
  }

  const removeAssessmentFactor = index => {
    const updatedFactors = factors.filter((_, i) => i !== index)
    setFactors(updatedFactors)
    setAssessmentFactors(updatedFactors)
  }

  const totalWeight = factors.reduce((sum, item) => {
    return sum + Number(item.weight)
  }, 0)

  return (
    <>
      <Heading
        title={"Faktor Penilaian"}
        description={
          "Pada bagian ini, silahkan tentukan faktor penilaian untuk lomba ini beserta dengan bobotnya. Total bobot penilaian tidak boleh melebihi 100%"
        }
      />

      <h1>Total bobot penilaian: {totalWeight}</h1>

      <ScrollArea className="h-[calc(80vh-300px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>Nama Faktor</TableHead>
              <TableHead>Value</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {factors.length > 0 ? (
              <>
                {factors.map((factor, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Input
                        value={factor.name}
                        placeholder={"Cth. Kreativitas"}
                        onChange={e =>
                          handleChangeAssessmentFactor(
                            i,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                      <InputError
                        message={errors[`assessment_factors.${i}.name`]}
                        className="mt-2"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type={"number"}
                        min={0}
                        value={factor.weight}
                        onChange={e =>
                          handleChangeAssessmentFactor(
                            i,
                            "weight",
                            e.target.value,
                          )
                        }
                      />
                      <InputError
                        message={errors[`assessment_factors.${i}.weight`]}
                        className="mt-2"
                      />
                    </TableCell>
                    <TableCell className="flex items-center justify-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              type="button"
                              onClick={() => removeAssessmentFactor(i)}
                            >
                              <Icon icon={"IconTrash"} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent align="center">
                            Hapus baris ini
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="animate-pulse py-5 text-center text-base font-semibold text-destructive"
                >
                  Data Tidak Ada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                <Button
                  type="button"
                  disabled={totalWeight >= 100}
                  onClick={addAssessmentFactor}
                  variant="ghost"
                  className={"w-full"}
                >
                  <Icon icon={"IconPlus"} className={"mr-2"} />
                  Tambah
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </>
  )
}

export default FormAssessmentFactor
