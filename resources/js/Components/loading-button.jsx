import { Icon } from "./icon"
import { Button } from "./ui/button"

const LoadingButton = ({ loading = false, disabled = false, label, props }) => {
  return (
    <Button disabled={disabled} {...props}>
      {label ?? "Submit"}
      {loading && <Icon icon={"IconLoader2"} className={"ml-2 animate-spin"} />}
    </Button>
  )
}

export default LoadingButton
