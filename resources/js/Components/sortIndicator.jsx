import { Icon } from "./icon"

const SortIndicator = ({ label, field, column, direction }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 capitalize">{label}</span>
      {field === column ? (
        direction === "asc" ? (
          <Icon icon={"IconChevronUp"} className="h-4 w-4" />
        ) : (
          <Icon icon={"IconChevronDown"} className="h-4 w-4" />
        )
      ) : (
        <Icon icon={"IconChevronDown"} className="h-4 w-4" />
      )}
    </div>
  )
}

export default SortIndicator
