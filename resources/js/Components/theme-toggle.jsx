import { Icon } from "./icon"
import { Button } from "./ui/button"

export function ThemeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none")
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none")
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle("dark")

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="h-[2.6rem] w-[2.6rem] rounded-full [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.2]"
        type="button"
        aria-label="Toggle dark mode"
        onClick={toggleMode}
      >
        <Icon icon={"IconSun"} className={"dark:hidden"} />
        <Icon icon={"IconMoonStars"} className={"hidden dark:block"} />
      </Button>
    </>
  )
}
