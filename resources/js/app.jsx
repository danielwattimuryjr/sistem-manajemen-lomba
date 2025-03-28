import "./bootstrap"
import "../css/app.css"

import { createRoot, hydrateRoot } from "react-dom/client"
import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { ThemeProvider } from "./providers/theme-provider"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"

createInertiaApp({
  title: title => `${title} | ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx"),
    ),
  setup({ el, App, props }) {
    if (import.meta.env.DEV) {
      createRoot(el).render(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App {...props} />
        </ThemeProvider>,
      )
      return
    }

    hydrateRoot(el, <App {...props} />)
  },
  progress: {
    color: "#64748b",
    // color: '#4B5563',
  },
})
