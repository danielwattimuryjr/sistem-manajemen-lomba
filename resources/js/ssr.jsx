import ReactDOMServer from "react-dom/server"
import { createInertiaApp } from "@inertiajs/react"
import createServer from "@inertiajs/react/server"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { route } from "ziggy-js"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"

createServer(page => {
    globalThis.Ziggy = page.props.ziggy;

    createInertiaApp({
      page,
      render: ReactDOMServer.renderToString,
      title: title => `${title} - ${appName}`,
      resolve: name =>
        resolvePageComponent(
          `./pages/${name}.jsx`,
          import.meta.glob("./pages/**/*.jsx")
        ),
      setup: ({ App, props }) => {
        const Ziggy = {
          // Pull the Ziggy config off of the props.
          ...props.initialPage.props.ziggy,
          // Build the location, since there is
          // no window.location in Node.
          location: new URL(props.initialPage.props.ziggy.url)
        }

        global.route = (name, params, absolute, config = Ziggy) =>
          route(name, params, absolute, config)

        return <App {...props} />
      }
    })
  }
)
