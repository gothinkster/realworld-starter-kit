import type { EndpointHandler } from "@builder.io/qwik-city"
import * as api from "../../libs/api"

export const onGet: EndpointHandler = async ({ request, response }) => {
  const { tags } = await api.get("tags")

  response.headers.set("Cache-Control", "public, max-age=300")
  return {
    tags: tags.filter((tag: string) => /^[a-z]+$/i.test(tag)),
  }
}
