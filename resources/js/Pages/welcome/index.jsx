import AppLayout from "@/Layouts/app-layout"
import RecentCompetition from "@/pages/welcome/partials/recent-competition.jsx"
import UserCompetition from "@/pages/welcome/partials/user-competition.jsx"
import WelcomeHeader from "@/pages/welcome/partials/header.jsx"

const Home = () => {
  return (
    <AppLayout title={"Home"}>
      <WelcomeHeader />
      <RecentCompetition />
      <UserCompetition />
    </AppLayout>
  )
}

export default Home
