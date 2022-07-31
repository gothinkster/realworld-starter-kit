import { EndpointHandler } from "@builder.io/qwik-city"
import { getSession } from "~/libs/getSession"
import * as api from "~/libs/api"

export const onDelete: EndpointHandler = async ({ request, params }) => {
  const { user } = getSession(request.headers.get("cookie"))
  const result = await api.del(`articles/${params.slug}`, user.token)
  return result

}