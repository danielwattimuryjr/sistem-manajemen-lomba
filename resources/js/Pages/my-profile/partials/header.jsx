import Heading from "@/Components/heading.jsx"
import { Button } from "@/Components/ui/button.jsx"
import { Icon } from "@/Components/icon.jsx"

export default function MyProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <Heading title={"My Profile"} />

      <Button>
        <Icon icon={'IconEdit'} className={'mr-2'} />
        Update
      </Button>
    </div>
  )
}
