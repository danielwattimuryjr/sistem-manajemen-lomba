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
import Tiptap from "./text-editor/tiptap"
import DateRangePicker from "./date-range-picker"
import { MultiSelect } from "./multi-select"

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
  autoFocus = false,
  disabled = false,
  ...props
}) {
  return (
    <FormField label={label} name={trans(label)} error={error} {...props}>
      <Input
        id={trans(label)}
        name={trans(label)}
        value={value}
        onChange={onChange}
        type={type}
        className="mt-1 block w-full"
        autoFocus={autoFocus}
        disabled={disabled}
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

FormField.TipTap = function InputField({
  label,
  value,
  onChange,
  error
}) {
  return (
    <FormField label={label} name={trans(label)} error={error}>
      <Tiptap
        description={value}
        onChange={onChange}
      />
    </FormField>
  )
}

FormField.DateRangePicker = function InputField({
  label,
  value,
  onChange,
  error
}) {
  return (
    <FormField label={label} name={trans(label)} error={error}>
      <DateRangePicker
        from={value.start_date}
        to={value.end_date}
        onChange={onChange}
      />
    </FormField>
  )
}

FormField.MultiSelect = function InputField({
  label,
  value,
  onChange,
  options,
  placeholder,
  variant,
  animation = 2,
  maxCount = 3
}) {
  return (
    <FormField label={label} name={trans(label)} error={error}>
      <MultiSelect
        options={options}
        onValueChange={onChange}
        defaultValue={value}
        placeholder={placeholder}
        variant={variant}
        animation={animation}
        maxCount={maxCount}
      />
    </FormField>
  )
}

export default FormField
