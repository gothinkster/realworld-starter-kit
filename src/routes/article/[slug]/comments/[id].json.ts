import type { EndpointHandler } from "@builder.io/qwik-city"
import * as api from "~/libs/api"
import { getSession } from "~/libs/getSession"

export const onDelete: EndpointHandler = async ({ request, params }) => {
  const { user } = getSession(request.headers.get('cookie'))
  const result = await api.del(`articles/${params.slug}/comments/${params.id}`, user.token)

  if (result.errors) {
    return result
  }
  return {
    ok: true
  }
}
