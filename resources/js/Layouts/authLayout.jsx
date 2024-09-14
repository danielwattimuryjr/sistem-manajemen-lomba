import { ThemeToggle } from "@/Components/themeToggle"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Head } from "@inertiajs/react"

export default function AuthLayout({ title, description, children }) {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col items-center pt-10 sm:justify-center sm:pt-0">
        <Card className="mt-6 w-full sm:max-w-md ">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <ThemeToggle />
      </div>
    </>
  )
}
