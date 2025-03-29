export const superadminNavItems = [
  {
    title: "Dashboard",
    href: route("dashboard.home"),
    icon: "IconHome2",
    active: route().current() == "dashboard.home",
  },
  {
    title: "Manajemen Tingkat Peserta",
    href: route("dashboard.superadmin.levels.index"),
    icon: "IconLabelImportantFilled",
    active: route().current() == "dashboard.superadmin.levels.*",
  },
  {
    title: "Manajemen Pengguna",
    href: route("dashboard.superadmin.users.index"),
    icon: "IconUsersGroup",
    active: route().current() == "dashboard.superadmin.users.*",
  },
  {
    title: "Manajemen Perlombaan",
    href: route("dashboard.superadmin.competitions.index"),
    icon: "IconTournament",
    active: route().current() == "dashboard.superadmin.competitions.*",
  },
]

export const adminNavItems = [
  {
    title: "Dashboard",
    href: route("dashboard.home"),
    icon: "IconHome2",
    active: route().current() == "dashboard.home",
  },
  {
    title: "Tingkat Peserta",
    href: route("dashboard.admin.levels.index"),
    icon: "IconLabelImportantFilled",
    active: route().current() == "dashboard.levels.*",
  },
  {
    title: "Pengguna",
    href: route("dashboard.admin.users.index"),
    icon: "IconUsersGroup",
    active: route().current() == "dashboard.admin.users.*",
  },
  {
    title: "Manajemen Perlombaan",
    href: route("dashboard.admin.competitions.index"),
    icon: "IconTournament",
    active: route().current() == "dashboard.superadmin.*",
  },
  // {
  //   title: "Pengguna",
  //   href: route("dashboard.superadmin.users.index"),
  //   icon: "IconUsersGroup",
  //   active: route().current() == "dashboard.superadmin.users.*",
  // },
]

export const judgesNavItems = [
  {
    title: "Dashboard",
    href: route("dashboard.home"),
    icon: "IconHome2",
    active: route().current() == "dashboard.home",
  },
  {
    title: "Perlombaan",
    href: route("dashboard.admin.competitions.index"),
    icon: "IconTournament",
    active: route().current() == "dashboard.competitions.*",
  },
]

export const participantsNavItems = [
  {
    title: "My Profile",
    href: route("profiles.index"),
    icon: "IconUserCircle",
    active: route().current() == "guest.profiles",
  },
  {
    title: "Perlombaan",
    href: route("my-competitions"),
    icon: "IconHome2",
    active: route().current() == "guest.competitions",
  },
]
