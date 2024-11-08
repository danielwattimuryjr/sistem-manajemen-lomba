import { ThemeToggle } from "@/Components/theme-toggle"
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
      <div className="relative flex min-h-screen flex-col items-center pt-10 sm:justify-center sm:pt-0">
        <Card className="mt-6 w-full sm:max-w-md">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>
    </>
  )
}
