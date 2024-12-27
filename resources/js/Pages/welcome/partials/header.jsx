import { usePage } from "@inertiajs/react"

export default function WelcomeHeader() {
  const { auth } = usePage().props
  const user = auth.user

  return (
    <header className="text-center">
      <h2 className="text-3xl font-bold">
        {user ? `Hello, ${user?.data?.username}!` : `Selamat Datang!`}
      </h2>
    </header>
  )
}
