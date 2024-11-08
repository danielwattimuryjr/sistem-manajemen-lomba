import React, { useState } from "react"
import { Input } from "@/Components/ui/input"
import { Label } from "./ui/label"
import InputError from "./input-error"
import { DatePicker } from "./date-picker"
import { Textarea } from "./ui/textarea"
import { trans } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import { Button } from "./ui/button"
import { IconSelector } from "@tabler/icons-react"
// import { SelectTrigger } from "@radix-ui/react-select"

const FormField = ({ label, error, children }) => {
  return (
    <div>
      <Label htmlFor={trans(label)} className="capitalize">
        {label}
      </Label>

      {children}

      {error && <InputError message={error} className="mt-2" />}
    </div>
  )
}

FormField.Input = function InputField({
  label,
  value,
  onChange,
  type = "text",
  error,
  ...props
}) {
  return (
    <FormField label={label} name={trans(label)} error={error}>
      <Input
        id={trans(label)}
        name={trans(label)}
        value={value}
        onChange={onChange}
        type={type}
        className="mt-1 block w-full"
        {...props}
      />
    </FormField>
  )
}

FormField.Date = function DateField({
  label,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <FormField label={label} name={trans("label")} error={error}>
      <DatePicker
        selectedDate={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormField>
  )
}

FormField.SelectOption = function SelectOption({
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  options,
}) {
  return (
    <FormField label={label} name={trans("label")} error={error}>
      <Select onValueChange={onChange} defaultValue={`${value}`}>
        <SelectTrigger disabled={disabled}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map(option => (
            <SelectItem value={`${option.id}`} key={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  )
}

FormField.Textarea = function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  ...props
}) {
  return (
    <FormField label={label} name={name} error={error}>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </FormField>
  )
}

export default FormField
