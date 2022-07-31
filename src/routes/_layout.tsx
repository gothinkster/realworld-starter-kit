import { component$, Host, Resource, Slot, useContextProvider, useStore } from "@builder.io/qwik"
import { EndpointHandler, useEndpoint } from "@builder.io/qwik-city"
import { components } from "~/libs/api-schema"
import { SessionContext } from "~/libs/context"
import { getSession } from "~/libs/getSession"
import Footer from "../components/footer/footer"
import Header from "../components/header/header"

// FIXME: there's some issues need to investigate or report
// - resource being override by page level endpoint
// - thus requiring the route defined get endpoint also including user props
export interface EndpointData {
  user?: components["schemas"]["User"]
}

export const onGet: EndpointHandler<EndpointData> = async ({ request }) => {
  const { user } = getSession(request.headers.get("cookie"))
  return {
    user,
  }
}
export default component$(() => {
  const resource = useEndpoint<typeof onGet>()
  const session = useStore({
    user: undefined,
  } as EndpointData);
  useContextProvider(SessionContext, session);
  return (
    <Host>
      <Resource
        resource={resource}
        onResolved={(data) => {
          // Security(minor ?): By doing this, cause user being serialized including token
          session.user = data?.user
          return (
            <>
              <Header />
              <main>
                <Slot />
              </main>
              <Footer />
            </>
          )
        }}
      />
    </Host>
  )
})
