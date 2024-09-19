export const adminNavItems = [
  {
    title: "Dashboard",
    href: route("dashboard.home"),
    icon: "IconHome2",
    active: route().current() == "dashboard.home",
  },
  {
    title: "Manajemen Tingkat Peserta",
    href: route("dashboard.roles.index"),
    icon: "IconLabelImportantFilled",
    active: route().current() == "dashboard.roles.*",
  },
  {
    title: "Manajemen Pengguna",
    href: route("dashboard.users.index"),
    icon: "IconUsersGroup",
    active: route().current() == "dashboard.users.*",
  },
  {
    title: "Manajemen Perlombaan",
    href: route("dashboard.competitions.index"),
    icon: "IconTournament",
    active: route().current() == "dashboard.competitions.*",
  },
]
