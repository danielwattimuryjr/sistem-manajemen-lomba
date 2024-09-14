import { Icon } from "./icon"
import { Button } from "./ui/button"

const LoadingButton = ({ loading = false, disabled = false, label }) => {
  return (
    <Button disabled={disabled}>
      {label ?? "Submit"}
      {loading && <Icon icon={"IconLoader2"} className={"animate-spin ml-2"} />}
    </Button>
  )
}

export default LoadingButton
