import { ScrollArea } from "../ui/scroll-area"

const PageContainer = ({ children, scrollable = false }) => {
  const childrenComponent = (
    <div className={"space-y-4 lg:space-y-8"}>{children}</div>
  )

  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className="h-full p-4 md:px-8">{childrenComponent}</div>
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">{childrenComponent}</div>
      )}
    </>
  )
}

export default PageContainer
