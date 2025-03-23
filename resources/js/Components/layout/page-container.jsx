import { ScrollArea } from "../ui/scroll-area"

const PageContainer = ({ children, scrollable = true }) => {
  const childrenComponent = (
    <div className={"space-y-4 lg:space-y-8"}>{children}</div>
  )

  return (
    <>
      <div className={`h-full p-4 md:px-8 ${scrollable && "overflow-auto"}`}>
        {childrenComponent}
      </div>
    </>
  )
}

export default PageContainer
