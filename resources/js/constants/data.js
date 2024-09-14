export const adminNavItems = [
  {
    title: "Dashboard",
    href: route("dashboard.home"),
    icon: "IconHome2",
    active: route().current() == "dashboard.home",
  },
  {
    title: "Users",
    href: "#",
    icon: "IconUsersGroup",
    active: route().current() == "users.*",
  },
]

export const guestNavItems = [
  {
    title: "Menu 1",
    href: "#",
  },
  {
    title: "Menu 1",
    href: "#",
  },
  {
    title: "Menu 1",
    href: "#",
  },
]
